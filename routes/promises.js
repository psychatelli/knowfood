

fetch(gotSomeURL)
    .then(data => console.log(data))
    .catch(err => console.log(err));


 
//Step 1
 let promise = fetch(myURL);
 promise.then(gotData)
 promise.catch(gotErr);

 function gotData(data){
     console.log(data);
 }

 function gotErr(err){
    console.log(err);
}

//Step 2
 fetch(myURL)
    .then(response => {
        return response.json()
    })
    .then(json => {
        createP(json.word)
        return fetch(giphyAPI + json.word);
    })
    .then(response => {
        return response.json()
    })
    .then(json => {
        createImageBitmap(json.data);
    })
    .catch(err => console.log(err));



