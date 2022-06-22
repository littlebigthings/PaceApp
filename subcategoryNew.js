let richText = document.querySelector(".rte.w-richtext");
let allHeads = [...richText.querySelectorAll("h2, h3, h4, h5, h6")];
let ddWrapper = document.querySelector("[data-category='wrapper']");
let ddContainer = ddWrapper ? ddWrapper.parentElement : null;
let dropdownData = [];
function headsAndChilds() {
    if (allHeads.length > 0) {
        allHeads.forEach(head => {
            let subCategory = head.nextElementSibling;

            if (head.tagName == 'H2') {
                dropdownData.push({
                    headh2: head,
                    childHeads: [],
                })
                while (subCategory && subCategory.tagName !== 'H2') {
                    dropdownData.forEach(item => {
                        if (item.headh2 == head && allHeads.includes(subCategory)) {
                            let idx = dropdownData.indexOf(item)
                            dropdownData[idx].childHeads.push(subCategory)
                        }
                    })
                    subCategory = subCategory.nextElementSibling;
                }
            }
        })
    }


    if (dropdownData.length > 0) {

        dropdownData.forEach(item => {
            let idx = dropdownData.indexOf(item)
            let data = filterSubHeads(item)
            if (data != null) {
                dropdownData[idx].categoryItems = data
            }
        })
    }

    if (dropdownData.length > 0) {
        addCategories();
    }
    else {
        ddWrapper.remove();
    }

}

function filterSubHeads(item) {
    let firstHead;
    let secondDropdown = [];
    if (item.childHeads.length > 0) {
        item.childHeads.forEach((childHead, index) => {

            if (index == 0) {
                firstHead = childHead;
                secondDropdown.push({
                    cate2head: firstHead,
                    cate3data: [],
                })
            }
            else {
                if (childHead.tagName.replace(/\D/g, '') > firstHead.tagName.replace(/\D/g, '') || childHead.tagName != 'H3') {
                    secondDropdown.forEach(item => {
                        if (item.cate2head == firstHead) {
                            let idx = secondDropdown.indexOf(item);
                            secondDropdown[idx].cate3data.push(childHead)
                        }
                    })
                }
                else {
                    firstHead = childHead;
                    secondDropdown.push({
                        cate2head: firstHead,
                        cate3data: [],
                    })
                }
            }

        })
    }

    if (secondDropdown.length > 0) {
        return secondDropdown
    }
    else {
        return null
    }

}

function addCategories() {
    // console.log(dropdownData)
    dropdownData.forEach(levelFirst => {

        let clonedWrapper = ddWrapper.cloneNode(true);
        let dropDownWrp = clonedWrapper.querySelector("[data-wrp='dropdown-wrp']")
        let hTwoHead = clonedWrapper.querySelector("[data-head='h2']");
        let dropdownTemplate = clonedWrapper.querySelector("[data-item='dd']");

        hTwoHead.innerText = levelFirst.headh2.innerText;
        hTwoHead.setAttribute("data-category-title", convertToSlug(levelFirst.headh2.innerText));
        levelFirst.headh2.setAttribute("data-title", convertToSlug(levelFirst.headh2.innerText));

        if (levelFirst.categoryItems && levelFirst.categoryItems.length > 0) {
            levelFirst.categoryItems.forEach(subCategory => {

                let dropdown = dropdownTemplate.cloneNode(true);
                let ddMenu = dropdown.querySelector("[data-list='dropdown']");
                let ddMenuHead = dropdown.querySelector("[data-head='h3']");
                let ddItem = dropdown.querySelector("[data-head='heading']");

                ddMenuHead.innerText = subCategory.cate2head.innerText;
                ddMenuHead.parentElement.setAttribute("data-category-title", convertToSlug(subCategory.cate2head.innerText));
                subCategory.cate2head.setAttribute("data-title", convertToSlug(subCategory.cate2head.innerText));

                if (subCategory.cate3data && subCategory.cate3data.length > 0) {

                    subCategory.cate3data.forEach(thirdCategory => {
                        let newDDItem = ddItem.cloneNode(true);
                        newDDItem.innerText = thirdCategory.innerText;
                        newDDItem.setAttribute("data-category-title", convertToSlug(thirdCategory.innerText));
                        thirdCategory.setAttribute("data-title", convertToSlug(thirdCategory.innerText));
                        ddItem.remove()
                        ddMenu.appendChild(newDDItem);
                    })

                }
                else {
                    ddMenu.remove()
                }

                ddItem.remove()
                dropDownWrp.appendChild(dropdown)
            })
            ddContainer.appendChild(clonedWrapper)
        }
        else {
            ddContainer.appendChild(clonedWrapper)
        }
        dropdownTemplate.remove()
    })
    ddWrapper.remove();
    addScrollListener();
}

function addScrollListener() {
    if (ddContainer != undefined) {
        let allHeadsCategory = ddContainer.querySelectorAll("[data-category-title]");
        if (allHeadsCategory.length > 0) {
            allHeadsCategory.forEach(head => {
                head.addEventListener("click", (e) => {
                    // console.log(e.currentTarget)
                    openCloseDropdown(e.currentTarget)
                    // rotateIcon(e.currentTarget.querySelector('.dd-icon'), e.currentTarget)

                    let headSlug = e.currentTarget.getAttribute("data-category-title");
                    if (headSlug.length > 0) {
                        let elmTillScroll = richText.querySelector(`[data-title='${headSlug}']`);
                        elmTillScroll.scrollIntoView({
                            behavior: "smooth",
                            block: "center",

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

function openCloseDropdown(currentClick, target) {
    // if(target && target.getAttribute("data-head") == "heading") return;

    let allDropdowns = document.querySelectorAll("[data-list='dropdown']");
    let currentDropdown = currentClick.nextElementSibling;
    if (currentDropdown && currentDropdown.hasAttribute("data-list")) {
        let currentIcon = currentClick.querySelector(".dd-icon");
        let currentIconState = currentIcon.getAttribute("data-active");

        if (allDropdowns.length > 0) {
            if (currentIcon && currentIconState == "false") {
                currentIcon.style.transform = "rotate(0deg)";
                currentDropdown.classList.remove("hide-dd")
                currentIcon.setAttribute("data-active", true);

            } else if (currentIcon && currentIconState == "true") {
                currentDropdown.classList.add("hide-dd")
                currentIcon.style.transform = "rotate(-90deg)";
                currentIcon.setAttribute("data-active", false)
            }
            allDropdowns.forEach(dropdown => {
                // console.log(dropdown)
                // console.log(!dropdown.classList.contains("hide-dd") && dropdown != currentDropdown)
                if (!dropdown.classList.contains("hide-dd") && dropdown != currentDropdown) {
                    // console.log(dropdown)
                    let icon = dropdown.previousElementSibling.querySelector('.dd-icon');
                    dropdown.classList.add("hide-dd")
                    icon.style.transform = "rotate(-90deg)";
                    icon.setAttribute("data-active", false)
                }
            })
            }
        }
    }

    headsAndChilds()

// cases.
// if there are h3,h4,h5,h6 present before h2 in start then it won't consider it.