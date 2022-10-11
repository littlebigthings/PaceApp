function cmsInjections() {
    let cardData = document.querySelector("[data-item='sub-card']");
    let injectCardElm = document.querySelectorAll("[data-move='sub-card']");

    if (cardData != undefined && injectCardElm.length > 0) {
        injectCardElm.forEach(block => {
            block.appendChild(cardData.cloneNode(true));
        })
        cardData.remove();
    }
    else {
        cardData.remove();
    }
}

cmsInjections()