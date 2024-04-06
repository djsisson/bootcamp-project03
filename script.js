const g_sidebar = document.querySelector(".sidebar");
const g_imagelist = document.querySelector(".image-list");
const g_indicators = document.querySelector(".indicatorsList");
const g_thumbnails = document.querySelector(".thumbnail-list");
const scrollType = { inline: "start", behavior: "smooth" };
const API_KEY = "krWf6L0GeP3XVFBXdpW9OqanZkGftF2wOK_gB5sbuxQ";
const g_Url = "https://api.unsplash.com/search/photos?page=1&";
const g_RandUrl = "https://api.unsplash.com/photos/random?";
let scrollThumbTimeout = 0;
let scrollendTimeout = 0;
let g_currentlyActive = 0;

function eventHandlers() {
  document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
      activateIndicator((g_currentlyActive -= 1));
      scrollImgIntoView(g_currentlyActive);
    } else if (e.code == "ArrowRight") {
      activateIndicator((g_currentlyActive += 1));
      scrollImgIntoView(g_currentlyActive);
    }
  });
  g_imagelist.addEventListener("scrollend", (e) => {
    if (scrollendTimeout != 0) {
      clearTimeout(scrollendTimeout);
    }

    scrollendTimeout = setTimeout(() => {
      thumbnailScroll();
    }, 500);
  });

  g_thumbnails.addEventListener("scrollend", (e) => {
    if (scrollThumbTimeout != 0) {
      clearTimeout(scrollThumbTimeout);
    }

    scrollThumbTimeout = setTimeout(() => {
      scrollImgIntoView(g_currentlyActive);
    }, 500);
  });
  g_imagelist.addEventListener("touchend", () => {
    activateIndicator((g_imagelist.scrollLeft / g_imagelist.scrollWidth) * 10);
  });
  document.querySelector(".search-input").addEventListener("focus", (e) => {
    e.currentTarget.select();
  });
  document.querySelector(".close-sidebar").addEventListener("click", (e) => {
    g_sidebar.classList.toggle("active");
  });
  document.querySelector(".open-sidebar").addEventListener("click", (e) => {
    g_sidebar.classList.toggle("active");
  });
  document.querySelector(".prev").addEventListener("click", (e) => {
    e.stopPropagation();

    activateIndicator((g_currentlyActive -= 1));
    scrollImgIntoView(g_currentlyActive);
  });
  document.querySelector(".next").addEventListener("click", (e) => {
    e.stopPropagation();
    activateIndicator((g_currentlyActive += 1));
    scrollImgIntoView(g_currentlyActive);
  });
  Array.from(g_indicators.children).forEach((x, i) =>
    x.addEventListener("click", (e) => {
      e.target.classList.toggle("active", true);
      scrollImgIntoView(i);

      activateIndicator(i);
      e.stopPropagation();
    })
  );

  Array.from(g_thumbnails.children).forEach((x, i) =>
    x.addEventListener("click", (e) => {
      scrollImgIntoView(i);
      activateIndicator(i);
      e.stopPropagation();
    })
  );

  document.querySelector(".search").addEventListener("keydown", (e) => {
    e.stopPropagation();
  });
  document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    g_imagelist.focus();
    getImages(e.target.input.value);
  });
  const scrollAmount = g_thumbnails.children[0].getBoundingClientRect().width;
  document.querySelector(".prev-thumbnail").addEventListener("click", (e) => {
    g_thumbnails.scrollTo({ left: 0, behavior: "smooth" });
  });
  document.querySelector(".next-thumbnail").addEventListener("click", (e) => {
    g_thumbnails.scrollTo({ left: scrollAmount * 10, behavior: "smooth" });
  });
  document.querySelector(".image-viewer").addEventListener("click", (e) => {
    g_sidebar.classList.toggle("active", false);
  });
}

function scrollImgIntoView(i) {
  g_imagelist.children[i].scrollIntoView({
    inline: "start",
    behavior: "smooth",
  });
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

function thumbnailScroll() {
  g_thumbnails.children[g_currentlyActive].scrollIntoView({
    inline: "center",
    behavior: "smooth",
  });
}

eventHandlers();
activateIndicator(0);
loadFromSave();

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
    thumbnailImg.src = g_images[i].urls.thumb;
    thumbnailImg.alt = g_images[i].alt_description;
    thumbnailImg.classList.toggle("thumbnailImg");
    g_thumbnails.children[i].appendChild(thumbnailImg);

    let mainImg = document.createElement("img");
    mainImg.src = g_images[i].urls.regular;
    mainImg.alt = g_images[i].alt_description;
    mainImg.classList.toggle("mainImg");
    g_imagelist.children[i].appendChild(mainImg);
  }
}

function saveImages() {
  localStorage.setItem("localimages", JSON.stringify(g_images));
}
