// import TemplateDetail from './TemplateDetail.js';

export default class Plat {


    constructor(nomCollection){
        this.nomCollection = nomCollection;
        // console.log('bienvenue dans la classe '+this.nomCollection)

        this.init();

        this.obtenirEnregistrements();
    }

    init(){
        document.querySelector('.liste-enregistrements').addEventListener('click', function(evt) {
            
            // console.log(evt.target);
            // console.log(evt.target.closest('tr'));
            // console.log(evt.target.classList);

            const rangee = evt.target.closest('tr');

            if(evt.target && evt.target.classList.contains('btn-modifier')) {
                // modifierElement(rangee);
                console.log('modifierElement(rangee)');
            }
            else if(evt.target && evt.target.classList.contains('btn-supprimer')) {
                // supprimerElement(rangee);
                console.log('supprimerElement(rangee)');
            }
            else if(evt.target && evt.target.classList.contains('btn-ajouter')) {
                // ajouterElement(rangee);
                console.log('ajouterElement(rangee)');
            }

        });

    }


    async obtenirEnregistrements() {
        let reponse = await fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/' + this.nomCollection);
        // Traiter la réponse...
        let reponseJson = await reponse.json();
        // console.log('Nom de la collection : ', nomCollection);
        // console.log('Collection (JSON) : ', reponseJson);

        this.afficherCollection(reponseJson);
    }

    afficherCollection(dataCollection) {

        document.querySelector('.liste-enregistrements caption code').innerText = this.nomCollection;
        let rangeeTHead = document.querySelector('.liste-enregistrements thead tr');
        let tBody = document.querySelector('.liste-enregistrements tbody');
        rangeeTHead.innerHTML = '';
        tBody.innerHTML = '';
        
        // Générer l'entête de la table à partir des propriétés d'un enregistrement
        let th = null;
        for(const prop in dataCollection[0]) {
            th = document.createElement('th');
            th.innerText = prop.slice(4);
            rangeeTHead.appendChild(th);
        }
        th = document.createElement('th');
        th.innerHTML ='<button class="btn-ajouter">Ajouter</button>';
        rangeeTHead.appendChild(th);

        // th = document.createElement('th');
        // th.classList.add('actio);n'
        // rangeeTHead.appendChild(th);
    
        // Générer le corps de la table à partir des données de la collection
        let rangeeTBody = null;
        for (const article of dataCollection) {
            rangeeTBody = document.createElement('tr');
            rangeeTBody.dataset.id = article.cat_id || article.pla_id || article.vin_id;
            let td = null;
            for(const prop in article) {
                td = document.createElement('td');
                if(prop.match(/_id$/)) {
                    td.innerText = article[prop];
                }
                else {
                    td.innerHTML = `<input type="text" name="${prop}" value="${article[prop]}">`;
                }
                
                rangeeTBody.appendChild(td);
            }
            td = document.createElement('td');
            td.innerHTML = '<button class="btn-modifier">modifier</button><button class="btn-supprimer">supprimer</button>';
            td.classList.add('action');
            rangeeTBody.appendChild(td);
            tBody.appendChild(rangeeTBody);
        }
    }

}
