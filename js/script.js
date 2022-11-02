// REGLES DE NOMMAGE 
// FONCTIONS EN CAMELCASE
// VARIABLES EN SNAKECASE


// start pour commencer le jeu et voir l'intro et play pour commencer à jouer



// BOOLEENS POUR FAIRE AVANCER LE JEU

//let cadres_repositionnes = false;
let cadres_repositionnes = false;
let feuilles_retirees = false;
let livres_ranges = false;
let coussins_reposes = false;

let compteur_feuilles = 0;
let compteur_livres = 0;
let compteur_cadres = 0;

let compteur_coussins = 0;




// function end(){
//     let game_div = document.querySelector(".game_div");
//     let intro_div = document.querySelector(".introduction_div");
//     game_div.style.display = 'none';
//     intro_div.style.display = 'block';


// }




playGame();

function playGame() {
    const game_lost = setTimeout(endLose, 120000);
    startGame();

    afficherTodolist();
    cleanRoom();

    // clean room -> decorate room -> prepare room

}



function endLose() {
    let game_div = document.querySelector(".game_div");
    let intro_div = document.querySelector(".introduction_div");
    game_div.style.display = 'none';
    intro_div.style.display = 'block';

    // let defaite = document.querySelector(".dommage");
    //  defaite.style.display = 'block';

}

function endWin() {
    let victoire = document.querySelector(".bravo");
    victoire.style.display = 'block';


}



// HORLOGE

// tutoriel https://jsfiddle.net/nypmrdLt/
var startDate = new Date();

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

setInterval('horloge()', 1000);



// FNCTION POUR CHANGER LES FENETRES DE JEU
function startGame() {
    let start_button = document.querySelector(".start_button");
    let start_div = document.querySelector(".start_div");

    let outils_section = document.querySelector("#outils_section");

    let play_button = document.querySelector(".play_button");
    let intro_div = document.querySelector(".introduction_div");

    let game_div = document.querySelector(".game_div");

    // Affichage de la div d'intro
    start_button.addEventListener("click", function () {
        start_div.style.display = 'none';
        intro_div.style.display = 'block';
    });

    // Affichage de la div de jeu
    play_button.addEventListener("click", function () {
        intro_div.style.display = 'none';
        game_div.style.display = 'block';
        outils_section.style.display = 'block';
    });
}

/* AFFICHAGE DE L'INVENTAIRE*/

function afficherTodolist() {

    let inventaire_todolist = document.querySelector(".inventaire_todolist");
    let todo_section = document.querySelector("#todo_section");

    let todolist = document.querySelector(".todolist");

    todolist.addEventListener("click", function () {
        inventaire_todolist.style.display = 'block';
        todolist.style.display = 'none';
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



    // let cadres = document.querySelectorAll('.cadres');
    // let cadres_bool = new Array();


    // for (j of cadres) {
    //     j.addEventListener('click', function () {
    //         this.classList.add("cadres-remove-rotation");
    //         cadres_bool[this.id] = true;
    //         console.log(cadres_bool)
    //         //
    //         // console.log(compteur_cadres)
    //         //validation des cadres pas bonne 

    //         for (i = 0; i < cadres_bool.length; i++) {

    //             while (cadres_bool[i] == true) {

    //                 compteur_cadres++;
    //             }
    //             console.log(compteur_cadres)
    //             if (compteur_cadres == 4) {
    //                 cadres_repositionnes = true;
    //                 let todo_cadres = document.querySelector('.todo_cadres');
    //                 todo_cadres.classList.add("li_barres");

    //             }
    //             compteur_cadres = 0;

    //             // if (cadres_bool[i] == false) {
    //             //     cadres_repositionnes = false;

    //             //     console.log("bravo2")
    //             // } else {
    //             //     cadres_repositionnes = true;
    //             //     let todo_cadres = document.querySelector('.todo_cadres');
    //             //     todo_cadres.classList.add("li_barres");

    //             // }
    //         }
    //     });



    // }

    // RETIRE ROTATION CADRES et affiche dans la to do list 
    // array de booleens pour verifier que tous les cadres ont ete remis a leur position souhaitee
    let cadres = document.querySelectorAll('.cadres');
    let cadres_bool = new Array(false, false, false, false, false, false)
    let cadres_name = new Array("cadre1", "cadre2", "cadre4", "cadre5", "cadre6", "cadre7")
    let todo_cadres = document.querySelector('.todo_cadres');


    console.log('clean')

    for (i = 0; i < cadres.length; i++) {

        cadres[i].addEventListener("click", function () {
            this.classList.add("cadres-remove-rotation");

            for (j = 0; j < cadres_name.length; j++) {
                if (this.id == cadres_name[j]) {
                    //console.log('cadre')
                    cadres_bool[j] = true;
                }
            }

            for (k = 0; k < cadres_bool.length; k++) {
                if (cadres_bool[k] == true) {
                    //console.log('while')
                    compteur_cadres++;
                }
            }


            //console.log(compteur)

            if (compteur_cadres == 5) {
                //console.log('NICE')
                cadres_repositionnes = true;
                todo_cadres.classList.add("li_barres");
            }

            compteur_cadres = 0;

            console.log(cadres_repositionnes)
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
            console.log(compteur_feuilles)



            if (compteur_feuilles > 5) {
                feuilles_retirees = true;

                todo_feuilles.classList.add("li_barres");
                // console.log("bravo")
            }

            console.log(feuilles_retirees)
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
            // console.log(i)
            // console.log(choix_de_coussin)
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
    });


    let plante4 = document.querySelector('.plante4');
    plante4.addEventListener('click', function () {
        plante4.classList.add("plante4_range");
    });












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

    let guirlande_placee = false;

    let placement_guirlande = document.querySelector(".placement_guirlande");

    let todo_guirlande = document.querySelector('.todo_guirlande');



    /*
    clic sur etagere fermee ouvre etagere et affiche objets dans etagere 
    clic sur objets dans etagere affiche objets dans inventaire
    clic sur objets dans inventaire change curseur souris
    clicpartout avec curseur souris modifie affiche objet dans la scene 

    */
    etagere_fermee.addEventListener("click", function () {
        etagere_ouverte.style.display = 'block';
        etagere_fermee.style.display = 'none';

    });

    etagere_ouverte.addEventListener("click", function () {
        etagere_ouverte.style.display = 'none';
        etagere_fermee.style.display = 'block';
        guirlande.style.display = 'none';
    });


    guirlande.addEventListener("click", function () {
        if (!guirlande_placee) {
            inventaire_guirlande.style.display = 'block';
            guirlande.style.display = 'none';
            guirlande_placee = true;
        }
    });

    inventaire_guirlande.addEventListener("click", function () {
        etagere_ouverte.style.display = 'block';
        document.body.style.cursor = 'url(/medias/cursor/cursor_guirlande_1.png), auto';
        console.log("aaaaaa")
        placement_guirlande.classList.add("div_placement_guirlande");
    });

    placement_guirlande.addEventListener("click", function () {
        guirlande.style.display = 'block';
        guirlande.classList.add("guirlande1_accrochee");
        guirlande.classList.remove("guirlande1");
        document.body.style.cursor = "auto";
        todo_guirlande.classList.add("li_barres");

    });


    /*ballon
    guirlande
nouveaux objets
    speaker quand on eteint la lumiere 
    */
}


// function pour verifier que le nettoyage de la piece est bien fait
// lancement de la partie du jeu sur la decoration
function verificationCleanRoom() {

    if (cadres_repositionnes && feuilles_retirees && coussins_reposes && livres_ranges) {
        decorateRoom();
    }
}