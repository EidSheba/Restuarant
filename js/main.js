// Add scroll to top button to the body
const scrollButton = document.createElement("div");
scrollButton.className = "scroll-top";
scrollButton.innerHTML = "↑";
document.body.appendChild(scrollButton);

// Navbar and scroll to top button visibility
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".custom-navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
    scrollButton.classList.add("visible");
  } else {
    navbar.classList.remove("scrolled");
    scrollButton.classList.remove("visible");
  }
});

// Smooth scrolling for navbar links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      const navbarHeight =
        document.querySelector(".custom-navbar").offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Scroll to top button click handler
scrollButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Add animation to elements
document
  .querySelectorAll(".card, #about img, #about h2, .form-control")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });

// Simple contact form submission alert
document.querySelector("form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for contacting Fork & Flame! We will get back to you soon.");
  this.reset();
});
