import { DrawSVGPlugin } from "./DrawSVGPlugin.js";
function animateHero() {
    let mainImage = document.querySelector("[data-wrapper='svgblock']");
    let arrows = document.querySelectorAll("[data-arrow='uparrow']");
    let horizLineLeft = document.querySelectorAll("[data-line='horizontal-left']");
    let horizLineRight = document.querySelectorAll("[data-line='horizontal-right']");
    let glowLine = document.querySelectorAll("[data-line='glow']");
    let smallCircle = document.querySelector("[data-glow='circle']");
    let drawPath=document.querySelector("[data-path='btm-top']");
    let dotToShowHide = document.querySelectorAll("[data-dot='opacity']");
    let animTimeline = gsap.timeline({ duration: 1, ease: "linear", });
    if (mainImage == null || mainImage == undefined) return;
    animTimeline.from(drawPath, { drawSVG: "100% 100%",stagger: 0.5, duration:2, });
    animTimeline.from(dotToShowHide,{opacity:0, stagger:0.1});
    animTimeline.from(smallCircle, { scale: 0, transformOrigin: "center", repeat: -1, yoyo: true, duration:1},);
    animTimeline.from(glowLine, { opacity: 0.5, repeat: -1, yoyo: true, duration:2},);
    animTimeline.from(arrows, { y: "-2px", transformOrigin: "bottom", repeat: -1, yoyo: true },);
    animTimeline.from(horizLineRight, { drawSVG: "0% 0%" ,repeat: -1, yoyo: true, stagger: 0.5 });
    animTimeline.from(horizLineLeft, { drawSVG: "0% 0%" ,repeat: -1, yoyo: true, stagger: 0.5 });
}
function organicSecAnimation() {
    let triggerAnimElem = document.querySelector("[data-trigger='scroll']");
    let lines = document.querySelectorAll("[data-path='line']");
    let greenLines = document.querySelectorAll("[data-line='vertical-green']")
    let circle = document.querySelectorAll("[data-circle='scale']");
    let expArrow = document.querySelectorAll("[data-arr='exp']");
    let animTimeline = gsap.timeline({ duration: 3, stagger: 0.1, ease:"linear",});
    if(triggerAnimElem != undefined || triggerAnimElem != null){
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
}

function Animatecrm(){
    let iconBlocks = document.querySelectorAll("[data-draw-shape]");
    let triggerAnimElem = document.querySelector("[data-target='trigger']");
    let imageToHideShow = document.querySelector("[data-element='image']");
    let logos = document.querySelectorAll("[data-logo]");
    let drawLines = document.querySelectorAll("[data-draw='line']");
    let oppoLines = document.querySelectorAll("[data-draw='line-opp']");
    let crmBlocks = document.querySelectorAll(".crm-div");
    let animTimeline = gsap.timeline({ease:"linear"});
    if(imageToHideShow != undefined || imageToHideShow != null){
        gsap.set(imageToHideShow, {autoAlpha: 0});
        ScrollTrigger.create({
            trigger: triggerAnimElem,
            start: "top 20%",
            onEnter: self =>{ 
                animTimeline.to(imageToHideShow, {autoAlpha: 1, duration:0})
                animTimeline.from(iconBlocks, { drawSVG: "100% 100%", duration:1.5});
                animTimeline.from(logos, {opacity: 0, duration:1,})
                animTimeline.from(drawLines, { drawSVG: "0% 0%", duration:2,});
                animTimeline.from(oppoLines, { drawSVG: "100% 100%", duration:2,},"-=2");
                animTimeline.from(crmBlocks, { opacity: 0, stagger:"0.5"})
                self.disable();
            }
        })
    }
}

function cmsLineDraw(){
    let trigger = document.querySelector("[data-open='view']");
    let lines = document.querySelectorAll("[data-arrow='right']");
    let textToShow = document.querySelectorAll("[data-text='after-arrow']");
    let animTimeline = gsap.timeline({ease:"linear"});
    if(lines.length > 0 && textToShow.length > 0){
        gsap.set(lines, {autoAlpha: 0});
        gsap.set(textToShow, {opacity: 0});
        ScrollTrigger.create({
            trigger: trigger,
            start: "top 20%",
            onEnter: self =>{ 
                animTimeline.to(lines, {autoAlpha: 1, duration:1})
                animTimeline.fromTo(lines,{width:"0%"},{width:"100%", duration:2, stagger:2})
                animTimeline.fromTo(textToShow, {opacity: 0,},{opacity:1, duration:2, stagger:1.5}, "-=3.5")
                self.disable();
            }
        })
    }
}

function animateBlock(){
    let trigger = document.querySelector("[data-trigger='section-three']");
    let hideShow = document.querySelector("[data-anim='hide-show']");
    let showBlueBlock = [...document.querySelectorAll("[data-draw='blue']")].reverse();
    let showRedBlock = [...document.querySelectorAll("[data-draw='red']")].reverse();
    let showGreenBlock = document.querySelectorAll("[data-draw='green']");
    let dotWrapper = [...document.querySelectorAll("[data-draw='dot']")].reverse();
    let animateLine = [...document.querySelectorAll("[data-draw='vertical']")].reverse();
    let animTimeline = gsap.timeline({ease:"linear"});
    let allCircle = [...document.querySelectorAll("[show='dot']")].reverse();
    let duration = 0.5;
    let stagger = parseFloat(duration/2);
    if(trigger != undefined && hideShow != undefined && showRedBlock.length > 0 && showBlueBlock.length > 0 && showGreenBlock.length > 0){
        animTimeline.set(hideShow, {opacity: 0});
        // gsap.set(drawBorder, {opacity: 0});
        ScrollTrigger.create({
            trigger: trigger,
            start: "top 20%",
            onEnter: self =>{ 
                animTimeline.to(hideShow, {autoAlpha: 1});
                animTimeline.fromTo(allCircle, {opacity:0}, {opacity:1, duration:duration, stagger: stagger})
                animTimeline.from(dotWrapper, {borderColor:"transparent", duration:duration, stagger: stagger})
                animTimeline.fromTo(showGreenBlock,{opacity:0},{opacity:1, duration:duration, })
                animTimeline.fromTo(showBlueBlock,{opacity:0},{opacity:1, duration:duration, })
                animTimeline.fromTo(showRedBlock,{opacity:0},{opacity:1, duration:duration, })
                animTimeline.fromTo(animateLine, {height: 0,},{height:"auto", duration:1, stagger:0.5, yoyo:true, repeat:-1,})
                animTimeline.fromTo(allCircle, {
                    borderRadius:"100%",
                    rotation:0,
                }, {
                    borderRadius:"0%",
                    rotation:90,
                    duration:1,
                    stagger:0.5,
                    yoyo:true,
                    repeat:-1,
                },"-=2");
                self.disable();
            }
        })
    }
}
animateHero();
organicSecAnimation();
Animatecrm();
cmsLineDraw();
animateBlock()