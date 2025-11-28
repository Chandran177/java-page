// ---------------- VIDEO SCROLLING ----------------
const carouselInner = document.querySelector(".carousel-inner");
const items = document.querySelectorAll(".carousel-item");
const totalItems = items.length;

let index = 0;

document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % totalItems;
    updateCarousel();
});

document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + totalItems) % totalItems;
    updateCarousel();
});

function updateCarousel() {
    carouselInner.style.transform = `translateX(-${index * 100}%)`;
}


// ---------------- POP-UP FORM ----------------
// document.addEventListener("DOMContentLoaded", function () {
//     const buttons = document.querySelectorAll(".btn, .consultBtn, .reserve-btn, .btn-start, .btn-report");
//     const popup = document.getElementById("enrollPopup");

//     buttons.forEach(btn => {
//         btn.addEventListener("click", function (e) {
//             e.preventDefault();
//             popup.style.display = "flex";
//         });
//     });

//     window.closeEnrollPopup = function () {
//         popup.style.display = "none";
//     };
// });


// ---------------- CAPTCHA GENERATOR ----------------
// function generateCaptcha() {
//     let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let captcha = "";

//     for (let i = 0; i < 6; i++) {
//         captcha += chars.charAt(Math.floor(Math.random() * chars.length));
//     }

//     document.getElementById("captchaText").innerText = captcha;
//     return captcha;
// }

// let currentCaptcha = generateCaptcha();

// Refresh Button
// document.getElementById("refreshCaptcha").addEventListener("click", function () {
        // currentCaptcha = generateCaptcha();
// });     


// ---------------- FORM SUBMIT + VALIDATIONS + SHEETS ----------------
document.getElementById("sheetForm").addEventListener("submit", function (e) {

    e.preventDefault(); // Stop default submit first

    // ---------------- MOBILE NUMBER VALIDATION ----------------
    let phone = document.getElementsByName("phone")[0].value.trim();
    let phonePattern = /^[6-9]\d{9}$/; // 10 digits, starts with 6-9

    if (!phonePattern.test(phone)) {
        alert("❌ Please enter a valid 10-digit mobile number (starting with 6, 7, 8, or 9)");
        return; // STOP form submit
    }

    // ---------------- CAPTCHA VALIDATION ----------------
    // let userCaptcha = document.getElementById("captchaInput").value.trim();

    // if (userCaptcha !== currentCaptcha) {
    //     document.getElementById("captchaError").style.display = "block";
    //     currentCaptcha = generateCaptcha();     // refresh captcha
    //     return;  // STOP submit
    // }

    // Hide captcha error
    // document.getElementById("captchaError").style.display = "none";

    // ---------------- DATA COLLECTION ----------------
    let data = {
        name: document.getElementsByName("name")[0].value,
        phone: phone,
        location: document.getElementsByName("location")[0].value,
        batch: document.getElementsByName("batch")[0].value
    };

    // ---------------- SEND TO GOOGLE SHEETS ----------------
    fetch("https://script.google.com/macros/s/AKfycbwmqaHDaFjfy7TkbNII9k7nFk6JJr7kUOd9FQudlOKEBYWqo7FNCNSo1nkWDlc6-9_6xQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(() => {
        alert("✔️ Submitted Successfully!");

        // Reset form + captcha
        // document.getElementById("sheetForm").reset();
        // document.getElementById("captchaInput").value = "";
        // currentCaptcha = generateCaptcha();
    })
    .catch(err => alert("❌ Error: " + err));
});
