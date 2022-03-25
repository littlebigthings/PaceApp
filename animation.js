import { DrawSVGPlugin } from "./DrawSVGPlugin.js";
function animateHero() {
    let mainImage = document.querySelector("[data-wrapper='svgblock']");
    let arrows = document.querySelectorAll("[data-arrow='uparrow']");
    let horizLineLeft = document.querySelectorAll("[data-line='horizontal-left']");
    let horizLineRight = document.querySelectorAll("[data-line='horizontal-right']");
    let glowLine = document.querySelectorAll("[data-line='glow']");
    let smallCircle = document.querySelector("[data-glow='circle']");
    let drawPath=document.querySelector("[data-path='btm-top']");
    let animTimeline = gsap.timeline({ duration: 1, ease: "linear", });
    if (mainImage == null || mainImage == undefined) return;
    animTimeline.from(drawPath, { drawSVG: "100% 100%",stagger: 0.5 });
    animTimeline.from(arrows, { y: "-2px", transformOrigin: "bottom", repeat: -1, yoyo: true },);
    animTimeline.from(smallCircle, { scale: .5, transformOrigin: "center", repeat: -1, yoyo: true, },);
    animTimeline.from(glowLine, { opacity: 0.5, repeat: -1, yoyo: true, },);
    animTimeline.from(horizLineRight, { drawSVG: "0% 0%" ,repeat: -1, yoyo: true, stagger: 0.5 });
    animTimeline.from(horizLineLeft, { drawSVG: "0% 0%" ,repeat: -1, yoyo: true, stagger: 0.5 });
}
function organicSecAnimation() {
    let triggerAnimElem = document.querySelector("[data-trigger='scroll']");
    let lines = document.querySelectorAll("[data-path='line']");
    let greenLines = document.querySelectorAll("[data-line='vertical-green']")
    let circle = document.querySelectorAll("[data-circle='scale']");
    let expArrow = document.querySelectorAll("[data-arr='exp']");
    let animTimeline = gsap.timeline({ duration: 1.5, stagger: 0.5, });
    gsap.set(triggerAnimElem, {autoAlpha: 0});
    ScrollTrigger.create({
        trigger: triggerAnimElem,
        start: "top 20%",
        onEnter: self =>{ 
                animTimeline.to(triggerAnimElem, {autoAlpha: 1, duration:0})
                animTimeline.from(lines, { drawSVG: "100% 100%" });
                animTimeline.from(greenLines, { drawSVG: "50% 50%" });
                animTimeline.from(circle, { scale: 0, opacity: 0, transformOrigin: "center" })
                animTimeline.from(expArrow, {opacity:0, scale:0, transformOrigin:"center"})
                self.disable();
         }
      })
}

animateHero();
organicSecAnimation();