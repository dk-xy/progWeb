export default function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
}

// Param: selecteur + fonction a lancer
function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}


/** 
* Effectue plusieurs requêtes HTTP GET afin d'aller charger les URLs pointant
* sur des données au format JSON. La fonction retourne un tableau contenant tous
* les résultats ("désérialisés"). 
* 
* @param {array} urls Les URLs à charger (dont le contenu est du JSON)
* @return {array} un tableau contenant les résultats de chaque requête 
*/
async function loadJsonUrls(urls) {
    const res = await Promise.all(urls.map(url => fetch(url)));
    return await Promise.all(res.map(r => r.json()));
}

// url unique !!
async function loadJson(url) {
    const response = await fetch(url);
    const data = response.json();
    return data;
    //return data.postalcodes;
}



async function loadXml(url) {
    const response = await fetch(url);
    const xmlText = await response.text();
    const parser = new DOMParser();
    return parser.parseFromString(xmlText, 'text/xml');
}

