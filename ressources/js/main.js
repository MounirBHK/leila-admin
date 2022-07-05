import Categorie  from './Categorie.js';
import { classMapping } from './classMapping.js';


(function() {

    localStorage.clear();

    async function recupererCategories() {
        let reponse = await fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/categories');
        let reponseJson = await reponse.json();
        return reponseJson;
    }

    recupererCategories().then((reponseJson) => 
                                {
                                    let catsJson = JSON.stringify(reponseJson);
                                    sessionStorage.setItem('cats', catsJson);
                                }
    );

    var tabCats = JSON.parse(sessionStorage.cats);
    new Categorie("categories", tabCats);


    document.querySelectorAll('.navigation-principale li').forEach(function(item, pos, itemsMenu) {
        item.addEventListener('click', function() {

            itemsMenu.forEach((elt)=>elt.classList.remove('actif'));
            item.classList.add('actif');

            let nomCollection = item.dataset.collection;
            // let laCollection = nomCollection.charAt(0).toUpperCase()+nomCollection.slice(1, nomCollection.length-1);
            // let nomEntite = nomCollection.slice(0, nomCollection.length-1);

            
            // console.log(tabCats);

            new classMapping[nomCollection](nomCollection, tabCats);

            // obtenirEnregistrements();
        });
    });

})(); 