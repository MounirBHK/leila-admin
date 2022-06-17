document.querySelectorAll('.navigation-principale li').forEach(function(item, pos, itemsMenu) {
    item.addEventListener('click', function() {
        itemsMenu.forEach((elt)=>elt.classList.remove('actif'));
        item.classList.add('actif');
        obtenirEnregistrements(item.dataset.collection);
    });
});

// Remarquez l'utilisation de async/await au lieu de then() pour gérer les promesses
async function obtenirEnregistrements(nomCollection) {
    let reponse = await fetch('http://127.0.0.10:9000/index.php/' + nomCollection);
    // Traiter la réponse...
    let reponseJson = await reponse.json();
    // console.log('Nom de la collection : ', nomCollection);
    console.log('Collection (JSON) : ', reponseJson);
    afficherCollection(nomCollection, reponseJson);
}

function afficherCollection(nomCollection, dataCollection) {
    document.querySelector('.liste-enregistrements caption code').innerText = nomCollection;
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
    th.classList.add('action');
    rangeeTHead.appendChild(th);

    // Générer le corps de la table à partir des données de la collection
    let rangeeTBody = null;
    for (const article of dataCollection) {
        rangeeTBody = document.createElement('tr');
        rangeeTBody.dataset.id = article.cat_id || article.pla_id || article.vin_id;
        let td = null;
        for(const prop in article) {
            td = document.createElement('td');
            td.innerText = article[prop];
            rangeeTBody.appendChild(td);
        }
        td = document.createElement('td');
        td.innerHTML = '<button class="btn-modifier">modifier</button><button class="btn-supprimer">supprimer</button>';
        td.classList.add('action');
        rangeeTBody.appendChild(td);
        tBody.appendChild(rangeeTBody);
    }
}

document.querySelector('.liste-enregistrements').addEventListener('click', function(evt) {
    if(evt.target && evt.target.classList.contains('btn-modifier')) {
        modifierElement(evt.target.closest('tr').dataset.id);
    }
    else if(evt.target && evt.target.classList.contains('btn-supprimer')) {
        supprimerElement(evt.target.closest('tr').dataset.id);
    }
});


function modifierElement(idElt) {
    console.log("Identifiant de l'élément à modifier : ", idElt);
}

function supprimerElement(idElt) {
    console.log("Identifiant de l'élément à supprimer : ", idElt);
}

