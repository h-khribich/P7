import { checkAuth, logoutUser } from './auth.js'

// DECLARATIONS
const gallery = document.querySelector(".gallery");
const categoryWrapper = document.querySelector(".categories");
const editModalWrapper = document.getElementById("editPortfolioModalWrapper");
const editModal = document.getElementById("editPortfolioModal");
const galleryEditBtn = document.getElementById("galleryEditBtn");


// EDIT POPUP ONLY AVAILABLE TO LOGGED-IN USERS
galleryEditBtn && galleryEditBtn.addEventListener(("click"), (e) => {
  editModalWrapper.showModal();
  e.stopImmediatePropagation()
})

document.addEventListener("click", (e) => {
  if (editModalWrapper.hasAttribute("open")) {
    // Check if the click is outside the modal
    if (e.target !== editModal && !editModal.contains(e.target)) {
      editModalWrapper.close();
    }
  }
});

// GET CALLS
const fetchGetData = async (endpoint) => {
  try {
    const res = await fetch(`http://localhost:5678/api/${endpoint}`)
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const fillGallery = async () => {
  // Works to be fetched
  const works = await fetchGetData("works");

  works.forEach((work) => {
    const item = 
    `
    <figure class="workFigure" data-category-id="${work.categoryId}">
      <img src="${work.imageUrl}" alt="${work.title}">
      <figcaption>${work.title}</figcaption>
    </figure>
    `

    gallery.innerHTML += item
  })
}

const filterGallery = (id = "0") => {
  // Works already fetched, available in DOM
  const works = document.querySelectorAll(".workFigure");
  
  works.forEach((work) => {
    const shouldBeInactive = id !== "0" && work.dataset.categoryId !== id

    work.classList.toggle("inactive", shouldBeInactive)
  })
}

// FILL CATEGORIES
const fillCategories = async () => {
  const categories = await fetchGetData("categories");

  categories.map((category) => {
    const item = `<button type="button" data-category-id="${category.id}" class="btn-categories">${category.name}</button>`
    categoryWrapper.innerHTML += item;
  })

  const categoryBtns = document.querySelectorAll(".categories > .btn-categories");

  // FILTER EVENT
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // TOGGLE 'SELECTED' STATUS
      const previousSelected = document.querySelector(".categories > .selected")
      previousSelected.classList.remove("selected")

      e.target.classList.add("selected")
      const id = e.target.dataset.categoryId
      
      filterGallery(id)
    })
  })
}

loginBtn.addEventListener("click", (e) => {
  sessionStorage.getItem("authToken") && logoutUser()
})

// INITIALIZATION
fillGallery()
fillCategories()
checkAuth()
