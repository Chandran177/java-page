//video scrolling
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

// pop-up form
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".btn, .consultBtn, .reserve-btn , .btn-start, .btn-report"
  );
  const popup = document.getElementById("enrollPopup");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      popup.style.display = "flex";
    });
  });

  window.closeEnrollPopup = function () {
    popup.style.display = "none";
  };
});

document.getElementById("sheetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let data = {
    name: document.getElementsByName("name")[0].value,
    phone: document.getElementsByName("phone")[0].value,
    location: document.getElementsByName("location")[0].value,
    batch: document.getElementsByName("batch")[0].value,
    captcha: document.getElementsByName("captchaInput")[0].value,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbxMY9UH7r_joF38mwgxIZmbjrJr53ZVcupxAIbKRIbBi1_NZozcbhe4iCgTSu1mshV26g/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.text())
    .then((msg) => {
      alert("✔️ Submitted Successfully!");

      // ✅ CLEAR FORM HERE
      document.getElementById("sheetForm").reset();
      document.getElementById("captchaInput").value = "";
      currentCaptcha = generateCaptcha(); // new captcha
    })
    .catch((err) => alert("❌ Error: " + err));
});

function generateCaptcha() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";

  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById("captchaText").innerText = captcha;
  return captcha;
}

let currentCaptcha = generateCaptcha();

// Refresh Button
document
  .getElementById("refreshCaptcha")
  .addEventListener("click", function () {
    currentCaptcha = generateCaptcha();
  });

// Validate on Submit
document.getElementById("sheetForm").addEventListener("submit", function (e) {
  let userValue = document.getElementById("captchaInput").value;

  if (userValue !== currentCaptcha) {
    e.preventDefault();
    document.getElementById("captchaError").style.display = "block";
    currentCaptcha = generateCaptcha(); // new captcha
  } else {
    document.getElementById("captchaError").style.display = "none";
    alert("Form Submitted Successfully!");
  }
});
