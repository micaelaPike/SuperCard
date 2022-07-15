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

function vanish(element) {
    element.style.display = "none";
}

closeButton.addEventListener("click", () => {
    vanish(snackbar);
});

(function() {
    emailjs.init("eylt68t36B7sf7Baf");
})();

window.onload = function() {
    document.getElementById("emailForm").addEventListener("submit", function(event) {
        event.preventDefault();
        // debugger;
        // validateNumber(number);
        // validateEmail(email);

        if (validateEmail(email)) {
            console.log('SUCCESS!');
            snackbarAlert.innerHTML = "Message sent successfully!"
            snackbar.style.display = "flex";
            snackbar.style.borderColor = "#008000";
            snackbar.style.borderStyle = "solid";
            snackbar.style.borderWidth = "3px";
            snackBarImage.src = arrMessage[0];
            // emailjs.sendForm('service_cnprkth', 'template_fqsuwrr', this)
            //     .then(function(response) {
            //         console.log('SUCCESS!', response.status, response.text);
            //         snackbar.style.display = "flex";
            //         snackbar.style.backgroundColor = "#aaa";
            //         snackbar.style.color = "black";
            //         snackBarImage.src = arrMessage[0];
            //     }, function(error) {
            //         console.log('FAILED...', error);
            //         failure.style.display = "flex";
            //         snackbar.style.backgroundColor = "#aaa";
            //         snackbar.style.color = "black";
            //         snackBarImage.src = arrMessage[1];

            //     })

            inputs.forEach(input => {
                input.value = "";
            });
        } else {
            console.log('FAILED...');
            snackbarAlert.innerHTML = "Message failed!<br> Invalid details.";
            snackbar.style.display = "flex";
            snackbar.style.borderColor = "#FF0000";
            snackbar.style.borderStyle = "solid";
            snackbar.style.borderWidth = "3px";
            snackBarImage.src = arrMessage[1];
        }
    })
};

function validateNumber(input) {
    let number = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (input.value.match(number)) {
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