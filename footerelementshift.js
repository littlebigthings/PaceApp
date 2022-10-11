function shiftElement() {
    let formWrapper = document.querySelector("[data-item='form-wrapper']"),
        linksWrapper = document.querySelector("[data-item='link-wrapper']"),
        elementToShift = document.querySelector("[data-item='social-item']"),
        isShifted = false;
    if (formWrapper != undefined && linksWrapper != undefined && elementToShift != undefined) {
        if (window.screen.width < 768 && !isShifted) {
            linksWrapper.appendChild(elementToShift);
            isShifted = true;
        }
        window.addEventListener("resize", () => {
            if (window.screen.width < 768 && !isShifted) {
                linksWrapper.appendChild(elementToShift);
                isShifted = true;
            }
            else if (window.screen.width >= 768 && isShifted) {
                formWrapper.appendChild(elementToShift);
                isShifted = false;
            }
        })
    }
}

shiftElement();