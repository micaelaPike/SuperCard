// "use strict";
let snackbar = document.querySelector(".snackbar");

const inputs = document.querySelectorAll("details", "details message");

function vanish(element) {
    element.style.display = "none";
}

(function() {
    emailjs.init("eylt68t36B7sf7Baf");
})();

window.onload = function() {
    document.getElementById("emailForm").addEventListener("submit", function(event) {
        event.preventDefault();

        emailjs.sendForm('service_cnprkth', 'template_fqsuwrr', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                snackbar.style.display = "block";
                snackbar.style.backgroundColor = "#44BD4D";
                snackbar.style.color = "white";
                setTimeout(vanish, 3000, snackbar);
            }, function(error) {
                console.log('FAILED...', error);
                failure.style.display = "block";
                snackbar.style.backgroundColor = "#ff2f18";
                snackbar.style.color = "white";
                setTimeout(vanish, 3000, snackbar);
            })
        inputs.forEach(input => {
            input.value = '';
        });


    })
};