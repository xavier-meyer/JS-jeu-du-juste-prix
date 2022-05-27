// Elements du DOM
const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const essayerBtn = document.getElementById("essayerBtn");
const rejouerBtn = document.getElementById("rejouerBtn");
const body = document.getElementsByTagName("body")[0];
const easyNiv = document.getElementById("niv-facile");
const interNiv = document.getElementById("niv-inter");
const difficultNiv = document.getElementById("niv-difficile");
const divNbVies = document.getElementById("nbVies");
const nightmareNiv = document.getElementById("niv-cauchemar");
const divForm = document.getElementById("hidden-form-number");
const annulerBtn = document.getElementById("annulerBtn");
const avertissement = document.getElementById("avertissement");
const resetBtn  = document.getElementById("resetBtn");
// modéles de coeur
const coeurVide = '<img src="./images/coeur-vide.png" class="heart-size" alt="insérer coeur vide"></img>'
const coeurPlein = '<img src="./images/coeur-plein.png" class="heart-size" alt="insérer coeur plein"></img>'
// fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgBrulant = 'linear-gradient(120deg, #ff0844 0%, #ffb199 100%)';
const bgChaud = 'linear-gradient(120deg, #9795f0 0%, #fbc8d4 100%)';
const bgWin = 'linear-gradient(-225deg, #231557 0%,#f10665 29%, #f1061f 67%)';
const bgLoose = 'linear-gradient(60deg, #29323c 0%, #485563 100%';
const bgError = 'linear-gradient(120deg, #c31818 0%, #5b0d0d 100%';
// déclaration variables vies
let totalVies;
let vies;
// phrase
let p = document.createElement("p");
// définir statut joueur
let statutJeu = false;
// play
const play = () => {
    empeachSeizeNumber();
    // tableau qui stocke les saisies 
    let seizedPrices = [];
    let productPrice = 100; 
    rejouerBtn.style.display = "none";
    // actualisation à chaque essai- Toute la logique
    formulaire.addEventListener("submit", (e) => {
        e.preventDefault(); // preventDefault => empêcher envoi du formulaire
        const valeurInput = parseInt(input.value);
        if(valeurInput < 0 || valeurInput > 1000) return;
        // return => arrêt du formulaire
        if(valeurInput === productPrice){
            body.style.backgroundImage = bgWin;
            body.style.color = "white";
            message.textContent = `BRAVO !!! le prix était bien de ${productPrice} euros`;
            message.style.display = "block";
            essayerBtn.style.display = "none";
            rejouerBtn.style.display = "block";
            annulerBtn.style.display = "none";
            resetBtn.style.display = "none";
            p.textContent = "";
            divVies.style.display = "none";
        }
        // on définit le comportement en fonction de la valeur du nombre
        // sinon si la valeur de l'input est différente du prix défini et que la valeur de l'input est présente dans le tableau
        else if (valeurInput !== productPrice && seizedPrices.includes(valeurInput) == false){
            if(productPrice < valeurInput + 25 && productPrice > valeurInput -25){
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est brûlant !!!";
            } else if(productPrice < valeurInput + 50 && productPrice > valeurInput -50) {
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est chaud !!!";
            } else if(productPrice < valeurInput + 75 && productPrice > valeurInput -75) {
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est tiéde !!!";
            } else{
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est froid !!!";   
            }
            vies--;    
            verifyLoose();// on lance la fonction verifyLoose
        // sinon c'est le cas où il est dans le tableau auparavant
        } else {
            alert("Ce nombre a déjà été saisie!");
        } 
        // ajouter le nombre saisie au tableau
        seizedPrices.push(valeurInput);
        actualiseCoeurs(vies);
    })
    // on définit la fonction verifyLoose
    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = "#FFFF";
            essayerBtn.setAttribute("disabled", "") // disabled => rendre le bouton non cliquable
            //setAttribute => ajouter un attribut au bouton 
            message.textContent = `Vous avez perdu. Le prix était de ${productPrice} euros`;
            rejouerBtn.style.display = "block";
            annulerBtn.style.display = "none";
            essayerBtn.style.display= "none";
            // on réactives le bouton pour jouer
        }
    } // on ajoutes ou enlèves un certains nombre de coeur au tableau
    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++){
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);
    // forcer rechargement de la page
    rejouerBtn.addEventListener("click", () => {
        message.style.display = "none";
        document.location.reload(true);
    })
    // fonction difficulte
    function difficulte(levelNiv,nbVies,nbViesTotals) {
        // on écoutes l'évenement click des boutons et on lance une fonction anonyme
        levelNiv.addEventListener("click",() => {
            statutJeu = true;
            resetBtn.style.display = "block";
            // on enléves l'attribut sur le bouton essayer pour le rendre de nouveau cliquable
            essayerBtn.style.display = "block";
            // on fait disparaitre le contenu du span avertissement
            annulerBtn.style.display = "block";
            // on fait apparaitre le message "veuillez choisir votre niveau de difficulté"
            message.style.display = "block";
            // on attribue à la variable vies la valeur de nbVies
            vies = nbVies;
            totalVies = nbViesTotals;
            // on appelle et lance la fonction empeachLevel();
            empeachChangeLevel();
            // on rajoutes du contenu HTML directement en JS à la balise P
            p.textContent = `Trouvez un nombre entre 0 et 1000. Vous avez ${vies} vies.`;
            // le paragraphe P devient un élement enfant de la div  
            divNbVies.appendChild(p);
            actualiseCoeurs(vies);
            resetCoeurs(vies);
            divForm.style.display = "block";
            leaveLevel();  
        })             
    }    
    difficulte(easyNiv,7,7);    
    difficulte(interNiv,6,6);
    difficulte(difficultNiv,5,5);
    difficulte(nightmareNiv,4,4);

    // fonction empeachChangeLevel
    function empeachChangeLevel(){
        if(statutJeu == true){
            let levelNiv = [interNiv, easyNiv, nightmareNiv, difficultNiv];
           levelNiv.forEach(levelNivs => {
               levelNivs.style.display = "none";
           });
           message.style.display = "none";
        }
    } 
    // fonction leaveLevel
    function leaveLevel(){
        if(statutJeu == true){
            annulerBtn.addEventListener("click", () => {
                document.location.reload(true);
            });
        }
    }
    // fonction empeachSeizeNumber
    function empeachSeizeNumber(){  
        input.addEventListener("keydown", () => {
            if(statutJeu == false){
                avertissement.textContent = "Vous devez revenir à l'écran d'accueil puis sélectionnez un niveau de difficulté!";
                avertissement.style.display = "block";
                setTimeout( () => {
                    avertissement.style.display = "none";
                },4500 ) 
                rejouerBtn.style.display = "block";
                essayerBtn.style.display = "none";
                message.style.display = "none";
                let levelNiv = [interNiv, easyNiv, nightmareNiv, difficultNiv];
                levelNiv.forEach(levelNivs => {
                    levelNivs.style.display = "none";
                })
                body.style.backgroundImage = bgError; 
                body.style.color = "white";
            }   
        })  
       
    }   
    // fonction resetCoeurs
   const resetCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++){
            tableauDeVies.push(coeurPlein);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
} 
play();

 