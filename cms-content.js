class UPDATECONENT {
    constructor() {
        this.updateHeadData = document.querySelectorAll("[data-update-from='head']");
        this.toShowIntoScreen = document.querySelector("[data-open='view']");
        this.updateHeadTo = document.querySelector("[data-update-to='head']");
        this.updateContentTo = document.querySelector("[data-update-to='content']");
        this.btnArr = document.querySelectorAll("[data-listen='click']");
        this.timeline = gsap.timeline({duration:0.1, ease:"linear",})
        this.init();
    }

    init() {
        this.listenToclick();
        this.activeDefault();
    }

    listenToclick() {
        if (this.btnArr.length > 0) {
            this.btnArr.forEach((btn, index) => {
                btn.addEventListener("click", (e) => {
                    let clickedOn = e.currentTarget;
                    if(!clickedOn.classList.contains("active-red") && !clickedOn.classList.contains("full-radius"))clickedOn.classList.add("active-tab");
                    if(clickedOn != null || clickedOn != undefined){
                        let updateHeadData = clickedOn.querySelector("[data-update-from='head']").innerHTML;
                        let updateContentData = clickedOn.querySelector("[data-update-from='content']").innerHTML;
                        if(updateHeadData.length>0 && updateContentData.length > 0){
                            this.updateHeadTo.innerHTML = updateHeadData;
                            this.updateContentTo.innerHTML = updateContentData;
                            this.animateContent()
                        }
                    }
                    if(window.screen.width<786)this.toShowIntoScreen.scrollIntoView({behavior:"smooth"});
                    this.removeActive(clickedOn);
                });

                if(index == 4){
                    btn.classList.add("active-red");
                    btn.querySelector("[data-update-from='head']").classList.add("set-red");
                }
            })
        }
    }

    activeDefault(){
        let parentEle = this.updateHeadData[0].parentElement;
        let headData = parentEle.querySelector("[data-update-from='head']").innerHTML;
        let contentData = parentEle.querySelector("[data-update-from='content']").innerHTML;
        parentEle.classList.add("active-tab");
        if(headData.length>0 && contentData.length > 0){
            this.updateHeadTo.innerHTML = headData;
            this.updateContentTo.innerHTML = contentData;
        }
    }

    removeActive(clickedOn){
        this.btnArr.forEach(btn => {
            if(btn != clickedOn){
                btn.classList.remove("active-tab")
            }
        })
    }
    animateContent(){
        this.timeline.fromTo(this.updateHeadTo, {opacity:0, y:"-6px",},{ opacity:1, y:0});
        this.timeline.fromTo(this.updateContentTo, {opacity:0, y:"-4px",},{ opacity:1, y:0}, "-=0.5");
    }
}

new UPDATECONENT;