const gallery = document.querySelector(".gallery")

const getWorks = async () => {
  try {
    const res = await fetch("http://localhost:5678/api/works")
    return await res.json()
  } catch (error) {
    console.log(error);
  }
}

const fillGallery = async () => {
  const works = await getWorks();
  
  works.map((work) => {
    const item = 
    `<figure>
			<img src="${work.imageUrl}" alt="${work.title}">
			<figcaption>${work.title}</figcaption>
		</figure>`

    gallery.innerHTML += item
  })
}

fillGallery()
