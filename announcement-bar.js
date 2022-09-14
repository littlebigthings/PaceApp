const showHideAnnouncement = () => {
    let barElm = document.querySelector("[data-bar='announcement']");
    let closeCta = document.querySelector("[data-cta='close']")
    let hasSession = sessionStorage.getItem("isclosed")
    if(hasSession == null){
        if(closeCta != undefined){
            if(barElm != undefined)barElm.classList.remove("hide-tagline")
            closeCta.addEventListener("click",() => {
                sessionStorage.setItem("isclosed", true)
            })
        }
    }else{
        if(barElm != undefined)barElm.classList.add("hide-tagline")
    }
}

window.addEventListener("resize", () => {
    showHideAnnouncement();
})

showHideAnnouncement();