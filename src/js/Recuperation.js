var path = '';
let champ = 'Yorick';
let imgChamp = 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/'+ champ +'.png';
let xhr = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();
let icon= {
    'hp': '../../img/hp.png',
    'mp': '/img/mana.png',
    'attackdamage': '/img/attack.png',
    'ap': '/img/ap.png',
    'armor': '/img/armor.png',
    'spellblock': '/img/spellblock.png',
    'movespeed': '/img/movespeed.png',
    'ability': '/img/abibity.png',
    'crit': '',
    'attackspeed': '/img/speedAttack.png'
};

xhr.open('GET','https://ddragon.leagueoflegends.com/api/versions.json',false);
xhr.onreadystatechange =  function () {
    if (xhr.readyState === 4 && xhr.status === 200){
        const data = JSON.parse(xhr.responseText);
        path += data[0];
    }

}
xhr.send();//nécessaire

const url = 'https://ddragon.leagueoflegends.com/cdn/' + path +'/data/fr_FR/champion/' + champ + '.json';
var statesChamp = [];

xhr2.open('GET',url,false);
xhr2.onreadystatechange = function () {
    if (xhr2.readyState === 4 && xhr2.status === 200){
        const data = JSON.parse(xhr2.responseText);
        console.log(data);
        afficherStats(data['data'][champ]['stats']);
    }

}
xhr2.send();

// Créer un nouvel élément img
let imgElement = document.getElementById('championImage');

// Définir l'attribut src de l'élément img
imgElement.src = imgChamp;

function afficherStats(stats) {
    let tbody = document.querySelector('#statsTable tbody');

    for (let stat in stats) {
        if (stat.includes('per') || stat.includes('regen') || stat.includes('range')){
            continue;
        }
        let tr = document.createElement('tr');
        let tdStat = document.createElement('td');
        let tdValue = document.createElement('td');
        let img = document.createElement('img');

        img.src = icon[stat]; // Définir la source de l'image
        img.alt = 'icon ' + stat;
        tdStat.appendChild(img);
        tdValue.textContent = stats[stat];

        tr.appendChild(tdStat);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    }
}