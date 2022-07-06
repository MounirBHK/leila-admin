import Categorie  from './Categorie.js';
import { classMapping } from './classMapping.js';
 
async function recupererCategories() {
    let reponse = await fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/categories');
    let reponseJson = await reponse.json();
    return reponseJson;
}

// recupererCategories().then((reponseJson) => console.log(reponseJson));


(function() {

    // sessionStorage.clear();

   
    recupererCategories().then((reponseJson) => 
        {
            // let catsJson = JSON.stringify(reponseJson);
            // sessionStorage.setItem('cats', catsJson);
            // var tabCats = JSON.parse(sessionStorage.cats);
            new Categorie("categories", reponseJson);
            document.querySelectorAll('.navigation-principale li').forEach(function(item, pos, itemsMenu) {
                item.addEventListener('click', function() {
        
                    itemsMenu.forEach((elt)=>elt.classList.remove('actif'));
                    item.classList.add('actif');
                    let nomCollection = item.dataset.collection;
                    new classMapping[nomCollection](nomCollection, reponseJson);
        
                });
            });
    
        }
    );

    
    
})(); 
