function updateJob() {
    let elmToUpdate = document.querySelector("[data-update='job']");
    let elmToGetCount = document.querySelectorAll("[data-item='count']");
    if (elmToGetCount.length > 0 && elmToUpdate != undefined) {
        elmToUpdate.textContent = elmToGetCount.length;
    } else {
        elmToUpdate.textContent = 0;
    }
}
window.addEventListener("load", () => {
    updateJob();
})