function eventHandlers() {
  document.querySelector(".info-down").addEventListener("click", (e) => {
    e.stopPropagation();
    updateDescription();
    g_sidebar.classList.toggle("active");
    document.querySelector(".close-sidebar").tabIndex =
      g_sidebar.classList.contains("active") - 1;
    document.querySelector(".link-to-img > a").tabIndex =
      g_sidebar.classList.contains("active") - 1;
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft") {
      activateIndicator((g_currentlyActive -= 1));
      scrollImgIntoView();
    } else if (e.code == "ArrowRight") {
      activateIndicator((g_currentlyActive += 1));
      scrollImgIntoView();
    }
  });

  g_imagelist.addEventListener("scrollend", (e) => {
    if (
      !window.matchMedia("(min-width: 600px) and (min-height: 600px)").matches
    ) {
      activateIndicator(
        (g_imagelist.scrollLeft / g_imagelist.scrollWidth) * 10
      );
    }

    scrollImgIntoView();
    thumbnailScroll();
    updateDescription();
  });

  document.querySelector(".random").addEventListener("click", (e) => {
    getImages(`count=10`, true);
  });

  document.querySelector(".search-form").addEventListener("click", (e) => {
    e.stopPropagation();
    g_sidebar.classList.toggle("active", false);
  });

  document.querySelector(".search-input").addEventListener("focus", (e) => {
    e.currentTarget.select();
  });

  document.querySelector(".close-sidebar").addEventListener("click", (e) => {
    g_sidebarLink.tabindex = -1;
    document.querySelector(".close-sidebar").tabIndex = -1;
    document.querySelector(".link-to-img > a").tabIndex = -1;
    g_sidebar.classList.toggle("active");
  });

  document.querySelector(".open-sidebar").addEventListener("click", (e) => {
    e.stopPropagation();
    updateDescription();
    g_sidebar.classList.toggle("active");
  });

  document.querySelector(".prev").addEventListener("click", (e) => {
    e.stopPropagation();
    activateIndicator((g_currentlyActive -= 1));
    scrollImgIntoView();
  });

  document.querySelector(".next").addEventListener("click", (e) => {
    e.stopPropagation();
    activateIndicator((g_currentlyActive += 1));
    scrollImgIntoView();
  });

  Array.from(g_indicators.children).forEach((x, i) =>
    x.addEventListener("click", (e) => {
      e.target.classList.toggle("active", true);
      activateIndicator(i);
      scrollImgIntoView();
    })
  );

  Array.from(g_thumbnails.children).forEach((x, i) => {
    x.addEventListener("click", (e) => {
      activateIndicator(i);
      scrollImgIntoView();
      e.stopPropagation();
    });
    x.addEventListener("focusin", (e) => {
      activateIndicator(i);
      scrollImgIntoView();
      e.stopPropagation();
    });
  });

  document.querySelector(".search").addEventListener("keydown", (e) => {
    e.stopPropagation();
  });

  document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    getImages(e.target.input.value);
    if (
      window.matchMedia("(min-width: 600px) and (min-height: 600px)").matches
    ) {
      document.querySelector(".info-down").focus();
    } else {
      document.querySelector(".open-sidebar").focus();
    }
  });

  document.querySelector(".prev-thumbnail").addEventListener("click", (e) => {
    g_thumbnails.scrollTo({ left: 0, behavior: "auto" });
  });

  document.querySelector(".next-thumbnail").addEventListener("click", (e) => {
    g_thumbnails.scrollTo({ left: g_imagelist.scrollWidth, behavior: "auto" });
  });

  document.querySelector(".image-viewer").addEventListener("click", (e) => {
    g_sidebar.classList.toggle("active", false);
    document.querySelector(".close-sidebar").tabIndex =
      g_sidebar.classList.contains("active") - 1;
    document.querySelector(".link-to-img > a").tabIndex =
      g_sidebar.classList.contains("active") - 1;
    if (
      window.matchMedia("(min-width: 600px) and (min-height: 600px)").matches
    ) {
      let relpos = e.x / e.target.getBoundingClientRect().width;
      if (relpos < 0.33) {
        activateIndicator((g_currentlyActive -= 1));
        scrollImgIntoView();
      } else if (relpos > 0.66) {
        activateIndicator((g_currentlyActive += 1));
        scrollImgIntoView();
      }
    }
  });
}
