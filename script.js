const g_sidebar = document.querySelector(".sidebar");
const g_imagelist = document.querySelector(".image-list");
const g_indicators = document.querySelector(".indicatorsList");
const scrollType = { inline: "start", behavior: "smooth" };
let g_currentlyActive = 0;

function eventHandlers() {
  document.querySelector(".close-sidebar").addEventListener("click", (e) => {
    g_sidebar.classList.toggle("active");
  });
  document.querySelector(".open-sidebar").addEventListener("click", (e) => {
    g_sidebar.classList.toggle("active");
  });
  document.querySelector(".prev").addEventListener("click", (e) => {
    activateIndicator(g_currentlyActive -= 1);
    
  });
  document.querySelector(".next").addEventListener("click", (e) => {
    activateIndicator(g_currentlyActive += 1);
  });
  Array.from(g_indicators.children).forEach((x, i) =>
    x.addEventListener("click", () => {
      g_imagelist.children[i].scrollIntoView({
        inline: "start",
        behavior: "smooth",
      });
      activateIndicator(i);
    })
  );
  document.querySelector(".search").addEventListener("submit",(e) =>{
    e.preventDefault();
  })
}

function activateIndicator(index) {
    index = ((index % 10)+ 10) % 10;
  g_currentlyActive = index;
  Array.from(g_indicators.children).forEach((indicator, i) => {
    indicator.classList.toggle("active", i === g_currentlyActive);
  });
  g_imagelist.children[g_currentlyActive].scrollIntoView({
    inline: "start",
    behavior: "smooth",
  });
}

eventHandlers();
activateIndicator(0);