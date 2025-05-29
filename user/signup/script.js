

document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePasswords = document.querySelectorAll('.toggle-password');
    
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Form submission with animation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.btn-submit');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Account Created!';
                    
                    // Redirect after success
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }, 2000);
            }
        });
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        // Create strength meter element
        const strengthMeter = document.createElement('div');
        strengthMeter.className = 'password-strength';
        strengthMeter.innerHTML = '<div class="strength-meter"></div>';
        passwordInput.parentElement.appendChild(strengthMeter);
        
        passwordInput.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            const meter = strengthMeter.querySelector('.strength-meter');
            
            meter.style.width = `${strength.percentage}%`;
            meter.style.backgroundColor = strength.color;
        });
    }
    
    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword');
    if (confirmPassword) {
        confirmPassword.addEventListener('input', function() {
            const password = document.getElementById('signupPassword').value;
            
            if (this.value !== password && this.value.length > 0) {
                this.setCustomValidity("Passwords don't match");
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Add floating label functionality
    const floatInputs = document.querySelectorAll('.floating-input input');
    floatInputs.forEach(input => {
        // Check if input has value on page load
        if (input.value) {
            input.nextElementSibling.classList.add('active');
        }
        
        input.addEventListener('focus', function() {
            this.nextElementSibling.classList.add('active');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.nextElementSibling.classList.remove('active');
            }
        });
    });
});

function calculatePasswordStrength(password) {
    let strength = 0;
    
    // Length
    if (password.length > 0) strength += 10;
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 20;
    
    // Complexity
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    // Cap at 100
    strength = Math.min(strength, 100);
    
    // Determine color
    let color;
    if (strength < 40) {
        color = '#FF5252'; // Red
    } else if (strength < 70) {
        color = '#FFC107'; // Yellow
    } else {
        color = '#4CAF50'; // Green
    }
    
    return {
        percentage: strength,
        color: color
    };
}

