// Application data
const appData = {
  categories: [
    {"name": "Electronics", "icon": "📱", "count": 23},
    {"name": "Books", "icon": "📚", "count": 15},
    {"name": "Accessories", "icon": "👜", "count": 18},
    {"name": "Clothing", "icon": "👔", "count": 12},
    {"name": "Keys", "icon": "🔑", "count": 8},
    {"name": "Jewelry", "icon": "💎", "count": 6},
    {"name": "Sports", "icon": "⚽", "count": 9},
    {"name": "Other", "icon": "📦", "count": 14}
  ],
  foundItems: [
    {
      "id": 1,
      "title": "iPhone 15 Pro Max",
      "category": "Electronics",
      "location": "Library Study Hall",
      "date": "2025-09-01",
      "description": "Space Black iPhone 15 Pro Max with clear case, small scratch on back corner",
      "image": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      "contactInfo": "Contact Security Office - Ext. 2334",
      "status": "Available"
    },
    {
      "id": 2,
      "title": "MacBook Air M2",
      "category": "Electronics",
      "location": "Computer Science Building",
      "date": "2025-08-30",
      "description": "13-inch MacBook Air M2, Silver, multiple stickers on lid",
      "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      "contactInfo": "IT Help Desk - Room 101",
      "status": "Available"
    },
    {
      "id": 3,
      "title": "Organic Chemistry Textbook",
      "category": "Books",
      "location": "Chemistry Lab 204",
      "date": "2025-09-02",
      "description": "Organic Chemistry 8th Edition by Wade, highlighted pages, name written inside",
      "image": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      "contactInfo": "Chemistry Department Office",
      "status": "Available"
    },
    {
      "id": 4,
      "title": "Ray-Ban Aviator Sunglasses",
      "category": "Accessories",
      "location": "Student Union Cafeteria",
      "date": "2025-08-28",
      "description": "Classic gold frame aviator sunglasses with case",
      "image": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      "contactInfo": "Student Services - Main Desk",
      "status": "Available"
    },
    {
      "id": 5,
      "title": "Apple AirPods Pro 2",
      "category": "Electronics",
      "location": "Gymnasium Locker Room",
      "date": "2025-09-01",
      "description": "White AirPods Pro 2nd generation in charging case",
      "image": "https://images.unsplash.com/photo-1606220838315-056192b5dc1a?w=400&h=300&fit=crop",
      "contactInfo": "Athletic Center Front Desk",
      "status": "Available"
    },
    {
      "id": 6,
      "title": "Michael Kors Watch",
      "category": "Jewelry",
      "location": "Engineering Building Restroom",
      "date": "2025-08-29",
      "description": "Gold-toned Michael Kors watch with leather strap",
      "image": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
      "contactInfo": "Building Security - Eng. Office",
      "status": "Available"
    },
    {
      "id": 7,
      "title": "Nike Backpack",
      "category": "Accessories",
      "location": "Mathematics Building Classroom",
      "date": "2025-09-02",
      "description": "Black Nike backpack with laptop compartment, contains notebooks",
      "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      "contactInfo": "Math Department Secretary",
      "status": "Available"
    },
    {
      "id": 8,
      "title": "Car Keys - Honda",
      "category": "Keys",
      "location": "Parking Lot C",
      "date": "2025-08-31",
      "description": "Honda key fob with gym membership keychain",
      "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      "contactInfo": "Campus Security Office",
      "status": "Available"
    },
    {
      "id": 9,
      "title": "North Face Jacket",
      "category": "Clothing",
      "location": "Dining Hall",
      "date": "2025-09-01",
      "description": "Black North Face puffer jacket, size Medium",
      "image": "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=400&h=300&fit=crop",
      "contactInfo": "Dining Services Manager",
      "status": "Available"
    },
    {
      "id": 10,
      "title": "Calculus Notebook",
      "category": "Books",
      "location": "Library Second Floor",
      "date": "2025-08-30",
      "description": "Spiral notebook with calculus notes, name on front cover",
      "image": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
      "contactInfo": "Library Information Desk",
      "status": "Available"
    }
  ]
};

// Application state
let currentFilter = 'all';
let currentSearchTerm = '';
let filteredItems = [...appData.foundItems];

// Utility functions
const showLoading = () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.remove('hidden');
  }
};

const hideLoading = () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('hidden');
  }
};

const showToast = (message) => {
  const successToast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (successToast && toastMessage) {
    toastMessage.textContent = message;
    successToast.classList.remove('hidden');
    successToast.classList.add('show');
    
    setTimeout(() => {
      successToast.classList.remove('show');
      setTimeout(() => {
        successToast.classList.add('hidden');
      }, 300);
    }, 3000);
  }
};

const showModal = (modal) => {
  if (modal) {
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
  }
};

const hideModal = (modal) => {
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 300);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Search and filter functions
const filterItems = () => {
  filteredItems = appData.foundItems.filter(item => {
    const matchesSearch = currentSearchTerm === '' || 
      item.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(currentSearchTerm.toLowerCase());
    
    const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  renderItems();
  updateItemsCount();
};

const updateItemsCount = () => {
  const itemsCount = document.getElementById('itemsCount');
  if (itemsCount) {
    const total = filteredItems.length;
    const category = currentFilter === 'all' ? 'items' : currentFilter.toLowerCase();
    itemsCount.textContent = `${total} ${category} found`;
  }
};

// Render functions
const renderCategories = () => {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;
  
  const categoriesHtml = appData.categories.map(category => `
    <div class="category-card" data-category="${category.name}">
      <span class="category-icon">${category.icon}</span>
      <div class="category-name">${category.name}</div>
      <div class="category-count">${category.count} items</div>
    </div>
  `).join('');
  
  categoriesGrid.innerHTML = categoriesHtml;
  
  // Add click handlers for category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      setFilter(category);
      
      // Scroll to items section
      const itemsSection = document.querySelector('.items-section');
      if (itemsSection) {
        itemsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
};

const renderItems = () => {
  const itemsGrid = document.getElementById('itemsGrid');
  if (!itemsGrid) return;
  
  if (filteredItems.length === 0) {
    itemsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
        <h3 style="color: var(--luxury-silver); margin-bottom: 1rem;">No items found</h3>
        <p style="color: var(--luxury-text-meta);">Try adjusting your search or filter criteria.</p>
      </div>
    `;
    return;
  }
  
  const itemsHtml = filteredItems.map((item, index) => `
    <div class="item-card" data-item-id="${item.id}" style="animation-delay: ${index * 0.1}s">
      <img src="${item.image}" alt="${item.title}" class="item-image" loading="lazy">
      <div class="item-content">
        <div class="item-category">${item.category}</div>
        <h3 class="item-title">${item.title}</h3>
        <div class="item-location">📍 ${item.location}</div>
        <div class="item-date">📅 ${formatDate(item.date)}</div>
        <div class="item-status">${item.status}</div>
      </div>
    </div>
  `).join('');
  
  itemsGrid.innerHTML = itemsHtml;
  
  // Add click handlers for item cards
  document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const itemId = parseInt(e.currentTarget.dataset.itemId);
      showItemDetails(itemId);
    });
  });
  
  // Add stagger animation
  document.querySelectorAll('.item-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
};

const setFilter = (filter) => {
  currentFilter = filter;
  
  // Update filter pills
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.classList.remove('active');
    if (pill.dataset.category === filter || (filter === 'all' && pill.dataset.category === 'all')) {
      pill.classList.add('active');
    }
  });
  
  filterItems();
};

const showItemDetails = (itemId) => {
  const item = appData.foundItems.find(i => i.id === itemId);
  if (!item) return;
  
  const itemModal = document.getElementById('itemModal');
  const itemModalTitle = document.getElementById('itemModalTitle');
  const itemDetailContent = document.getElementById('itemDetailContent');
  
  if (!itemModal || !itemModalTitle || !itemDetailContent) return;
  
  itemModalTitle.textContent = item.title;
  
  const detailsHtml = `
    <img src="${item.image}" alt="${item.title}" class="item-detail-image">
    <div class="item-detail-info">
      <div class="detail-row">
        <span class="detail-label">Category:</span>
        <span class="detail-value">${item.category}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Location Found:</span>
        <span class="detail-value">${item.location}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Date Found:</span>
        <span class="detail-value">${formatDate(item.date)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Status:</span>
        <span class="detail-value">${item.status}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Description:</span>
        <span class="detail-value">${item.description}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Contact Info:</span>
        <span class="detail-value">${item.contactInfo}</span>
      </div>
    </div>
    <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(192, 192, 192, 0.1);">
      <h4 style="color: var(--luxury-white); margin-bottom: 1rem;">How to Claim This Item:</h4>
      <ol style="color: var(--luxury-text-secondary); line-height: 1.6;">
        <li>Contact the office listed above during business hours</li>
        <li>Provide valid student ID and proof of ownership</li>
        <li>Describe the item in detail to verify it's yours</li>
        <li>Items are held for 30 days before donation</li>
      </ol>
    </div>
  `;
  
  itemDetailContent.innerHTML = detailsHtml;
  showModal(itemModal);
};

// Form handlers
const handleReportSubmission = (e) => {
  e.preventDefault();
  showLoading();
  
  // Get form data
  const formData = {
    itemName: document.getElementById('itemName')?.value,
    category: document.getElementById('itemCategory')?.value,
    description: document.getElementById('itemDescription')?.value,
    location: document.getElementById('itemLocation')?.value,
    date: document.getElementById('itemDate')?.value,
    email: document.getElementById('contactEmail')?.value,
    phone: document.getElementById('contactPhone')?.value
  };
  
  // Validate required fields
  if (!formData.itemName || !formData.category || !formData.description || 
      !formData.location || !formData.date || !formData.email) {
    hideLoading();
    showToast('Please fill in all required fields');
    return;
  }
  
  // Simulate API call
  setTimeout(() => {
    hideLoading();
    const reportModal = document.getElementById('reportModal');
    hideModal(reportModal);
    showToast('Lost item report submitted successfully!');
    
    // Reset form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
      reportForm.reset();
    }
  }, 1500);
};

const handleLoginSubmission = (e) => {
  e.preventDefault();
  showLoading();
  
  const email = document.getElementById('loginEmail')?.value;
  const password = document.getElementById('loginPassword')?.value;
  
  if (!email || !password) {
    hideLoading();
    showToast('Please enter both email and password');
    return;
  }
  
  // Simulate login
  setTimeout(() => {
    hideLoading();
    const loginModal = document.getElementById('loginModal');
    hideModal(loginModal);
    showToast('Welcome back! Login successful.');
    
    // Reset form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.reset();
    }
  }, 1000);
};

// Event listeners
const setupEventListeners = () => {
  // Navigation
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const profileBtn = document.getElementById('profileBtn');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('show');
    });
  }
  
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      const loginModal = document.getElementById('loginModal');
      showModal(loginModal);
    });
  }
  
  // Close mobile menu when clicking menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileMenu) {
        mobileMenu.classList.remove('show');
      }
      
      const target = item.getAttribute('href');
      if (target && target !== '#') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Hero section
  const reportLostBtn = document.getElementById('reportLostBtn');
  const browseFoundBtn = document.getElementById('browseFoundBtn');
  
  if (reportLostBtn) {
    reportLostBtn.addEventListener('click', () => {
      const reportModal = document.getElementById('reportModal');
      showModal(reportModal);
    });
  }
  
  if (browseFoundBtn) {
    browseFoundBtn.addEventListener('click', () => {
      const itemsSection = document.querySelector('.items-section');
      if (itemsSection) {
        itemsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Search functionality
  const heroSearch = document.getElementById('heroSearch');
  const searchBtn = document.getElementById('searchBtn');
  
  if (heroSearch) {
    heroSearch.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      filterItems();
    });
    
    heroSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        filterItems();
        const itemsSection = document.querySelector('.items-section');
        if (itemsSection) {
          itemsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      filterItems();
      const itemsSection = document.querySelector('.items-section');
      if (itemsSection) {
        itemsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // Filter pills
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const category = pill.dataset.category;
      setFilter(category);
    });
  });
  
  // Modal close handlers
  const closeReportModal = document.getElementById('closeReportModal');
  const closeItemModal = document.getElementById('closeItemModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const cancelReport = document.getElementById('cancelReport');
  
  if (closeReportModal) {
    closeReportModal.addEventListener('click', () => {
      const reportModal = document.getElementById('reportModal');
      hideModal(reportModal);
    });
  }
  
  if (closeItemModal) {
    closeItemModal.addEventListener('click', () => {
      const itemModal = document.getElementById('itemModal');
      hideModal(itemModal);
    });
  }
  
  if (closeLoginModal) {
    closeLoginModal.addEventListener('click', () => {
      const loginModal = document.getElementById('loginModal');
      hideModal(loginModal);
    });
  }
  
  if (cancelReport) {
    cancelReport.addEventListener('click', () => {
      const reportModal = document.getElementById('reportModal');
      hideModal(reportModal);
    });
  }
  
  // Modal backdrop clicks
  const modalBackdrop = document.getElementById('modalBackdrop');
  const itemModalBackdrop = document.getElementById('itemModalBackdrop');
  const loginModalBackdrop = document.getElementById('loginModalBackdrop');
  
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', () => {
      const reportModal = document.getElementById('reportModal');
      hideModal(reportModal);
    });
  }
  
  if (itemModalBackdrop) {
    itemModalBackdrop.addEventListener('click', () => {
      const itemModal = document.getElementById('itemModal');
      hideModal(itemModal);
    });
  }
  
  if (loginModalBackdrop) {
    loginModalBackdrop.addEventListener('click', () => {
      const loginModal = document.getElementById('loginModal');
      hideModal(loginModal);
    });
  }
  
  // Form submissions
  const reportForm = document.getElementById('reportForm');
  const loginForm = document.getElementById('loginForm');
  const switchToRegister = document.getElementById('switchToRegister');
  
  if (reportForm) {
    reportForm.addEventListener('submit', handleReportSubmission);
  }
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLoginSubmission);
  }
  
  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Registration feature coming soon!');
    });
  }
  
  // Escape key to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const reportModal = document.getElementById('reportModal');
      const itemModal = document.getElementById('itemModal');
      const loginModal = document.getElementById('loginModal');
      
      if (reportModal && !reportModal.classList.contains('hidden')) {
        hideModal(reportModal);
      }
      if (itemModal && !itemModal.classList.contains('hidden')) {
        hideModal(itemModal);
      }
      if (loginModal && !loginModal.classList.contains('hidden')) {
        hideModal(loginModal);
      }
      if (mobileMenu && mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
      }
    }
  });
};

// Scroll effects
const setupScrollEffects = () => {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
      // Add/remove glass effect based on scroll
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
      }
    }
    
    lastScrollY = currentScrollY;
  });
};

// Initialize application
const init = () => {
  showLoading();
  
  setTimeout(() => {
    renderCategories();
    renderItems();
    updateItemsCount();
    setupEventListeners();
    setupScrollEffects();
    hideLoading();
    
    // Set today's date as max for date input
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('itemDate');
    if (dateInput) {
      dateInput.setAttribute('max', today);
    }
  }, 500);
};

// Start the application
document.addEventListener('DOMContentLoaded', init);

// Add some luxury sound effects (optional)
const playClickSound = () => {
  // Create a subtle click sound using Web Audio API
  if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
    try {
      const audioContext = new (AudioContext || webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Audio context not available or blocked
    }
  }
};

// Add click sound to buttons
document.addEventListener('click', (e) => {
  if (e.target.matches('button, .btn, .filter-pill, .category-card, .item-card')) {
    playClickSound();
  }
});

// Advanced interactions
const setupAdvancedInteractions = () => {
  // Parallax effect for hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.2;
    
    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
  
  // Add magnetic effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) scale(1)';
    });
  });
};

// Initialize advanced interactions after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(setupAdvancedInteractions, 1000);
});