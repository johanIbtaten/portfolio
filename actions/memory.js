export const memoryInit = (/*cardsParam*/) => {
  //const cards = cardsParam



  const cards = document.querySelectorAll('.memory-card');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;

  // Declaring move variable
  let moves = 0;
  let counter = document.querySelector(".moves");

  // Declare variables for star icons
  const stars = document.querySelectorAll(".fa-star");

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;

      return;
    }

    // second click
    secondCard = this;
    moveCounter()

    checkForMatch();
  }

  function checkForMatch() {
    // La propriété .dataset.framework permet de récupérer la valeur
    // de l'attribut data-framework des éléments HTML 
    // firstCard et secondCard pour ensuite les comparer
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('match');
    secondCard.classList.add('match');

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 800);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function startGame() {
    cards.forEach(card => {
      card.classList.remove('flip');

        // reset moves
      moves = 0;
      counter.innerHTML = moves + ((moves > 1) ? " Moves":" Move")
      // reset rating
      for (var i= 0; i < stars.length; i++){
          stars[i].style.visibility = "visible";
      }

      setTimeout(() => {
        resetBoard()
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      }, 500);

      // Shuffle cards
    });
  })();


  /**
   * Change la hauteur du conteneur memory
   * pour qu'elle soit toujours égale à sa largeur
   * et pour qu'il garde son ratio quelque soit la largeur de l'écran
   */
  function changeHeightGame() {
    // On récupère la div conteneur qui à la classe memory-game
    const memoryGame = document.getElementsByClassName("memory-game")[0]

    // On récupère les styles calculés par le navigateur
    const style = window.getComputedStyle(memoryGame, null);

    // On récupère la largeur sous forme d'une chaîne de caractère 
    // en px de l'élément memoryGame qui correspond à la largeur 
    // sans les paddings et autres marges
    const widthMemory = style.getPropertyValue("width");

    // Comme l'unité px est déjà incluse dans la largeur
    // on donne à la hauteur de l'élément la valeur de la largeur
    memoryGame.style.height = widthMemory;
  }

  window.onresize = function() {
    changeHeightGame();    
  }

  changeHeightGame()

  cards.forEach(card => {    
    card.addEventListener('click', flipCard);
  })

  /**
   * Count player's moves
   */
  function moveCounter(){
    moves++;
    counter.innerHTML = moves + ((moves > 1) ? " Moves":" Move");

    // Setting rates based on moves
    if (moves > 8 && moves < 12){
      stars[2].style.visibility = "collapse";
    } else if (moves > 13) {
      stars[1].style.visibility = "collapse";     
    }
  }

}



