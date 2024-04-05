var path = '';
var champ = '';
var imgChamp = '';
var item = '';
var stuff = [];
var statesChamp = [];
var statesChampInit = [];
var namePassif= '';
var spell = [];
var tmpItem;
let icon= {
    'hp': '/img/hp.png',
    'Health': '/img/hp.png',

    'mp': '/img/mana.png',
    'Mana': '/img/mana.png',

    'attackdamage': '/img/attack.png',
    'Attack Damage': '/img/attack.png',

    'abilitypower': '/img/ap.png',
    'Ability Power': '/img/ap.png',

    'armor': '/img/armor.png',
    'Armor': '/img/armor.png',

    'spellblock': '/img/spellblock.png',
    'Magic Resist': '/img/spellblock.png',

    'movespeed': '/img/movespeed.png',
    'Move Speed': '/img/movespeed.png',

    'abilityhaste': '/img/ability.png',
    'Ability Haste': '/img/ability.png',

    'crit': '/img/crit.png',
    'Critical Strike Chance': '/img/crit.png',

    'attackspeed': '/img/speedAttack.png',
    'Attack Speed': '/img/speedAttack.png',

    'magicpenetration': '/img/peneMagic.png',
    'magicpenetrationpourcentage': '/img/peneMagic.png',
    'Magic Penetration': '/img/peneMagic.png',

    'Lethality': '/img/reduceArmor.png',
    'lethality': '/img/reduceArmor.png',
    'armorpenetration': '/img/reduceArmor.png',
    'Armor Penetration': '/img/reduceArmor.png',


    'Base Health Regen': '/img/healthRegen.png',
    'Life Steal': '/img/lifeSteal.png',
    'Omnivamp': '/img/omnivamp.png',
    'Spell Vamp': '/img/spellvamp.png',
    'Gold Per 10 Seconds': '/img/gold.png',
    'Base Mana Regen': '/img/manaRegen.png',
    'Critical Strike Damage': '/img/critDamage.png',

    'tenacity': '/img/tenacity.png',
    'Tenacity': '/img/tenacity.png'
};
document.getElementById("formChamp").addEventListener("submit",(event)=>{
    event.preventDefault();
    if(champ !== '' &&  document.querySelector("#champ").value.charAt(0).toUpperCase() + document.querySelector("#champ").value.slice(1) === champ){
        return;
    }

    champ =  document.querySelector("#champ").value.charAt(0).toUpperCase() + document.querySelector("#champ").value.slice(1);


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
    imgChamp = 'https://ddragon.leagueoflegends.com/cdn/'+path+'/img/champion/'+ champ +'.png';

    const url = 'https://ddragon.leagueoflegends.com/cdn/' + path +'/data/fr_FR/champion/' + champ + '.json';


    xhr2.open('GET',url,true);
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4 && xhr2.status === 200){
            const data = JSON.parse(xhr2.responseText);
            statesChamp = JSON.parse(JSON.stringify(data['data'][champ]['stats']));
            statesChampInit = JSON.parse(JSON.stringify(data['data'][champ]['stats']));
            namePassif = data['data'][champ]['passive'];
            spell = data['data'][champ]['spells'];

            console.log(statesChamp);
            afficherStats(data['data'][champ]['stats'],1);
            graph1();

        }

    }
    xhr2.send();

// Créer un nouvel élément img
    let imgElement = document.getElementById('championImage');

// Définir l'attribut src de l'élément img
    imgElement.src = imgChamp;
    item = 'https://ddragon.leagueoflegends.com/cdn/'+ path +'/data/en_US/item.json';

});

function afficherStats(stats, champion = 0) {
    document.querySelector("#statsTable tbody").innerHTML= "";
    for(let i = 0; i < stuff.length; i++) {
        document.getElementById("" + i).innerHTML = "";
    }

    if(champion === 1){
        stuff = [];
        if(document.querySelector('#spellDiv'))
            document.querySelector('#spellDiv').remove();
    }

    if(document.getElementsByClassName('spell').length === 0){
        let div = document.createElement('div')
        div.id = 'spellDiv';
        let spellP = document.createElement('img');
        spellP.classList.add('spell');
        spellP.id = 'passive';
        spellP.src=`https://ddragon.leagueoflegends.com/cdn/${path}/img/passive/${namePassif['image']['full']}`;
        let descP = document.createElement('p');
        descP.id = 'descP';
        descP.innerHTML = namePassif['description'];
        div.appendChild(spellP);
        spellP.addEventListener("click", function (){
            if(divDesc.childNodes) {
                divDesc.innerHTML = "";
            }
            divDesc.appendChild(descP);
        })

        let spellQ= document.createElement("img");
        spellQ.classList.add('spell');
        spellQ.src=`https://ddragon.leagueoflegends.com/cdn/${path}/img/spell/${spell[0]['id']}.png`;
        let descQ = document.createElement('p');
        descQ.id = 'descQ';
        descQ.innerHTML = spell[0]['description'];
        div.appendChild(spellQ);
        spellQ.addEventListener("click", function () {
            if(divDesc.childNodes) {
                divDesc.innerHTML = "";
            }
            divDesc.appendChild(descQ);
        })

        let spellW= document.createElement("img");
        spellW.classList.add('spell');
        spellW.src=`https://ddragon.leagueoflegends.com/cdn/${path}/img/spell/${spell[1]['id']}.png`;
        let descW = document.createElement('p');
        descW.id = 'descW';
        descW.innerHTML = spell[1]['description'];
        div.appendChild(spellW);
        spellW.addEventListener("click", function () {
            if(divDesc.childNodes) {
                divDesc.innerHTML = "";
            }
            divDesc.appendChild(descW);
        })

        let spellE= document.createElement("img");
        spellE.classList.add('spell');
        spellE.src=`https://ddragon.leagueoflegends.com/cdn/${path}/img/spell/${spell[2]['id']}.png`;
        let descE = document.createElement('p');
        descE.id = 'descE';
        descE.innerHTML = spell[2]['description'];
        div.appendChild(spellE);
        spellE.addEventListener("click", function () {
            if(divDesc.childNodes) {
                divDesc.innerHTML = "";
            }
            divDesc.appendChild(descE);
        })

        let spellR= document.createElement("img");
        spellR.classList.add('spell');
        spellR.src=`https://ddragon.leagueoflegends.com/cdn/${path}/img/spell/${spell[3]['id']}.png`;
        let descR = document.createElement('p');
        descR.id = 'descR';
        descR.innerHTML = spell[3]['description'];
        div.appendChild(spellR);
        document.querySelector('div').appendChild(div);
        spellR.addEventListener("click", function () {
            if(divDesc.childNodes) {
                divDesc.innerHTML = "";
            }
            divDesc.appendChild(descR);
        })

        let divDesc = document.createElement('div');
        document.querySelector('div').appendChild(divDesc);

    }


    let tbody = document.querySelector('#statsTable tbody');

    for (let stat in stats) {
        if (stat.includes('per') || stat.includes('regen') || stat.includes('range') || stat.includes('criticalstrikedamage')){
            continue;
        }
        let tr = document.createElement('tr');
        let tdStat = document.createElement('td');
        let tdValue = document.createElement('td');
        let img = document.createElement('img');

        img.src = icon[stat];
        img.alt = 'icon ' + stat;
        tdStat.appendChild(img);
        if(stat === 'armorpenetration' || stat === 'magicpenetrationpourcentage'){
            tdValue.textContent = stats[stat] + '%';
        }else{
            tdValue.textContent = stats[stat];
        }

        tr.appendChild(tdStat);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    }
}

document.getElementById("formItem").addEventListener('submit', (event)=>{
    event.preventDefault();
    document.querySelector('.item').style.visibility = 'visible'
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

    let uniqueEntries = entries.filter(item => !('requiredAlly' in item[1]));

    uniqueEntries = uniqueEntries.filter((value, index, self) =>
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
        imgItem.src = 'https://ddragon.leagueoflegends.com/cdn/'+ path +'/img/item/'+ uniqueEntries[index][0] + '.png';
    }
    const desc = uniqueEntries[index][1].description;
    values.push(desc);
    //Recuperation des attributs de l'item
    while ((matches = regex.exec(uniqueEntries[index][1].description)) !== null) {
        const attentionValue = matches[1];
        const nextText = matches[2];
        values.push({ attentionValue, nextText });
    }
    afficherStats2(values)
    tmpItem = uniqueEntries[index];
})

document.getElementById("addItem").addEventListener("click", ()=>{
    const regex = /<attention>(.*?)<\/attention>(.*?)(<br>|<\/stats>)/g;
    let matches;
    let values = [];
    if (!stuff.includes(tmpItem) && stuff.length < 6){
        stuff.push(tmpItem);

        while ((matches = regex.exec(tmpItem[1].description)) !== null) {
            const attentionValue = matches[1];
            const nextText = matches[2].trim();
            values.push({ attentionValue, nextText });
        }

        for (let val of values) {
            if (val.nextText === 'Health') {
                statesChamp['hp'] += parseInt(val.attentionValue);
                continue;
            }
            if (val.nextText === 'Magic Resist') {
                statesChamp['spellblock'] += parseInt(val.attentionValue);
                continue;
            }
            if (val.nextText === 'Critical Strike Chance'){
                statesChamp['crit'] += parseInt(val.attentionValue);
                continue;
            }
            if(val.nextText === 'Attack Speed'){
                statesChamp['attackspeed'] += (statesChamp['attackspeed'] * (parseInt(val.attentionValue)/100));
            }else{
                if( statesChamp[val.nextText.replace(/\s/g, '').toLowerCase()]){
                    if(val.nextText.replace(/\s/g, '').toLowerCase() === 'magicpenetration' && val.attentionValue.includes('%')){
                        statesChamp[val.nextText.replace(/\s/g, '').toLowerCase()+'pourcentage'] += parseInt(val.attentionValue);
                        console.log('GG')
                    }else{
                        statesChamp[val.nextText.replace(/\s/g, '').toLowerCase()] += parseInt(val.attentionValue);
                    }
                }else{
                    if(val.nextText.replace(/\s/g, '').toLowerCase() === 'magicpenetration' && val.attentionValue.includes('%')){
                        statesChamp[val.nextText.replace(/\s/g, '').toLowerCase()+'pourcentage'] = parseInt(val.attentionValue);
                    }else {
                        statesChamp[val.nextText.replace(/\s/g, '').toLowerCase()] = parseInt(val.attentionValue);
                    }
                }
            }

        }


        document.querySelector("#statsTable tbody").innerHTML="";
        afficherStats(statesChamp);
        document.querySelector('.item').style.visibility = 'hidden';
    }

    for(let i = 0; i < stuff.length; i++){
        document.getElementById(""+i).innerHTML= "";
        let img = document.createElement('img');
        let span = document.createElement('span');
        span.classList.add("delete-btn");
        span.innerHTML='x';
        span.addEventListener('click', () => {
            const td = span.parentNode;
            let id = td.getAttribute('id');
            td.innerHTML = ''
            values = [];
            while ((matches = regex.exec(stuff[id][1].description)) !== null) {
                const attentionValue = matches[1];
                const nextText = matches[2].trim();
                values.push({ attentionValue, nextText });
            }

           for(let stat of values){
               if(stat.nextText === 'Attack Speed'){
                   statesChamp[stat.nextText.replace(/\s/g, '').toLowerCase()] = statesChamp[stat.nextText.replace(/\s/g, '').toLowerCase()] / (1 + parseInt(stat.attentionValue) / 100);
                   continue;
               }
               if (stat.nextText === 'Health'){
                   statesChamp['hp'] -= parseInt(stat.attentionValue);
                   continue;
               }
               if (stat.nextText === 'Magic Resist') {
                   statesChamp['spellblock'] -= parseInt(stat.attentionValue);
                   continue;
               }
               if (stat.nextText === 'Critical Strike Chance'){
                   statesChamp['crit'] -= parseInt(stat.attentionValue);
                   continue;
               }
               else{
                   statesChamp[stat.nextText.replace(/\s/g, '').toLowerCase()] -= parseInt(stat.attentionValue);
               }
           }
           stuff.splice(id,1);
           afficherStats(statesChamp);
            for (let j = id; j < stuff.length; j++) {
                document.getElementById("" + (j + 1)).setAttribute('id', "" + j);
            }

        });
        img.src = 'https://ddragon.leagueoflegends.com/cdn/'+ path +'/img/item/'+ stuff[i][0] + '.png';
        document.getElementById(""+i).appendChild(img);
        document.getElementById(""+i).appendChild(span);

    }

    graph1();

});

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
    console.log('stats:' + stats)
    document.querySelector("#itemTable tbody").innerHTML = "";
    if(document.querySelector('.item p')){
        document.querySelector('.item').removeChild(document.querySelector('.item p'))
    }

    let tbody = document.querySelector('#itemTable tbody');
    const objets = stats.filter(item => typeof item === 'object');

    // Parcourir les objets filtrés
    for (let stat of objets) {
        let tr2 = document.createElement('tr');
        let tdState = document.createElement('td');
        let tdValue = document.createElement('td');
        let img = document.createElement('img');

        let tag = [stat.nextText];
        tdValue.textContent = stat.attentionValue; // Utiliser attentionValue comme contenu de tdValue
        img.src = icon[tag[0].trim()];
        img.alt = 'icon ' + (stats.indexOf(stat) + 1 < stats.length ? stats[stats.indexOf(stat) + 1].nextText : '');
        tdState.appendChild(img);

        tr2.appendChild(tdState);
        tr2.appendChild(tdValue);
        tbody.appendChild(tr2);
    }

    let desc = document.createElement('p');
    desc.innerHTML = stats[0];
    document.querySelector('.item').appendChild(desc);
}

var grap1 = null;
function graph1(){
    console.log(statesChamp);
    var ctx = document.querySelector('#graph1').getContext('2d');
    let graph1_data = {
        labels: ['RM', 'AR', 'AD', 'AP', 'Speed'],
        datasets: [{
            label: 'Stats with items',
            data: [statesChamp['spellblock'], statesChamp['armor'], statesChamp['attackdamage'], statesChamp['abilitypower'] || 0, statesChamp['movespeed']],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'},
            {label: 'Stats without items',
                data: [statesChampInit['spellblock'], statesChampInit['armor'], statesChampInit['attackdamage'], statesChampInit['abilitypower'] || 0, statesChampInit['movespeed']],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'}]
    };
    const config = {
        type: 'radar',
        data: graph1_data,
        options: {
            elements: {
                line: {
                    borderWidth: 3

                }

            },
            cutoutPercentage: 70
        },
    };

    if(grap1){
        grap1.destroy();
    }

   grap1 = new Chart(ctx, config);
}

