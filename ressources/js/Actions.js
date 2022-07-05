// import TemplateDetail from './TemplateDetail.js';

export default class Actions {

    // constructor(){
    //     let reponseJson = this.recupererCategories();
    //     let reponse = JSON.parse(reponseJson);
    //     console.log(reponse);
    // }
    

    async obtenirEnregistrements(tabCats) {
        // console.log('this.nomCollection :', this.nomCollection);
        let reponse = await fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/' + this.nomCollection);
        // Traiter la réponse...
        let reponseJson = await reponse.json();
        // console.log('Nom de la collection : ', collection);
        // console.log('Collection (JSON) : ', reponseJson);

        // console.log('reponseJson ',reponseJson);
        this.afficherCollection(reponseJson, tabCats);
    }

    afficherCollection(dataCollection, tabCats) {
        // console.log(dataCollection);

        // console.log('tabCats : ', tabCats);

        // Récupération des catégories
        // const tabCat = ['Desserts', 'Entrées', 'Fromages', 'Poissons', 'Viandes', 'Vins blancs', 'Vins mousseux', 'Vins rouges'];

        document.querySelector('.liste-enregistrements caption code').innerText = this.nomCollection;

        let rangeeTHead = document.querySelector('.liste-enregistrements thead tr');
        let tBody = document.querySelector('.liste-enregistrements tbody');
        rangeeTHead.innerHTML = '';
        tBody.innerHTML = '';
        
        // Générer l'entête de la table à partir des propriétés d'un enregistrement
        let th = null;
        for(const prop in dataCollection[0]) {
            if ((!prop.match(/cat_nom/) && !prop.match(/cat_type/)) || (this.nomCollection == 'categories') ) {
                th = document.createElement('th');

                if (prop.match(/cat_id_ce$/))
                    th.innerText = 'categorie';
                else
                    th.innerText = prop.slice(4);

                rangeeTHead.appendChild(th);
            }
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
            // console.log(article);
                        
            rangeeTBody = document.createElement('tr');
            rangeeTBody.dataset.id = article.cat_id || article.pla_id || article.vin_id;
            let td = null;
            for(const prop in article) {
                
                // console.log('Article : ', article);

                if (!prop.match(/cat_nom/) && !prop.match(/cat_type/) || (this.nomCollection == 'categories')) 
                {
                    td = document.createElement('td');

                    if ( prop.match(/_id$/)) {
                        td.innerText = article[prop];
                    }
                    else 
                        if (prop.match(/cat_id_ce$/)){

                            // -----------------------------------------

                            let domString = '';
                            domString = domString+ `
                            <td>
                                <select name="${prop}" id="${prop}">
                            `;
                        
                            for (let elt of tabCats ){

                                if ( elt.cat_nom == article.cat_nom )
                                    domString = domString+ `<option value="${elt.cat_id}" selected>${elt.cat_nom}</option>`
                                else
                                    if (elt.cat_type.toUpperCase().match(/^VIN$/) &&  article.cat_type.toUpperCase().match(/^VIN$/))
                                        domString = domString+ `<option value="${elt.cat_id}">${elt.cat_nom}</option>`
                                    else
                                        if (!elt.cat_type.toUpperCase().match(/^VIN$/) &&  !article.cat_type.toUpperCase().match(/^VIN$/))
                                            domString = domString+ `<option value="${elt.cat_id}">${elt.cat_nom}</option>`
                            }
                            domString = domString+ `
                                </select>
                            </td>
                            `;

                            td.innerHTML = domString;
                            
                            
                            // -----------------------------------------
                        }
                        else {
                            

                            if (prop.match(/cat_type/)) {
                                // console.log('Prop : ', prop);    
                                let tabCatsType = ['plat','vin']
                                let domString = '';
                                domString = domString+ `
                                <td>
                                    <select name="${prop}" id="${prop}">
                                `;
                            
                                for (let eltType of tabCatsType ){

                                    if ( eltType == article.cat_type )
                                        domString = domString+ `<option value="${article.cat_id}" selected>${eltType}</option>`
                                    else
                                        domString = domString+ `<option value="${article.cat_id}">${eltType}</option>`
                                }
                                domString = domString+ `
                                    </select>
                                </td>
                                `;

                                td.innerHTML = domString;
                            }
                            else
                                td.innerHTML = `<input type="text" name="${prop}" value="${article[prop]}">`;
                        }
                    rangeeTBody.appendChild(td);
                    
                }
            }
            td = document.createElement('td');
            td.innerHTML = '<button class="btn-modifier">modifier</button><button class="btn-supprimer">supprimer</button>';
            td.classList.add('action');
            rangeeTBody.appendChild(td);
            tBody.appendChild(rangeeTBody);
        }

        this.activerBouttons();
        
    }

    activerBouttons(){

        document.querySelector('.liste-enregistrements').addEventListener('click', function(evt) {
            
            const rangee = evt.target.closest('tr');
            // console.log(rangee);

            if(evt.target && evt.target.classList.contains('btn-modifier')) {
                console.log(rangee);
                this.modifierElement(rangee);
            }
            else if(evt.target && evt.target.classList.contains('btn-supprimer')) {
                this.supprimerElement(rangee);
                // console.log(`supprimerElement(${rangee})`);
            }
            else if(evt.target && evt.target.classList.contains('btn-ajouter')) {
                // this.ajouterElement(rangee);
                // console.log(`ajouterElement(${rangee})`);
            }

        }.bind(this));
    }



    rangeeEnJson(rangee) {
        const lesElts = rangee.querySelectorAll('input');
        const leSelect = rangee.querySelector('select');
        
        // console.log(lesElts);
        // console.log(leSelect);

        let objetDonnees = {};
        for(const elt of lesElts) {
            objetDonnees[elt.name] = elt.value;
        }
        objetDonnees[leSelect.name] = leSelect.value;
        return JSON.stringify(objetDonnees);
    }


    async modifierElement(rangee) {
        const donneesJson = this.rangeeEnJson(rangee);
        console.log("Données de la rangée en JSON", donneesJson);

        let reponse = await fetch(
            'http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/' + this.nomCollection + '/' + rangee.dataset.id,
            {
                method: 'PUT',
                body: donneesJson
            }
        );
        let reponseJson = await reponse.json();

        // console.log("Données de la rangée en JSON", reponseJson);
    }
    

    async supprimerElement(rangee) {
        let reponse = await fetch(
            'http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/' + this.nomCollection + '/' + rangee.dataset.id,
            { method: 'DELETE' }
        );
        let reponseJson = await reponse.json();
        // Supprimer la rangée localement (DOM)
        if(reponseJson && reponseJson.nombre > 0) {
            rangee.remove();
        }
    }


    async AjouterElement(rangee) {
        
    }

    // async recupererCategories() {
    //     let reponse = await fetch('http://localhost/session4/TECHNIQUES-APW/api-web-rest/index.php/categories');
    //     let reponseJson = await reponse.json();
    //     // console.log(reponseJson);
    //     return reponseJson;
    // }

    

    

}
