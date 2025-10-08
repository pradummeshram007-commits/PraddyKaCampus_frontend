// Application Data
const sportsData = {
  sports: ["Football", "Volleyball", "Basketball", "Pool", "Table Tennis", "Badminton"],
  locations: [
    "Sports Complex Ground A",
    "Sports Complex Ground B", 
    "Gymnasium Court 1",
    "Gymnasium Court 2",
    "Pool Hall",
    "Indoor Badminton Court"
  ],
  samplePolls: [
    {
      id: 1,
      sport: "Football",
      icon: "⚽",
      date: "Today",
      time: "6:30 PM",
      location: "Sports Complex Ground A",
      creator: "Rahul",
      creatorYear: "2nd Year",
      playersNeeded: 10,
      playersJoined: 6,
      description: "5v5 football match, bring your energy!",
      tags: ["Open for All", "Casual Game"],
      status: "yellow",
      startsIn: "2 hours"
    },
    {
      id: 2,
      sport: "Basketball",
      icon: "🏀",
      date: "Tomorrow",
      time: "4:00 PM", 
      location: "Gymnasium Court 1",
      creator: "Priya",
      creatorYear: "3rd Year",
      playersNeeded: 8,
      playersJoined: 7,
      description: "Competitive basketball match",
      tags: ["Open for All"],
      status: "green",
      startsIn: "1 day 22 hours"
    },
    {
      id: 3,
      sport: "Badminton",
      icon: "🏸",
      date: "Today",
      time: "8:00 PM",
      location: "Indoor Badminton Court",
      creator: "Arjun",
      creatorYear: "1st Year", 
      playersNeeded: 4,
      playersJoined: 1,
      description: "Doubles badminton tournament",
      tags: ["Boys Only", "Tournament"],
      status: "red",
      startsIn: "4 hours"
    },
    {
      id: 4,
      sport: "Table Tennis",
      icon: "🏓",
      date: "Tomorrow",
      time: "2:30 PM",
      location: "Gymnasium Court 2",
      creator: "Sneha",
      creatorYear: "2nd Year",
      playersNeeded: 6,
      playersJoined: 4,
      description: "Fun TT matches for everyone",
      tags: ["Open for All", "Casual Game"],
      status: "yellow", 
      startsIn: "1 day 20 hours"
    },
    {
      id: 5,
      sport: "Pool",
      icon: "🎱",
      date: "Today",
      time: "7:15 PM",
      location: "Pool Hall",
      creator: "Vikram",
      creatorYear: "4th Year",
      playersNeeded: 8,
      playersJoined: 8,
      description: "8-ball pool championship",
      tags: ["Tournament", "Advanced"],
      status: "green",
      startsIn: "3 hours"
    }
  ]
};

// Global variables
let polls = [...sportsData.samplePolls];
let currentFilter = 'all';
let joinedPolls = new Set();

// Sport icons mapping
const sportIcons = {
  'Football': '⚽',
  'Volleyball': '🏐',
  'Basketball': '🏀',
  'Pool': '🎱',
  'Table Tennis': '🏓',
  'Badminton': '🏸'
};

// DOM Elements
const createPollForm = document.getElementById('createPollForm');
const pollsGrid = document.getElementById('pollsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const successAlert = document.getElementById('successAlert');
const closeAlertBtn = document.getElementById('closeAlert');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  setMinDate();
  renderPolls();
  setupEventListeners();
  startCountdownTimers();
});

// Set minimum date to today
function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('date').setAttribute('min', today);
  document.getElementById('date').value = today;
}

// Setup event listeners
function setupEventListeners() {
  // Form submission
  createPollForm.addEventListener('submit', handleFormSubmit);
  
  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilterClick);
  });
  
  // Close alert modal
  closeAlertBtn.addEventListener('click', closeAlert);
  successAlert.addEventListener('click', function(e) {
    if (e.target === successAlert) {
      closeAlert();
    }
  });
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(createPollForm);
  const selectedTags = Array.from(document.getElementById('tags').selectedOptions).map(option => option.value);
  
  // Create new poll object
  const newPoll = {
    id: polls.length + 1,
    sport: formData.get('sport'),
    icon: sportIcons[formData.get('sport')],
    date: formatDate(formData.get('date')),
    time: formatTime(formData.get('time')),
    location: formData.get('location'),
    creator: 'You',
    creatorYear: '2nd Year',
    playersNeeded: parseInt(formData.get('playersNeeded')),
    playersJoined: 1, // Creator is automatically joined
    description: formData.get('description'),
    tags: selectedTags.length > 0 ? selectedTags : ['Open for All'],
    status: 'red', // New polls start as urgent
    startsIn: calculateTimeUntil(formData.get('date'), formData.get('time'))
  };
  
  // Add to polls array
  polls.unshift(newPoll); // Add to beginning
  joinedPolls.add(newPoll.id); // Creator automatically joins
  
  // Show success alert
  showAlert();
  
  // Reset form
  createPollForm.reset();
  setMinDate();
  
  // Re-render polls
  renderPolls();
}

// Handle filter button clicks
function handleFilterClick(e) {
  // Remove active class from all buttons
  filterButtons.forEach(btn => btn.classList.remove('active'));
  
  // Add active class to clicked button
  e.target.classList.add('active');
  
  // Update current filter
  currentFilter = e.target.dataset.sport;
  
  // Re-render polls with filter
  renderPolls();
}

// Render polls based on current filter
function renderPolls() {
  const filteredPolls = currentFilter === 'all' 
    ? polls 
    : polls.filter(poll => poll.sport === currentFilter);
  
  pollsGrid.innerHTML = '';
  
  if (filteredPolls.length === 0) {
    pollsGrid.innerHTML = `
      <div class="no-polls-message">
        <p>No ${currentFilter === 'all' ? '' : currentFilter} polls available at the moment.</p>
        <p>Create a new poll to get started!</p>
      </div>
    `;
    return;
  }
  
  filteredPolls.forEach(poll => {
    const pollCard = createPollCard(poll);
    pollsGrid.appendChild(pollCard);
  });
}

// Create individual poll card
function createPollCard(poll) {
  const isJoined = joinedPolls.has(poll.id);
  const isFull = poll.playersJoined >= poll.playersNeeded;
  const progressPercentage = (poll.playersJoined / poll.playersNeeded) * 100;
  
  const card = document.createElement('div');
  card.className = `poll-card status-${poll.status}`;
  card.dataset.sport = poll.sport;
  
  card.innerHTML = `
    <div class="poll-card__header">
      <span class="poll-card__sport">${poll.icon}</span>
      <h3 class="poll-card__title">${poll.sport}</h3>
    </div>
    
    <div class="poll-card__info">
      <div class="poll-card__detail">
        <span>📅</span>
        <span>${poll.date}, ${poll.time}</span>
      </div>
      <div class="poll-card__detail">
        <span>📍</span>
        <span>${poll.location}</span>
      </div>
      <div class="poll-card__detail">
        <span>👤</span>
        <span>Created by: ${poll.creator} (${poll.creatorYear})</span>
      </div>
      <div class="poll-card__detail">
        <span>⏰</span>
        <span class="poll-card__countdown">Starts in ${poll.startsIn}</span>
      </div>
    </div>
    
    <div class="poll-card__progress">
      <div class="poll-card__progress-info">
        <span>Players: ${poll.playersJoined}/${poll.playersNeeded}</span>
        <span>${Math.round(progressPercentage)}% filled</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill status-${poll.status}" style="width: ${progressPercentage}%"></div>
      </div>
    </div>
    
    <div class="poll-card__tags">
      ${poll.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
    
    <div class="poll-card__description">
      <p style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-16);">${poll.description}</p>
    </div>
    
    <div class="poll-card__actions">
      <button 
        class="btn ${isJoined ? 'btn--joined' : 'btn--primary'} ${isFull && !isJoined ? 'btn--disabled' : ''}" 
        onclick="toggleJoin(${poll.id})"
        ${isFull && !isJoined ? 'disabled' : ''}
      >
        ${isJoined ? '✅ Joined' : (isFull ? 'Full' : 'Join Game')}
      </button>
      <button class="btn btn--watch" onclick="watchGame(${poll.id})">
        👀 Watch Only
      </button>
    </div>
  `;
  
  return card;
}

// Toggle join/leave for a poll
function toggleJoin(pollId) {
  const pollIndex = polls.findIndex(p => p.id === pollId);
  if (pollIndex === -1) return;
  
  const poll = polls[pollIndex];
  
  if (joinedPolls.has(pollId)) {
    // Leave the poll
    joinedPolls.delete(pollId);
    poll.playersJoined = Math.max(0, poll.playersJoined - 1);
  } else {
    // Join the poll
    if (poll.playersJoined < poll.playersNeeded) {
      joinedPolls.add(pollId);
      poll.playersJoined += 1;
    }
  }
  
  // Update poll status based on new player count
  updatePollStatus(poll);
  
  // Re-render polls
  renderPolls();
}

// Watch game function
function watchGame(pollId) {
  const poll = polls.find(p => p.id === pollId);
  if (poll) {
    alert(`You're now watching the ${poll.sport} match at ${poll.location}. You'll receive notifications about the game!`);
  }
}

// Update poll status based on player count
function updatePollStatus(poll) {
  const fillPercentage = (poll.playersJoined / poll.playersNeeded) * 100;
  
  if (fillPercentage >= 80) {
    poll.status = 'green';
  } else if (fillPercentage >= 50) {
    poll.status = 'yellow';
  } else {
    poll.status = 'red';
  }
}

// Format date for display
function formatDate(dateStr) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const inputDate = new Date(dateStr);
  
  if (inputDate.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (inputDate.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return inputDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  }
}

// Format time for display
function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}

// Calculate time until event
function calculateTimeUntil(dateStr, timeStr) {
  const eventDate = new Date(`${dateStr}T${timeStr}`);
  const now = new Date();
  const timeDiff = eventDate.getTime() - now.getTime();
  
  if (timeDiff <= 0) {
    return 'Started';
  }
  
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? minutes + ' min' : ''}`;
  } else {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  }
}

// Start countdown timers (updates every minute)
function startCountdownTimers() {
  setInterval(() => {
    polls.forEach(poll => {
      if (poll.date && poll.time) {
        // For sample polls, we'll keep their original startsIn values
        // For new polls created by users, we'll calculate dynamically
        if (poll.creator === 'You') {
          // This would be calculated dynamically for user-created polls
          // For now, keeping the demo behavior
        }
      }
    });
    
    // Update countdown displays
    const countdownElements = document.querySelectorAll('.poll-card__countdown');
    countdownElements.forEach((element, index) => {
      if (polls[index] && polls[index].startsIn !== 'Started') {
        // In a real app, this would update the countdown
        // For demo purposes, we'll keep the original values
      }
    });
  }, 60000); // Update every minute
}

// Show success alert
function showAlert() {
  successAlert.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Close success alert
function closeAlert() {
  successAlert.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Utility function to add CSS for disabled buttons
function addDisabledButtonStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .btn--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: var(--color-grey-300) !important;
    }
    
    .no-polls-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: var(--space-32);
      color: var(--color-text-secondary);
      font-size: var(--font-size-lg);
    }
    
    .no-polls-message p {
      margin: var(--space-8) 0;
    }
  `;
  document.head.appendChild(style);
}

// Add disabled button styles on load
addDisabledButtonStyles();

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  // Close modal with Escape key
  if (e.key === 'Escape' && !successAlert.classList.contains('hidden')) {
    closeAlert();
  }
});

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';