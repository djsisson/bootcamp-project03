const g_sidebar = document.querySelector(".sidebar");
const g_imagelist = document.querySelector(".image-list");
const g_indicators = document.querySelector(".indicatorsList");
const g_thumbnails = document.querySelector(".thumbnail-list");
const g_sidebarDescription = document.querySelector(".description");
const g_sidebarLink = document.querySelector(".link-to-img");

const API_KEY = "krWf6L0GeP3XVFBXdpW9OqanZkGftF2wOK_gB5sbuxQ";
const g_Url = "https://api.unsplash.com/search/photos?page=1&";
const g_RandUrl = "https://api.unsplash.com/photos/random?";

let g_currentlyActive = 0;
let g_images =[]