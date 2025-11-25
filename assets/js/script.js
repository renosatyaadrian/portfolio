'use strict';

// 1. Sidebar Toggle Fix: Pastikan fungsi dasar toggle ada
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { 
        elementToggleFunc(sidebar); 
    });
}


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}


// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    if (select) {
        elementToggleFunc(select);
    }
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
// Hanya berjalan jika ada tombol filter (tidak ada jika halaman Portfolio dihapus)
if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {

      filterBtn[i].addEventListener("click", function () {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;

      });
    }
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form && form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else if (formBtn) {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    // Dapatkan teks tombol yang diklik (contoh: "projects", "resume")
    let linkText = this.innerHTML.toLowerCase();
    
    // Temukan dan tampilkan halaman yang cocok
    for (let j = 0; j < pages.length; j++) {
      if (linkText === pages[j].dataset.page) {
        // Aktifkan halaman dan link navigasi yang sesuai
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active"); 
        window.scrollTo(0, 0);
      } else {
        // Nonaktifkan halaman dan link navigasi lainnya
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

// --- (Di bagian paling akhir assets/js/script.js) ---

// Handle navigasi ketika tombol navigasi detail diklik (misalnya dari portfolio-1.html)
const handleDetailNavigation = function() {
  document.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', function(e) {
          // Kita biarkan perilaku default (mengganti window.location.href)
          // agar browser memuat index.html dengan hash yang benar
      });
  });
}
handleDetailNavigation();


// Tambahan: Handle navigasi saat memuat dari URL detail (e.g., portfolio-1.html)
document.addEventListener('DOMContentLoaded', function() {
  const hash = window.location.hash.substring(1); // Ambil hash tanpa '#'
  
  if (hash) {
      // Cari link navigasi yang cocok dengan hash (e.g., 'projects' atau 'about')
      // Kita menggunakan selector button[data-nav-link] karena semua link navigasi Anda adalah button.
      const targetLink = document.querySelector(`.navbar-list button[data-nav-link]:is([data-page="${hash}"], [data-page="${hash.toLowerCase()}"])`);
      
      if (targetLink) {
          // Aktifkan halaman dan link navigasi yang sesuai secara manual.
          // Kita tidak bisa hanya memanggil .click() karena mungkin ada logic lain.
          
          // Nonaktifkan semua link navigasi dan halaman
          navigationLinks.forEach(link => link.classList.remove('active'));
          pages.forEach(page => page.classList.remove('active'));
          
          // Aktifkan link yang dituju
          targetLink.classList.add('active');

          // Aktifkan halaman yang dituju
          const targetPage = document.querySelector(`[data-page="${hash}"]`);
          if (targetPage) {
              targetPage.classList.add('active');
          }
          window.scrollTo(0, 0);

      } else {
          // Jika hash tidak ditemukan (misalnya '#projects' belum dimuat), 
          // kita harus memicu klik pada tombol 'projects'
          const navLinkText = hash.charAt(0).toUpperCase() + hash.slice(1);
          const fallbackLink = Array.from(navigationLinks).find(link => link.innerText.toLowerCase() === hash);
          
          if (fallbackLink) {
              fallbackLink.click();
          }
      }
  }
});