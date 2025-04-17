if (localStorage.getItem("login")!="active") {
    (function () {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.location.href = 'login.html'; // Redirect to login page
        };
    })();
}


const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');
const success_message = document.getElementById('success-message');   
const loginButton = document.getElementById('login');
/////////////////////////////

function getSignupFormErrors(firstname, email, password, repeatPassword) {
    let errors = [];

    if (!firstname || firstname.trim() === '') {
        errors.push('Firstname is required');
        firstname_input.parentElement.classList.add('incorrect');
    } else if (!/^[a-zA-Z]+$/.test(firstname)) {
        errors.push('Firstname must contain only letters');
        firstname_input.parentElement.classList.add('incorrect');
    }

    if (!email || email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email is not valid');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    } else if (password.length < 8) {
        errors.push('Password must have at least 8 characters');
        password_input.parentElement.classList.add('incorrect');
    } else if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
        password_input.parentElement.classList.add('incorrect');
    } else if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
        password_input.parentElement.classList.add('incorrect');
    }

    if (password !== repeatPassword) {
        errors.push('Password does not match repeated password');
        password_input.parentElement.classList.add('incorrect');
        repeat_password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}

function getLoginFormErrors(email, password) {
    let errors = [];

    if (!email || email.trim() === '') {
        errors.push('Email is required');
        email_input.parentElement.classList.add('incorrect');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Email is not valid');
        email_input.parentElement.classList.add('incorrect');
    }

    if (!password || password.trim() === '') {
        errors.push('Password is required');
        password_input.parentElement.classList.add('incorrect');
    }

    return errors;
}
// remove errorr

const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null);
allInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.parentElement.classList.contains('incorrect')) {
            input.parentElement.classList.remove('incorrect');
            error_message.innerText = '';
            success_message.innerText = '';
        }
    });
});
///  

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let errors = firstname_input
        ? getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, repeat_password_input.value)
        : getLoginFormErrors(email_input.value, password_input.value);

    if (errors.length > 0) {
        e.preventDefault();
        error_message.innerText = errors.join(". ");
        success_message.innerText = ''; 
    } else {
        if (firstname_input) {
            localStorage.setItem('email', email_input.value);
            localStorage.setItem('password', password_input.value);
            localStorage.setItem('name',firstname_input.value)
            success_message.innerText = 'Registration successful! ';
            error_message.innerText = ''; // remove error message //
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 500);
        }
    }
});

//check registretion
const validateLogin = (email, password) => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    return email === storedEmail && password === storedPassword;
};


window.onload = () => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail) email_input.value = storedEmail;
    if (storedPassword) password_input.value = storedPassword;
};

loginButton.addEventListener('click', (e) => {
    e.preventDefault(); //      

    const email = email_input.value;
    const password = password_input.value;

    if (validateLogin(email, password)) {
        success_message.innerText = 'Login successful! ';
        error_message.innerText = ''; //   
        setTimeout(() => {
            window.location.href = 'projs-1.html'; //      
        }, 1000);
        localStorage.setItem("login","active")
    } else {
        error_message.innerText = 'Invalid email or password ';
        success_message.innerText = ''; //  
    }
});
