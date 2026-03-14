const navbar = document.querySelector("#navbar");
const darkToggle = document.querySelector("#dark-toggle");
const menuLinks = document.querySelectorAll(".menu-link");
const modeTersimpan = localStorage.getItem("darkMode");

if (modeTersimpan === "aktif") {
    document.body.classList.add("dark-mode");
    darkToggle.textContent = "☀️ Light Mode";
}

darkToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
    const aktif = document.body.classList.contains("dark-mode");
    darkToggle.textContent = aktif ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("darkMode", aktif ? "aktif" : "nonaktif");

});


window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {
        navbar.classList.add("navbar-scroll");
    } else {
        navbar.classList.remove("navbar-scroll");
    }

});


menuLinks.forEach((link) => {

    link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = link.getAttribute("href");
        const targetEl = document.querySelector(targetId);

        if (targetEl) {
            targetEl.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});

const semuaAngka = document.querySelectorAll(".stat-angka");
const animasiCounter = (elemen, target) => {

    let angkaSaatIni = 0;
    const kenaikan = Math.ceil(target / 80);
    const timer = setInterval(() => {

        angkaSaatIni += kenaikan;

        if (angkaSaatIni >= target) {
            elemen.textContent = target.toLocaleString("id-ID");
            clearInterval(timer);
        } else {
            elemen.textContent = angkaSaatIni.toLocaleString("id-ID");
        }

    }, 20);
};

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                const elemen = entry.target;
                const target = parseInt(elemen.dataset.target);
                animasiCounter(elemen, target);
                observer.unobserve(elemen);
            }

        });

    },
    { threshold: 0.5 }
);


semuaAngka.forEach((angka) => {
    observer.observe(angka);
});