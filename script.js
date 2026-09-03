const CONFIG = {
    name: "Neerja Raju",
    username: "neerjaRaju",
    github: "https://github.com/neerjaRaju",
    linkedin: "",
    email: "",
    resume: "assets/resume.pdf",
    title: "Android • Flutter • C++ • AI"
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const roles = ["Android Developer", "Flutter Developer", "AI Developer", "C++ Developer", "Computer Vision Developer", "Mobile App Builder"];
let repositories = [];

function renderFeaturedProjects() {
    const target = $("#featuredProjects");
    if (!target || typeof FEATURED_PROJECTS === "undefined") return;
    target.innerHTML = FEATURED_PROJECTS.map((project, index) => `<article class="project-card" tabindex="0" data-project="${project.id}">
        <div class="project-top"><span>PROJECT ${String(index + 1).padStart(2, "0")}</span><a href="https://github.com/${project.repository}" target="_blank" rel="noopener" aria-label="Open ${project.name} on GitHub">↗</a></div>
        <div class="project-icon"><img src="${project.image}" alt="${project.name} project visual" loading="lazy"></div>
        <h3>${project.name}</h3><p>${project.description}</p><div class="tags">${project.technologies.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </article>`).join("");
    $$("[data-project]").forEach((card) => { card.addEventListener("click", (event) => { if (!event.target.closest("a")) openProject(card.dataset.project); }); card.addEventListener("keydown", (event) => { if (event.key === "Enter") openProject(card.dataset.project); }); });
}

function openProject(id) {
    const project = FEATURED_PROJECTS.find((item) => item.id === id);
    if (!project) return;
    $("#modalContent").innerHTML = `<p class="kicker">FEATURED PROJECT</p><h2 id="modalTitle">${project.name}</h2><p>${project.description}</p><div class="tags">${project.technologies.map((tag) => `<span>${tag}</span>`).join("")}</div><a class="button button-primary" href="https://github.com/${project.repository}" target="_blank" rel="noopener">View on GitHub ↗</a>`;
    $("#projectModal").classList.add("open"); $("#projectModal").setAttribute("aria-hidden", "false"); $("#modalClose").focus();
}
function closeProject() { $("#projectModal").classList.remove("open"); $("#projectModal").setAttribute("aria-hidden", "true"); }

function renderRepositories(list) {
    const target = $("#repoGrid");
    if (!list.length) { target.innerHTML = '<p class="empty-state">No matching repositories found.</p>'; return; }
    target.innerHTML = list.map((repo) => `<article class="repo-card"><h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3><p>${repo.description || "No description provided."}</p><div class="repo-meta"><span>${repo.language || "Open source"}</span><span>★ ${repo.stargazers_count} · ⑂ ${repo.forks_count}</span></div></article>`).join("");
}
async function loadGitHub() {
    try {
        const [profileResponse, reposResponse] = await Promise.all([fetch(`https://api.github.com/users/${CONFIG.username}`), fetch(`https://api.github.com/users/${CONFIG.username}/repos?per_page=100&sort=updated`)]);
        if (!profileResponse.ok || !reposResponse.ok) throw new Error("GitHub unavailable");
        const profile = await profileResponse.json(); repositories = await reposResponse.json();
        $("#repoCount").textContent = profile.public_repos ?? "--"; $("#followerCount").textContent = profile.followers ?? "--"; $("#followingCount").textContent = profile.following ?? "--"; $("#gistCount").textContent = profile.public_gists ?? "--";
        $("#repoStatus").textContent = `${repositories.length} public repositories`; renderRepositories(repositories);
    } catch (error) { $("#repoStatus").textContent = "GitHub statistics unavailable right now."; $("#repoGrid").innerHTML = '<p class="empty-state">Visit <a href="https://github.com/neerjaRaju" target="_blank" rel="noopener">GitHub</a> to explore the repositories.</p>'; }
}

function initTyping() { const target = $("#typingRole"); let role = 0; let character = 0; let deleting = false; function tick() { const current = roles[role]; target.textContent = current.slice(0, character); if (!deleting && character < current.length) character++; else if (deleting && character > 0) character--; else { deleting = !deleting; if (!deleting) role = (role + 1) % roles.length; } setTimeout(tick, deleting ? 45 : character === current.length ? 1800 : 75); } tick(); }
function initTheme() { const saved = localStorage.getItem("theme"); if (saved === "light" || (!saved && matchMedia("(prefers-color-scheme: light)").matches)) document.body.classList.add("light"); $("#themeToggle").addEventListener("click", () => { document.body.classList.toggle("light"); localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark"); }); }
function initNavigation() { const menu = $("#navLinks"); $("#menuToggle").addEventListener("click", () => { const open = menu.classList.toggle("active"); $("#menuToggle").setAttribute("aria-expanded", open); }); $(".nav-dropdown-toggle").addEventListener("click", () => { const dropdown = $(".nav-dropdown"); const open = dropdown.classList.toggle("open"); $(".nav-dropdown-toggle").setAttribute("aria-expanded", open); }); $$("#navLinks a").forEach((link) => link.addEventListener("click", () => menu.classList.remove("active"))); }
function initScroll() { const header = $("#siteHeader"); const top = $("#backTop"); addEventListener("scroll", () => { header.classList.toggle("scrolled", scrollY > 20); top.classList.toggle("visible", scrollY > 500); }); top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" })); const sections = $$("main section[id]"); const links = $$(".nav-links > a"); const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) links.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`)); }), { rootMargin: "-35% 0px -55%" }); sections.forEach((section) => observer.observe(section)); }
function initSearch() { $("#repoSearch").addEventListener("input", (event) => { const query = event.target.value.toLowerCase(); renderRepositories(repositories.filter((repo) => `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase().includes(query))); }); }

renderFeaturedProjects(); initTyping(); initTheme(); initNavigation(); initScroll(); initSearch(); loadGitHub(); $("#year").textContent = new Date().getFullYear(); $("#modalClose").addEventListener("click", closeProject); $("#projectModal").addEventListener("click", (event) => { if (event.target.id === "projectModal") closeProject(); }); addEventListener("keydown", (event) => { if (event.key === "Escape") closeProject(); });
