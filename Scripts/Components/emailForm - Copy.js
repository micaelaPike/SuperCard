// "use strict";
let snackbar = document.querySelector(".snackbar");
let snackBarImage = document.querySelector(".snackBarImage");
let snackbarAlert = document.querySelector(".snackbarAlert");
let closeButton = document.querySelector(".closeButton");

let arrMessage = ["/Assets/Images/success-tick.png", "/Assets/Images/failure-cross.png"]

const inputs = document.querySelectorAll(".formControl");
let number = document.querySelector(".number");
let email = document.querySelector(".email");

// debugger;

function successSnackBar() {
    snackbarAlert.innerHTML = "Message sent successfully!"
    snackbar.style.display = "flex";
    snackbar.style.borderColor = "#008000";
    snackbar.style.borderStyle = "solid";
    snackbar.style.borderWidth = "3px";
    snackBarImage.src = arrMessage[0];
}

function failSnackBar(message) {
    snackbarAlert.innerHTML = "";
    failure.style.display = "flex";
    snackbar.style.backgroundColor = "#aaa";
    snackbar.style.color = "black";
    snackBarImage.src = arrMessage[1];
}

function sendingSnackBar() {
    snackbarAlert.innerHTML = "Sending...";
    failure.style.display = "flex";
    snackbar.style.backgroundColor = "black";
    snackbar.style.color = "black";
    // snackBarImage.src = arrMessage[1];
}

closeButton.addEventListener("click", () => {
    snackbar.style.display = "none";
});

(function() {
    emailjs.init("eylt68t36B7sf7Baf");
})();

window.onload = function() {
    document.getElementById("emailForm").addEventListener("submit", function(event) {
            event.preventDefault();

            // if ((validateEmail(email) === true) && (validateNumber(number) === true)) {
            console.log('SUCCESS!');

            sendingSnackBar();
            emailjs.sendForm('service_cnprkth', 'template_fqsuwrr', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    successSnackBar();
                }, function(error) {
                    console.log('FAILED...', error);
                    failSnackBar("Message failed to send.<br>Contact Customer Care.");
                })

            inputs.forEach(input => {
                input.value = "";
            });
        }
        // else {
        //     console.log('FAILED...');
        //     failSnackBar("Message failed. Invalid details.");
        // })
    )
};


function validateNumber(inputNumber) {
    let phoneNum = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (inputNumber.value.match(phoneNum)) {
        console.log("valid number")
        return true;
    } else {
        console.log("invalid number")
        return false;
    }
}

function validateEmail(input) {

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) {
        console.log("valid email")
        return true;
    } else {
        console.log("invalid email")
        return false;

    }
}