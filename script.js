function scrollImgIntoView() {
  g_imagelist.scrollTo({
    left: g_imagelist.getBoundingClientRect().width * g_currentlyActive,
    behavior: "smooth",
  });
}

function thumbnailScroll() {
  let scrollpos =
    g_thumbnails.children[0].getBoundingClientRect().width *
    (g_currentlyActive + 0.5);
  scrollpos -= g_thumbnails.getBoundingClientRect().width / 2;
  g_thumbnails.scrollTo({ left: scrollpos, behavior: "smooth" });
}

function activateIndicator(index) {
  index = (Math.round(index) + 10) % 10;
  g_currentlyActive = parseInt(index);
  Array.from(g_indicators.children).forEach((indicator, i) => {
    indicator.classList.toggle("active", i == g_currentlyActive);
  });
  Array.from(g_thumbnails.children).forEach((thumbnail, i) => {
    thumbnail.classList.toggle("active", i == g_currentlyActive);
  });
}

function loadFromSave() {
  g_images = JSON.parse(localStorage.getItem("localimages")) || [];
  if (g_images.length == 0) {
    getImages(`count=10`, true);
  } else {
    loadImages();
  }
}

async function getImages(query, random = false) {
  let urlToSend = "";
  if (random) {
    urlToSend = `${g_RandUrl}${query}&client_id=${API_KEY}`;
  } else {
    urlToSend = `${g_Url}query=${query}&client_id=${API_KEY}`;
  }
  let response = await fetch(urlToSend);
  let data = await response.json();
  if (random) {
    g_images = data;
  } else {
    g_images = data.results;
  }
  saveImages();
  loadImages();
}

function loadImages() {
  for (let i = 0; i < g_images.length; i++) {
    g_thumbnails.children[i].innerHTML = "";
    let thumbnailImg = document.createElement("img");
    thumbnailImg.src = `${g_images[i].urls.raw}&auto=compress, format&w=200&fit=max`;
    thumbnailImg.alt = g_images[i].alt_description;
    thumbnailImg.title = g_images[i].alt_description;
    thumbnailImg.tabIndex = "0";
    thumbnailImg.classList.toggle("thumbnailImg");
    g_thumbnails.children[i].appendChild(thumbnailImg);
    let mainImg = document.createElement("img");
    mainImg.src = `${g_images[i].urls.raw}&auto=format&fit=crop&w=1080&q=80&fit=max`;
    mainImg.alt = g_images[i].alt_description;
    mainImg.srcset = `
${g_images[i].urls.raw}?w=400&h=400&fit=crop&auto=format 400w,
${g_images[i].urls.raw}?w=600&h=600&fit=crop&auto=format 600w,
${g_images[i].urls.raw}?w=800&h=800&fit=crop&auto=format 800w,
${g_images[i].urls.raw}?w=1000&h=1000&fit=crop&auto=format 1000w,
${g_images[i].urls.raw}?w=1200&h=1200&fit=crop&auto=format 1200w,
`;
    mainImg.classList.toggle("mainImg");
    g_imagelist.children[i].appendChild(mainImg);
  }
  activateIndicator(0);
  scrollImgIntoView();
  updateDescription();
}

function saveImages() {
  localStorage.setItem("localimages", JSON.stringify(g_images));
}

function updateDescription() {
  g_sidebarDescription.textContent =
    g_images[g_currentlyActive].description ||
    g_images[g_currentlyActive].alt_description;
  g_sidebarLink.innerHTML = `<a tabindex="-1" href="${g_images[g_currentlyActive].links.html}">Link To Image</a>`;
}

eventHandlers();
activateIndicator(0);
loadFromSave();
