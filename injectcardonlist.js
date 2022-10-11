class INJECTCARDONGRID {
    constructor() {
        this.card = document.querySelector("[data-item='sub-card']");
        this.gridToInjectCard = document.querySelector("[data-inject='sub-card']");
        this.clonedCard = (this.card != undefined) && this.card.cloneNode(true);
        this.paginationCta = null;
        this.init();
    }

    init() {
       this.loadScript();
    }
    injectCard() {
        if (this.gridToInjectCard != undefined && this.gridToInjectCard.childElementCount > 0 && this.clonedCard != undefined) {
            if (this.gridToInjectCard.childElementCount >= 5) {
                this.gridToInjectCard.children[5].insertAdjacentElement("afterend", this.clonedCard);
            }
            else if (this.gridToInjectCard.childElementCount < 5) {
                this.gridToInjectCard.lastElementChild.insertAdjacentElement("beforebegin", this.clonedCard);
            }
        }
        if (this.card != undefined && this.card != null) this.card.remove();
    }

    onPageChange() {
        this.paginationCta = document.querySelectorAll("[data-cta='pagination']");
        if (this.paginationCta != null && this.paginationCta.length > 0) {
            this.paginationCta.forEach(cta => {
                cta.addEventListener('click', () => {
                    setTimeout(() => this.injectCard(), 300)

                })
            })
        }
    }

    loadScript() {
        let script = ['https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsload@1/cmsload.js']
        this.injectScript(script)
            .then(() => {
                this.injectCard();
                setTimeout(() => this.onPageChange(), 500)

            }).catch(error => {
                console.error(error);
            });
    }

    injectScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.addEventListener('load', resolve);
            script.addEventListener('error', e => reject(e.error));
            document.body.appendChild(script);
        });
    }
}
window.addEventListener("load", () => {
    new INJECTCARDONGRID;
})