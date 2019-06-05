


function setup() {
    noCanvas();
    fetch(wordnikAPI)
    .then(response => response.json())
    .then(json => {
        createP(json.word);
        return fetch (giphyAPI + json.word); 
    })
    .then(response => response.json())
    .then(json => {
        createImg(json.data[0].images['fixed_height'])
    })
    .catch(err => console.error(err));
}


async function WordGif() {

    let response1 = await fetch(wordnikAPI)
    let json1 = await response1.json()
    let response2 =  await fetch(giphyAPI + json1.word);
    let json2 = await response2.json();
    let img_url = json2.data[0].images['fixed_height'].url

    return {
        word: json1.word,
        img: img_url
    }

    noCanvas();
    fetch(wordnikAPI)
    .then(response => response.json())
    .then(json => {
        createP(json.word);
        return fetch (giphyAPI + json.word); 
    })
    .then(response => response.json())
    .then(json => {
        createImg(json.data[0].images['fixed_height'].url)
    })
    .catch(err => console.error(err));
}



