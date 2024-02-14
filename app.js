"use strict";

const API_KEY = "YQ2miUfeDnI5UKg8aplv0J6cqDMkh75O";
const $gifContainer = $("#gif-container");

/** Accesses a gif relating to the user search term input and appends it to the dom*/
async function generateGifUrl() {
  // Selects the search term input string
  let term = $("#search").val();

  // Generating a query string and fetching the response object
  const params = new URLSearchParams({ q: term, api_key: API_KEY });
  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const searchData = await response.json();

  // Store the amount of GIF results
  const resultSize = searchData.data.length;

  // Randomly select one of the GIF results
  const randomIndex = getRandomNumber(resultSize);

  // Store the URL of the selected GIF
  const gifUrl = searchData.data[randomIndex].images.original.url;

  return gifUrl;
}

/** Creates a new image element and appends it to the DOM */
function addGif(url){
  // Create a new image html element using the URL
  const $newGif = $("<img>", { src: url, class: "new-gif" });

  // Append the GIF to the dom
  $gifContainer.append($newGif);
}

/** Given a number, num, generate a random integer number between 0 and num */
function getRandomNumber(num) {
  return Math.floor(Math.random() * (num + 1));
}

/** When event is triggered empty the GIF container */
function removeGIFs() {
  $gifContainer.empty();
}

/** When submit button clicked, call the method to fetch the response object based on form submission value */
async function handleSubmit(evt) {
  evt.preventDefault();
  const gifUrl = await generateGifUrl();
  addGif(gifUrl);
}

$(".input-form").on("submit", handleSubmit);
$("#remove-button").on("click", removeGIFs);


