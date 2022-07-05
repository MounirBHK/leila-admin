import Actions from './Actions.js';

export default class Categorie extends Actions {

    constructor(nomCollection, tabCats){
        super();
        this.tabCats = tabCats;
        this.nomCollection = nomCollection;
        // console.log('bienvenue dans la classe '+this.nomCollection)
        
        // this.recupererCategories().then(
        //     tabDesCats => console.log(tabDesCats)
        // );
        // console.log("resultat = " , this.recupererCategories);

        this.init();
        

    }

    init(){

        this.obtenirEnregistrements(this.tabCats);

    }

    // async recupererCategories() {
    //     let reponse = await fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/categories');
    //     let reponseJson = await reponse.json();
    //     // console.log(reponseJson);

    //     let tabCat=[];
    //     for (let categorie of reponseJson)
    //     {
    //         tabCat.push({
    //                         'idCat' : categorie.cat_id, 
    //                         'nomCat' : categorie.cat_nom});

    //     }

    //     // console.log(tabCat);
    //     return tabCat;
    // }




    // recupererCategories() {
    //     fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/categories')
    //     .then(function(reponse){
    //         return reponse.json();
    //     })
    //     .then(function(data){
    //         console.log(data);
    //         let tabCat=[];
    //         for (let categorie of data)
    //         {
    //             // console.log(categorie);
    //             // console.log(categorie.cat_id);

    //             tabCat.push(categorie.cat_id);

    //         }
        
    //         console.log(tabCat);
    //         return tabCat;

    //     });

        
        
        
    // }


}