/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const privacyDropdown = document.querySelector(".nav-dropdown");
const privacyToggle = document.querySelector(".nav-dropdown-toggle");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    menuToggle.textContent =
        navLinks.classList.contains("active")
            ? "✕"
            : "☰";
});

privacyToggle?.addEventListener("click", () => {
    const isOpen = privacyDropdown.classList.toggle("open");
    privacyToggle.setAttribute("aria-expanded", isOpen);
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☾";

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

    themeToggle.textContent =
        isLight ? "☾" : "☀";

});


/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document
    .querySelectorAll(
        ".section-heading, .project-card, .skill-card, .stat, .github-card"
    )
    .forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });
