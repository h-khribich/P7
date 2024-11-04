// DECLARATIONS
const gallery = document.querySelector(".gallery")
const categoryWrapper = document.querySelector(".categories")

// GET CALLS
const fetchGetData = async (endpoint) => {
  try {
    const res = await fetch(`http://localhost:5678/api/${endpoint}`)
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

// FILL GALLERY
const fillGallery = async (param = 0) => {
  const works = await fetchGetData("works");

  const fill = (arr) => {
    gallery.innerHTML = ''
    
    arr.map((work) => {
      const item = 
      `
      <figure data-category-id="${work.categoryId}">
        <img src="${work.imageUrl}" alt="${work.title}">
        <figcaption>${work.title}</figcaption>
      </figure>
      `
      gallery.innerHTML += item
    })
  }
  
  // FILL BY CATEGORY ID, 0 IS THE DEFAULT DATASET TO FETCH ALL
  const filteredWorks = works.filter((work) => work.categoryId === param)

  param === 0 ? fill(works) : fill(filteredWorks)
}

// FILL CATEGORIES
const fillCategories = async () => {
  const categories = await fetchGetData("categories");

  categories.map((category) => {
    const item = `<button type="button" data-category-id="${category.id}" class="btn-categories">${category.name}</button>`
    categoryWrapper.innerHTML += item;
  })

  const categoryBtns = Array.from(document.querySelectorAll(".categories > .btn-categories"));

  // FILTER EVENT
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // TOGGLE 'SELECTED' STATUS
      const previousSelected = document.querySelector(".categories > .selected")
      previousSelected.classList.remove("selected")

      e.target.classList.add("selected")
      const id = Number(e.target.dataset.categoryId)
      
      fillGallery(id)
    })
  })
}

// INITIALIZATION
fillGallery()
fillCategories()
