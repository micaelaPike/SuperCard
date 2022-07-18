// "use strict";
let snackbar = document.querySelector(".snackbar");
let snackBarImage = document.querySelector(".snackBarImage");
let snackbarAlert = document.querySelector(".snackbarAlert");

let closeButton = document.querySelector(".closeButton");
let arrMessage = ["/Assets/Images/success-tick.png", "/Assets/Images/failure-cross.png", "/Assets/Images/sending.png"]
const inputs = document.querySelectorAll(".formControl");
let number = document.querySelector(".number");
let email = document.querySelector(".email");


function successSnackBar() {
    closeButton.style.display = "flex";

    snackbarAlert.innerHTML = "Message sent successfully!"
    snackbar.style.display = "flex";
    snackbar.style.borderColor = "#008000";
    snackbar.style.borderStyle = "solid";
    snackbar.style.borderWidth = "3px";
    snackBarImage.src = arrMessage[0];
}

function failSnackBar(message) {
    closeButton.style.display = "flex";

    snackbarAlert.innerHTML = message;
    failure.style.display = "flex";
    snackbar.style.backgroundColor = "#aaa";
    snackbar.style.color = "black";
    snackbar.style.borderColor = "#FFFFFF";
    snackbar.style.borderStyle = "solid";
    snackbar.style.borderWidth = "3px";
    snackBarImage.src = arrMessage[1];
}

function sendingSnackBar() {
    closeButton.style.display = "none";
    snackbarAlert.innerHTML = "Sending...";
    snackbar.style.display = "flex";
    snackbar.style.backgroundColor = "#aaa";
    snackbar.style.color = "#3f48cc";
    snackbar.style.borderColor = "#3f48cc";
    snackbar.style.borderStyle = "solid";
    snackbar.style.borderWidth = "3px";
    snackBarImage.src = arrMessage[2];
    snackBarImage.style.width = "100px";
}

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

closeButton.addEventListener("click", () => {
    snackbar.style.display = "none";
});

(function() {
    emailjs.init("eylt68t36B7sf7Baf");
})();

window.onload = function() {
    document.getElementById("emailForm").addEventListener("submit", function(event) {
        event.preventDefault();
        sendingSnackBar();
        if ((validateEmail(email) == true) && (validateNumber(number) == true)) {
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
        } else {
            console.log('FAILED...');
            failSnackBar("Message failed. Invalid details.");
        }
    })
}