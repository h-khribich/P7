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
const fillGallery = async () => {
  const works = await fetchGetData("works");
  
  works.map((work) => {
    const item = 
    `
    <figure>
			<img src="${work.imageUrl}" alt="${work.title}">
			<figcaption>${work.title}</figcaption>
		</figure>
    `
    gallery.innerHTML += item
  })
}

// FILL CATEGORIES
const fillCategories = async () => {
  const categories = await fetchGetData("categories");

  categories.map((category) => {
    const item = `<button class="btn">${category.name}</button>`
    categoryWrapper.innerHTML += item;
  })
}


fillGallery()
fillCategories()
