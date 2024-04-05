const g_sidebar = document.querySelector(".sidebar");
const g_imagelist = document.querySelector(".image-list");
const g_indicators = document.querySelector(".indicatorsList");
const g_thumbnails = document.querySelector(".thumbnail-list");
const scrollType = { inline: "start", behavior: "smooth" };
const API_KEY = "krWf6L0GeP3XVFBXdpW9OqanZkGftF2wOK_gB5sbuxQ";
const g_Url = "https://api.unsplash.com/search/photos?page=1&";
let scrollTimeout = 0;
let g_currentlyActive = 0;

function eventHandlers() {
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
  });
  document.querySelector(".next").addEventListener("click", (e) => {
    e.stopPropagation();
    activateIndicator((g_currentlyActive += 1));
  });
  Array.from(g_indicators.children).forEach((x, i) =>
    x.addEventListener("click", (e) => {
      g_imagelist.children[i].scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
      activateIndicator(i);
      e.stopPropagation();
    })
  );
  document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  Array.from(g_thumbnails.children).forEach((x, i) =>
    x.addEventListener("click", (e) => {
      g_imagelist.children[i].scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
      activateIndicator(i);
      e.stopPropagation();
    })
  );
  document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
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

function activateIndicator(index) {
  index = ((index % 10) + 10) % 10;
  g_currentlyActive = index;
  Array.from(g_indicators.children).forEach((indicator, i) => {
    indicator.classList.toggle("active", i === g_currentlyActive);
  });
  Array.from(g_thumbnails.children).forEach((thumbnail, i) => {
    thumbnail.classList.toggle("active", i === g_currentlyActive);
  });

  g_imagelist.children[g_currentlyActive].scrollIntoView({
    inline: "start",
    behavior: "smooth",
  });
  if (scrollTimeout != 0) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(myscroll, 500);
}

function myscroll() {
  g_thumbnails.children[g_currentlyActive].scrollIntoView({
    inline: "center",
    behavior: "smooth",
  });
}

eventHandlers();
activateIndicator(0);

async function getImages(query) {
  let response = await fetch(`${g_Url}query=${query}&client_id=${API_KEY}`);
  let data = await response.json();
  g_images = data.results;
  loadImages();
}

function loadImages(){
for (let i = 0; i < g_images.length; i++){
    g_thumbnails.children[i].innerHTML = "";
    let thumbnailImg = document.createElement("img");
    thumbnailImg.src=g_images[i].urls.thumb;
    thumbnailImg.alt=g_images[i].alt_description;
    thumbnailImg.classList.toggle("thumbnailImg");
    g_thumbnails.children[i].appendChild(thumbnailImg);

    let mainImg = document.createElement("img");
    mainImg.src=g_images[i].urls.regular;
    mainImg.alt=g_images[i].alt_description;
    mainImg.classList.toggle("mainImg");
    g_imagelist.children[i].appendChild(mainImg);
}
}