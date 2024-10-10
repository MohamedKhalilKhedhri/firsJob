document.addEventListener("DOMContentLoaded", () => {
    const whatsupButton = document.getElementById("cta2");
    const cta1Button = document.getElementById("cta1");
    const signUpForm = document.querySelector(".signUpForm");
    const nameInput = document.getElementById('name');
    const countryInput = document.getElementById('country');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const nameLengthError = document.getElementById('name-length-error');
    const emailError = document.getElementById('email-error');
    const loader = document.querySelector('.loader');
    const submitText = document.getElementById('submit-text');
    const secondCta1Button = document.getElementById('joinWaitlist');
    const thirdCta1Button = document.getElementById('joinWaitlist2');
    const CloseForm = document.getElementById('CloseForm');
    
  
    whatsupButton.addEventListener("click", () => {
        const phoneNumber = "+9613520173"; 
        const url = `https://wa.me/${phoneNumber}`; 
        window.open(url, "_blank"); 
    });

    CloseForm.addEventListener("click", () => {
        signUpForm.style.display = 'none'; // close the sign-up form
    });
    cta1Button.addEventListener("click", () => {
        signUpForm.style.display = 'flex'; // Show the sign-up form
    });

    secondCta1Button.addEventListener("click", () => {
        signUpForm.style.display = 'flex'; // Show the sign-up form
    });
    thirdCta1Button.addEventListener("click", () => {
        signUpForm.style.display = 'flex'; // Show the sign-up form
    });
    signUpForm.addEventListener("click", (event) => {
        // Close the form if the click is outside the form itself
        if (event.target === signUpForm) {
            signUpForm.style.display = 'none';
        }
    });

    const form = document.getElementById('myForm');
    form.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from bubbling up to the signUpForm div
    });

    const scriptURL = 'https://script.google.com/macros/s/AKfycbwHJzpFzKwU9nX0IX3PgP-Xg1J4YsUsBeSRNHsnzaDFLOfzBT7bqD5nQ9yeMl2qYNs/exec';

    emailInput.classList.add('filledInput');
    nameInput.classList.add('filledInput'); 
    loader.style.display = 'none';
    form.addEventListener('submit', e => {
        e.preventDefault(); 

        loader.style.display = 'inline-block';
        submitText.textContent = 'Submitting';

        let isValid = true;

        if (nameInput.value.trim()) {
            if (nameInput.value.length < 3 || nameInput.value.length > 30) {
                nameInput.classList.remove('filledInput');
                nameInput.classList.add('emptyInput');
                nameLengthError.style.display = 'block';
                nameError.style.display = 'none';
                isValid = false;
            } else {
                nameInput.classList.remove('emptyInput');
                nameInput.classList.add('filledInput');
                nameError.style.display = 'none';
                nameLengthError.style.display = 'none';
            }
        } else {
            nameInput.classList.remove('filledInput');
            nameInput.classList.add('emptyInput');
            nameError.style.display = 'block';
            nameLengthError.style.display = 'none';
            isValid = false;
        }

        if (emailInput.value.trim()) {
            emailInput.classList.remove('emptyInput');
            emailInput.classList.add('filledInput');
            emailError.style.display = 'none'; 
        } else {
            emailInput.classList.remove('filledInput'); 
            emailInput.classList.add('emptyInput'); 
            emailError.style.display = 'block'; 
            isValid = false;
        }

   

        if (isValid) {
            fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    loader.style.display = 'none';
                    submitText.textContent = 'Sign up';
                    swal({
                        text: "Thank you for your submission. We will notify you by email once the product is ready.",
                        icon: "success",
                        showCloseButton: true,
                        closeButtonAriaLabel: 'Close this alert',
                      });
                    signUpForm.style.display = 'none';
                    nameInput.value = '';
                    emailInput.value = '';
                    countryInput.value = '';
                })
                .catch(error => {
                    loader.style.display = 'none';
                    submitText.textContent = 'Sign up';
                    swal({
                        text: "There was an error submitting the form. Please try again.",
                        icon: "warning",
                        showCloseButton: true,
                        closeButtonAriaLabel: 'Close this alert',
                  
                      });
                    console.error('Error!', error.message);
                    signUpForm.style.display = 'none';
                });
        } else {
            loader.style.display = 'none';
            submitText.textContent = 'Sign up';

        }
    });

    
});

