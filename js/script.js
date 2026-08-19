//FAQ section

let faqQuestions = document.querySelectorAll(".faqQuestion");

faqQuestions.forEach(function(question){

    question.addEventListener("click", function(){

        let answer = question.nextElementSibling;

        if(answer.style.display === "block"){
            answer.style.display = "none";
        }
        else{
            answer.style.display = "block";
        }

    });

});

//modal popup

let openModalBtn = document.getElementById("openModalBtn");
let closeModalBtn = document.getElementById("closeModalBtn");
let announcementModal = document.getElementById("announcementModal");

openModalBtn.addEventListener("click", function(){

    announcementModal.style.display = "flex";

});

closeModalBtn.addEventListener("click", function(){

    announcementModal.style.display = "none";

});



// Notification Popup

let notificationPopup = document.getElementById("notificationPopup");
let closeNotification = document.getElementById("closeNotification");

if(notificationPopup){

    setTimeout(function(){

        notificationPopup.style.display = "block";

    }, 1000);

}


if(closeNotification){

    closeNotification.addEventListener("click", function(){

        notificationPopup.style.display = "none";

    });

}

//change heading
let heading = document.getElementById("welcomeHeading");
let changeBtn = document.getElementById("changeBtn");

changeBtn.addEventListener("click", function(){

    heading.textContent = "Welcome to Your Student Portal!";

});



// =========================
// DARK / LIGHT MODE
// =========================

let themeBtn = document.getElementById("themeBtn");

// Check saved theme when page loads
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️ Light Mode";

} else {

    document.body.classList.remove("dark-mode");
    themeBtn.textContent = "🌙 Dark Mode";

}


// Change theme when button is clicked
themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        // Save dark mode
        localStorage.setItem("theme", "dark");

        themeBtn.textContent = "☀️ Light Mode";

    } else {

        // Save light mode
        localStorage.setItem("theme", "light");

        themeBtn.textContent = "🌙 Dark Mode";

    }

});