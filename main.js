// On stocker les cases qu'on généres aléatoirement
let randomColorButtonStock = []

// On stocke les cases sur lesquelles l'utilisateur a cliqué
let colorButtonStock = []


let colorButtonStockScore = 1

let antiClick = document.getElementById('bloque');

// Demarre le jeu
let antiClickStart = document.getElementById("start");

// on crée une variable vitesse
let speed = 1400


let GameOn = false


let playerTurn = false

function turn(){ 
    switch (playerTurn) { 
        case false://Si  ce n'est pas a vous de jouer
            antiClick.classList.add("blocus") // on nepeut cliquer sur les boutons
            document.getElementById('IATurn').style.backgroundColor  = "rgb(0, 201, 7)"; 
            document.getElementById('myTurn').style.backgroundColor  ="grey"; 
            console.log('Vous ne pouvez pas jouer ')
        break;

        case true: // Si c'est a vous de jouer
            antiClick.classList.remove("blocus")
            document.getElementById('myTurn').style.backgroundColor = "rgb(0, 201, 7)";
            document.getElementById('IATurn').style.backgroundColor ="grey";
            console.log('Vous pouvez jouer ')
        break;
    }
}

// attendre un laps de temps avant d'éxecuter la fonction
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// On lance le jeu au clique du bouton start
async function start(){ 
    antiClickStart.classList.add("blocus"); 
    randomColorButtonStock= [] 
    GameOn = true 
    console.log('Jeu commencé ' + GameOn) 
    newTurn() 
}

// Reset de la partie quand le joueur clique ou qu'il perd
async function reset(){
    GameOn = false 
    randomColorButtonStock = [] 
    colorButtonStock = [] 
    colorButtonStockScore = 1 
    speed = 1700 
    document.getElementById('ScoreByTurn').innerHTML= 0 
    document.getElementById('ScoreByClick').innerHTML= 0; 
    antiClickStart.classList.remove("blocus"); 
    console.log(randomColorButtonStock, colorButtonStock)
    await sleep(400)
    playerTurn = false
    turn() 
    console.log(playerTurn) 
}

function generateRandomNumber(){
  
    let randomNumber = 0
    randomNumber = Math.floor(Math.random() * 4);
    console.log(randomNumber) 

    switch (randomNumber ) {
        case 0:
            randomColorButtonStock.push('0')
            console.log('Vert')
        break
        case 1:
            randomColorButtonStock.push('1')
            console.log('Rouge')
        break
        case 2:
            randomColorButtonStock.push('2')
            console.log('Bleu')
        break
        case 3:
            randomColorButtonStock.push('3')
            console.log('Jaune')
        break
    }
    console.log('Le Nombre généré aléatoirement est ',randomColorButtonStock)
}

// Fonction qui va être utilisée en for par l'IA, qui fera clignoter les touches et qui va aller de plus en plus vite
async function clignotement(randomColorButtonStock){
    switch (randomColorButtonStock.id) {
        case "0": // dans le cas où c'est 0 ( donc vert ) on lance l'animation 
            document.getElementById(0).classList.remove("vert-bg") //on met la couleur plus claire en supprimant le background
            document.getElementById(0).classList.add("vert-IA")
            await sleep(speed*0.35) // on l'affiche pendant un certains temps
            document.getElementById(0).classList.remove("vert-IA") // puis on remet la couleur initiale
            document.getElementById(0).classList.add("vert-bg")
        break;
        case "1":
            document.getElementById(1).classList.remove("rouge-bg")
            document.getElementById(1).classList.add("rouge-IA")
            await sleep(speed*0.35)
                document.getElementById(1).classList.remove("rouge-IA")
                document.getElementById(1).classList.add("rouge-bg")
        break;
        case "2":
            document.getElementById(2).classList.remove("bleu-bg")
            document.getElementById(2).classList.add("bleu-IA")
            await sleep(speed*0.35)
                document.getElementById(2).classList.remove("bleu-IA")
                document.getElementById(2).classList.add("bleu-bg")
        break;
        case "3":
            document.getElementById(3).classList.remove("jaune-bg")
            document.getElementById(3).classList.add("jaune-IA")
            await sleep(speed*0.35)
                document.getElementById(3).classList.remove("jaune-IA")
                document.getElementById(3).classList.add("jaune-bg")
        break;
    }
}


async function clickOnColorButton(id){
    document.getElementById('ScoreByClick').innerHTML= colorButtonStockScore++ ;
    colorButtonStock.push(id) 
    let audio = new Audio('https://meiglord.github.io/Super-Simon-JS/musiques/' + id +".wav" )
        audio.play() 
    await sleep(speed)
    compare()
    
}

//On compare les deux array
async function compare(){
    let i = 0;
    colorButtonStock.forEach(element => {
        if (element !== randomColorButtonStock[i]){
            lose(); 
        }
        i++;
    });
    if (randomColorButtonStock.length == colorButtonStock.length && GameOn == true ){
        console.log('Bien joué')
        await sleep(100)
        newTurn() // Nouveau tour 
        playerTurn = false
        turn() 
    }
    
}

//La vitesse augmente de 50ms à chaque tour jusqu'au 8eme tour
async function newTurn(){
    if (randomColorButtonStock.length < 9) { 
        speed = speed - 100 
    }
    console.log(speed)
    colorButtonStock= [] 
    document.getElementById('ScoreByTurn').innerHTML= randomColorButtonStock.length ; 
    generateRandomNumber()
    await sleep(100)
    for (let i = 0; i < randomColorButtonStock.length; i++){
        let audio = new Audio('https://meiglord.github.io/Super-Simon-JS/sounds/' + randomColorButtonStock[i] +".wav" )
        audio.play()
        clignotement(document.getElementById(randomColorButtonStock[i])) 
        await sleep(speed)
    } 
    playerTurn = true
    turn() 
    console.log(playerTurn)
    
}

// Si le joueur perd
function lose(){
    randomColorButtonStock.length = randomColorButtonStock.length-1 
    colorButtonStockScore = colorButtonStockScore-2 
    modalLose.style.display = "block"; 
    document.getElementById('loseModal').innerHTML = "<br><br> GAME OVER <br><br><br> " + "Score : <br><br> " + colorButtonStockScore + " couleurs validées <br>" + randomColorButtonStock.length + " tours terminés." // et ce qu'il y a dedans
    GameOn = false 
    reset() 
    
}