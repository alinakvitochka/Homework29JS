const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const pauseButton = document.querySelector(".pause");
const indicatorsContainer = document.querySelector(".indicators");

let currentIndex = 0;
let autoSlideInterval;
let isPaused = false;

slides.forEach((_, index) => {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  if (index === 0) indicator.classList.add("active");
  indicatorsContainer.appendChild(indicator);

  indicator.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

const indicators = document.querySelectorAll(".indicator");

function updateCarousel() {
  carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex);
  });
}

prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }, 3000);
}

pauseButton.addEventListener("click", () => {
  if (isPaused) {
    startAutoSlide();
    pauseButton.textContent = "Pause";
  } else {
    clearInterval(autoSlideInterval);
    pauseButton.textContent = "Play";
  }
  isPaused = !isPaused;
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevButton.click();
  if (e.key === "ArrowRight") nextButton.click();
});

let startX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX - startX > 50) prevButton.click();
  if (startX - endX > 50) nextButton.click();
});

startAutoSlide();
