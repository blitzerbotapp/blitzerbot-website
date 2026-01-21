// Contact Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    const firstNameInput = document.getElementById('firstName');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const firstNameError = document.getElementById('firstNameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formError');
    const errorMessageText = document.getElementById('formErrorMessage');
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;
        return emailRegex.test(email);
    }
    
    // Clear errors
    function clearErrors() {
        firstNameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        firstNameInput.classList.remove('error');
        emailInput.classList.remove('error');
        messageInput.classList.remove('error');
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        clearErrors();
        
        const firstName = firstNameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        if (!firstName) {
            firstNameError.textContent = 'Bitte gib deinen Vornamen ein.';
            firstNameInput.classList.add('error');
            isValid = false;
        }
        
        if (!email) {
            emailError.textContent = 'Bitte gib deine E-Mail-Adresse ein.';
            emailInput.classList.add('error');
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            emailInput.classList.add('error');
            isValid = false;
        }
        
        if (!message) {
            messageError.textContent = 'Bitte gib deine Nachricht ein.';
            messageInput.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Form submission with Formspree
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Disable submit button
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        
        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        const formData = {
            firstName: firstNameInput.value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: emailInput.value.trim(),
            topic: document.getElementById('topic').value,
            message: messageInput.value.trim()
        };
        
        // Prepare data for Formspree
        const formDataToSend = new FormData();
        formDataToSend.append('name', `${formData.firstName}${formData.lastName ? ' ' + formData.lastName : ''}`);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('subject', `[${formData.topic}] Nachricht von ${formData.firstName}${formData.lastName ? ' ' + formData.lastName : ''}`);
        formDataToSend.append('message', `Thema: ${formData.topic}\n\nNachricht:\n${formData.message}\n\n---\nDiese Nachricht wurde über die BlitzerBot Website gesendet.`);
        formDataToSend.append('_replyto', formData.email);
        formDataToSend.append('_subject', `[${formData.topic}] BlitzerBot Kontaktformular`);
        
        try {
            const response = await fetch('https://formspree.io/f/xpwnqjvd', {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                successMessage.style.display = 'flex';
                form.reset();
                clearErrors();
                submitBtn.disabled = false;
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            errorMessageText.textContent = 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt per E-Mail an info@blitzerbot.com';
            errorMessage.style.display = 'flex';
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });
    
    // Real-time validation
    firstNameInput.addEventListener('blur', () => {
        if (!firstNameInput.value.trim()) {
            firstNameError.textContent = 'Bitte gib deinen Vornamen ein.';
            firstNameInput.classList.add('error');
        } else {
            firstNameError.textContent = '';
            firstNameInput.classList.remove('error');
        }
    });
    
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (!email) {
            emailError.textContent = 'Bitte gib deine E-Mail-Adresse ein.';
            emailInput.classList.add('error');
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            emailInput.classList.add('error');
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
        }
    });
    
    messageInput.addEventListener('blur', () => {
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Bitte gib deine Nachricht ein.';
            messageInput.classList.add('error');
        } else {
            messageError.textContent = '';
            messageInput.classList.remove('error');
        }
    });
});
