function removeLazyLoad(){
    let allImages = document.querySelectorAll("img");
    allImages.forEach(image => {
        image.setAttribute("loading", "eager")
    })
}

removeLazyLoad()