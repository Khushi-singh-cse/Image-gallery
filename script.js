// ===============================
// PHOTO DATA 
// ===============================

const photos = [

    // Nature

    {
        title: "Green Valley",
        category: "nature",
        src: "photos/nature1.jpg"
    },

    {
        title: "Flying Birds",
        category: "nature",
        src: "photos/nature2.jpg"
    },

    {
        title: "River Stream",
        category: "nature",
        src: "photos/Nature3.jpg"
    },


    // Travel

    {
        title: "Sunset Flight",
        category: "travel",
        src: "photos/travel1.jpg"
    },

    {
        title: "Airport View",
        category: "travel",
        src: "photos/travel2.jpg"
    },

    {
        title: "Highway Drive",
        category: "travel",
        src: "photos/travel3.jpg"
    },


    // Animals

    {
        title: "Golden Puppy",
        category: "animals",
        src: "photos/animal1.jpg"
    },

    {
        title: "Sleepy Cat",
        category: "animals",
        src: "photos/animal2.jpg"
    },

    {
        title: "Cute Bunny",
        category: "animals",
        src: "photos/animal3.jpg"
    },


    // Food

    {
        title: "Pizza",
        category: "food",
        src: "photos/food1.jpg"
    },

    {
        title: "Momo",
        category: "food",
        src: "photos/food2.jpg"
    },

    {
        title: "Pani-Puri",
        category: "food",
        src: "photos/food3.jpg"
    }

];


// ===============================
// ELEMENTS
// ===============================

const gallery = document.getElementById("gallery");

const search = document.getElementById("search");

const filterBtns = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const imageTitle = document.getElementById("imageTitle");

const imageCategory = document.getElementById("imageCategory");

const closeBtn = document.getElementById("close");

const prevBtn = document.getElementById("prev");

const nextBtn = document.getElementById("next");

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");


// ===============================
// VARIABLES
// ===============================

let currentFilter = "all";

let filteredPhotos = [...photos];

let currentIndex = 0;


// ===============================
// DISPLAY GALLERY
// ===============================

function displayGallery(images){

    gallery.innerHTML = "";

    images.forEach((photo,index)=>{

        const card = document.createElement("div");

        card.className = "gallery-item";

        card.innerHTML = `

            <img src="${photo.src}" alt="${photo.title}">

            <div class="image-info">

                <h3>${photo.title}</h3>

                <p>${photo.category}</p>

            </div>

        `;

        card.addEventListener("click",()=>{

            openLightbox(index);

        });

        gallery.appendChild(card);

    });

}


// ===============================
// INITIAL LOAD
// ===============================

displayGallery(filteredPhotos);

// ===============================
// SEARCH FUNCTION
// ===============================

search.addEventListener("input", () => {

    const value = search.value.toLowerCase();

    filteredPhotos = photos.filter(photo => {

        const matchesCategory =
            currentFilter === "all" ||
            photo.category === currentFilter;

        const matchesSearch =
            photo.title.toLowerCase().includes(value);

        return matchesCategory && matchesSearch;

    });

    displayGallery(filteredPhotos);

});


// ===============================
// FILTER BUTTONS
// ===============================

filterBtns.forEach(button => {

    button.addEventListener("click", () => {

        filterBtns.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        const value = search.value.toLowerCase();

        filteredPhotos = photos.filter(photo => {

            const matchesCategory =
                currentFilter === "all" ||
                photo.category === currentFilter;

            const matchesSearch =
                photo.title.toLowerCase().includes(value);

            return matchesCategory && matchesSearch;

        });

        displayGallery(filteredPhotos);

        mobileMenu.classList.remove("show");

    });

});


// ===============================
// HAMBURGER MENU
// ===============================

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("show");

});


// ===============================
// CLOSE MENU WHEN CLICKING OUTSIDE
// ===============================

document.addEventListener("click", (e) => {

    if(
        !mobileMenu.contains(e.target) &&
        !menuBtn.contains(e.target)
    ){

        mobileMenu.classList.remove("show");

    }

});

// ===============================
// OPEN LIGHTBOX
// ===============================

function openLightbox(index){

    currentIndex = index;

    lightbox.classList.add("show");

    updateLightbox();

}


// ===============================
// UPDATE LIGHTBOX
// ===============================

function updateLightbox(){

    lightboxImg.src = filteredPhotos[currentIndex].src;

    imageTitle.textContent =
        filteredPhotos[currentIndex].title;

    imageCategory.textContent =
        filteredPhotos[currentIndex].category;

}


// ===============================
// CLOSE LIGHTBOX
// ===============================

closeBtn.addEventListener("click",()=>{

    lightbox.classList.remove("show");

});


// ===============================
// NEXT IMAGE
// ===============================

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= filteredPhotos.length){

        currentIndex = 0;

    }

    updateLightbox();

});


// ===============================
// PREVIOUS IMAGE
// ===============================

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = filteredPhotos.length-1;

    }

    updateLightbox();

});


// ===============================
// CLICK OUTSIDE TO CLOSE
// ===============================

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.classList.remove("show");

    }

});


// ===============================
// KEYBOARD SHORTCUTS
// ===============================

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("show")) return;

    if(e.key==="Escape"){

        lightbox.classList.remove("show");

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});


// ===============================
// PRELOAD IMAGES
// ===============================

photos.forEach(photo=>{

    const img = new Image();

    img.src = photo.src;

});


// ===============================
// CONSOLE MESSAGE
// ===============================

console.log("Photo Gallery Loaded Successfully 📸");
