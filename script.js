'use strict';

const generatedPassword = document.getElementById('password');
const slider = document.getElementById('slider');
const charLength = document.getElementById('length-value');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-icon');
const copyText = document.querySelector('.copied');
const strengthBars = document.querySelector('.strength-bars');
const strengthText = document.getElementById('strength-text');
const arrowIcon = document.querySelector('.arrow-icon');
const errorText = document.querySelector('.error-text');

function sliderLength() {
    const min = slider.min;
    const max = slider.max;
    const sliderValue = slider.value;

    charLength.textContent = sliderValue;
    
    const percentage = ((sliderValue - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--color-green-200) ${percentage}%, var(--color-grey-850) ${percentage}%)`;
}
slider.addEventListener('input', sliderLength);


const selectedOptions = [];
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            selectedOptions.push(this.id);
        } 
    });
});

function generatePassword() {
    let password = '';
    const characters = {
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    let charSet = '';
    selectedOptions.forEach(option => {
        charSet += characters[option];
    });

    if (!charSet) {
        password = '';
        errorText.innerText = 'Please select at least one character type.';   
    }
    if (charLength.textContent < 1) {
        password = '';
        errorText.innerText = 'Please select a length greater than 0.';   
    }
    else {
        errorText.innerText = '';
    
    for (let i = 0; i < charLength.textContent; i++) {
        password += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    generatedPassword.value = password;  
    checkPasswordStrength(generatedPassword.value, selectedOptions.length);
} 
}

function checkPasswordStrength(password, charTypeCount) {
    const length = password.length;

    let strengthLevel ;
    if(length < 6 || charTypeCount === 1) {
        strengthLevel = 'very-weak';
        strengthText.textContent = 'Very Weak';
    }
    else if(length >= 6 && length < 8 && charTypeCount >= 2) {
        strengthLevel = 'weak';
        strengthText.textContent = 'Weak';
    }
    else if(length >= 8 && length < 10 && charTypeCount >= 3) {
        strengthLevel = 'medium';
        strengthText.textContent = 'Medium';
    }
    else if (length >= 10 && charTypeCount >= 4) {
        strengthLevel = 'strong';
        strengthText.textContent = 'Strong';
    }
    else {
        strengthLevel = 'medium';
        strengthText.textContent = 'Medium'
    }
    strengthBars.className = `strength-bars ${strengthLevel}`;
    
};

// Generate password on button click
generateBtn.addEventListener('click', function() {
   
    generatePassword();
    
});

generateBtn.addEventListener('mouseover', function() {
    arrowIcon.classList.add('active-arrow');
});
generateBtn.addEventListener('mouseout', function() {
    arrowIcon.classList.remove('active-arrow');
});

// Copy password to clipboard
copyBtn.addEventListener('click', function() {
    const passwordText = generatedPassword.value;
    navigator.clipboard.writeText(passwordText)
    .then(() => {
        copyText.classList.remove('hidden');
        setTimeout(() => {
            copyText.classList.add('hidden');
        }, 2000);
    })
    .catch(err => {
        console.error('Failed to copy: ', err);
    });
});
