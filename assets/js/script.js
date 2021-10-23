// randomCards variable
const randomCards = document.querySelector(".cardsBtn");
const errorMsg = document.querySelector('.error');

const fetchCards = function () {
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle')
    .then(function (response) {
      // JSON that is returned from the server must be converted to a JS object asynchronously.
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
      return response.json();
    })

    // load the cards
    .then(function (data) {
      return fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`)
    })

    .then(function (response) {
      // return new json file
      if (!response.ok) {
        throw new Error('Not 200 OK');
      }
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
          <img src='${data.cards[i].image}' alt='${data.cards[i].suit}'>
          </figure>`
      }

      // print output
      cardsSection.innerHTML =
        `<fieldset>
        <legend>Cards</legend>
        ${output}
        </fieldset>`;

      // rename button
      randomCards.textContent = 'Shuffle Cards'
    })

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