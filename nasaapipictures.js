// nasaapipictures.js


//Add const to handle HTML Elements:
// Use document.getElementById() with Id attribute
// Use document.querySelector() with Class name attribute or the Element name itself (only 1 of these HTML elements per webpage)
const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// global array to store fetch results
let resultsArray = [];

function updateDOM() {
    // .innerHTML not used as it is not secure as it permits javascript command injection
    // Create HTML for each image returned in fetch results
    resultsArray.forEach((result) => {
        // Card Container
        const card = document.createElement('div');
        card.classList.add('card');
        // Link to wrap image
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';
        // Image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        // lazy load to improve performance
        image.loading = 'lazy';
        image.classList.add('card-img-top');
        // Card Body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        // Card Title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;
        // Save Text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        saveText.textContent = 'Add To Favorites';
        // Card Text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // Footer Container
        const footer = document.createElement('small');
        footer.classList.add('text-muted');
        // Date
        const date = document.createElement('strong');
        date.textContent = result.date;
        // Copyright
        const copyrightResult = result.copyright === undefined ? '' : result.copyright;
        const copyright = document.createElement('span');
        copyright.textContent = ` ${copyrightResult}`;

        // Build DOM
        // Append in order - bottom to top
        // .append() allows multiple objects to be appended vs just 1 object with .appendChild()
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        // inspect card
        // console.log(card);
        imagesContainer.appendChild(card);
    });
};

// Get 10 images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        // console.log(resultsArray);
        updateDOM();
    } catch (error) {
        // Catch error here
        console.log(error);
    };
};

// On Load
getNasaPictures();
