// nasaapipictures.js

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// global array to store fetch results
let resultsArray = [];

// Get 10 images from NASA API
async function getNasaPictures() {
    try {
        const response = await fetch(apiURL);
        resultsArray = await response.json();
        console.log(resultsArray);
    } catch (error) {
        // Catch error here
        console.log(error);
    };
};

// On Load
getNasaPictures();
