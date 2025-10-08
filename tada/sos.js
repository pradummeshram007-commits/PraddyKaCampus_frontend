// Emergency SOS Page JavaScript
class EmergencySOSApp {
    constructor() {
        this.init();
    }

    init() {
        this.updateDateTime();
        this.startDateTimeInterval();
        this.setupEventListeners();
        this.enhanceAccessibility();
        this.setupServiceWorker();
    }

    // Update current date and time
    updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Asia/Kolkata'
        };
        
        const formattedDateTime = now.toLocaleDateString('en-IN', options);
        const dateTimeElement = document.getElementById('currentDateTime');
        
        if (dateTimeElement) {
            dateTimeElement.textContent = formattedDateTime;
        }
    }

    // Start interval for real-time updates
    startDateTimeInterval() {
        // Update every second
        setInterval(() => {
            this.updateDateTime();
        }, 1000);
    }

    // Setup event listeners
    setupEventListeners() {
        // Add click tracking for emergency calls
        const emergencyButtons = document.querySelectorAll('.emergency-btn, .contact-btn');
        emergencyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleEmergencyCall(e);
            });
        });

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Add service card hover effects
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.highlightCard(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.unhighlightCard(card);
            });
        });

        // Add emergency button special effects
        const primaryEmergencyBtn = document.querySelector('.emergency-btn.primary');
        if (primaryEmergencyBtn) {
            primaryEmergencyBtn.addEventListener('mouseenter', () => {
                this.pulseEmergencyButton(primaryEmergencyBtn);
            });
        }

        // Handle window resize for responsive adjustments
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Add offline detection
        window.addEventListener('online', () => {
            this.showConnectionStatus('online');
        });

        window.addEventListener('offline', () => {
            this.showConnectionStatus('offline');
        });
    }

    // Handle emergency call clicks
    handleEmergencyCall(event) {
        const button = event.currentTarget;
        const phoneNumber = button.href.replace('tel:', '');
        
        // Add visual feedback
        this.addCallFeedback(button);
        
        // Log the emergency call attempt (for analytics)
        this.logEmergencyCall(phoneNumber);
        
        // Show confirmation for critical numbers
        if (this.isCriticalNumber(phoneNumber)) {
            const confirmed = confirm(`Calling ${phoneNumber}. This will dial emergency services. Continue?`);
            if (!confirmed) {
                event.preventDefault();
                return false;
            }
        }
        
        // For non-mobile devices, show phone number
        if (!this.isMobileDevice()) {
            alert(`Please call: ${phoneNumber}`);
            event.preventDefault();
            return false;
        }
    }

    // Add visual feedback when calling
    addCallFeedback(button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // Check if number is critical emergency number
    isCriticalNumber(phoneNumber) {
        const criticalNumbers = ['112', '100', '101', '102', '108'];
        return criticalNumbers.includes(phoneNumber);
    }

    // Detect mobile device
    isMobileDevice() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Handle keyboard navigation
    handleKeyboardNavigation(event) {
        // Quick dial with number keys
        const keyMap = {
            '1': 'tel:112',
            '2': 'tel:100',
            '3': 'tel:101',
            '4': 'tel:102',
            '5': 'tel:108'
        };

        if (keyMap[event.key]) {
            event.preventDefault();
            const emergencyBtn = document.querySelector(`a[href="${keyMap[event.key]}"]`);
            if (emergencyBtn) {
                emergencyBtn.click();
            }
        }

        // ESC key for quick access to primary emergency
        if (event.key === 'Escape') {
            event.preventDefault();
            const primaryBtn = document.querySelector('.emergency-btn.primary');
            if (primaryBtn) {
                primaryBtn.focus();
            }
        }
    }

    // Highlight service card
    highlightCard(card) {
        card.style.boxShadow = '0 12px 40px rgba(192, 192, 192, 0.15)';
        card.style.borderColor = '#C0C0C0';
    }

    // Remove card highlight
    unhighlightCard(card) {
        card.style.boxShadow = '';
        card.style.borderColor = '';
    }

    // Pulse emergency button
    pulseEmergencyButton(button) {
        button.style.animation = 'pulse 1.5s infinite';
    }

    // Handle window resize
    handleResize() {
        // Adjust layout for very small screens
        const screenWidth = window.innerWidth;
        const quickDial = document.querySelector('.quick-dial');
        
        if (screenWidth < 400 && quickDial) {
            quickDial.style.gridTemplateColumns = '1fr 1fr';
        } else if (screenWidth < 600 && quickDial) {
            quickDial.style.gridTemplateColumns = 'repeat(3, 1fr)';
        }
    }

    // Show connection status
    showConnectionStatus(status) {
        const existingAlert = document.querySelector('.connection-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = 'connection-alert';
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        if (status === 'offline') {
            alert.textContent = '⚠️ No Internet Connection - Emergency numbers still work';
            alert.style.background = '#FF4444';
            alert.style.color = 'white';
        } else {
            alert.textContent = '✅ Connection Restored';
            alert.style.background = '#00FF88';
            alert.style.color = 'black';
        }

        document.body.appendChild(alert);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    // Log emergency call for analytics
    logEmergencyCall(phoneNumber) {
        const logData = {
            number: phoneNumber,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            location: 'SIU Nagpur Campus'
        };

        // Store in localStorage for offline capability
        try {
            const logs = JSON.parse(localStorage.getItem('emergencyLogs') || '[]');
            logs.push(logData);
            
            // Keep only last 50 logs
            if (logs.length > 50) {
                logs.splice(0, logs.length - 50);
            }
            
            localStorage.setItem('emergencyLogs', JSON.stringify(logs));
        } catch (error) {
            console.warn('Could not log emergency call:', error);
        }
    }

    // Enhance accessibility
    enhanceAccessibility() {
        // Add ARIA labels to emergency buttons
        const emergencyButtons = document.querySelectorAll('.emergency-btn');
        emergencyButtons.forEach(button => {
            const number = button.querySelector('span').textContent;
            const service = button.querySelector('small').textContent;
            button.setAttribute('aria-label', `Emergency dial ${number} for ${service}`);
        });

        // Add focus indicators
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '3px solid #C0C0C0';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = '';
                element.style.outlineOffset = '';
            });
        });

        // Add skip navigation
        this.addSkipNavigation();
    }

    // Add skip navigation for accessibility
    addSkipNavigation() {
        const skipNav = document.createElement('a');
        skipNav.href = '#emergency-quick';
        skipNav.textContent = 'Skip to Emergency Numbers';
        skipNav.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipNav.addEventListener('focus', () => {
            skipNav.style.top = '6px';
        });
        
        skipNav.addEventListener('blur', () => {
            skipNav.style.top = '-40px';
        });

        document.body.insertBefore(skipNav, document.body.firstChild);

        // Add ID to emergency section
        const emergencySection = document.querySelector('.emergency-quick');
        if (emergencySection) {
            emergencySection.id = 'emergency-quick';
        }
    }

    // Setup service worker for offline capability
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Register service worker for offline functionality
            navigator.serviceWorker.register('/sw.js').catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        }
    }

    // Utility function to copy text to clipboard
    copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            return new Promise((resolve, reject) => {
                document.execCommand('copy') ? resolve() : reject();
                textArea.remove();
            });
        }
    }

    // Add copy functionality to phone numbers
    addCopyFunctionality() {
        const contactButtons = document.querySelectorAll('.contact-btn');
        contactButtons.forEach(button => {
            // Add double-click to copy
            button.addEventListener('dblclick', (e) => {
                e.preventDefault();
                const phoneNumber = button.href.replace('tel:', '');
                this.copyToClipboard(phoneNumber).then(() => {
                    this.showCopyConfirmation(button);
                }).catch(() => {
                    console.warn('Could not copy phone number');
                });
            });
        });
    }

    // Show copy confirmation
    showCopyConfirmation(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.background = '#00FF88';
        button.style.color = 'black';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }
}

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(255, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(255, 68, 68, 0); }
    }
    
    .connection-alert {
        animation: slideInRight 0.3s ease;
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new EmergencySOSApp();
    
    // Add copy functionality after initialization
    setTimeout(() => {
        app.addCopyFunctionality();
    }, 1000);
    
    // Add initial instructions for keyboard shortcuts
    console.log(`
    🚨 SIU Nagpur Emergency SOS - Keyboard Shortcuts:
    Press 1: Call 112 (Universal Emergency)
    Press 2: Call 100 (Police)
    Press 3: Call 101 (Fire)
    Press 4: Call 102 (Ambulance)
    Press 5: Call 108 (State Ambulance)
    Press ESC: Focus on primary emergency button
    Double-click any phone number to copy it
    `);
});

// Export for potential external use
window.EmergencySOSApp = EmergencySOSApp;