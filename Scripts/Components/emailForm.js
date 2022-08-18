// "use strict";
let snackbar = document.querySelector(".snackbar");
let snackBarImage = document.querySelector(".snackBarImage");
let snackbarAlert = document.querySelector(".snackbarAlert");

let closeButton = document.querySelector(".closeButton");
let snackBarImgArr = ["/Assets/Images/success-tick.png", "/Assets/Images/failure-cross.png", "/Assets/Images/sending.png"]
const inputs = document.querySelectorAll(".formControl");
let number = document.querySelector(".number");
let email = document.querySelector(".email");

let submitBtn = document.querySelector(".submitBtn");


function successSnackBar() {
    closeButton.style.display = "flex";
    snackbarAlert.innerHTML = "Message sent successfully!"
    snackbar.style.display = "flex";
    snackbar.style.borderColor = "#008000";
    snackbar.style.borderStyle = "solid";
    snackbar.style.borderWidth = "3px";
    snackBarImage.src = snackBarImgArr[0];
}

function failSnackBar(message) {
    closeButton.style.display = "flex";
    snackbarAlert.innerHTML = message;
    snackbar.style.display = "flex";
    snackbar.style.backgroundColor = "#aaa";
    snackbar.style.color = "black";
    snackbar.style.borderColor = "#cf000e";
    snackbar.style.borderStyle = "solid";
    snackbar.style.borderWidth = "3px";
    snackBarImage.src = snackBarImgArr[1];
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
    snackBarImage.src = snackBarImgArr[2];
    snackBarImage.style.width = "100px";
}

function validateNumber(inputNumber) {
    if (inputNumber.Length = 10) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(input) {

    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.value.match(validRegex)) {
        return true;
    } else {
        return false;

    }
}

closeButton.addEventListener("click", () => {
    snackbar.style.display = "none";
});

function recaptchaCallback() {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = "#cf000e";
    submitBtn.style.borderColor = "#cf000e"
    console.log("hello")
}

(function() {
    emailjs.init("eylt68t36B7sf7Baf");
})();

window.onload = function() {
    document.getElementById("emailForm").addEventListener("submit", function(event) {
        event.preventDefault();
        sendingSnackBar();
        if (validateEmail(email) == true) {
            emailjs.sendForm('service_cnprkth', 'template_fqsuwrr', this)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    successSnackBar();
                }, function(error) {
                    console.log('FAILED...', error);
                    failSnackBar("Message failed to send.<br> Error: " + error.status + " <br>Contact Customer Care.");
                })
            inputs.forEach(input => {
                input.value = "";
                grecaptcha.reset();
            });
        } else {
            console.log('FAILED...');
            failSnackBar("Message failed. Invalid details.");
        }
    })
}


const isNumericInput = (event) => {
    const key = event.keyCode;
    return ((key >= 48 && key <= 57) || // Allow number line
        (key >= 96 && key <= 105) // Allow number pad
    );
};

const isModifierKey = (event) => {
    const key = event.keyCode;
    return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
        (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
        (key > 36 && key < 41) || // Allow left, up, right, down
        (
            // Allow Ctrl/Command + A,C,V,X,Z
            (event.ctrlKey === true || event.metaKey === true) &&
            (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
        )
};

const enforceFormat = (event) => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
        event.preventDefault();
    }
};

const formatToPhone = (event) => {
    if (isModifierKey(event)) { return; }

    const target = event.target;
    const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) { target.value = `${zip} ${middle} ${last}`; } else if (input.length > 3) { target.value = `${zip} ${middle}`; } else if (input.length > 0) { target.value = `${zip}`; }
};

const inputElement = document.getElementById('number');
inputElement.addEventListener('keydown', enforceFormat);
inputElement.addEventListener('keyup', formatToPhone);