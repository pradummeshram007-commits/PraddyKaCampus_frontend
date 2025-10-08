// SIU Nagpur Anonymous Feedback Portal - JavaScript (Fixed Version)

// Global variables
let currentFeedbackCount = 1247;
let weeklyFeedbackCount = 89;
let selectedRating = 0;
let feedbackChart = null;
let nextFeedbackId = 1248;

// Feedback categories with subcategories
const feedbackCategories = {
  academic: ["Course Content", "Teaching Methods", "Assessment", "Faculty Interaction", "Lab Sessions"],
  infrastructure: ["Classrooms", "Labs", "Wi-Fi", "Parking", "Maintenance", "Accessibility"],
  food: ["Mess Food Quality", "Hygiene", "Variety", "Timings", "Pricing", "Special Dietary Needs"],
  hostel: ["Room Conditions", "Common Areas", "Cleanliness", "Security", "Facilities", "Staff Behavior"],
  admin: ["Admission Process", "Document Processing", "Fee Collection", "Student Services", "Communication"],
  library: ["Book Availability", "Digital Access", "Study Spaces", "Staff Support", "Operating Hours"],
  sports: ["Sports Facilities", "Equipment", "Ground Maintenance", "Event Organization", "Coaching"],
  medical: ["Medical Staff", "Emergency Response", "Medicine Availability", "Health Programs", "Counseling"],
  it: ["Campus Wi-Fi", "Lab Computers", "Software", "Technical Help", "Online Platforms"],
  safety: ["Security Personnel", "CCTV Coverage", "Emergency Procedures", "Safety Measures", "Incident Response"],
  general: ["Overall Environment", "Student Life", "Events", "Communication", "Suggestions"]
};

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupModals();
    setupForms();
    setupStarRating();
    setupMobileMenu();
    setupScrollEffects();
    setupEmergencyFeedback();
    setupFAQ();
    setupCategorySelection();
    initializeAnalyticsChart();
    updateCounters();
    setupAutoSave();
}

// Navigation Setup
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            let targetSection = document.querySelector(targetId);
            
            // Handle special cases for navigation
            if (targetId === '#track-status') {
                targetSection = document.querySelector('#track-status');
            } else if (targetId === '#submit-feedback') {
                targetSection = document.querySelector('#submit-feedback');
            }
            
            if (targetSection) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const privacyBarHeight = document.querySelector('.privacy-bar').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - privacyBarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Brand logo click to go to home
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Update nav active state
            navLinks.forEach(l => l.classList.remove('active'));
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    const privacyBarHeight = document.querySelector('.privacy-bar').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + privacyBarHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Modal Setup
function setupModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal:not(.hidden)');
            activeModals.forEach(modal => closeModal(modal));
        }
    });
}

// Feedback Modal Functions
function showFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        openModal(modal);
        // Clear any emergency notices from previous sessions
        const existingNotice = modal.querySelector('.emergency-notice');
        if (existingNotice) {
            existingNotice.remove();
        }
    }
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedbackModal');
    if (modal) {
        closeModal(modal);
        resetFeedbackForm();
    }
}

// Quick Feedback Functions
function openQuickFeedback(category) {
    showFeedbackModal();
    
    // Pre-select the category
    setTimeout(() => {
        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.value = category;
            updateSubcategories(category);
        }
    }, 100);
}

// Generic Modal Functions
function openModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Force reflow to ensure the 'hidden' class is removed before adding 'active'
    modal.offsetHeight;
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

// Form Setup
function setupForms() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmission);
    }
    
    // Category change handler
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            updateSubcategories(this.value);
        });
    }
    
    // Character counter for feedback textarea
    const feedbackTextarea = document.getElementById('feedback');
    if (feedbackTextarea) {
        feedbackTextarea.addEventListener('input', updateCharacterCount);
    }
}

// Update Subcategories
function updateSubcategories(category) {
    const subcategoryGroup = document.getElementById('subcategoryGroup');
    const subcategorySelect = document.getElementById('subcategory');
    
    if (!subcategoryGroup || !subcategorySelect) return;
    
    if (category && feedbackCategories[category]) {
        subcategoryGroup.style.display = 'block';
        subcategorySelect.innerHTML = '<option value="">Select subcategory...</option>';
        
        feedbackCategories[category].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.toLowerCase().replace(/\s+/g, '-');
            option.textContent = sub;
            subcategorySelect.appendChild(option);
        });
    } else {
        subcategoryGroup.style.display = 'none';
        subcategorySelect.innerHTML = '';
    }
}

// Update Character Count
function updateCharacterCount() {
    const textarea = document.getElementById('feedback');
    const charCount = document.getElementById('charCount');
    
    if (textarea && charCount) {
        const currentLength = textarea.value.length;
        charCount.textContent = currentLength;
        
        if (currentLength > 800) {
            charCount.style.color = '#ff5459';
        } else if (currentLength > 600) {
            charCount.style.color = '#e68161';
        } else {
            charCount.style.color = '';
        }
    }
}

// Handle Feedback Form Submission
function handleFeedbackSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate required fields
    const category = formData.get('category');
    const feedback = formData.get('feedback');
    
    if (!category || !feedback.trim()) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (feedback.trim().length < 10) {
        showNotification('Please provide more detailed feedback (at least 10 characters).', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeFeedbackModal();
        const feedbackId = generateFeedbackId();
        showSuccessMessage(feedbackId);
        updateCounters();
        clearDraft();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Generate Feedback ID
function generateFeedbackId() {
    const year = new Date().getFullYear();
    const id = `FB-${year}-${String(nextFeedbackId).padStart(6, '0')}`;
    nextFeedbackId++;
    return id;
}

// Show Success Message
function showSuccessMessage(feedbackId) {
    const successPopup = document.getElementById('successMessage');
    const feedbackIdElement = document.getElementById('feedbackId');
    
    if (successPopup && feedbackIdElement) {
        feedbackIdElement.textContent = feedbackId;
        successPopup.classList.remove('hidden');
        successPopup.classList.add('active');
    }
}

// Close Success Message
function closeSuccessMessage() {
    const successPopup = document.getElementById('successMessage');
    if (successPopup) {
        successPopup.classList.remove('active');
        setTimeout(() => {
            successPopup.classList.add('hidden');
        }, 300);
    }
}

// Update Counters
function updateCounters() {
    currentFeedbackCount++;
    weeklyFeedbackCount++;
    
    const totalCounter = document.getElementById('totalFeedback');
    const weeklyCounter = document.getElementById('weeklyFeedback');
    
    if (totalCounter) {
        animateCounter(totalCounter, currentFeedbackCount);
    }
    
    if (weeklyCounter) {
        animateCounter(weeklyCounter, weeklyFeedbackCount);
    }
    
    // Update category counts (simulate)
    updateCategoryCounters();
}

// Animate Counter
function animateCounter(element, targetValue) {
    element.style.transform = 'scale(1.1)';
    element.style.color = '#C0C0C0';
    
    setTimeout(() => {
        element.textContent = targetValue;
        element.style.transform = 'scale(1)';
        element.style.color = '';
    }, 200);
}

// Update Category Counters
function updateCategoryCounters() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const countElement = card.querySelector('.category-count');
        if (countElement) {
            const currentCount = parseInt(countElement.textContent.match(/\d+/)[0]);
            const newCount = Math.random() > 0.7 ? currentCount + 1 : currentCount;
            countElement.textContent = `${newCount} this week`;
        }
    });
}

// Reset Feedback Form
function resetFeedbackForm() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.reset();
        resetStarRating();
        
        // Hide subcategory group
        const subcategoryGroup = document.getElementById('subcategoryGroup');
        if (subcategoryGroup) {
            subcategoryGroup.style.display = 'none';
        }
        
        // Reset character count
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = '';
        }
    }
}

// Star Rating Setup
function setupStarRating() {
    const starContainers = document.querySelectorAll('.star-rating');
    
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                selectedRating = index + 1;
                updateStarDisplay(stars, selectedRating);
            });
            
            star.addEventListener('mouseenter', function() {
                updateStarDisplay(stars, index + 1);
            });
        });
        
        container.addEventListener('mouseleave', function() {
            updateStarDisplay(stars, selectedRating);
        });
    });
}

// Update Star Display
function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Reset Star Rating
function resetStarRating() {
    selectedRating = 0;
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.classList.remove('active'));
}

// Category Selection Setup
function setupCategorySelection() {
    // Category cards are handled by onclick attributes in HTML
    // Additional click handlers for enhanced functionality
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (category) {
                openQuickFeedback(category);
            }
        });
    });
}

// Emergency Feedback Setup
function setupEmergencyFeedback() {
    const emergencyBtn = document.querySelector('.emergency-feedback-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEmergencyFeedback();
        });
    }
}

// Show Emergency Feedback
function showEmergencyFeedback() {
    showFeedbackModal();
    
    // Pre-select critical priority and show emergency notice
    setTimeout(() => {
        const prioritySelect = document.getElementById('priority');
        if (prioritySelect) {
            prioritySelect.value = 'critical';
        }
        
        // Add emergency notice
        const modalBody = document.querySelector('.modal-body');
        if (modalBody && !modalBody.querySelector('.emergency-notice')) {
            const emergencyNotice = document.createElement('div');
            emergencyNotice.className = 'emergency-notice';
            emergencyNotice.style.cssText = `
                background: rgba(255, 84, 89, 0.1);
                border: 1px solid rgba(255, 84, 89, 0.3);
                border-radius: 10px;
                padding: 1rem;
                margin-bottom: 1rem;
                text-align: center;
                color: #ff5459;
            `;
            emergencyNotice.innerHTML = '<strong>🚨 Emergency Feedback</strong><br>This will be prioritized for immediate attention within 24 hours.';
            
            const privacyNotice = modalBody.querySelector('.privacy-notice');
            if (privacyNotice) {
                modalBody.insertBefore(emergencyNotice, privacyNotice.nextSibling);
            } else {
                modalBody.insertBefore(emergencyNotice, modalBody.firstChild);
            }
        }
    }, 100);
}

// Feedback Tracking
function trackFeedback() {
    const trackingInput = document.getElementById('trackingId');
    const trackingResult = document.getElementById('trackingResult');
    
    if (!trackingInput || !trackingResult) return;
    
    const feedbackId = trackingInput.value.trim();
    
    if (!feedbackId) {
        showNotification('Please enter a feedback ID', 'error');
        return;
    }
    
    if (!feedbackId.match(/^FB-\d{4}-\d{6}$/)) {
        showNotification('Invalid feedback ID format. Expected format: FB-YYYY-XXXXXX', 'error');
        return;
    }
    
    // Show loading state
    trackingResult.innerHTML = '<div style="text-align: center; padding: 2rem; color: #D3D3D3;">🔍 Looking up feedback status...</div>';
    trackingResult.style.display = 'block';
    
    // Simulate tracking lookup
    setTimeout(() => {
        const mockStatuses = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];
        const randomStatus = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
        const submitDate = new Date();
        submitDate.setDate(submitDate.getDate() - Math.floor(Math.random() * 7));
        
        trackingResult.innerHTML = `
            <div class="tracking-info">
                <h4 style="color: #fff; margin-bottom: 1rem;">Feedback Status: ${feedbackId}</h4>
                <div class="status-timeline" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div class="status-step completed" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <span class="status-badge status-submitted">Submitted</span>
                        <span class="status-date" style="color: #999;">${submitDate.toLocaleDateString()}</span>
                    </div>
                    ${randomStatus !== 'Submitted' ? `
                    <div class="status-step ${randomStatus === 'Under Review' || randomStatus === 'In Progress' || randomStatus === 'Resolved' ? 'completed' : ''}" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <span class="status-badge status-review">Under Review</span>
                        <span class="status-date" style="color: #999;">${new Date(submitDate.getTime() + 86400000).toLocaleDateString()}</span>
                    </div>` : ''}
                    ${randomStatus === 'In Progress' || randomStatus === 'Resolved' ? `
                    <div class="status-step ${randomStatus === 'In Progress' || randomStatus === 'Resolved' ? 'completed' : ''}" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <span class="status-badge status-progress">In Progress</span>
                        <span class="status-date" style="color: #999;">${new Date(submitDate.getTime() + 172800000).toLocaleDateString()}</span>
                    </div>` : ''}
                    ${randomStatus === 'Resolved' ? `
                    <div class="status-step completed" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                        <span class="status-badge status-resolved">Resolved</span>
                        <span class="status-date" style="color: #999;">${new Date(submitDate.getTime() + 259200000).toLocaleDateString()}</span>
                    </div>` : ''}
                </div>
                <div class="tracking-details" style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
                    <p style="margin: 0.5rem 0; color: #D3D3D3;"><strong>Category:</strong> ${Math.random() > 0.5 ? 'Infrastructure & Facilities' : 'Academic Quality'}</p>
                    <p style="margin: 0.5rem 0; color: #D3D3D3;"><strong>Priority:</strong> ${Math.random() > 0.7 ? 'High' : 'Medium'}</p>
                    <p style="margin: 0.5rem 0; color: #D3D3D3;"><strong>Estimated Resolution:</strong> ${randomStatus === 'Resolved' ? 'Completed' : '2-3 business days'}</p>
                </div>
            </div>
        `;
    }, 1000);
}

// Analytics Chart Initialization
function initializeAnalyticsChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const data = {
        labels: ['Academic', 'Infrastructure', 'Food Services', 'IT Support', 'Hostel', 'Library', 'Sports', 'Medical', 'Admin'],
        datasets: [{
            data: [23, 18, 15, 12, 10, 8, 6, 4, 4],
            backgroundColor: [
                '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', 
                '#DB4545', '#D2BA4C', '#964325', '#944454'
            ],
            borderWidth: 0
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#D3D3D3',
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#2d2d2d',
                    titleColor: '#fff',
                    bodyColor: '#D3D3D3',
                    borderColor: '#666',
                    borderWidth: 1
                }
            }
        }
    };
    
    feedbackChart = new Chart(ctx, config);
}

// FAQ Setup
function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqQuestions.forEach(q => {
                const a = q.nextElementSibling;
                a.style.display = 'none';
                q.style.background = '';
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                this.style.background = '#1a1a1a';
            }
        });
    });
}

// Scroll Effects
function setupScrollEffects() {
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = '';
            navbar.style.backdropFilter = '';
        }
    });
    
    // Intersection Observer for animations
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
    
    // Observe cards for animation
    const cards = document.querySelectorAll('.category-card, .analytics-card, .guideline-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Utility Functions
function scrollToAnalytics() {
    const analyticsSection = document.getElementById('analytics');
    if (analyticsSection) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const privacyBarHeight = document.querySelector('.privacy-bar').offsetHeight;
        const targetPosition = analyticsSection.offsetTop - headerHeight - privacyBarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update nav active state
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(l => l.classList.remove('active'));
        const analyticsLink = document.querySelector('.nav-link[href="#analytics"]');
        if (analyticsLink) {
            analyticsLink.classList.add('active');
        }
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const bgColor = type === 'error' ? 'rgba(255, 84, 89, 0.2)' : 
                   type === 'success' ? 'rgba(31, 184, 205, 0.2)' : 
                   'rgba(192, 192, 192, 0.1)';
    
    const borderColor = type === 'error' ? 'rgba(255, 84, 89, 0.4)' : 
                       type === 'success' ? 'rgba(31, 184, 205, 0.4)' : 
                       'rgba(192, 192, 192, 0.3)';
    
    const textColor = type === 'error' ? '#ff5459' : 
                     type === 'success' ? '#1FB8CD' : 
                     '#D3D3D3';
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        backdrop-filter: blur(10px);
        color: ${textColor};
        padding: 1rem;
        border-radius: 10px;
        border: 1px solid ${borderColor};
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: ${textColor};
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0 0 0 1rem;
    `;
    
    closeBtn.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Auto remove
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Performance Optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Auto-save draft functionality (using sessionStorage as fallback)
function setupAutoSave() {
    const feedbackTextarea = document.getElementById('feedback');
    if (feedbackTextarea) {
        // Load saved draft
        const savedDraft = sessionStorage.getItem('feedback-draft');
        if (savedDraft) {
            feedbackTextarea.value = savedDraft;
            updateCharacterCount();
        }
        
        // Save draft as user types
        feedbackTextarea.addEventListener('input', debounce(function() {
            sessionStorage.setItem('feedback-draft', this.value);
        }, 1000));
    }
}

// Clear draft when form is submitted successfully
function clearDraft() {
    sessionStorage.removeItem('feedback-draft');
}

// Additional utility functions for enhanced interactivity
function handleKeyboardNavigation() {
    // Add keyboard navigation for better accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

// Initialize keyboard navigation
handleKeyboardNavigation();

// Make functions globally available for onclick handlers
window.showFeedbackModal = showFeedbackModal;
window.closeFeedbackModal = closeFeedbackModal;
window.openQuickFeedback = openQuickFeedback;
window.trackFeedback = trackFeedback;
window.scrollToAnalytics = scrollToAnalytics;
window.closeSuccessMessage = closeSuccessMessage;