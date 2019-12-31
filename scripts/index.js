const registerForm = document.forms['register'];
const[name, phone, email, submitBtn] = registerForm.elements;
const error = document.querySelector('#error');

// set a 'submit' event listener on the form element
registerForm.addEventListener('submit', handleRegistration, true)

// process user registration
function handleRegistration(e){
    e.preventDefault();
    toggleSubmitBtn(true);

    const errors = vlidateFormInputs();
    if (errors.length > 0){
        renderError(errors[0]);
        toggleSubmitBtn(false);
    }else{
        const user = {
            name: name.value,
            phone: phone.value,
            email: email.value,
        }
        registerUser(user)
        .then(data => {
            if (data.ok){
                alert(data.message)
                toggleSubmitBtn(false);
            }else {
                renderError(data.message);
                toggleSubmitBtn(false);
            }
        })
    }
    // send user data to backend server for persistence
    function registerUser(user) {
        return fetch('https:reg-app-api.herokuapp.com/api/users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(err => {
            renderError('Error registering user, please try again');
            toggleSubmitBtn(false);
        })
    }
    
}
// validate the form input fields
function vlidateFormInputs() {
    let errors = [];
    if(!name.value)
        errors.push('name is required');
    if(!phone.value && phone.value.length < 11 )
        errors.push('a valid phone number is required');
    if(!email.value && /\S+@\S+\.\S+/.test(email.value))
        errors.push('a valid email is required');
    return errors;
}
// render error to DOM
function renderError(message){
    error.textContent = message;
    error.classList.toggle('error', true);
}
// toggle submit btn value
function toggleSubmitBtn(isSubmitting){
    isSubmitting ? submitBtn.textContent = 'submiting...' :
    submitBtn.textContent = 'submit'
}
