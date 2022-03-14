function animateHero(){
    let mainImage = document.querySelector("[data-wrapper='svgblock']");
    let arrows = document.querySelectorAll("[data-arrow='uparrow']");
    let horizLineLeft = document.querySelectorAll("[data-line='horizontal-left']");
    let horizLineRight = document.querySelectorAll("[data-line='horizontal-right']");
    let glowLine = document.querySelectorAll("[data-line='glow']");
    let smallCircle = document.querySelector("[data-glow='circle']");
    let animTimeline = gsap.timeline({duration:1, ease:"linear",});
    if(mainImage == null || mainImage == undefined)return;
    animTimeline.from(arrows, {y:"-2px", transformOrigin:"bottom", repeat:-1, yoyo:true},);
    animTimeline.from(horizLineRight, {scale:.1, transformOrigin:"left",  repeat:-1, yoyo:true, stagger:0.5},);
    animTimeline.from(horizLineLeft, {scale:.1, transformOrigin:"right",  repeat:-1, yoyo:true, stagger:0.5},);
    animTimeline.from(smallCircle, {scale:.5, transformOrigin:"center",  repeat:-1, yoyo:true,},);
    animTimeline.from(glowLine, {opacity:0.5, repeat:-1, yoyo:true,},);
}

animateHero();