function animateHero(){
    let mainImage = document.querySelector("[data-wrapper='svgblock']");
    let arrows = document.querySelectorAll("[data-arrow='uparrow']");
    let horizLineLeft = document.querySelectorAll("[data-line='horizontal-left']");
    let horizLineRight = document.querySelectorAll("[data-line='horizontal-right']");
    let smallCircle = document.querySelector("[data-glow='circle']")
    let expandArrow = document.querySelectorAll("[data-expand]");
    let heroTimeline = gsap.timeline({duration:1, ease:"linear",});
    let lineTimeline = gsap.timeline({duration:1, ease:"linear",});
    if(mainImage == null || mainImage == undefined)return;
    // heroTimeline.from(mainImage, {scale:.2, transformOrigin: "center",});
    heroTimeline.from(arrows, {y:"-2px", transformOrigin:"bottom", repeat:-1, yoyo:true});
    lineTimeline.from(horizLineRight, {scale:.1, transformOrigin:"left",  repeat:-1, yoyo:true, stagger:0.5});
    lineTimeline.from(horizLineLeft, {scale:.1, transformOrigin:"right",  repeat:-1, yoyo:true, stagger:0.5});
    expandArrow.forEach((arr) => {
        let elmAttr = arr.getAttribute("data-expand");
        if(elmAttr == "expand-tl"){
            heroTimeline.to(arr, {y:"-10px", x:"10px", repeat:-1, yoyo:true,},);
        }
        if(elmAttr == "expand-br"){
            heroTimeline.to(arr, {y:"-10px", x:"10px", repeat:-1, yoyo:true,},);
        }
        if(elmAttr == "expand-tr"){
            heroTimeline.to(arr, {y:"10px", x:"10px", repeat:-1, yoyo:true,},);
        }
        if(elmAttr == "expand-bl"){
            heroTimeline.to(arr, {y:"-10px", x:"-10px", repeat:-1, yoyo:true,}, );
        }
    })
}

animateHero();