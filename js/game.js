const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
    'Brook_Pronto1',
    'chooperPronto1',
    'FrankyPronto1',
    'jimbeiPronto1',
    'Monkey_D._LuffyPronto1',
    'NamiPronto1',
    'Nico_Robin_Pronto1',
    'sanjiPronto1',
    'UsoppPronto1',
    'YamatoPronto1',
    'zoroPronto1',

];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }
  
  let firstCard = '';
  let secondCard = '';
  
  const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
  
    if (disabledCards.length === 20) {
      clearInterval(this.loop);
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }
  }
  
  const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
  
    if (firstCharacter === secondCharacter) {
  
      firstCard.firstChild.classList.add('disabled-card');
      secondCard.firstChild.classList.add('disabled-card');
  
      firstCard = '';
      secondCard = '';
  
      checkEndGame();
  
    } else {
      setTimeout(() => {
  
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
  
        firstCard = '';
        secondCard = '';
  
      }, 500);
    }
  
  }
  
  const revealCard = ({ target }) => {
  
    if (target.parentNode.className.includes('reveal-card')) {
      return;
    }
  
    if (firstCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;
  
    } else if (secondCard === '') {
  
      target.parentNode.classList.add('reveal-card');
      secondCard = target.parentNode;
  
      checkCards();
  
    }  
  }
  
  const createCard = (character) => {
  
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
  
    front.style.backgroundImage = `url('../one-piece/${character}.png')`;
  
    card.appendChild(front);
    card.appendChild(back);
  
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)
  
    return card;
  }
  
  const loadGame = () => {
    const duplicateCharacters = [ ...characters, ...characters ];
  
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);
  
    shuffledArray.forEach((character) => {
      const card = createCard(character);
      grid.appendChild(card);
    });
  }
  
  const startTimer = () => {
  
    this.loop = setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
  
  }
  
  window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
  }