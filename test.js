function rndColour() {
  return Math.round(Math.random() * 255);
}

const bigImageContainer = document.querySelector(".Image-Container");

function generateDivs(n) {
  bigImageContainer.replaceChildren();
  document.documentElement.style.setProperty("--totalImages", n);
  for (let i = 0; i < n; i++) {
    const imageContainer = document.createElement("div");
    imageContainer.style.order = i+1;
    imageContainer.classList.toggle("img-box");
    imageContainer.setAttribute("gridId",i+1);
    imageContainer.style.backgroundColor = `rgb(${rndColour()},${rndColour()},${rndColour()})`;
    imageContainer.textContent=i;
    bigImageContainer.appendChild(imageContainer);
    imageContainer.addEventListener("click", (e) => imageContainerClick(e));
  }
}

function imageContainerClick(e) {
  let rect = e.target.getClientRects()[0];
  if (e.x < rect.width / 3) {
     let element = document.querySelector(`[gridId="${numImages}"]`)
    let i = parseInt(element.style.order);
    i-=numImages;
    element.style.order = i;
    element.setAttribute("gridid",i);
    changeOrder(1);
    if (bigImageContainer.firstChild == e.target) {
      bigImageContainer.lastChild.scrollIntoView({ behaviour: "smooth" });
    } else {
      e.target.previousElementSibling.scrollIntoView({ behaviour: "smooth" });
      
    }
    // e.target.previousElementSibling.scrollIntoView({ behaviour: "smooth" });
   

  } else if (e.x > (2 * rect.width) / 3) {

    let element = document.querySelector(`[gridId="${1}"]`)
    let i = parseInt(element.style.order);
    i+=numImages
    element.style.order = i;
    element.setAttribute("gridid",i);
    changeOrder(-1);
    if (bigImageContainer.lastChild == e.target) {
      bigImageContainer.firstChild.scrollIntoView({ behaviour: "smooth" });
    } else {
      e.target.nextElementSibling.scrollIntoView({ behaviour: "smooth" });
      
    }
    
  } else {
  }
}

function changeOrder(offset) {
  for (let i = 0; i < numImages; i++) {
    // console.log(bigImageContainer.children[i]);
    // let currentOrder = parseInt(bigImageContainer.children[i].style.order);
    // currentOrder = (((currentOrder += offset)% numImages)+numImages) % numImages;
    // bigImageContainer.children[i].style.order = currentOrder;
    let currentOrder = parseInt(bigImageContainer.children[i].style.order)
    currentOrder+=offset
    bigImageContainer.children[i].style.order = currentOrder;
    bigImageContainer.children[i].setAttribute("gridid",currentOrder);

  }
}

const numImages = 10;
generateDivs(numImages);
bigImageContainer.children[numImages/2].scrollIntoView({ behaviour: "instant" });
// changeOrder(10);
