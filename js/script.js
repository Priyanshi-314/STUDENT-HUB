```javascript
// =========================
// FAQ SECTION
// =========================

let faqQuestions = document.querySelectorAll(".faqQuestion");

faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {
        let answer = question.nextElementSibling;

        if (answer) {
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        }
    });
});


// =========================
// ANNOUNCEMENT MODAL
// =========================

let openModalBtn = document.getElementById("openModalBtn");
let closeModalBtn = document.getElementById("closeModalBtn");
let announcementModal = document.getElementById("announcementModal");

if (openModalBtn && announcementModal) {
    openModalBtn.addEventListener("click", function() {
        announcementModal.style.display = "flex";
    });
}

if (closeModalBtn && announcementModal) {
    closeModalBtn.addEventListener("click", function() {
        announcementModal.style.display = "none";
    });
}


// =========================
// NOTIFICATION POPUP
// =========================

let notificationPopup = document.getElementById("notificationPopup");
let closeNotification = document.getElementById("closeNotification");

if (notificationPopup) {
    if (localStorage.getItem("notificationClosed") !== "yes") {
        setTimeout(function() {
            notificationPopup.style.display = "block";
        }, 1000);
    }
}

if (closeNotification && notificationPopup) {
    closeNotification.addEventListener("click", function() {
        notificationPopup.style.display = "none";
        localStorage.setItem("notificationClosed", "yes");
    });
}


// =========================
// CHANGE HEADING
// =========================

let heading = document.getElementById("welcomeHeading");
let changeBtn = document.getElementById("changeBtn");

if (heading && changeBtn) {
    changeBtn.addEventListener("click", function() {
        heading.textContent = "Welcome to Your Student Portal!";
    });
}


// =========================
// DARK / LIGHT MODE
// =========================

let themeBtn = document.getElementById("themeBtn");
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
} else {
    document.body.classList.remove("dark-mode");
}

if (themeBtn) {
    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }

    themeBtn.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙 Dark Mode";
        }
    });
}
```
