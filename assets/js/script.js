"use strict";

// luxon date Time
const DateTime = luxon.DateTime;

// randomCards variable
const randomCards = document.querySelector(".cardsBtn");
// errorMsg variable
const errorMsg = document.querySelector('.error');

// fetch data and return it into json
const fetchCards = function () {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle')
    .then(function (response) {
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      // return json file
      return response.json();
    })

    // load the cards
    .then(function (data) {
      return fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)
    })

    .then(function (response) {
      // check if response is ok
      if (!response.ok) {
        // if not throw an error
        throw new Error('Not 200 OK');
      }
      // return new json file
      return response.json();
    })

    .then(function (data) {
      // Any code that depends on the `data` must go in this block
      const cardsSection = document.querySelector(".cards");

      // output variable
      let output = '';

      // for loop to build the cards
      for (let i = 0; i <= 3; i++) {
        output +=
          `<figure>
          <a href='${data.cards[i].images.svg}' target='_blank'>
          <img src='${data.cards[i].image}' alt='${data.cards[i].code} - ${data.cards[i].suit}'>
          </a>
          <figcaption>        
          ${data.cards[i].value}
          -
          ${data.cards[i].suit}
          </figcaption>
          </figure>`
      }

      // print output and date
      cardsSection.innerHTML =
        `<fieldset>
        <legend>
        Current Time 
        ${DateTime.now().toFormat('MMM dd, yyyy - t')}
        </legend>
        ${output}
        </fieldset>`;

      // rename button
      randomCards.textContent = 'Shuffle Cards'
    })

    // catch errors
    .catch(function (err) {
      // An error or `reject` from any of the above `.then()` blocks will end up here.

      // rename button
      randomCards.textContent = 'Try Again'

      // print error message
      errorMsg.innerHTML =
        `An error occurred while loading cards. Please try again later.
        <img src="assets/images/pixeltrue-error.svg" alt="pixeltrue-error">`;
    });
}

// call fetchCards function
randomCards.addEventListener("click", fetchCards);