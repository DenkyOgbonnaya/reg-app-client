const regDetails = document.querySelector('.reg_details');
const error = document.querySelector('#error');
const loader = document.querySelector('#loader');
const form = document.forms['confirm'];
const [pin] = form.elements;

form.addEventListener('submit', handleSubmit, false)

// handle fectching of user details
function handleSubmit(e){
    e.preventDefault();
    renderError(' ');
    toggleLoader(true);

    if (pin.value.length === 10){
        fetchDetails(pin.value)
        .then(data => {
            if (data.ok){
                renderDetails(data.user);
                toggleLoader(false);
            }else {
                renderError(data.message);
                toggleLoader(false);
            }
        })
    }else {
        renderError('Pin must be 10 digits long');
        toggleLoader(false);
    }
}
// retrieve user details from server
function fetchDetails(pin){
    return fetch(`https:reg-app-api.herokuapp.com/api/users/${pin}`)
    .then( res => res.json())
    .catch(err => {
        renderError('Error fetching details, please try again');
        toggleLoader(false);
    })
}
// render user details to DOM
function renderDetails(details){
    const content =  `
        <div>
            <h4>Your details</h4>
            <table>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>${details.name}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>${details.phone}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${details.email}</td>
                    </tr>
                    <tr>
                        <td>Registration date</td>
                        <td>${new Date(details.reg_date).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>
        <div>
    `
    regDetails.innerHTML = content;
    
}
// show error occourence
function renderError(message){
    error.textContent = message;
    error.classList.toggle('error', true);
}
// hide and show loader text
function toggleLoader(isVisible){
    if(isVisible){
        loader.classList.remove('loader_hidden');
        loader.classList.add('loader_visible');
    }else{
        loader.classList.remove('loader_visible');
        loader.classList.add('loader_hidden');
    }
}
