var path = '';
var champ = '';
var imgChamp = '';
var item = '';
let icon= {
    'hp': '/img/hp.png',
    'Health': '/img/hp.png',

    'mp': '/img/mana.png',
    'Mana': '/img/mana.png',

    'attackdamage': '/img/attack.png',
    'Attack Damage': '/img/attack.png',

    'ap': '/img/ap.png',
    'Ability Power': '/img/ap.png',

    'armor': '/img/armor.png',
    'Armor': '/img/armor.png',

    'spellblock': '/img/spellblock.png',
    'Magic Resist': '/img/spellblock.png',

    'movespeed': '/img/movespeed.png',
    'Move Speed': '/img/movespeed.png',

    'ability': '/img/ability.png',
    'Ability Haste': '/img/ability.png',

    'crit': '/img/crit.png',
    'Critical Strike Chance': '/img/crit.png',

    'attackspeed': '/img/speedAttack.png',
    'Attack Speed': '/img/speedAttack.png',

    'Magic Penetration': '/img/peneMagic.png',
    'Lethality': '/img/reduceArmor.png',
    'Base Health Regen': '/img/healthRegen.png',
    'Life Steal': '/img/lifeSteal.png',
    'Omnivamp': '/img/omnivamp.png',
    'Spell Vamp': '/img/spellvamp.png',
    'Gold Per 10 Seconds': '/img/gold.png',
    'Base Mana Regen': '/img/manaRegen.png',
    'Critical Strike Damage': '/img/critDamage.png'
};
document.getElementById("formChamp").addEventListener("submit",(event)=>{
    event.preventDefault();
    if(champ !== '' &&  document.querySelector("#champ").value.charAt(0).toUpperCase() + document.querySelector("#champ").value.slice(1) === champ){
        return;
    }

    champ =  document.querySelector("#champ").value.charAt(0).toUpperCase() + document.querySelector("#champ").value.slice(1);
    imgChamp = 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/'+ champ +'.png';

    let xhr = new XMLHttpRequest();
    let xhr2 = new XMLHttpRequest();

    if(path === ''){
        xhr.open('GET','https://ddragon.leagueoflegends.com/api/versions.json',false);
        xhr.onreadystatechange =  function () {
            if (xhr.readyState === 4 && xhr.status === 200){
                const data = JSON.parse(xhr.responseText);
                path += data[0];
            }

        }
        xhr.send();//nécessaire
    }


    const url = 'https://ddragon.leagueoflegends.com/cdn/' + path +'/data/fr_FR/champion/' + champ + '.json';
    var statesChamp = [];

    xhr2.open('GET',url,true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200){
            const data = JSON.parse(xhr2.responseText);
            statesChamp = data['data'][champ]['stats'];
            console.log(statesChamp);
            afficherStats(data['data'][champ]['stats']);
        }

    }
    xhr2.send();

// Créer un nouvel élément img
    let imgElement = document.getElementById('championImage');

// Définir l'attribut src de l'élément img
    imgElement.src = imgChamp;
    item = 'https://ddragon.leagueoflegends.com/cdn/'+ path +'/data/en_US/item.json';
});

function afficherStats(stats) {
    document.querySelector("#statsTable tbody").innerHTML= "";


    let tbody = document.querySelector('#statsTable tbody');

    for (let stat in stats) {
        if (stat.includes('per') || stat.includes('regen') || stat.includes('range')){
            continue;
        }
        let tr = document.createElement('tr');
        let tdStat = document.createElement('td');
        let tdValue = document.createElement('td');
        let img = document.createElement('img');

        img.src = icon[stat];
        img.alt = 'icon ' + stat;
        tdStat.appendChild(img);
        tdValue.textContent = stats[stat];

        tr.appendChild(tdStat);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    }
}


document.getElementById("formItem").addEventListener('submit', (event)=>{
    event.preventDefault();

    let xhr = new XMLHttpRequest();

    xhr.open('GET',item,false);
    xhr.onreadystatechange =  function () {

        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);

        }

    }
    xhr.send();//nécessaire


    // Convertir l'objet en un tableau de paires clé-valeur
    const entries = Object.entries(data['data']);
    // Trier le tableau en fonction des valeurs (de la plus petite à la plus grande)
    entries.sort((a, b) => a[1].name.localeCompare(b[1].name));

    let uniqueEntries = entries.filter((value, index, self) =>
            index === self.findIndex((v) => (
                v[1].name === value[1].name
            ))
    );

    uniqueEntries = uniqueEntries.filter(item => !('inStore' in item[1]));
    uniqueEntries = uniqueEntries.filter(item => item[0] < 10000);

    const regex = /<attention>(.*?)<\/attention>(.*?)(<br>|<\/stats>)/g;
    let matches;
    const values = [];

    let itemSearch = document.querySelector("#item").value.charAt(0).toUpperCase() + document.querySelector("#item").value.slice(1);
    let index = dichotomiqueSearch(uniqueEntries, itemSearch);
    if(index >= 0){
        // Créer un nouvel élément img
        let imgItem = document.getElementById('itemImage');

        // Définir l'attribut src de l'élément img
        imgItem.src = 'https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/'+ uniqueEntries[index][0] + '.png';
    }

    //Recuperation des attributs de l'item
    while ((matches = regex.exec(uniqueEntries[index][1].description)) !== null) {
        const attentionValue = matches[1];
        const nextText = matches[2];
        values.push({ attentionValue, nextText });
    }
    console.log(values)

    afficherStats2(values)
    console.log(values);
})

function dichotomiqueSearch(array, item){
    let start = 0;
    let end = array.length - 1;

    while (start <= end){
        let middle = Math.floor((start + end) / 2);
        console.log(array[middle][1].name + ' / ' + item)
        if(array[middle][1].name.includes(item) ){
            return middle;
        } else if(array[middle][1].name.localeCompare(item) < 0){
            start = middle + 1;
        }else {
            end = middle - 1;
        }

    }
    return -1;
}

function afficherStats2(stats) {
    document.querySelector("#itemTable tbody").innerHTML= "";


    let tbody = document.querySelector('#itemTable tbody');
    for (let stat in stats) {

        let tr2 = document.createElement('tr');
        let tdState = document.createElement('td');
        let tdValue = document.createElement('td');
        let img = document.createElement('img');

        let tag = [stats[stat].nextText];
        console.log(tag[0].trim())
        tdValue.textContent = stats[stat].attentionValue; // Utiliser attentionValue comme contenu de tdValue
        img.src = icon[tag[0].trim()];
        console.log(tag[0].trim())
        img.alt = 'icon ' + stats[stat].nextText;
        tdState.appendChild(img);

        tr2.appendChild(tdState);
        tr2.appendChild(tdValue);
        tbody.appendChild(tr2);
    }
}