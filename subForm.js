function handleForm(formParent) {
    if (formParent == undefined) return;
    let mainform = formParent.querySelector("[data-item='form']"),
        successBlock = formParent.querySelector("[data-item='success']"),
        inputElm = mainform != undefined && mainform.querySelector("[data-item='email-input']"),
        submitCta = mainform != undefined && mainform.querySelector("[data-item='submit-cta']");

    if (mainform != undefined) {
        mainform.addEventListener("submit", () => {
            const config = { attributesList: ["style"], attributeOldValue: true, };
            // Callback function to execute when mutations are observed
            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.attributeName == "style") {
                        if (mainform.style.display == 'none') mainform.style.display = 'block';
                        if (successBlock.style.display == "block") {
                            inputElm.setAttribute("readonly", "readonly");
                            submitCta.setAttribute("disabled", true)
                            submitCta.style.cursor = "not-allowed";
                        }
                    }
                }
            };
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(callback);
            observer.observe(mainform, config);
        })
    }
}


window.addEventListener("load", () => {
    let allForm = document.querySelectorAll("[data-item='form-wrapper']");
    if (allForm.length > 0) {
        allForm.forEach(form => {
            handleForm(form);
        });
    }
})