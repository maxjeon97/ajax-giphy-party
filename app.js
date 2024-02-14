"use strict";

const API_KEY = "YQ2miUfeDnI5UKg8aplv0J6cqDMkh75O";
const $gifContainer = $("#gif-container");

async function getGIF(evt) {
  evt.preventDefault();
  let term = $("#search").val();
  const params = new URLSearchParams({q: term, api_key: API_KEY});
  const response = await fetch(`http://api.giphy.com/v1/gifs/search?${params}`);
  const searchData = await response.json();
  const resultSize = searchData.data.length;
  const randomIndex = getRandomNumber(resultSize);
  const gifUrl = searchData.data[randomIndex].images.original.url;
  const $newGif = $("<img>", {src: gifUrl, class: "new-gif"});
  $gifContainer.append($newGif);
}

function getRandomNumber(num) {
  return Math.floor(Math.random() * (num + 1));
}

$("#submit-button").on("click", getGIF);