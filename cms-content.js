class UPDATECONENT {
    constructor() {
        this.updateHeadData = document.querySelectorAll("[data-update-from='head']");
        this.toShowIntoScreen = document.querySelector("[data-open='view']");
        this.updateHeadTo = document.querySelector("[data-update-to='head']");
        this.updateContentTo = document.querySelector("[data-update-to='content']");
        this.btnArr = document.querySelectorAll("[data-listen='click']");
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
                    if(!clickedOn.classList.contains("active-red"))clickedOn.classList.add("active-tab");
                    if(clickedOn != null || clickedOn != undefined){
                        let updateHeadData = clickedOn.querySelector("[data-update-from='head']").innerHTML;
                        let updateContentData = clickedOn.querySelector("[data-update-from='content']").innerHTML;
                        if(updateHeadData.length>0 && updateContentData.length > 0){
                            this.updateHeadTo.innerHTML = updateHeadData;
                            this.updateContentTo.innerHTML = updateContentData;
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
        this.updateHeadData[0].parentElement.click();
    }

    removeActive(clickedOn){
        this.btnArr.forEach(btn => {
            if(btn != clickedOn){
                btn.classList.remove("active-tab")
            }
        })
    }

}

new UPDATECONENT;