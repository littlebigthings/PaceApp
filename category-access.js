let richText = document.querySelector(".rte.w-richtext");
let allHeads = [...richText.querySelectorAll("h2, h3, h4, h5, h6")];
let ddWrapper = document.querySelector("[data-category='wrapper']");
let ddContainer = ddWrapper ? ddWrapper.parentElement : null;

function addCategories() {

    if (ddContainer == null && allHeads.length > 0) return;

    allHeads.forEach(heads => {
        let headItem = heads.nextElementSibling;
        let clonedWrapper = ddWrapper.cloneNode(true);
        let hTwoHead = clonedWrapper.querySelector("[data-head='h2']");
        let ddMenu = clonedWrapper.querySelector("[data-list='dropdown']");
        let ddMenuHead = clonedWrapper.querySelector("[data-head='h3']");
        let ddItem = clonedWrapper.querySelector("[data-head='heading']");
        let dropdown = clonedWrapper.querySelector("[data-item='dd']");

        if (heads.tagName == 'H2') {

            hTwoHead.innerHTML = heads.innerText;
            hTwoHead.setAttribute("data-category-title", convertToSlug(heads.innerText));
            heads.setAttribute("data-title", convertToSlug(heads.innerText));
            while (headItem && headItem.tagName !== 'H2') {

                if (allHeads.includes(headItem) && headItem.tagName == 'H3') {
                    let firstCategory = ddMenuHead;
                    firstCategory.innerHTML = headItem.innerText;
                    firstCategory.setAttribute("data-category-title", convertToSlug(headItem.innerText));
                    headItem.setAttribute("data-title", convertToSlug(headItem.innerText));
                    console.log("h3")
                }

                else if (allHeads.includes(headItem) && headItem.tagName == 'H4') {

                    let secondCategory = null;

                    if (ddMenuHead.innerHTML != "Subcategory") {
                        secondCategory = ddItem.cloneNode(true)
                        ddMenu.appendChild(secondCategory)
                        // console.log("h4")
                    }

                    else {
                        secondCategory = ddMenuHead
                        // console.log("h3 new")
                    }
                    secondCategory.innerHTML = headItem.innerText;
                    secondCategory.setAttribute("data-category-title", convertToSlug(headItem.innerText));
                    headItem.setAttribute("data-title", convertToSlug(headItem.innerText));

                }

                else if (allHeads.includes(headItem) && headItem.tagName == 'H5') {

                    let thirdCategory = null;

                    if (ddMenuHead.innerHTML != "Subcategory") {
                        thirdCategory = ddItem.cloneNode(true);
                        ddMenu.appendChild(thirdCategory)
                        // console.log("h5")
                    }

                    else {
                        thirdCategory = ddMenuHead
                        // console.log("h5 new")
                    }
                    thirdCategory.innerHTML = headItem.innerText;
                    thirdCategory.setAttribute("data-category-title", convertToSlug(headItem.innerText));
                    headItem.setAttribute("data-title", convertToSlug(headItem.innerText));

                }

                else if (allHeads.includes(headItem) && headItem.tagName == 'H6') {

                    let fourthCategory = null;

                    if (ddMenuHead.innerHTML != "Subcategory") {
                        fourthCategory = ddItem.cloneNode(true);
                        ddMenu.appendChild(fourthCategory)
                        // console.log("h6")
                    }

                    else {
                        fourthCategory = ddMenuHead
                        // console.log("h6 new")
                    }

                    fourthCategory.innerHTML = headItem.innerText;
                    fourthCategory.setAttribute("data-category-title", convertToSlug(headItem.innerText));
                    headItem.setAttribute("data-title", convertToSlug(headItem.innerText));

                }

                headItem = headItem.nextElementSibling;
            }

            ddItem.remove()
            if (ddMenu.childNodes.length <= 0 && ddMenuHead.innerText == 'Subcategory') {
                dropdown.remove()
            }

            ddContainer.appendChild(clonedWrapper)
        }

        else {
            ddWrapper.remove()
        }

    });

    ddWrapper.remove()
    addScrollListener();
    checkHaveDropdown();
}
function addScrollListener() {
if(ddContainer != undefined){
    let allHeadsCategory = ddContainer.querySelectorAll("[data-category-title]");
    if(allHeadsCategory.length > 0){
        allHeadsCategory.forEach(head =>{
            head.addEventListener("click",(e) => {
                let headSlug = e.target.getAttribute("data-category-title");
                if(headSlug.length > 0){
                    let elmTillScroll = richText.querySelector(`[data-title='${headSlug}']`);
                    elmTillScroll.scrollIntoView({
                        behavior:"smooth",
                        block:"start",
                        
                    })
                }
            })
        })
    }
}

}
function convertToSlug(Text) {
    return Text.toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
}

function checkHaveDropdown(){
    let leftCol = document.querySelector(".left-col");
    if(leftCol != undefined){
        if(leftCol.childElementCount <= 0){
            leftCol.style.marginRight = 0;
        }
        else{
            return;
        }
    }
}
addCategories()