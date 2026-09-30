/* =========================================================
   DIVIN LÉONARD KOUMBI — PORTFOLIO
   Animation Engine
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR — GLASSMORPHISM AU SCROLL
       ===================================================== */

    const header = document.querySelector(".header");

    const updateHeader = () => {

        if (window.scrollY > 35) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
            });

        });

    }


    /* =====================================================
       ANIMATION ENGINE
       -----------------------------------------------------
       IMPORTANT :

       threshold faible =
       l'animation peut être relancée régulièrement.

       L'élément est observé lorsqu'il entre et sort
       de la zone visible.
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".section-heading, " +
        ".about__text, " +
        ".about__highlight, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".contact__box"
    );


    animatedElements.forEach((element, index) => {

        element.classList.add("scroll-reveal");

        element.style.setProperty(
            "--animation-delay",
            `${(index % 4) * 90}ms`
        );

    });


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                } else {

                    /*
                     * On retire la classe lorsque l'élément
                     * quitte réellement l'écran.
                     *
                     * Lorsqu'il revient :
                     * l'animation recommence.
                     */

                    entry.target.classList.remove("is-visible");

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "-40px 0px -40px 0px"
        }
    );


    animatedElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       PARALLAX DES CARTES
       ===================================================== */

    const cards = document.querySelectorAll(
        ".project-card, .skill-card"
    );

    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) return;

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       CURSEUR — PETIT EFFET MAGNÉTIQUE
       ===================================================== */

    const magneticElements = document.querySelectorAll(
        ".btn, .logo, .project-link"
    );


    magneticElements.forEach(element => {

        element.addEventListener("mousemove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX - rect.left - rect.width / 2;

            const y =
                event.clientY - rect.top - rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });


        element.addEventListener("mouseleave", () => {

            element.style.transform = "";

        });

    });


    /* =====================================================
       SMOOTH ANCHOR
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav a");


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink =
                        document.querySelector(
                            `.nav a[href="#${entry.target.id}"]`
                        );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       MICRO PARALLAX DU HERO
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    const heroCard =
        document.querySelector(".hero-card");


    if (hero && heroCard) {

        window.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth < 800) return;

                const x =
                    (event.clientX / window.innerWidth - 0.5);

                const y =
                    (event.clientY / window.innerHeight - 0.5);

                heroCard.style.transform =
                    `rotateX(${y * -5}deg)
                     rotateY(${x * 7}deg)
                     translateY(${y * -10}px)`;

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       CONSOLE SIGNATURE
       ===================================================== */

    console.log(
        "%c DIVIN LÉONARD KOUMBI ",
        "background:#4f8cff;color:white;padding:8px 14px;font-weight:bold;border-radius:6px;"
    );

    console.log(
        "%c Développeur Web & Formateur ",
        "color:#72a5ff;font-size:14px;"
    );

});








/* =========================================================
   ROBOT HERO — REPLAY ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero-robot");

    if (!hero) return;

    /*
     * Permet de rejouer toute la scène
     * lorsque le Hero ressort puis revient
     * dans le viewport.
     */

   

   


    


    heroObserver.observe(hero);


    /* =========================
       PARALLAXE LÉGÈRE
    ========================== */

    if (
        window.matchMedia("(pointer:fine)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        const scene = hero.querySelector(".hero-robot__scene");

        if (scene) {

            window.addEventListener(
                "mousemove",
                event => {

                    const x =
                        (event.clientX / window.innerWidth - 0.5);

                    const y =
                        (event.clientY / window.innerHeight - 0.5);

                    scene.style.setProperty(
                        "--mouse-x",
                        `${x * 10}px`
                    );

                    scene.style.setProperty(
                        "--mouse-y",
                        `${y * 10}px`
                    );

                },
                { passive: true }
            );

        }

    }

});