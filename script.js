const salePrograms = [
  {
    title: "Mua 5 lọ tặng 1 lọ",
    detail: "Giá không đổi theo chương trình combo.",
    price: "150k"
  },
  {
    title: "Mua 10 lọ tặng 2 lọ",
    detail: "Ưu đãi đặc biệt cho khách lấy số lượng lớn.",
    price: "250k"
  },
  {
    title: "Mua 1 lọ 50ml tặng 1 lọ 6ml",
    detail: "Phù hợp khách dùng thử và chăm cây tại nhà.",
    price: "160k"
  },
  {
    title: "Mua 1 lọ 100ml tặng 2 lọ 6ml",
    detail: "Combo tiết kiệm nhất cho khách dùng thường xuyên.",
    price: "300k"
  }
];

const saleCards = document.getElementById("sale-cards");
const planSelect = document.getElementById("plan");
const gallery = document.getElementById("gallery");
const galleryModal = document.getElementById("gallery-modal");
const galleryModalImage = document.getElementById("gallery-modal-image");
const galleryPrevButton = document.getElementById("gallery-prev");
const galleryNextButton = document.getElementById("gallery-next");
const galleryCloseButton = document.getElementById("gallery-close");
const pageSections = Array.from(document.querySelectorAll("[data-page]"));
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const availablePages = new Set(["trang-chu", "gioi-thieu", "huong-dan", "lien-he"]);
const galleryImages = [
  "Images/hero-bg.jpg",
  "Images/gallery-02.jpg",
  "Images/gallery-03.jpg",
  "Images/gallery-04.jpg",
  "Images/gallery-05.jpg",
  "Images/gallery-06.jpg",
  "Images/gallery-07.jpg",
  "Images/gallery-08.jpg",
  "Images/gallery-09.jpg",
  "Images/gallery-10.jpg",
  "Images/gallery-11.jpg",
  "Images/gallery-12.jpg",
  "Images/gallery-13.jpg"
];

let activeGalleryIndex = 0;

function renderSales() {
  if (!saleCards || !planSelect) return;

  saleCards.innerHTML = salePrograms
    .map(
      (program) => `
        <article class="sale-card">
          <h3>${program.title}</h3>
          <p>${program.detail}</p>
          <span class="price">Giá: ${program.price}</span>
        </article>
      `
    )
    .join("");

  planSelect.innerHTML = salePrograms
    .map((program) => `<option value="${program.title}">${program.title} - ${program.price}</option>`)
    .join("");
}

function renderGallery() {
  if (!gallery) return;

  gallery.innerHTML = galleryImages
    .map((src, index) => `<img src="${src}" alt="Ảnh sản phẩm HB101 số ${index + 1}" loading="lazy" data-gallery-index="${index}" />`)
    .join("");
}

function handleGalleryLightbox() {
  if (
    !gallery
    || !galleryModal
    || !galleryModalImage
    || !galleryPrevButton
    || !galleryNextButton
    || !galleryCloseButton
  ) {
    return;
  }

  const updateLightboxImage = (index) => {
    const safeIndex = (index + galleryImages.length) % galleryImages.length;
    activeGalleryIndex = safeIndex;
    galleryModalImage.src = galleryImages[safeIndex];
    galleryModalImage.alt = `Ảnh khách hàng HB101 số ${safeIndex + 1}`;
  };

  const openLightbox = (index) => {
    updateLightboxImage(index);
    galleryModal.classList.add("is-open");
    galleryModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    galleryModal.classList.remove("is-open");
    galleryModal.setAttribute("aria-hidden", "true");
    galleryModalImage.src = "";
    document.body.style.overflow = "";
  };

  gallery.addEventListener("click", (event) => {
    const targetImage = event.target.closest("img[data-gallery-index]");
    if (!targetImage) return;

    const index = Number(targetImage.dataset.galleryIndex);
    if (!Number.isInteger(index)) return;
    openLightbox(index);
  });

  galleryPrevButton.addEventListener("click", () => {
    updateLightboxImage(activeGalleryIndex - 1);
  });

  galleryNextButton.addEventListener("click", () => {
    updateLightboxImage(activeGalleryIndex + 1);
  });

  galleryCloseButton.addEventListener("click", closeLightbox);

  galleryModal.addEventListener("click", (event) => {
    if (event.target === galleryModal) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!galleryModal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      updateLightboxImage(activeGalleryIndex - 1);
    }

    if (event.key === "ArrowRight") {
      updateLightboxImage(activeGalleryIndex + 1);
    }
  });
}

function handleForm() {
  const form = document.getElementById("lead-form");
  const message = document.getElementById("form-message");

  if (!form || !message || !planSelect) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      message.textContent = "Vui lòng điền đầy đủ họ tên và số điện thoại.";
      return;
    }

    message.textContent = `Cảm ơn ${name}! Chúng tôi sẽ liên hệ qua số ${phone} trong thời gian sớm nhất.`;
    form.reset();
    planSelect.selectedIndex = 0;
  });
}

function setActivePage(pageId) {
  if (!pageSections.length) return;

  document.body.classList.add("view-enabled");
  pageSections.forEach((section) => {
    section.classList.toggle("is-active", section.dataset.page === pageId);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.navLink === pageId);
  });
}

function routeToHash({ shouldScroll = false } = {}) {
  const hashId = window.location.hash.replace("#", "").trim() || "trang-chu";
  const targetSection = document.getElementById(hashId);
  const targetPage = targetSection?.dataset?.page;
  const pageId = targetPage && availablePages.has(targetPage)
    ? targetPage
    : availablePages.has(hashId)
      ? hashId
      : "trang-chu";
  const scrollTarget = targetSection || document.getElementById(pageId);

  setActivePage(pageId);

  if (shouldScroll && scrollTarget) {
    scrollTarget.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (!shouldScroll) {
    window.scrollTo(0, 0);
  }
}

function handleCompactNavigation() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hashId = link.getAttribute("href")?.replace("#", "").trim();
    if (!hashId) return;

    const targetSection = document.getElementById(hashId);
    if (!targetSection) return;

    event.preventDefault();
    const pageId = targetSection.dataset.page || hashId;
    setActivePage(pageId);
    window.history.pushState(null, "", `#${hashId}`);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.addEventListener("hashchange", () => routeToHash({ shouldScroll: true }));
}

function handleGuideModal() {
  const modal = document.getElementById("guide-modal");
  const openButton = document.getElementById("open-guide-modal");
  const closeButton = document.getElementById("close-guide-modal");
  const gotoGuideButton = document.getElementById("goto-guide");

  if (!modal || !openButton || !closeButton) return;

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };

  openButton.addEventListener("click", () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  });

  closeButton.addEventListener("click", closeModal);

  if (gotoGuideButton) {
    gotoGuideButton.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

renderSales();
renderGallery();
handleForm();
handleCompactNavigation();
handleGuideModal();
handleGalleryLightbox();
routeToHash();

