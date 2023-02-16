class ADDSCROLLTOPLGSECTIONS {
    constructor() {
        this.allGuideCards = document.querySelectorAll("[wrapper-guide='card']");
        this.allGuideSections = document.querySelectorAll("[wrapper-guide='section']");
        this.topSection = document.querySelector("[wrapper-observer='top']");
        this.sideBarIsStyled = false;
        this.activeCard = null;
        this.sideBarElm = document.querySelector("[data-cards='wrapper']");
        this.whiteArrow = document.querySelector("[data-arrow='white']");
        this.blackArrow = document.querySelector("[data-arrow='black']");
        this.observer;
        this.classesObj = {
            guideWrapper: 'guide-left-sidebar',
            cardWrap: 'card-full-width',
            guideCard: 'guide-card-small',
            guideImage: 'guide-image-small',
            colorBlack: 'color-black',
            colorWhite: 'color-white',
        }
        this.init();
    }

    init() {
        this.getAllImage();
    }

    getAllImage() {
        let allImageArray = document.querySelectorAll("[data-image='svg']");
        let initial = 0;
        if (allImageArray.length > 0) {
            allImageArray.forEach(async (image) => {
                let imageSrc = image.getAttribute("src");
                if (imageSrc.length > 0) {
                    let imageCode = await this.loadImgCode(imageSrc);
                    if (imageCode != undefined) {
                        initial++;
                        this.appendImage(imageCode, image)
                    }
                }
                if (initial == allImageArray.length) {
                    this.addSlugToCardsAndSections();
                }
            })
        }
    }

    async loadImgCode(imageSrc) {
        if (imageSrc.length > 0) {
            let imageData = await fetch(imageSrc)
                .then(data => {
                    return data.text()
                })
            return imageData;
        }
    }

    appendImage(svgToAdd, image) {
        let SVGCODE = svgToAdd;
        let divToinsertSvg = document.createElement("div")
        divToinsertSvg.classList.add("guide-image")
        divToinsertSvg.setAttribute("data-image", "svg");
        divToinsertSvg.innerHTML = SVGCODE;
        let svgInsideDiv = divToinsertSvg.querySelector("svg")
        let pathsInsideSvg = svgInsideDiv.querySelectorAll("[stroke='white']");
        svgInsideDiv.setAttribute("width", "100%");
        svgInsideDiv.setAttribute("height", "100%");
        pathsInsideSvg.forEach(path => {
            path.setAttribute("stroke", "currentColor");
        })
        image.insertAdjacentElement("beforebegin", divToinsertSvg);
        image.remove();
    }

    addSlugToCardsAndSections() {
        // Add data attributes to cards and sections.
        if (this.allGuideCards.length > 0 && this.allGuideSections.length > 0) {
            this.allGuideCards.forEach(card => {
                if (card.querySelector("[data-text='slug']") == null) return;
                let cardText = card.querySelector("[data-text='slug']").textContent;
                if (cardText.length > 0) {
                    let cardSlug = this.convertToSlug(cardText);
                    card.setAttribute("data-card", cardSlug);
                    card.setAttribute("href", `#${cardSlug}`);
                }
            })
            this.allGuideSections.forEach(section => {
                if (section.querySelector("[data-text='slug']") == null) return;
                let sectionText = section.querySelector("[data-text='slug']").textContent;
                if (sectionText.length > 0) {
                    let sectionSlug = this.convertToSlug(sectionText);
                    section.setAttribute("data-section", sectionSlug);
                    section.id = sectionSlug;
                }
            })
            // Add click to scroll functionality.
            // this.addClickToScroll();
            // Observer Functionality.
            this.addScrollObserver();
        }
    }

    addClickToScroll() {
        this.allGuideCards.forEach(card => {
            card.addEventListener('click', (evt) => {
                let cardSlug = evt.currentTarget.getAttribute("data-card");
                let sectionToScroll = document.querySelector(`[data-section='${cardSlug}']`)
                let elDistanceToTop = window.pageYOffset + sectionToScroll.getBoundingClientRect().top;
                let navHeight = document.querySelector(".navigation").clientHeight;
                window.scrollTo({
                    top: elDistanceToTop - navHeight,
                    behavior: "smooth",
                });
            })
        })
    }

    addScrollObserver() {

        let options = {
            root: null,
            rootMargin: "0px",
            threshold: window.innerWidth >= 992 ? 0.1 : 0.02,
        };
        this.observer = new IntersectionObserver(this.handleCards.bind(this), options);
        this.allGuideSections.forEach(section => {
            let sectionTop = section.querySelector("[inner-section='top']");
            let sectionBtm = section.querySelector("[inner-section='bottom']");
            this.observer.observe(section);
            this.observer.observe(sectionTop);
            this.observer.observe(sectionBtm);
        })
        if (this.topSection != null) {
            this.observer.observe(this.topSection);
        }

    }
    handleCards(entries, observer) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let activeSection = entry.target;
                if (activeSection.getAttribute("data-section") != null) {
                    if (this.sideBarIsStyled != true && window.innerWidth >= 992) {
                        this.sideBarIsStyled = true;
                        this.styleSideBar();
                    }
                }
                if (activeSection.getAttribute("inner-section") == 'top') {
                    let sectionSlug = activeSection.parentElement.getAttribute("data-section");
                    let cardToActive = document.querySelector(`[data-card='${sectionSlug}']`);
                    this.activeCard = cardToActive;
                    // hide or show arrows
                    if (window.innerWidth <= 992) {
                        this.whiteArrow.style.display = "block";
                        this.blackArrow.style.display = "none";
                    }
                    if (window.innerWidth >= 992 && this.sideBarIsStyled) this.setSideBarToBlackOrWhite(this.classesObj.colorBlack, this.classesObj.colorWhite);
                }
                if (activeSection.getAttribute("inner-section") == 'bottom') {
                    if (window.innerWidth <= 992) {
                        this.whiteArrow.style.display = "none";
                        this.blackArrow.style.display = "block";
                    }
                    if (window.innerWidth >= 992 && this.sideBarIsStyled) this.setSideBarToBlackOrWhite(this.classesObj.colorWhite, this.classesObj.colorBlack);
                }
                if (activeSection.getAttribute("wrapper-observer") != null && window.innerWidth >= 992) {
                    if (this.sideBarIsStyled) {
                        this.sideBarIsStyled = false;
                        this.resetSideBar();
                    }
                }

            }
        });
    };
    styleSideBar() {
        if (this.sideBarElm != null) {
            let allChilds = this.sideBarElm.childNodes;
            if (allChilds.length > 0) {
                allChilds.forEach(element => {
                    let cardElement = element;
                    let linkElement = element.querySelector("[wrapper-guide='card']");
                    let image = element.querySelector("[data-image='svg']");
                    if (cardElement != null && linkElement != null && image != null) {
                        cardElement.classList.add(this.classesObj.cardWrap);
                        linkElement.classList.add(this.classesObj.guideCard);
                        image.classList.add(this.classesObj.guideImage);
                    }
                });
                this.sideBarElm.classList.add(this.classesObj.guideWrapper);
            }
        }
    }

    resetSideBar() {
        if (this.sideBarElm != null) {
            let allChilds = this.sideBarElm.childNodes;
            if (allChilds.length > 0) {
                allChilds.forEach(element => {
                    let cardElement = element;
                    let linkElement = element.querySelector("[wrapper-guide='card']");
                    let image = element.querySelector("[data-image='svg']");
                    if (cardElement != null && linkElement != null && image != null) {
                        cardElement.classList.remove(this.classesObj.cardWrap);
                        linkElement.classList.remove(this.classesObj.guideCard);
                        linkElement.classList.remove(this.classesObj.colorBlack);
                        linkElement.classList.remove(this.classesObj.colorWhite);
                        image.classList.remove(this.classesObj.guideImage);
                    }
                });
                this.sideBarElm.classList.remove(this.classesObj.guideWrapper);
            }
        }
    }

    setSideBarToBlackOrWhite(navItemClass, activeItemClass) {
        if (this.sideBarElm != null) {
            let allChilds = this.sideBarElm.childNodes;
            if (allChilds.length > 0) {
                allChilds.forEach(element => {
                    let linkElement = element.querySelector("[wrapper-guide='card']");
                    let image = element.querySelector("[data-image='svg']");
                    image.classList.add(this.classesObj.guideImage);
                    if (linkElement != null && linkElement != this.activeCard) {
                        linkElement.classList.add(navItemClass);
                        linkElement.classList.remove(activeItemClass);
                    }
                    if (linkElement === this.activeCard) {
                        linkElement.classList.remove(navItemClass);
                        linkElement.classList.add(activeItemClass);
                    }
                });
            }
        }
    }

    convertToSlug(Text) {
        return Text.toLowerCase()
            .replace(/[^\w ]+/g, "")
            .replace(/ +/g, "-");
    }

}
window.addEventListener("load", new ADDSCROLLTOPLGSECTIONS)