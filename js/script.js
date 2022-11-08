// FONCTIONS EN CAMELCASE
// VARIABLES EN SNAKECASE


// DECLARATION DES VARIABLES GLOBALES
let cadres_repositionnes = false;
let feuilles_retirees = false;
let livres_ranges = false;
let coussins_reposes = false;
let plante3_rangee = false;
let plante4_rangee = false;
let objets_etagere_ranges = false;

let guirlande_placee = false;
let bougies_placees = false;
let ballons_gonfles = false;

let bougies_allumees = false;
let musique_allumee = false;
let lumieres_eteintes = false;


let compteur_feuilles = 0;
let compteur_livres = 0;
let compteur_cadres = 0;
let compteur_coussins = 0;

let verificationDecorateRoomBool = false;
let verificationCleanRoomBool = false;
let verificationPreparerAmbianceBool = false;


let TEMPS_DE_JEU = 120000;

let startDate = new Date();


// FONCTION POUR DEMARRER LE JEU
startGame();
// clean room -> decorate room -> prepare room


// fonctions de fin
function endLose() {

    let defaite = document.querySelector(".dommage");
    defaite.style.display = 'block';
    let introduction_section = document.querySelector("#introduction_section");
    introduction_section.style.display = 'none';

    let outils_section = document.querySelector("#outils_section");
    outils_section.style.display = 'none';

}

function endWin() {

    let victoire = document.querySelector(".bravo");
    victoire.style.display = 'block';
    let introduction_section = document.querySelector("#introduction_section");
    introduction_section.style.display = 'none';
    let outils_section = document.querySelector("#outils_section");
    outils_section.style.display = 'none';

}


// HORLOGE
// tutoriel https://jsfiddle.net/nypmrdLt/

function horloge() {

    var diff = new Date().getTime() - startDate.getTime();
    var mytime = new Date(2022, 01, 01, 20, 58, 00, 000);
    mytime.setMilliseconds(mytime.getMilliseconds() + diff);

    var seconds = mytime.getSeconds();
    var minutes = mytime.getMinutes();
    var hours = mytime.getHours();

    var start_time = hours + ":" + minutes + ":" + seconds;

    document.getElementById("timer").firstChild.nodeValue = start_time;
}


//musique qui ne s'active qu'au clic sur la radio dans le jeu
function jouerAudio() {

    let musique = document.querySelector('#musique');

    let radio = document.querySelector('.radio');
    let todo_musique = document.querySelector('.todo_musique');

    radio.addEventListener("click", function () {
        if (musique.paused) {
            document.querySelector("#musique").play();
            document.querySelector('.radio').classList.add("radio_animation");
            musique_allumee = true;
            todo_musique.classList.add("li_barres");
            if(musique_allumee){
                verificationPreparerAmbiance();
    
            }
        } else {
            musique.pause();
            document.querySelector('.radio').classList.remove("radio_animation");
            musique_allumee = false;
            todo_musique.classList.remove("li_barres");
        }
    });
}



// FONCTION POUR CHANGER LES FENETRES DE JEU
function startGame() {

    let start_button = document.querySelector(".start_button");
    let start_div = document.querySelector(".start_div");

    let outils_section = document.querySelector("#outils_section");

    let play_button = document.querySelector(".play_button");
    let intro_div = document.querySelector(".introduction_div");

    let game_div = document.querySelector(".game_div");
    let filtre_nuit = document.querySelector(".filtre_nuit");


    // Affichage de la div d'intro
    start_button.addEventListener("click", function () {
        start_div.style.display = 'none';
        intro_div.style.display = 'block';
    });

    // Affichage de la div de jeu
    play_button.addEventListener("click", function () {
        intro_div.style.display = 'none';
        game_div.style.display = 'block';
        // filtre_nuit.style.display = 'block';

        outils_section.style.display = 'block';
        jouerAudio();

        //commencer le timeout et timer seulement quand le bouton start a ete appuye

        setInterval('horloge()', 1000);

        const game_lost = setTimeout(endLose, TEMPS_DE_JEU);
    });

    afficherTodolist();
    cleanRoom();

}

/* AFFICHAGE DE L'INVENTAIRE*/

function afficherTodolist() {

    let inventaire_todolist = document.querySelector(".inventaire_todolist");
    let todo_section = document.querySelector("#todo_section");

    let todolist = document.querySelector(".todolist");

    let points_exclamation = document.querySelectorAll(".point_exclamation");

    todolist.addEventListener("click", function () {
        inventaire_todolist.style.display = 'block';
        todolist.style.display = 'none';
        for (point in points_exclamation) {
            points_exclamation[point].style.display = 'none';
        }
    });

    inventaire_todolist.addEventListener("click", function () {
        console.log("test")
        todo_section.style.display = 'block';
    });

    todo_section.addEventListener("click", function () {
        todo_section.style.display = 'none';

    });

}


// BOUCLE SUR LE NETTOYAGE 
function cleanRoom() {

    // RETIRE ROTATION CADRES et affiche dans la to do list 
    // array de booleens pour verifier que tous les cadres ont ete remis a leur position souhaitee
    let cadres = document.querySelectorAll('.cadres');
    let cadres_bool = new Array(false, false, false, false, false, false)
    let cadres_name = new Array("cadre1", "cadre2", "cadre4", "cadre5", "cadre6", "cadre7")
    let todo_cadres = document.querySelector('.todo_cadres');

    for (i = 0; i < cadres.length; i++) {

        cadres[i].addEventListener("click", function () {
            this.classList.add("cadres-remove-rotation");

            for (j = 0; j < cadres_name.length; j++) {
                if (this.id == cadres_name[j]) {
                    cadres_bool[j] = true;
                }
            }

            for (k = 0; k < cadres_bool.length; k++) {
                if (cadres_bool[k] == true) {
                    compteur_cadres++;
                }
            }

            if (compteur_cadres == 5) {
                cadres_repositionnes = true;
                todo_cadres.classList.add("li_barres");
            }

            compteur_cadres = 0;
            verificationCleanRoom();

        })
    }


    // RETIRER FEUILLES PLANTE AU SOL
    let feuilles = document.querySelectorAll('.feuilles');

    let inventaire_feuilles = document.querySelector('.inventaire_feuilles');

    let p_compteur_feuilles = document.querySelector('.p_compteur_feuilles');
    let todo_feuilles = document.querySelector('.todo_feuilles');


    for (i of feuilles) {
        i.addEventListener('click', function () {
            this.style.display = 'none';
            inventaire_feuilles.style.display = 'block';
            compteur_feuilles++;

            //p_compteur_feuilles.textContent = compteur_feuilles + "/6";


            if (compteur_feuilles > 5) {
                feuilles_retirees = true;

                todo_feuilles.classList.add("li_barres");
            }
            verificationCleanRoom();
        });
    }


    // COUSSINS
    //ESSAYER UN DRAG EVENT SUR LES COUSSINS 
    let coussins = document.querySelectorAll(".coussins");
    let todo_coussins = document.querySelector('.todo_coussins');

    console.log(coussins.length)
    for (let i = 0; i < coussins.length; i++) {
        coussins[i].addEventListener('click', function () {

            let j = i + 1;
            let choix_de_coussin = "coussin" + j + "_range";
            // let choix_de_curseur = "cursor" + j;

            coussins[i].classList.add(choix_de_coussin);
            // coussins[i].classList.add(choix_de_curseur);
            compteur_coussins++;

            if (compteur_coussins == 4) {
                coussins_reposes = true;
                todo_coussins.classList.add("li_barres");
            }
            verificationCleanRoom();
        })
    }


    // OBJETS SUR ETAGERE
    let plante3 = document.querySelector('.plante3');

    plante3.addEventListener('click', function () {
        plante3.classList.add("plante3_range");
        plante3_rangee = true;
        verificationObjetsEtagere();
    });


    let plante4 = document.querySelector('.plante4');
    plante4.addEventListener('click', function () {
        plante4.classList.add("plante4_range");
        plante4_rangee = true;
        verificationObjetsEtagere();
    });


    //LIVRES 

    let livres = document.querySelectorAll(".img_livre")
    let livre_range = document.querySelectorAll(".img_livre_range")
    let todo_livres = document.querySelector('.todo_livres');


    for (let i = 0; i < livres.length; i++) {
        livres[i].addEventListener('click', function () {
            //let livre_range = livres[i] + "_range";
            //console.log(livre_range)
            livres[i].style.display = "none";
            livre_range[i].style.display = "block";
            compteur_livres++;
            console.log(compteur_livres)


            if (compteur_livres == 3) {
                livres_ranges = true;
                todo_livres.classList.add("li_barres");
            }
            verificationCleanRoom();

        })
    }
}




function decorateRoom() {

    // PARTIE SUR LA RECUPERATION DES OBJETS DANS ETAGERE

    //apparition etagere


    let etagere_fermee = document.querySelector(".etagere_fermee");
    let etagere_ouverte = document.querySelector(".etagere_ouverte");

    let guirlande = document.querySelector(".guirlande1");
    let inventaire_guirlande = document.querySelector(".inventaire_guirlande");
    let placement_guirlande = document.querySelector(".placement_guirlande");
    let todo_guirlande = document.querySelector('.todo_guirlande');

    let bougies = document.querySelector(".bougies");
    let inventaire_bougies = document.querySelector(".inventaire_bougies");
    let placement_bougies = document.querySelector(".placement_bougies");
    let todo_bougies = document.querySelector('.todo_bougies');

    let ballons = document.querySelector(".ballons");
    let inventaire_ballons = document.querySelector(".inventaire_ballons");
    let placement_ballons = document.querySelector(".placement_ballons");
    let todo_ballons = document.querySelector('.todo_ballons');


    let guirlande_dans_etagere = true;
    let bougies_dans_etagere = true;
    let ballons_dans_etagere = true;



    /*
    clic sur etagere fermee ouvre etagere et affiche objets dans etagere 
    clic sur objets dans etagere affiche objets dans inventaire
    clic sur objets dans inventaire change curseur souris
    clicpartout avec curseur souris modifie affiche objet dans la scene 

    */

    //pour que les objets ne réapparaissent pas quand on clique sur etagere
    if (guirlande_dans_etagere && bougies_dans_etagere && ballons_dans_etagere) {

        etagere_fermee.addEventListener("click", function () {
            etagere_ouverte.style.display = 'block';
            etagere_fermee.style.display = 'none';
            guirlande.style.display = 'block';
            bougies.style.display = 'block';
            ballons.style.display = 'block';
        });
    }
    if (!guirlande_dans_etagere && !bougies_dans_etagere && !ballons_dans_etagere) {

        etagere_ouverte.addEventListener("click", function () {
            etagere_ouverte.style.display = 'none';
            etagere_fermee.style.display = 'block';
            guirlande.style.display = 'none';
            bougies.style.display = 'none';
            ballons.style.display = 'none';
        });
    }




    // placement de la guirlande
    guirlande.addEventListener("click", function () {
        if (!guirlande_placee) {
            inventaire_guirlande.style.display = 'block';
            guirlande.style.display = 'none';
            guirlande_dans_etagere = false;
        }

    });

    inventaire_guirlande.addEventListener("click", function () {
        etagere_ouverte.style.display = 'block';
        document.body.style.cursor = 'url(/images/cursor/cursor_guirlande_1.png), auto';
        placement_guirlande.classList.add("div_placement_guirlande");
    });

    placement_guirlande.addEventListener("click", function () {
        guirlande.style.display = 'block';
        guirlande.classList.add("guirlande1_accrochee");
        guirlande.classList.remove("guirlande1");
        placement_guirlande.classList.remove("div_placement_guirlande");
        inventaire_guirlande.style.display = 'none';
        document.body.style.cursor = "auto";
        todo_guirlande.classList.add("li_barres");

        guirlande_placee = true;

        if (guirlande_placee) {
            verificationDecorateRoom();
        }

    });


    // placement des bougies
    bougies.addEventListener("click", function () {
        if (!bougies_placees) {
            inventaire_bougies.style.display = 'block';
            bougies.style.display = 'none';
            bougies_dans_etagere = false;
        }

    });

    inventaire_bougies.addEventListener("click", function () {
        etagere_ouverte.style.display = 'block';
        document.body.style.cursor = 'url(/images/cursor/cursor_bougies.png), auto';
        placement_bougies.classList.add("div_placement_bougies");
    });

    placement_bougies.addEventListener("click", function () {
        bougies.style.display = 'block';
        bougies.classList.add("bougies_placees");
        bougies.classList.remove("bougies");
        placement_bougies.classList.remove("div_placement_bougies");
        document.body.style.cursor = "auto";
        todo_bougies.classList.add("li_barres");
        inventaire_bougies.style.display = 'none';

        bougies_placees = true;

        if (bougies_placees) {
            verificationDecorateRoom();
        }

    });



    // placement des ballons
    ballons.addEventListener("click", function () {
        if (!ballons_gonfles) {
            inventaire_ballons.style.display = 'block';
            ballons.style.display = 'none';
            ballons_dans_etagere = false;
        }

    });

    inventaire_ballons.addEventListener("click", function () {
        etagere_ouverte.style.display = 'block';
        document.body.style.cursor = 'url(/images/cursor/cursor_ballons.png), auto';
        placement_ballons.classList.add("div_placement_ballons");
    });

    placement_ballons.addEventListener("click", function () {
        ballons.style.display = 'block';
        ballons.classList.add("ballons_gonfles");
        ballons.classList.remove("ballons");
        placement_ballons.classList.remove("div_placement_ballons");
        document.body.style.cursor = "auto";
        todo_ballons.classList.add("li_barres");
        inventaire_ballons.style.display = 'none';

        ballons_gonfles = true;

        if (ballons_gonfles) {
            // ballons.addEventListener("click", function () {
            //     ballons.classList.add("taille_ballons");
            //     console.log("testtttttttt")
            // });
            verificationDecorateRoom();
        }

    });
}



//function preparer l'ambiance pour la surprise
function preparerAmbiance() {

    let bougies = document.querySelector(".bougies_placees");
    let lampe = document.querySelector(".lampe");
    let fond_sans_lumiere = document.querySelector(".fond_sans_lumiere");
    let todo_lumiere = document.querySelector('.todo_lumiere');
    let todo_bougies = document.querySelector('.todo_bougies');

    console.log(bougies)

    console.log("rentrepre")
    bougies.addEventListener("click", function () {
        bougies.style.display = 'none';
        todo_bougies.classList.add("li_barres");

        bougies_allumees = true;

        if(bougies_allumees){
            verificationPreparerAmbiance();

        }
    });

    lampe.addEventListener("click", function () {
        fond_sans_lumiere.style.display = 'block';
        todo_lumiere.classList.add("li_barres");
        lumieres_eteintes = true;
        if(lumieres_eteintes){
            verificationPreparerAmbiance();
        }
    });


    // verificationPreparerAmbiance();


}



//verification du rangement des objets de l'étagere
function verificationObjetsEtagere() {
    let todo_objets_etagere = document.querySelector('.todo_objets');

    if (plante3_rangee && plante4_rangee) {
        objets_etagere_ranges = true;
        todo_objets_etagere.classList.add("li_barres");

        verificationCleanRoom();
    }
}

// function pour verifier que le nettoyage de la piece est bien fait
// lancement de la partie du jeu sur la decoration
function verificationCleanRoom() {
    verificationCleanRoomBool = true;

    if (cadres_repositionnes && feuilles_retirees && coussins_reposes && livres_ranges && objets_etagere_ranges) {
        decorateRoom();
    }
}


// function pour verifier que la deco de la piece est bien faite
// lancement de la partie du jeu sur la preparation de la salle
function verificationDecorateRoom() {
    verificationDecorateRoomBool = true;

    if (bougies_placees && guirlande_placee && ballons_gonfles) {
        preparerAmbiance();

        // verificationGagne();
    }
}


function verificationPreparerAmbiance() {
    console.log("teeeeee")
    verificationPreparerAmbianceBool = true;
    if (bougies_allumees && musique_allumee && lumieres_eteintes) {
        verificationGagne();
        console.log("youp")

    }
}



function verificationGagne() {

    if (verificationCleanRoomBool && verificationDecorateRoomBool && verificationPreparerAmbianceBool) {
        endWin();
    }
}