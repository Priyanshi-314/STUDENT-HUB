// ==========================================
// StudentHub - Registration Form Validation
// Practical 5
// ==========================================

let form = document.querySelector("form");

let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmInput = document.getElementById("confirm");
let phoneInput = document.getElementById("phone");
let departmentInput = document.getElementById("department");
let dobInput = document.getElementById("dob");


// ==========================================
// ERROR MESSAGE FUNCTION
// ==========================================

function showError(input, message) {

    input.classList.add("error");

    let error = input.parentElement.querySelector(".error-message");

    if (!error) {
        error = document.createElement("small");
        error.className = "error-message";
        input.parentElement.appendChild(error);
    }

    error.textContent = message;
}


// ==========================================
// REMOVE ERROR
// ==========================================

function clearError(input) {

    input.classList.remove("error");

    let error = input.parentElement.querySelector(".error-message");

    if (error) {
        error.remove();
    }
}


// ==========================================
// NAME VALIDATION
// ==========================================

function validateName() {

    let name = nameInput.value.trim();

    let namePattern = /^[A-Za-z ]{3,50}$/;

    if (name === "") {
        showError(nameInput, "Full name is required.");
        return false;
    }

    if (!namePattern.test(name)) {
        showError(
            nameInput,
            "Name must contain only letters and spaces."
        );
        return false;
    }

    clearError(nameInput);
    return true;
}


// ==========================================
// EMAIL VALIDATION
// ==========================================

function validateEmail() {

    let email = emailInput.value.trim();

    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError(emailInput, "Email is required.");
        return false;
    }

    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address.");
        return false;
    }

    clearError(emailInput);
    return true;
}


// ==========================================
// PASSWORD VALIDATION
// ==========================================

function validatePassword() {

    let password = passwordInput.value;

    /*
        Password requirements:
        At least 8 characters
        One uppercase letter
        One lowercase letter
        One number
        One special character
    */

    let passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (password === "") {
        showError(passwordInput, "Password is required.");
        return false;
    }

    if (!passwordPattern.test(password)) {

        showError(
            passwordInput,
            "Password must contain 8+ characters, uppercase, lowercase, number and special character."
        );

        return false;
    }

    clearError(passwordInput);
    return true;
}


// ==========================================
// CONFIRM PASSWORD
// ==========================================

function validateConfirmPassword() {

    let password = passwordInput.value;
    let confirmPassword = confirmInput.value;

    if (confirmPassword === "") {
        showError(
            confirmInput,
            "Please confirm your password."
        );

        return false;
    }

    if (password !== confirmPassword) {

        showError(
            confirmInput,
            "Passwords do not match."
        );

        return false;
    }

    clearError(confirmInput);
    return true;
}


// ==========================================
// PHONE NUMBER VALIDATION
// ==========================================

function validatePhone() {

    let phone = phoneInput.value.trim();

    let phonePattern = /^[0-9]{10}$/;

    if (phone === "") {

        showError(
            phoneInput,
            "Phone number is required."
        );

        return false;
    }

    if (!phonePattern.test(phone)) {

        showError(
            phoneInput,
            "Phone number must contain exactly 10 digits."
        );

        return false;
    }

    clearError(phoneInput);
    return true;
}


// ==========================================
// DEPARTMENT VALIDATION
// ==========================================

function validateDepartment() {

    if (
        departmentInput.value === "" ||
        departmentInput.value === "Select Department"
    ) {

        showError(
            departmentInput,
            "Please select your department."
        );

        return false;
    }

    clearError(departmentInput);
    return true;
}


// ==========================================
// DATE OF BIRTH VALIDATION
// ==========================================

function validateDOB() {

    let dob = dobInput.value;

    if (dob === "") {

        showError(
            dobInput,
            "Date of birth is required."
        );

        return false;
    }

    let selectedDate = new Date(dob);
    let today = new Date();

    if (selectedDate > today) {

        showError(
            dobInput,
            "Date of birth cannot be in the future."
        );

        return false;
    }

    clearError(dobInput);
    return true;
}


// ==========================================
// REAL-TIME VALIDATION
// ==========================================

nameInput.addEventListener("input", validateName);

emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", function () {

    validatePassword();

    if (confirmInput.value !== "") {
        validateConfirmPassword();
    }

});

confirmInput.addEventListener(
    "input",
    validateConfirmPassword
);

phoneInput.addEventListener(
    "input",
    validatePhone
);

departmentInput.addEventListener(
    "change",
    validateDepartment
);

dobInput.addEventListener(
    "change",
    validateDOB
);


// ==========================================
// FORM SUBMISSION
// ==========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let validName = validateName();
    let validEmail = validateEmail();
    let validPassword = validatePassword();
    let validConfirm = validateConfirmPassword();
    let validPhone = validatePhone();
    let validDepartment = validateDepartment();
    let validDOB = validateDOB();


    if (
        validName &&
        validEmail &&
        validPassword &&
        validConfirm &&
        validPhone &&
        validDepartment &&
        validDOB
    ) {

        alert("Registration successful! Welcome to StudentHub.");

        form.reset();

    } else {

        alert(
            "Please correct the errors in the form."
        );

    }

});