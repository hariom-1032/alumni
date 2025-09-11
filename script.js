// Profile picture upload functionality
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Tab switching functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Add education functionality
function addEducation() {
    const educationList = document.getElementById('educationList');
    const newEducation = document.createElement('div');
    newEducation.className = 'education-item';
    newEducation.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Institution</label>
                <input type="text" placeholder="University/School name">
            </div>
            <div class="form-group">
                <label>Degree</label>
                <input type="text" placeholder="Bachelor's, Master's, etc.">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Field of Study</label>
                <input type="text" placeholder="Computer Science, Business, etc.">
            </div>
            <div class="form-group">
                <label>Graduation Year</label>
                <input type="number" placeholder="2024">
            </div>
        </div>
        <button class="remove-btn" onclick="removeEducation(this)">❌ Remove</button>
    `;
    educationList.appendChild(newEducation);
}

// Add experience functionality
function addExperience() {
    const experienceList = document.getElementById('experienceList');
    const newExperience = document.createElement('div');
    newExperience.className = 'experience-item';
    newExperience.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" placeholder="Software Developer, Manager, etc.">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" placeholder="Company name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Start Date</label>
                <input type="month">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="month" placeholder="Leave blank if current">
            </div>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea placeholder="Describe your role and achievements..."></textarea>
        </div>
        <button class="remove-btn" onclick="removeExperience(this)">❌ Remove</button>
    `;
    experienceList.appendChild(newExperience);
}

// Remove education item
function removeEducation(button) {
    const educationItem = button.parentElement;
    educationItem.remove();
}

// Remove experience item
function removeExperience(button) {
    const experienceItem = button.parentElement;
    experienceItem.remove();
}

// Form validation
function validateForm() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#f0f0f0';
        }
    });
    
    return isValid;
}

// Collect form data
function collectFormData() {
    const formData = {
        personal: {
            firstName: document.querySelector('#personal input[placeholder="Enter your first name"]').value,
            lastName: document.querySelector('#personal input[placeholder="Enter your last name"]').value,
            location: document.querySelector('#personal input[placeholder="City, Country"]').value,
            dateOfBirth: document.querySelector('#personal input[type="date"]').value
        },
        contact: {
            phone: document.querySelector('#contact input[type="tel"]').value,
            email: document.querySelector('#contact input[type="email"]').value
        },
        social: {
            linkedin: document.querySelector('#social input[placeholder*="linkedin"]').value,
            twitter: document.querySelector('#social input[placeholder*="twitter"]').value,
            instagram: document.querySelector('#social input[placeholder*="instagram"]').value,
            gmail: document.querySelector('#social input[placeholder*="gmail"]').value
        },
        education: [],
        experience: [],
        bio: {
            professionalBio: document.querySelector('#bio textarea[placeholder*="brief description"]').value,
            skillsInterests: document.querySelector('#bio textarea[placeholder*="skills, hobbies"]').value
        }
    };
    
    // Collect education data
    const educationItems = document.querySelectorAll('#educationList .education-item');
    educationItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        formData.education.push({
            institution: inputs[0].value,
            degree: inputs[1].value,
            fieldOfStudy: inputs[2].value,
            graduationYear: inputs[3].value
        });
    });
    
    // Collect experience data
    const experienceItems = document.querySelectorAll('#experienceList .experience-item');
    experienceItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        const textarea = item.querySelector('textarea');
        formData.experience.push({
            jobTitle: inputs[0].value,
            company: inputs[1].value,
            startDate: inputs[2].value,
            endDate: inputs[3].value,
            description: textarea.value
        });
    });
    
    return formData;
}

// Save functionality
document.querySelector('.save-btn').addEventListener('click', function() {
    // Show loading state
    this.textContent = '💾 Saving...';
    this.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        const formData = collectFormData();
        
        // Here you would typically send the data to your backend
        console.log('Form data collected:', formData);
        
        // Show success message
        this.textContent = '✅ Profile Saved!';
        this.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            this.textContent = '💾 Save Profile Changes';
            this.disabled = false;
            this.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        }, 2000);
        
        // Show success alert
        showNotification('Profile updated successfully! 🎉');
    }, 1000);
});

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Auto-save functionality (optional)
function enableAutoSave() {
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            const formData = collectFormData();
            localStorage.setItem('profileFormData', JSON.stringify(formData));
            console.log('Auto-saved form data');
        }, 1000));
    });
}

// Debounce function for auto-save
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

// Load saved data on page load
function loadSavedData() {
    const savedData = localStorage.getItem('profileFormData');
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        // Fill personal data
        if (formData.personal) {
            document.querySelector('#personal input[placeholder="Enter your first name"]').value = formData.personal.firstName || '';
            document.querySelector('#personal input[placeholder="Enter your last name"]').value = formData.personal.lastName || '';
            document.querySelector('#personal input[placeholder="City, Country"]').value = formData.personal.location || '';
            document.querySelector('#personal input[type="date"]').value = formData.personal.dateOfBirth || '';
        }
        
        // Fill contact data
        if (formData.contact) {
            document.querySelector('#contact input[type="tel"]').value = formData.contact.phone || '';
            document.querySelector('#contact input[type="email"]').value = formData.contact.email || '';
        }
        
        // Fill social data
        if (formData.social) {
            document.querySelector('#social input[placeholder*="linkedin"]').value = formData.social.linkedin || '';
            document.querySelector('#social input[placeholder*="twitter"]').value = formData.social.twitter || '';
            document.querySelector('#social input[placeholder*="instagram"]').value = formData.social.instagram || '';
            document.querySelector('#social input[placeholder*="gmail"]').value = formData.social.gmail || '';
        }
        
        // Fill bio data
        if (formData.bio) {
            document.querySelector('#bio textarea[placeholder*="brief description"]').value = formData.bio.professionalBio || '';
            document.querySelector('#bio textarea[placeholder*="skills, hobbies"]').value = formData.bio.skillsInterests || '';
        }
    }
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enable smooth scrolling
    const container = document.querySelector('.container');
    container.style.scrollBehavior = 'smooth';
    
    // Load saved data
    loadSavedData();
    
    // Enable auto-save
    enableAutoSave();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            document.querySelector('.save-btn').click();
        }
        
        // Tab navigation with Ctrl+Tab
        if (e.ctrlKey && e.key === 'Tab') {
            e.preventDefault();
            const tabs = document.querySelectorAll('.tab');
            const activeTab = document.querySelector('.tab.active');
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            tabs[nextIndex].click();
        }
    });
});
