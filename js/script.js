// ================= HEADER LOAD =================
fetch("header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    initHeader();
    initHeaderMenu();
  });

fetch("footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });


// ================= MOBILE MENU =================
function initHeaderMenu() {
  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  if (!openBtn || !closeBtn || !menu || !overlay) return;

  openBtn.addEventListener("click", () => {
    menu.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  function closeMenu() {
    menu.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  }
}


// ================= CATEGORY MENU =================
const openCat = document.getElementById("openCategory");
const closeCat = document.getElementById("closeCategory");
const sideMenu = document.getElementById("sideMenu");
const overlayMenu = document.getElementById("menuOverlay");

if (openCat && closeCat && sideMenu && overlayMenu) {

  openCat.addEventListener("click", () => {
    sideMenu.classList.remove("-translate-x-full");
    overlayMenu.classList.remove("hidden");
  });

  function closeCategoryMenu() {
    sideMenu.classList.add("-translate-x-full");
    overlayMenu.classList.add("hidden");
  }

  closeCat.addEventListener("click", closeCategoryMenu);
  overlayMenu.addEventListener("click", closeCategoryMenu);
}


// ================= SLIDER =================
const slider = document.getElementById("slider");
const dots = document.querySelectorAll(".dot");

let index = 0;

function updateSlider() {
  if (!slider || dots.length === 0) return;

  slider.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => {
    dot.classList.remove("bg-danger");
    dot.classList.add("bg-secoundary");
  });

  dots[index].classList.remove("bg-secoundary");
  dots[index].classList.add("bg-danger");
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
  });
});

// AUTO SLIDE
setInterval(() => {
  if (dots.length === 0) return;
  index = (index + 1) % dots.length;
  updateSlider();
}, 2000);

// INITIAL CALL
// updateSlider();


// const endTime = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

//   setInterval(() => {
//     const now = new Date().getTime();
//     const diff = endTime - now;

//     const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     const m = Math.floor((diff / (1000 * 60)) % 60);
//     const s = Math.floor((diff / 1000) % 60);

//     document.getElementById("days").innerText = d;
//     document.getElementById("hours").innerText = h;
//     document.getElementById("minutes").innerText = m;
//     document.getElementById("seconds").innerText = s;

//   }, 1000);



// ================= FLASH FINAL =================

const flashSlider = document.getElementById("flashSlider");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let indexFlash = 0;
let visibleCards = 4;
let isAnimating = false;

function getVisibleCards() {
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function initFlashSlider() {
  const original = Array.from(flashSlider.children);
  visibleCards = getVisibleCards();

  flashSlider.innerHTML = "";

  const startClones = original.slice(-visibleCards).map(el => el.cloneNode(true));
  const endClones = original.slice(0, visibleCards).map(el => el.cloneNode(true));

  startClones.forEach(el => flashSlider.appendChild(el));
  original.forEach(el => flashSlider.appendChild(el));
  endClones.forEach(el => flashSlider.appendChild(el));

  indexFlash = visibleCards;
  moveSlider(false);
}

function moveSlider(animate = true) {
  const gap = 20;
  const cardWidth = flashSlider.children[0].offsetWidth + gap;

  flashSlider.style.transition = animate ? "transform 0.5s ease" : "none";
  flashSlider.style.transform = `translateX(-${indexFlash * cardWidth}px)`;
}

// NEXT
nextBtn.onclick = () => {
  if (isAnimating) return;
  isAnimating = true;

  indexFlash += 1;
  moveSlider(true);
};

// PREV
prevBtn.onclick = () => {
  if (isAnimating) return;
  isAnimating = true;

  indexFlash -= 1;
  moveSlider(true);
};

flashSlider.addEventListener("transitionend", () => {
  const total = flashSlider.children.length;

  if (indexFlash >= total - visibleCards) {
    indexFlash = visibleCards;
    moveSlider(false);
  }

  if (indexFlash < visibleCards) {
    indexFlash = total - (visibleCards * 2);
    moveSlider(false);
  }

  isAnimating = false;
});

window.addEventListener("load", initFlashSlider);
window.addEventListener("resize", initFlashSlider);


// 
//================ Categories Section =========== //
// 

window.addEventListener("load", () => {

  const categoryItems = document.querySelectorAll(".category-product");
  const categoryPrevBtn = document.getElementById("catprev");
  const categoryNextBtn = document.getElementById("catnext");

  if (!categoryItems.length || !categoryPrevBtn || !categoryNextBtn) {
    console.error("Category elements not found ❌");
    return;
  }

  let categoryIndex = 0;

  function setCategoryActive(index) {
    categoryItems.forEach((item, i) => {
      item.classList.toggle("bg-danger", i === index);
      item.classList.toggle("text-white", i === index);
    });
  }

  // default active
  setCategoryActive(categoryIndex);

  // 🔥 NEW: click on card
  categoryItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      categoryIndex = i;
      setCategoryActive(categoryIndex);
    });
  });

  // next button
  categoryNextBtn.addEventListener("click", () => {
    categoryIndex = (categoryIndex + 1) % categoryItems.length;
    setCategoryActive(categoryIndex);
  });

  // prev button
  categoryPrevBtn.addEventListener("click", () => {
    categoryIndex = (categoryIndex - 1 + categoryItems.length) % categoryItems.length;
    setCategoryActive(categoryIndex);
  });

});
// 
// Wish-list page
// 

// ================= WISHLIST SYSTEM =================

// get wishlist from localStorage
function getWishlist() {
  return JSON.parse(localStorage.getItem("wishlist")) || [];
}

// save wishlist
function saveWishlist(data) {
  localStorage.setItem("wishlist", JSON.stringify(data));
}

// update header count
function updateWishlistCount() {
  const wishlist = getWishlist();
  const countEl = document.getElementById("wishlist-count");

  if (countEl) {
    countEl.innerText = wishlist.length;
  }
}

// toggle like
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".like-btn");
  if (!btn) return;

  const product = {
    name: btn.dataset.name,
    price: btn.dataset.price,
    img: btn.dataset.img
  };

  let wishlist = getWishlist();

  const index = wishlist.findIndex(p => p.name === product.name);

  if (index > -1) {
    // remove
    wishlist.splice(index, 1);
    btn.querySelector("i").classList.remove("fa-solid", "text-red-500");
    btn.querySelector("i").classList.add("fa-regular");
  } else {
    // add
    wishlist.push(product);
    btn.querySelector("i").classList.remove("fa-regular");
    btn.querySelector("i").classList.add("fa-solid", "text-red-500");
  }

  saveWishlist(wishlist);
  updateWishlistCount();
});


const scrollBtn = document.getElementById("scrollTopBtn");

// scroll pe show/hide
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});

// click pe top scroll
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


// Add to Cart
document.querySelectorAll(".flash-add-cart").forEach(btn => {
  btn.addEventListener("click", function () {

      const product = {
          id: this.dataset.id,
          name: this.dataset.name,
          price: this.dataset.price,
          img: this.dataset.img,
          qty: 1
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // check product already hai kya
      let existing = cart.find(item => item.id === product.id);

      if (existing) {
          existing.qty += 1;
      } else {
          cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // redirect to cart page
      window.location.href = "cartpage.html";
  });
});