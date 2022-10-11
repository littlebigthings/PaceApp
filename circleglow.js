// code to Animate circle on 404 page.
function animateCircle(){
    let smallCircle = document.querySelectorAll("[data-glow='circle']");
    let animTimeline = gsap.timeline({ duration: 1, ease: "linear", });
    animTimeline.from(smallCircle, { scale: 0, transformOrigin: "center", repeat: -1, yoyo: true, duration:1},);
}

animateCircle();