//  Animations des sprites START

  //player
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;

  //bot
  let canvasBot = document.getElementById('bot');
  let ctxBot = canvasBot.getContext('2d');
  ctxBot.imageSmoothingEnabled = false;


  // commun
  const CANVAS_WIDTH = canvas.width = 120;
  const CANVAS_HEIGHT = canvas.height = 120;

  const CANVAS_WIDTH_BOT = canvasBot.width = 120;
  const CANVAS_HEIGHT_BOT = canvasBot.height = 120;
  const spriteWidth = 64; //png widht / column
  const spriteHeight = 64; // png height / row

  const playerImage = new Image();
  playerImage.src = "archer.png"

//player
let playerState = '';

//bot
let botState = '';

let frameForStop = 60;
let gameFrame = 0;
let gameFrameBot = 0;
const staggerFrames = 8;
const spriteAnimations = [];
const spriteAnimationsBot = [];
const animationState = [
  {
      name: 'spell',
      frames: 7,
      line: 3
  },
  {
      name: 'walk',
      frames: 9,
      line: 11,
  },
  {
      name: 'attack',
      frames: 6,
      line: 15,
  },
  {
      name: 'die',
      frames: 6,
      line: 20,
  },
  {
      name: 'hit',
      frames: 3,
      line: 20,
  }
];

const animationStateBot = [
  {
      name: 'spell',
      frames: 7,
      line: 1
  },
  {
      name: 'walk',
      frames: 9,
      line: 9,
  },
  {
      name: 'attack',
      frames: 6,
      line: 13,
  },
  {
      name: 'die',
      frames: 6,
      line: 20,
  }
];

//player
animationState.forEach((state, index) => {
  let frames = {
      loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth;
      let positionY = animationState[index].line * spriteHeight;
      frames.loc.push({x: positionX, y: positionY});
  }
  spriteAnimations[state.name] = frames;
})



function animate() {
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, 120, 120)


  if (gameFrame < frameForStop) {
      gameFrame++;
      requestAnimationFrame(animate);
  }
}


//bot

animationStateBot.forEach((state, index) => {
  let frames = {
      loc: [],
  }
  for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth;
      let positionY = animationStateBot[index].line * spriteHeight;
      frames.loc.push({x: positionX, y: positionY});
  }
  console.log(state, " state");
  spriteAnimationsBot[state.name] = frames;
  console.log(spriteAnimationsBot, " sprites animation");
  console.log(frames.loc, " loky loky");
  console.log(index, '  index bot mon gars');
})


function animateBot() {
  ctxBot.clearRect(0,0, CANVAS_WIDTH_BOT, CANVAS_HEIGHT_BOT);
  let position = Math.floor(gameFrameBot/staggerFrames) % spriteAnimationsBot[botState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimationsBot[botState].loc[position].y;
  ctxBot.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, 120, 120)


  if (gameFrameBot < frameForStop) {
      gameFrameBot++;
      requestAnimationFrame(animateBot);
  }

}

// Animations Player
function spell() {
  gameFrame = 0;
  frameForStop = 60;
  playerState = "spell";
  animate();
};

function die() {
  gameFrame = 0;
  frameForStop = 40;
  playerState = "die";
  animate();
}

function hit() {
  gameFrame = 0;
  frameForStop = 30;
  playerState = "hit";
  animate();
}

function attack() {
  gameFrame = 0;
  frameForStop = 60;
  playerState = "attack";
  animate();
}

function walk() {
  gameFrame = 0;
  frameForStop = 220;
  playerState = "walk";
  animate();
}


function apparitions() {
  walk();
  canvas.style.animationName = "reveal" ;

}


// Animations BOT
function spellBot() {
  gameFrameBot = 0;
  frameForStop = 60;
  botState = "spell";
  animateBot();
};

function dieBot() {
  gameFrameBot = 0;
  frameForStop = 40;
  botState = "die";
  animateBot();
}

function attackBot() {
  gameFrameBot = 0;
  frameForStop = 60;
  botState = "attack";
  animateBot();
}

function walkBot() {
  gameFrameBot = 0;
  frameForStop = 220;
  botState = "walk";
  animateBot();
}

function apparitionsBot() {
  canvasBot.style.animationName = "revealBot" ;
  walkBot();
}


// Animations des sprites END


// Déclarations des classes
class Classe {
    constructor(name, pseudo, pv, endurance, mana, attaques) {
        this.name = name;
        this.pseudo = pseudo;
        this.pv = pv;
        this.endurance = endurance;
        this.mana = mana;
        this.attaques = attaques;
    }
}

class Competences {
    constructor(name, damage, costEndurance, costMana) {
        this.name = name;
        this.damage = damage;
        this.costEndurance = costEndurance;
        this.costMana = costMana;
    }
}

let sortWarrior = [
    new Competences("Coup de  poing", 10, 10, 0),
    new Competences("Épée à double tranchant", 30, 30, 0),
    new Competences("La frappe du JO", 90, 100, 0),
]

let classes = [
    new Classe("mage", "mage-default", 1400, 0, 200, sortWarrior),
    new Classe("guerrier", "guerrier-default", 2000, 100, 0, sortWarrior),
    new Classe("archer", "archer-default", 1200, 0, 0, sortWarrior),
];



// Page de choix de la classe START
const selectHTML = document.getElementById("classe-select");


function goToSelect() {

    for (let classe of classes) {
        let option = document.createElement("option");
        option.setAttribute(`value`, `${classe.name}`);
        option.innerText = `${classe.name}`;
        selectHTML.appendChild(option);
    }
};
goToSelect();

// Page de choix de la classe END

// Déclaration du joueur et du bot
let player;
let vitaMaxPlayer;
let bot;
let vitaMaxBot;
let pvPlayerHTML = document.getElementById('info-pv-player');
let pvBotHTML = document.getElementById('info-pv-bot');
let gameMessage = document.getElementById('msg-here');

console.log(gameMessage, ' ça cette balise');

// RPG STEP 1

function begin() {
    let playerChoice = document.getElementById("classe-select").value;
    if (playerChoice == "") {
        window.alert("Vous n'avez pas choisis de classe.");
    } else {

        switch (playerChoice) {
            case "mage":
                player = classes[0];
                vitaMaxPlayer = classes[0].pv
                console.log("choix: mage");
                break;
            case "guerrier":
                player = classes[1];
                vitaMaxPlayer = classes[1].pv
                console.log("choix: guerrier");
                break;
            case "archer":
                player = classes[2];
                vitaMaxPlayer = classes[2].pv
                console.log("choix: archer");
                break;
        }
    
        console.log(player.name + " choix du joueur " + vitaMaxPlayer + " pv max du joueur");
    
        let botChoice = classes[(Math.round(Math.random() * (classes.length - 1)))];
        bot = botChoice;
        vitaMaxBot = botChoice.pv
        console.log(bot.name + " choix bot " + vitaMaxBot + " pv max du bot");
        nextStep();
    }
};


// RPG STEP 2

//Rend la scène de combat visible et efface le choix de la classe


let hpPlayerHTML = document.getElementById("pv-p1");
let hpBotHTML = document.getElementById("pv-bot");
console.log(hpPlayerHTML);

function pourcenatage(v1, v2) {
    let degatInfliger = ((v1*100) / v2).toFixed(2);
     return degatInfliger
}

let chooseSort1 = document.getElementById('card1');
let chooseSort2 = document.getElementById('card2');
let chooseSort3 = document.getElementById('card3');
let sortsCardContainer = document.getElementsByClassName('sort');
let timerHTML = document.getElementById("timer-count");

function nextStep() {
    let step1 = document.getElementById('step1');
    let step2 = document.getElementById('step2');
    step1.classList.remove("step-visible")
    step1.classList.add('hidden');
    step1.remove();
    step2.classList.remove('hidden');
    step2.classList.add('step-visible');


    pvBotHTML.innerText = `${bot.pv} PV`;
    pvPlayerHTML.innerText = `${player.pv} PV`;
    apparitions();
    apparitionsBot();

    combat();

    
    console.log(player.attaques[0].name, " sorts");
    chooseSort1.innerHTML = player.attaques[0].name;
    chooseSort2.innerHTML = player.attaques[1].name;
    chooseSort3.innerHTML = player.attaques[2].name;
}


function hit(dammage, vitamaxEnnemy, hpEnnemy) {
    let calculDammage = hpEnnemy - dammage;
    let pourcentDammage = (calculDammage * 100) / vitamaxEnnemy;
    
    bot.pv = calculDammage;
    hpBotHTML.style.width = pourcentDammage + "%";
}



function hitBot(dammage, vitamaxEnnemy, hpEnnemy) {
    let calculDammage = hpEnnemy - dammage;
    let pourcentDammage = (calculDammage * 100) / vitamaxEnnemy;
    
    player.pv = calculDammage;
    hpPlayerHTML.style.width = pourcentDammage + "%";
}

console.log();

chooseSort1.addEventListener("click", () => {
    let input = player.attaques[0].damage;
    hit(input, vitaMaxBot, bot.pv);
    attack();
    pvBotHTML.innerText = `${bot.pv} PV`;
    gameMessage.innerText = `Le joueur lance ${player.attaques[0].name} et inflige ${player.attaques[0].damage} de dégâts`;
    // sortsCardContainer.style.display = "none";
   
    choixDuSortBot();
});



chooseSort2.addEventListener("click", () => {
    let input = player.attaques[1].damage;
    hit(input, vitaMaxBot, bot.pv);
    attack();
    pvBotHTML.innerText = `${bot.pv} PV`;

    gameMessage.innerText = `Le joueur lance ${player.attaques[1].name} et inflige ${player.attaques[1].damage} de dégâts`
    choixDuSortBot();
});


chooseSort3.addEventListener("click", () => {
    let input = player.attaques[2].damage;
    hit(input, vitaMaxBot, bot.pv);
    attack();
    pvBotHTML.innerText = `${bot.pv} PV`;

    gameMessage.innerText = `Le joueur lance ${player.attaques[2].name} et inflige ${player.attaques[2].damage} de dégâts`

    choixDuSortBot();
});



let time = 30;
let timeOut = false;



function timer() {

//     for(let i = 0; i < 30; i++) {
//         setInterval(time--, 1000);
//         console.log(time, ' le temps');
//     }

    function discount() {
        

        if(time > 0 ) {
            time -= 1;
            timerHTML.innerHTML = time;
            // console.log(time, 'secondes restantes');
        } else {
            timeOut = true;
        }
    }

    if (timeOut == false) {
        discount();
        setInterval(discount, 1000);
    } else if (timeOut = true) {
        
    }


}

function combat() {

    // while (player.pv > 0 || bot.pv > 0) {

        choixDuSortPlayer();

        // damageBotToPlayer();

    // }


    //joueur 1 choose 30 secondes

    //action
    //bot choose
}
// combat();



function choixDuSortPlayer() {
    //rendre le html cliquable et/ou visible

    // gameMessage.innerHTML = "En attente du choix Player"
    // gameMessage.innerText = "En attente du choix Player"

    //timer de 30 seconde visible en haut entre les barres de vies
    timer();

}
// choixDuSortPlayer();

function tooLate() {
    alert("Quel dommage le temps est écoulé");
}

//funciton à mettre au clique sur chacun des sorts Player pour stopper le chrono
function intentionalChoice() {
  clearTimeout(timeOut);
  sortsCard.forEach(element => {
      element.style.display = "none";
  });

}



function choixDuSortBot() {
    let botSortChoice = bot.attaques[(Math.round(Math.random() * (bot.attaques.length - 1)))];
    let input = botSortChoice.damage
    // hit(input, vitaMaxPlayer, player.pv)
    hitBot(input, vitaMaxPlayer, player.pv)
    attackBot();
}

function damageBotToPlayer() {

}


document.addEventListener("keypress", (event) => {
console.log(event.key)

if (event.key == "z") {
    walk();
} else {
    console.log("nique ta mère");
}
})
