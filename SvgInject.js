function getAllImage(){
    let allImageArray = document.querySelectorAll("[data-image='svg']");
    if(allImageArray.length > 0){
        allImageArray.forEach(async (image) =>{
            let imageSrc = image.getAttribute("src");
            if(imageSrc.length > 0){
                let imageCode = await loadImgCode(imageSrc);
                if(imageCode != undefined){
                    appendImage(imageCode, image)
                }
            }
        })
    }
}

async function loadImgCode(imageSrc){
   if(imageSrc.length > 0){
       let imageData = await fetch(imageSrc)
       .then(data => {
          return data.text()
       })
       return imageData;
   }
}

function appendImage(svgToAdd, image){
    let SVGCODE = svgToAdd;
    let divToinsertSvg = document.createElement("div")
    divToinsertSvg.classList.add("guide-image")
    divToinsertSvg.innerHTML = SVGCODE;
    let svgInsideDiv = divToinsertSvg.querySelector("svg")
    let pathsInsideSvg = svgInsideDiv.querySelectorAll("[stroke='white']");
    svgInsideDiv.setAttribute("width","100%");
    svgInsideDiv.setAttribute("height","100%");
    pathsInsideSvg.forEach(path => {
        path.setAttribute("stroke", "currentColor");
    })
    image.insertAdjacentElement("beforebegin", divToinsertSvg);
    image.remove();
}

getAllImage();