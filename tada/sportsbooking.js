// Application data and state
const appData = {
  facilities: [
    "Football Ground",
    "Volleyball Court", 
    "Badminton Court 1",
    "Badminton Court 2",
    "Pool Table"
  ],
  timeSlots: [
    "17:00 - 18:00",
    "18:00 - 19:00", 
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00"
  ],
  currentTime: "19:30",
  sportCategories: [
    { value: "all", label: "All Sports" },
    { value: "football", label: "Football" },
    { value: "volleyball", label: "Volleyball" },
    { value: "badminton", label: "Badminton" },
    { value: "pool", label: "Pool Table" }
  ],
  bookings: {
    "2025-09-01": {
      "17:00 - 18:00": {
        "Football Ground": { booked: true, bookerName: "Ananya Sharma" },
        "Volleyball Court": { booked: false },
        "Badminton Court 1": { booked: true, bookerName: "Raj Patel" },
        "Badminton Court 2": { booked: false },
        "Pool Table": { booked: true, bookerName: "Priya Singh" }
      },
      "18:00 - 19:00": {
        "Football Ground": { booked: true, bookerName: "Team Alpha" },
        "Volleyball Court": { booked: false },
        "Badminton Court 1": { booked: false },
        "Badminton Court 2": { booked: true, bookerName: "Vikram Kumar" },
        "Pool Table": { booked: false }
      },
      "19:00 - 20:00": {
        "Football Ground": { booked: false },
        "Volleyball Court": { booked: true, bookerName: "Neha Gupta" },
        "Badminton Court 1": { booked: false },
        "Badminton Court 2": { booked: false },
        "Pool Table": { booked: true, bookerName: "Arjun Reddy" }
      },
      "20:00 - 21:00": {
        "Football Ground": { booked: false },
        "Volleyball Court": { booked: false },
        "Badminton Court 1": { booked: true, bookerName: "Shreya Jain" },
        "Badminton Court 2": { booked: false },
        "Pool Table": { booked: false }
      },
      "21:00 - 22:00": {
        "Football Ground": { booked: false },
        "Volleyball Court": { booked: false },
        "Badminton Court 1": { booked: false },
        "Badminton Court 2": { booked: false },
        "Pool Table": { booked: false }
      }
    }
  }
};

// DOM elements
let datePicker;
let sportFilter;
let searchInput;
let bookingTbody;
let bookingModal;
let modalClose;
let cancelBooking;
let confirmBooking;
let userNameInput;
let bookingDetails;
let successToast;

// Application state
let selectedSlot = null;
let currentDate = new Date().toISOString().split('T')[0];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  setupEventListeners();
  initializeDate();
  renderBookingGrid();
});

function initializeElements() {
  datePicker = document.getElementById('date-picker');
  sportFilter = document.getElementById('sport-filter');
  searchInput = document.getElementById('search-input');
  bookingTbody = document.getElementById('booking-tbody');
  bookingModal = document.getElementById('booking-modal');
  modalClose = document.getElementById('modal-close');
  cancelBooking = document.getElementById('cancel-booking');
  confirmBooking = document.getElementById('confirm-booking');
  userNameInput = document.getElementById('user-name');
  bookingDetails = document.getElementById('booking-details');
  successToast = document.getElementById('success-toast');
}

function setupEventListeners() {
  // Date picker change - fixed to properly handle date changes
  datePicker.addEventListener('change', function(e) {
    console.log('Date changed to:', e.target.value);
    currentDate = e.target.value;
    renderBookingGrid();
  });

  // Also listen for input event for better compatibility
  datePicker.addEventListener('input', function(e) {
    console.log('Date input changed to:', e.target.value);
    if (e.target.value) {
      currentDate = e.target.value;
      renderBookingGrid();
    }
  });

  // Sport filter change
  sportFilter.addEventListener('change', function(e) {
    console.log('Sport filter changed to:', e.target.value);
    applyFilters();
  });

  // Search input
  searchInput.addEventListener('input', function(e) {
    console.log('Search input:', e.target.value);
    applyFilters();
  });

  // Modal event listeners
  modalClose.addEventListener('click', closeModal);
  cancelBooking.addEventListener('click', closeModal);
  confirmBooking.addEventListener('click', handleBookingConfirm);

  // Close modal when clicking backdrop
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  // Handle escape key to close modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !bookingModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

function initializeDate() {
  // Set today's date as default
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  datePicker.value = formattedDate;
  currentDate = formattedDate;
  console.log('Initialized date to:', formattedDate);
}

function renderBookingGrid() {
  console.log('Rendering booking grid for date:', currentDate);
  bookingTbody.innerHTML = '';
  
  appData.timeSlots.forEach((timeSlot, timeIndex) => {
    const row = document.createElement('tr');
    
    // Time slot cell
    const timeCell = document.createElement('td');
    timeCell.className = 'time-slot';
    timeCell.textContent = timeSlot;
    row.appendChild(timeCell);
    
    // Facility cells
    appData.facilities.forEach((facility, facilityIndex) => {
      const cell = document.createElement('td');
      const slot = document.createElement('div');
      slot.className = 'slot';
      
      // Get booking status for this slot
      const booking = getBookingStatus(currentDate, timeSlot, facility);
      const slotStatus = getSlotStatus(timeSlot);
      
      // Set data attributes for filtering
      slot.dataset.sport = getSportType(facility);
      slot.dataset.facility = facility.toLowerCase();
      slot.dataset.timeSlot = timeSlot;
      slot.dataset.facilityIndex = facilityIndex.toString();
      
      if (slotStatus === 'past') {
        slot.classList.add('past');
        slot.textContent = 'Past';
        slot.dataset.booker = '';
      } else if (booking.booked) {
        slot.classList.add('booked');
        slot.textContent = `Booked: ${booking.bookerName}`;
        slot.dataset.booker = booking.bookerName.toLowerCase();
      } else {
        slot.classList.add('available');
        slot.textContent = 'Available';
        slot.dataset.booker = '';
        
        // Add click handler for available slots
        slot.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Slot clicked:', timeSlot, facility);
          openBookingModal(timeSlot, facility);
        });
      }
      
      cell.appendChild(slot);
      row.appendChild(cell);
    });
    
    bookingTbody.appendChild(row);
  });
  
  // Apply current filters
  applyFilters();
}

function getBookingStatus(date, timeSlot, facility) {
  // If we don't have data for this date and it's not the default date, generate some
  if (!appData.bookings[date] && date !== '2025-09-01') {
    console.log('Generating sample data for date:', date);
    appData.bookings[date] = generateSampleDataForDate(date);
  }
  
  const dateBookings = appData.bookings[date];
  if (dateBookings && dateBookings[timeSlot] && dateBookings[timeSlot][facility]) {
    return dateBookings[timeSlot][facility];
  }
  
  return { booked: false };
}

function getSlotStatus(timeSlot) {
  const [startTime] = timeSlot.split(' - ');
  const [hours, minutes] = startTime.split(':').map(Number);
  const slotTime = hours * 60 + minutes;
  
  const [currentHours, currentMinutes] = appData.currentTime.split(':').map(Number);
  const currentTimeMinutes = currentHours * 60 + currentMinutes;
  
  // Only check if it's the same date as today
  const today = new Date().toISOString().split('T')[0];
  if (currentDate === today) {
    return slotTime <= currentTimeMinutes ? 'past' : 'future';
  }
  
  return 'future';
}

function getSportType(facility) {
  if (facility.includes('Football')) return 'football';
  if (facility.includes('Volleyball')) return 'volleyball';
  if (facility.includes('Badminton')) return 'badminton';
  if (facility.includes('Pool')) return 'pool';
  return 'other';
}

function applyFilters() {
  const selectedSport = sportFilter.value;
  const searchTerm = searchInput.value.toLowerCase();
  console.log('Applying filters - Sport:', selectedSport, 'Search:', searchTerm);
  
  // Get all facility headers and their corresponding column indices
  const facilityHeaders = document.querySelectorAll('.facility-header');
  const rows = bookingTbody.querySelectorAll('tr');
  
  // Reset all visibility first
  facilityHeaders.forEach(header => {
    header.style.display = 'table-cell';
  });
  
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    cells.forEach(cell => {
      cell.style.display = 'table-cell';
      cell.style.opacity = '1';
      const slot = cell.querySelector('.slot');
      if (slot) {
        slot.style.pointerEvents = 'auto';
      }
    });
  });
  
  // Show/hide facility columns based on sport filter
  facilityHeaders.forEach((header, headerIndex) => {
    const headerSport = header.dataset.sport;
    const shouldShowColumn = selectedSport === 'all' || selectedSport === headerSport;
    
    if (!shouldShowColumn) {
      // Hide header
      header.style.display = 'none';
      
      // Hide corresponding cells in each row
      rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells[headerIndex + 1]) { // +1 because first cell is time slot
          cells[headerIndex + 1].style.display = 'none';
        }
      });
    }
  });
  
  // Apply search filter to visible slots
  if (searchTerm) {
    const allSlots = document.querySelectorAll('.slot');
    allSlots.forEach(slot => {
      const facilityMatch = slot.dataset.facility.includes(searchTerm);
      const bookerMatch = slot.dataset.booker.includes(searchTerm);
      const shouldHighlight = facilityMatch || bookerMatch;
      
      const parentCell = slot.parentElement;
      const isColumnVisible = parentCell.style.display !== 'none';
      
      if (!shouldHighlight && isColumnVisible) {
        parentCell.style.opacity = '0.3';
        slot.style.pointerEvents = 'none';
      }
    });
  }
}

function openBookingModal(timeSlot, facility) {
  console.log('Opening booking modal for:', timeSlot, facility);
  selectedSlot = { timeSlot, facility };
  bookingDetails.textContent = `You are booking ${facility} for ${timeSlot} on ${formatDate(currentDate)}.`;
  userNameInput.value = '';
  bookingModal.classList.remove('hidden');
  
  // Focus on the input after modal opens
  setTimeout(() => {
    userNameInput.focus();
  }, 100);
}

function closeModal() {
  console.log('Closing modal');
  bookingModal.classList.add('hidden');
  selectedSlot = null;
  userNameInput.value = '';
}

function handleBookingConfirm() {
  const userName = userNameInput.value.trim();
  console.log('Confirming booking for user:', userName);
  
  if (!userName) {
    alert('Please enter your name');
    userNameInput.focus();
    return;
  }
  
  if (selectedSlot) {
    // Create booking data structure if it doesn't exist
    if (!appData.bookings[currentDate]) {
      appData.bookings[currentDate] = {};
    }
    
    if (!appData.bookings[currentDate][selectedSlot.timeSlot]) {
      appData.bookings[currentDate][selectedSlot.timeSlot] = {};
    }
    
    // Book the slot
    appData.bookings[currentDate][selectedSlot.timeSlot][selectedSlot.facility] = {
      booked: true,
      bookerName: userName
    };
    
    console.log('Booking confirmed:', selectedSlot, 'for', userName);
    
    // Close modal and show success
    closeModal();
    showSuccessToast();
    
    // Re-render the grid
    renderBookingGrid();
  }
}

function showSuccessToast() {
  console.log('Showing success toast');
  successToast.classList.remove('hidden');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    successToast.classList.add('hidden');
  }, 3000);
}

function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Generate sample data for other dates to make the app more realistic
function generateSampleDataForDate(date) {
  const sampleNames = [
    'Amit Sharma', 'Priya Gupta', 'Rahul Singh', 'Sneha Patel', 'Arjun Reddy',
    'Kavya Jain', 'Vikram Kumar', 'Rohit Verma', 'Meera Shah', 'Deepika Nair'
  ];
  
  const dateBookings = {};
  
  appData.timeSlots.forEach(timeSlot => {
    dateBookings[timeSlot] = {};
    
    appData.facilities.forEach(facility => {
      // Randomly book some slots (25% probability for other dates)
      const isBooked = Math.random() < 0.25;
      
      if (isBooked) {
        const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        dateBookings[timeSlot][facility] = {
          booked: true,
          bookerName: randomName
        };
      } else {
        dateBookings[timeSlot][facility] = {
          booked: false
        };
      }
    });
  });
  
  return dateBookings;
}