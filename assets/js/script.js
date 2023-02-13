let log = new Log(document.querySelector('.log'));

let createBtn = document.querySelector('.createHeroBtn').addEventListener('click', createCharacter);

let startBtn = document.querySelector('.startBtn');

let heroName = document.querySelector('#heroName');
let characterClass = document.querySelector('#classes');
let heroNewName = heroName.value;
let heroValue = characterClass.value;

let monster = new SkullKnight('Skull Knight');
document.querySelector('.villain').classList.toggle('skullknight');

let countBtn = 1;

const loadText = document.querySelector('.loadingText');
const loading = document.querySelector('.load');
const background = document.querySelector('.container');

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
    load++;

    if(load > 99) {
        clearInterval(int);
    }

    //loadText.innerText = `${load}%`;
    loading.style.opacity = scale(load, 0, 100, 1, 0);
    background.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function createCharacter() {
    countBtn++;

    let name = heroName.value;

    let value = characterClass.value;
    
    if(value == 'mage') {
        let sorcerer = new Sorcerer(name);
        document.querySelector('.hero').classList.add('mage');

        startGame(sorcerer, monster);   
    }
    else if(value == 'knight') {
        let knight = new Knight(name);
        document.querySelector('.hero').classList.add('knight');
          
        startGame(knight, monster);
    }

    if(countBtn > 1) {
        document.querySelector('.startBtn').disabled = false;
    }
}

function startGame(hero, villain) {
    let fightArea = document.querySelector('.fightarea');
    let createFightScreen = document.querySelector('.container');
    let logArea = document.querySelector('.log');
    let startBtn = document.querySelector('.startBtn');
    
    startBtn.addEventListener('click', () => {
        fightArea.style.display = 'flex';
        createFightScreen.style.display = 'none';
        logArea.style.display = 'block';
    })

    const stage = new Stage(
        hero,
        villain,
        document.querySelector('#char'),
        document.querySelector('#monster'),
        log
    );
    
    stage.start();
} 





