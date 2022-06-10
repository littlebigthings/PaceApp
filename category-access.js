let richText = document.querySelector(".rte.w-richtext");
let allHeads = [...richText.querySelectorAll("h2, h3, h4, h5, h6")];
let ddWrapper = document.querySelector("[data-category='wrapper']");
let ddContainer = ddWrapper? ddWrapper.parentElement : null;
function addCategories(){
    if(ddContainer == null)return;
    allHeads.forEach(heads => {
        // *** See note
        let headItem = heads.nextElementSibling;
        let clonedWrapper = ddWrapper.cloneNode(true);
        let hTwoHead = clonedWrapper.querySelector("[data-head='h2']");
        let ddMenu = clonedWrapper.querySelector("[data-list='dropdown']");
        let ddMenuHead = clonedWrapper.querySelector("[data-head='h3']");
        let ddItem = clonedWrapper.querySelector("[data-head='heading']");
        if(heads.tagName == 'H2'){
            hTwoHead.innerText = heads.innerHTML;
            while (headItem && headItem.tagName !== 'H2') {
                if (allHeads.includes(headItem) && headItem.tagName == 'H3') {
                    let firstCategory = ddMenuHead;
                    firstCategory.innerHTML = headItem.innerHTML;
                }
                else if(allHeads.includes(headItem) && headItem.tagName == 'H4'){
                    let secondCategory = null;
                    if(ddMenuHead.innerText != "Subcategory"){
                        secondCategory = ddItem
                        secondCategory.innerHTML = headItem.innerHTML;
                        ddMenu.appendChild(secondCategory)
                    }
                    else{
                        secondCategory = ddMenuHead
                        secondCategory.innerHTML = headItem.innerHTML;
                    }
                }
                else if(allHeads.includes(headItem) && headItem.tagName == 'H5'){
                    let thirdCategory = null;
                    if(ddMenuHead.innerText != "Subcategory"){
                        thirdCategory = ddItem.cloneNode(true);
                        thirdCategory.innerHTML = headItem.innerHTML;
                        ddMenu.appendChild(thirdCategory)
                    }
                    else{
                        thirdCategory = ddMenuHead
                        thirdCategory.innerHTML = headItem.innerHTML;
                    }
                }
                else if(allHeads.includes(headItem) && headItem.tagName == 'H6'){
                    let fourthCategory = null;
                    if(ddMenuHead.innerText != "Subcategory"){
                        fourthCategory = ddItem.cloneNode(true);
                        fourthCategory.innerHTML = headItem.innerHTML;
                        ddMenu.appendChild(fourthCategory)
                    }
                    else{
                        fourthCategory = ddMenuHead
                        fourthCategory.innerHTML = headItem.innerHTML;
                    }
                    
                }
                headItem = headItem.nextElementSibling;
            }
            ddItem.remove()
            ddContainer.appendChild(clonedWrapper)
        }
    });
    ddWrapper.remove()
}
addCategories()