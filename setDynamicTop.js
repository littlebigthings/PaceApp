function setInitialTop() {
    let closeCta = document.querySelector("[data-cta='close']");
    let elmToSetTopPreperty = document.querySelector("[data-div='sticky']");
    let navWithBar = document.querySelector("[data-div='navbar']");
    let onlyNav = document.querySelector("[data-div='main-nav']");

    if (elmToSetTopPreperty != undefined && navWithBar != undefined && onlyNav != undefined && closeCta != undefined) {
        let topVal = parseInt(window.getComputedStyle(navWithBar).getPropertyValue("height"));
        elmToSetTopPreperty.style.top = `${topVal + 5}px`;
        closeCta.addEventListener("click", () => {
            setTimeout(() => {
                topVal = parseInt(window.getComputedStyle(onlyNav).getPropertyValue("height"));
                elmToSetTopPreperty.style.top = `${topVal + 5}px`;
            }, 500)
        })
    }
}

setInitialTop();