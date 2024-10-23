gsap.registerPlugin(ScrollTrigger);

window.onload = function () {
    window.scrollTo(0, 0);
};

// gsap 
let tl = gsap.timeline();
// navbar
tl.from(".name .item", {
    opacity: 0,
    y: -20,
    duration: .5,
    stagger: 0.3
})
tl.from(".menu li", {
    opacity: 0,
    y: -20,
    duration: .5,
    stagger: 0.3
})

// home
tl.from(".intro p", {
    opacity: 0,
    y: 20,
    duration: 0.3,
    stagger: 0.3,
});
tl.from(".intro .resume", {
    opacity: 0,
    y: 20,
    duration: 0.1,
    clearProps: "opacity,transform",
});
tl.fromTo(
    ".intro-img img",
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.3, stagger: 0.3 }
);


// about
gsap.from(".about p.text-center", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".about img.select-none", {
    opacity: 0,
    x: -100,
    duration: 1,
    delay: 0.4,
    scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".about .dots,.about span", {
    opacity: 0,
    x: 100,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".about",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// skills
gsap.from(".skills p", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});
gsap.from(".skills .marquee", {
    scale: 0,
    duration: 1,
    delay: 0.3,
    scrollTrigger: {
        trigger: ".skills",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// image infinite carousel
const loop = horizontalLoop(".marquee__item", {
    repeat: -1,
    paused: false,
    speed: 0.8
});

function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: { ease: "none" },
        onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
        length = items.length,
        startX = items[0].offsetLeft,
        times = [],
        widths = [],
        xPercents = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
        totalWidth,
        curX,
        distanceToStart,
        distanceToLoop,
        item,
        i;
    gsap.set(items, {

        xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
            xPercents[i] = snap(
                (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
                gsap.getProperty(el, "xPercent")
            );
            return xPercents[i];
        }
    });
    gsap.set(items, { x: 0 });
    totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
        gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond
            },
            0
        )
            .fromTo(
                item,
                {
                    xPercent: snap(
                        ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                    )
                },
                {
                    xPercent: xPercents[i],
                    duration:
                        (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false
                },
                distanceToLoop / pixelsPerSecond
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }
    function toIndex(index, vars) {
        vars = vars || {};
        Math.abs(index - curIndex) > length / 2 &&
            (index += index > curIndex ? -length : length);
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }
    tl.next = (vars) => toIndex(curIndex + 1, vars);
    tl.previous = (vars) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index, vars) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true);
    if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
    }
    return tl;
}

// experience
gsap.from(".experience .heading, .detail", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".experience",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".experience ul li", {
    opacity: 0,
    x: -100,
    duration: 0.6,
    stagger: .5,
    scrollTrigger: {
        trigger: ".experience",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".experience .outer", {
    opacity: 0,
    x: 100,
    duration: 0.6,
    stagger: 1,
    scrollTrigger: {
        trigger: ".outer",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// project
gsap.from(".project p", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".project",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".project .project-card", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: .3,
    scrollTrigger: {
        trigger: ".project-card",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// service
gsap.from(".service p", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".service",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

gsap.from(".service .service-card", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: .3,
    scrollTrigger: {
        trigger: ".service-card",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// contact
gsap.from(".contact p", {
    opacity: 0,
    y: 50,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".service",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// contact
gsap.from(".contact input, .contact textarea, .contact button", {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: .3,
    scrollTrigger: {
        trigger: ".contact",
        start: "top 80%",
        toggleActions: "play none none none"
    }
});

// footer
gsap.from(".footer", {
    scale: 0,
    duration: 0.5,
    scrollTrigger: {
        trigger: ".footer",
        start: "top 100%",
        toggleActions: "play none none none"
    }
});

// Others

// small screen menu 
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('bars');
    const menu = document.querySelector('ul');
    const menuItems = document.querySelectorAll('.menu a');

    menuIcon.addEventListener("click", (e) => {
        toggleMenu(e.target);
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });

    function toggleMenu(target) {
        if (target.getAttribute('data-state') === 'menu') {
            target.classList.remove('fa-bars');
            target.classList.add('fa-times');
            target.setAttribute('data-state', 'close');
            menu.classList.add('top-[80px]', 'opacity-100');
        } else {
            closeMenu();
        }
    }

    function closeMenu() {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        menuIcon.setAttribute('data-state', 'menu');
        menu.classList.remove('top-[80px]', 'opacity-100');
    }
});

// Send Email
function sendMail() {

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");

    let ebody = `
    <b> First name: </b> ${fname.value}
    <br/>
    <b> Last name: </b> ${lname.value}
    <br/>
    <b> Email: </b> ${email.value}
    <br/>
    <b> Description: </b> ${subject.value}
    `
    Email.send({
        SecureToken: "0f58f742-490c-46db-808a-632a856009c2",
        To: "amantatla312@gmail.com",
        From: "amantatla312@gmail.com",
        Subject: "My Portfolio",
        Body: ebody
    }).then(
        message => alert(message)
    );
}
