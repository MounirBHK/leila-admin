import Actions from './Actions.js';

export default class Vin extends Actions {

    constructor(nomCollection, tabCats){
        super();
        this.tabCats = tabCats;
        this.nomCollection = nomCollection;
        // console.log('bienvenue dans la classe '+this.nomCollection)
        
        this.init();
    }

    init(){
        this.obtenirEnregistrements(this.tabCats);
    }
}