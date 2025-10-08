// Ultra-Premium StudenTrade JavaScript

// Application data
const appData = {
  "items": [
    {
      "id": 1,
      "title": "MacBook Air M1 - Excellent Condition",
      "price": "₹45,000",
      "originalPrice": "₹92,900",
      "seller": "Arjun Mehta",
      "rating": "4.9",
      "condition": "Excellent",
      "location": "Near Campus",
      "posted": "2 hours ago",
      "image": "💻",
      "category": "electronics"
    },
    {
      "id": 2,
      "title": "Advanced Calculus Mathematics Textbook",
      "price": "₹800",
      "originalPrice": "₹2,500",
      "seller": "Priya Sharma",
      "rating": "4.8",
      "condition": "Good",
      "location": "Girls Hostel B",
      "posted": "5 hours ago",
      "image": "textbook",
      "category": "books"
    },
    {
      "id": 3,
      "title": "Casio FX-991ES Scientific Calculator",
      "price": "₹1,200",
      "originalPrice": "₹1,800",
      "seller": "Rahul Kumar",
      "rating": "5.0",
      "condition": "Like New",
      "location": "Hostel Block A",
      "posted": "1 day ago",
      "image": "calculator",
      "category": "electronics"
    },
    {
      "id": 4,
      "title": "Gaming Chair - Ergonomic Design",
      "price": "₹8,500",
      "originalPrice": "₹15,000",
      "seller": "Amit Singh",
      "rating": "4.7",
      "condition": "Good",
      "location": "Off Campus",
      "posted": "2 days ago",
      "image": "🪑",
      "category": "furniture"
    },
    {
      "id": 5,
      "title": "iPhone 13 Pro - Pristine Condition",
      "price": "₹65,000",
      "originalPrice": "₹1,19,900",
      "seller": "Kavya Patel",
      "rating": "4.9",
      "condition": "Excellent",
      "location": "Tech Park Campus",
      "posted": "3 hours ago",
      "image": "📱",
      "category": "electronics"
    },
    {
      "id": 6,
      "title": "Organic Chemistry Textbook Set",
      "price": "₹1,500",
      "originalPrice": "₹4,200",
      "seller": "Rohan Gupta",
      "rating": "4.6",
      "condition": "Good",
      "location": "Science Block",
      "posted": "1 day ago",
      "image": "⚗️",
      "category": "books"
    }
  ],
  "categories": [
    {
      "name": "books",
      "displayName": "Books & Study Materials",
      "icon": "📚",
      "count": "147"
    },
    {
      "name": "electronics",
      "displayName": "Electronics & Gadgets", 
      "icon": "💻",
      "count": "126"
    },
    {
      "name": "furniture",
      "displayName": "Room & Furniture",
      "icon": "🛏️",
      "count": "98"
    },
    {
      "name": "sports",
      "displayName": "Sports & Recreation",
      "icon": "🏀",
      "count": "84"
    },
    {
      "name": "creative",
      "displayName": "Creative & Art Supplies",
      "icon": "🎨",
      "count": "67"
    },
    {
      "name": "services",
      "displayName": "Services & Tutoring",
      "icon": "🎓",
      "count": "132"
    }
  ],
  "features": [
    {
      "icon": "🛡️",
      "title": "Verified Security",
      "description": "End-to-end encrypted transactions with comprehensive buyer protection and advanced fraud prevention systems."
    },
    {
      "icon": "✅",
      "title": "Premium Verification",
      "description": "All users verified through institutional email, student ID, and multi-factor identity verification processes."
    },
    {
      "icon": "⚡",
      "title": "Lightning Delivery",
      "description": "Express campus-wide delivery within 2 hours with real-time tracking and professional white-glove service."
    },
    {
      "icon": "💎",
      "title": "Concierge Support",
      "description": "24/7 premium customer support with dedicated account managers and instant dispute resolution services."
    }
  ],
  "steps": [
    {
      "number": 1,
      "title": "Discover",
      "description": "Browse through our curated luxury marketplace or use intelligent AI-powered search to find exactly what you need."
    },
    {
      "number": 2,
      "title": "Connect", 
      "description": "Message verified premium sellers directly through our secure encrypted platform with built-in verification."
    },
    {
      "number": 3,
      "title": "Transact",
      "description": "Complete your purchase with our premium payment protection and choose express delivery or white-glove campus pickup."
    },
    {
      "number": 4,
      "title": "Review",
      "description": "Rate your luxury experience and help build our exclusive community of verified student entrepreneurs."
    }
  ]
};

// Current filter state
let currentFilter = 'all';

// Image mapping for real product images
const getProductImage = (imageKey) => {
  const imageMap = {
    'textbook': `
      <div style="
        background: linear-gradient(145deg, #2A2A2A 0%, #404040 100%);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      ">
        <div style="
          background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%);
          width: 80%;
          height: 85%;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 2px solid #555555;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        ">
          <div style="
            font-size: 2.5rem;
            margin-bottom: 8px;
            color: #C0C0C0;
          ">📖</div>
          <div style="
            color: #E8E8E8;
            font-size: 0.9rem;
            font-weight: 600;
            text-align: center;
            padding: 0 12px;
            line-height: 1.3;
          ">ADVANCED<br>CALCULUS</div>
        </div>
      </div>
    `,
    'calculator': `
      <div style="
        background: linear-gradient(145deg, #2A2A2A 0%, #404040 100%);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          width: 75%;
          height: 80%;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          border: 2px solid #555555;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          padding: 12px;
        ">
          <div style="
            background: #0A0A0A;
            height: 25%;
            border-radius: 4px;
            margin-bottom: 8px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            padding: 4px 8px;
            border: 1px solid #333333;
          ">
            <span style="color: #00FF00; font-family: monospace; font-size: 0.8rem;">CASIO</span>
          </div>
          <div style="
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 3px;
            flex: 1;
          ">
            ${Array.from({length: 16}, () => `
              <div style="
                background: #333333;
                border-radius: 3px;
                border: 1px solid #555555;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.6rem;
                color: #C0C0C0;
              "></div>
            `).join('')}
          </div>
        </div>
      </div>
    `,
    default: (emoji) => `
      <div style="
        background: linear-gradient(145deg, #2A2A2A 0%, #404040 100%);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4rem;
        position: relative;
      ">
        <div style="
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
        ">${emoji}</div>
      </div>
    `
  };

  return imageMap[imageKey] || imageMap.default(imageKey);
};

// Render categories
function renderCategories() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = appData.categories.map(category => `
    <div class="category-card" data-category="${category.name}">
      <div class="category-icon">${category.icon}</div>
      <h3 class="category-name">${category.displayName}</h3>
      <p class="category-count">${category.count} items</p>
    </div>
  `).join('');

  // Add click event listeners to category cards
  categoriesGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const categoryName = this.getAttribute('data-category');
      filterByCategory(categoryName);
    });
  });
}

// Render features
function renderFeatures() {
  const featuresGrid = document.getElementById('featuresGrid');
  if (!featuresGrid) return;

  featuresGrid.innerHTML = appData.features.map(feature => `
    <div class="feature-card">
      <div class="feature-icon">${feature.icon}</div>
      <h3 class="feature-title">${feature.title}</h3>
      <p class="feature-description">${feature.description}</p>
    </div>
  `).join('');
}

// Render products
function renderProducts(items = appData.items) {
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  productsGrid.innerHTML = items.map(item => `
    <div class="product-card" data-product-id="${item.id}">
      <div class="product-image">
        ${getProductImage(item.image)}
      </div>
      <div class="product-content">
        <h3 class="product-title">${item.title}</h3>
        <div class="product-prices">
          <span class="product-price">${item.price}</span>
          <span class="product-original-price">${item.originalPrice}</span>
        </div>
        <div class="product-meta">
          <span class="product-seller">${item.seller}</span>
          <div class="product-rating">
            <span>⭐</span>
            <span>${item.rating}</span>
          </div>
        </div>
        <div class="product-details">
          <span>${item.condition}</span>
          <span>${item.location}</span>
          <span>${item.posted}</span>
        </div>
      </div>
    </div>
  `).join('');

  // Add click event listeners to product cards
  productsGrid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
      const productId = parseInt(this.getAttribute('data-product-id'));
      viewProduct(productId);
    });
  });
}

// Render steps
function renderSteps() {
  const stepsGrid = document.getElementById('stepsGrid');
  if (!stepsGrid) return;

  stepsGrid.innerHTML = appData.steps.map(step => `
    <div class="step-card">
      <div class="step-number">${step.number}</div>
      <h3 class="step-title">${step.title}</h3>
      <p class="step-description">${step.description}</p>
    </div>
  `).join('');
}

// Enhanced search functionality
function initializeSearch() {
  const searchInput = document.querySelector('.premium-search');
  const searchBtn = document.querySelector('.search-btn');
  
  if (!searchInput || !searchBtn) return;

  let searchTimeout;

  // Fix search input visibility and functionality
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      performSearch(e.target.value);
    }, 300);
  });

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    performSearch(searchInput.value);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(searchInput.value);
    }
  });
}

// Perform search with luxury animations
function performSearch(query) {
  currentFilter = 'search';
  
  if (!query.trim()) {
    currentFilter = 'all';
    renderProducts();
    showLuxuryNotification('Showing all items');
    return;
  }

  const filteredItems = appData.items.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.seller.toLowerCase().includes(query.toLowerCase())
  );

  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  // Add fade out effect
  productsGrid.style.opacity = '0.5';
  productsGrid.style.transform = 'translateY(10px)';

  setTimeout(() => {
    if (filteredItems.length === 0) {
      productsGrid.innerHTML = `
        <div style="
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: var(--luxury-silver);
          font-size: var(--font-size-xl);
        ">
          <div style="font-size: 4rem; margin-bottom: 20px;">🔍</div>
          <h3>No luxury items found</h3>
          <p>Try refining your search terms or <button onclick="clearSearch()" style="color: var(--luxury-silver); text-decoration: underline; background: none; border: none; cursor: pointer;">view all items</button></p>
        </div>
      `;
      showLuxuryNotification(`No results found for "${query}"`);
    } else {
      renderProducts(filteredItems);
      showLuxuryNotification(`Found ${filteredItems.length} items for "${query}"`);
    }

    // Fade back in
    productsGrid.style.opacity = '1';
    productsGrid.style.transform = 'translateY(0)';
  }, 150);
}

// Clear search function
function clearSearch() {
  const searchInput = document.querySelector('.premium-search');
  if (searchInput) {
    searchInput.value = '';
  }
  currentFilter = 'all';
  renderProducts();
  showLuxuryNotification('Showing all items');
}

// Filter by category
function filterByCategory(categoryName) {
  currentFilter = categoryName;
  
  const filteredItems = appData.items.filter(item => item.category === categoryName);
  const categoryInfo = appData.categories.find(cat => cat.name === categoryName);
  
  const productsGrid = document.getElementById('productsGrid');
  if (!productsGrid) return;

  // Add luxury transition effect
  productsGrid.style.opacity = '0.5';
  productsGrid.style.transform = 'translateY(10px)';

  setTimeout(() => {
    if (filteredItems.length === 0) {
      productsGrid.innerHTML = `
        <div style="
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: var(--luxury-silver);
          font-size: var(--font-size-xl);
        ">
          <div style="font-size: 4rem; margin-bottom: 20px;">${categoryInfo ? categoryInfo.icon : '📦'}</div>
          <h3>No items in this category</h3>
          <p><button onclick="clearSearch()" style="color: var(--luxury-silver); text-decoration: underline; background: none; border: none; cursor: pointer;">View all items</button></p>
        </div>
      `;
    } else {
      renderProducts(filteredItems);
    }

    // Fade back in
    productsGrid.style.opacity = '1';
    productsGrid.style.transform = 'translateY(0)';
  }, 150);

  // Show notification and scroll to products
  showLuxuryNotification(`Showing ${categoryInfo ? categoryInfo.displayName : 'category'} (${filteredItems.length} items)`);
  
  setTimeout(() => {
    document.querySelector('.products-section').scrollIntoView({
      behavior: 'smooth'
    });
  }, 200);
}

// View individual product
function viewProduct(productId) {
  const product = appData.items.find(item => item.id === productId);
  if (!product) return;

  showLuxuryNotification(`Viewing ${product.title}`, 'premium');
}

// Luxury notification system
function showLuxuryNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1A1A1A 0%, #333333 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    border: 1px solid #555555;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    z-index: 10000;
    font-weight: 500;
    font-size: 14px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Enhanced scroll effects
function initializeScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all cards for scroll animations
  setTimeout(() => {
    document.querySelectorAll('.category-card, .feature-card, .product-card, .step-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(card);
    });
  }, 100);
}

// Enhanced luxury interactions
function initializeLuxuryInteractions() {
  // Add ripple effect to buttons
  document.querySelectorAll('.btn-luxury').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      showLuxuryNotification('Premium membership coming soon!');
    });
  });

  // Add CSS for ripple animation if not exists
  if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Handle navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const linkText = this.textContent;
      showLuxuryNotification(`${linkText} section coming soon!`);
    });
  });
}

// Initialize premium loading effect
function initializePremiumLoader() {
  const sections = ['categoriesGrid', 'featuresGrid', 'productsGrid', 'stepsGrid'];
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize premium loader
  initializePremiumLoader();
  
  // Render all content with staggered animations
  setTimeout(() => {
    renderCategories();
    setTimeout(() => {
      const categoriesGrid = document.getElementById('categoriesGrid');
      if (categoriesGrid) {
        categoriesGrid.style.opacity = '1';
        categoriesGrid.style.transform = 'translateY(0)';
      }
    }, 100);
  }, 200);

  setTimeout(() => {
    renderFeatures();
    setTimeout(() => {
      const featuresGrid = document.getElementById('featuresGrid');
      if (featuresGrid) {
        featuresGrid.style.opacity = '1';
        featuresGrid.style.transform = 'translateY(0)';
      }
    }, 100);
  }, 400);

  setTimeout(() => {
    renderProducts();
    setTimeout(() => {
      const productsGrid = document.getElementById('productsGrid');
      if (productsGrid) {
        productsGrid.style.opacity = '1';
        productsGrid.style.transform = 'translateY(0)';
      }
    }, 100);
  }, 600);

  setTimeout(() => {
    renderSteps();
    setTimeout(() => {
      const stepsGrid = document.getElementById('stepsGrid');
      if (stepsGrid) {
        stepsGrid.style.opacity = '1';
        stepsGrid.style.transform = 'translateY(0)';
      }
    }, 100);
  }, 800);

  // Initialize all functionality
  setTimeout(() => {
    initializeSearch();
    initializeScrollEffects();
    initializeLuxuryInteractions();
    
    // Show welcome notification
    showLuxuryNotification('Welcome to the Ultimate Student Marketplace', 'premium');
  }, 1000);
});

// Smooth scrolling for navigation
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});

// Add premium page visibility effects
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    // Subtle re-animation when page becomes visible
    document.querySelectorAll('.luxury-logo').forEach(logo => {
      logo.style.animation = 'none';
      logo.offsetHeight; // Trigger reflow
      logo.style.animation = 'shimmer 2s ease-in-out';
    });
  }
});