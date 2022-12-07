(() => {
    const txtLng = document.querySelector('p.ask');
    txtLng.setAttribute('lang', navigator.language); 
})();


addEventListener('load', (event) => {
    const originalTxt = document.querySelector('p.ask');
    const currentTxt = window.getComputedStyle(originalTxt, ':after').content;  
   
    const translate = Translation(currentTxt, GetLanguage()) 
    .catch(console.error)
    .then((txt) => { 
        let styles = document.createElement("style");
        styles.innerText = `p.ask:lang(${GetLanguage()})::after { content :"${txt[0][0][0].replaceAll("\"", '')}";}`;
        document.head.append(styles);
    });     
});


async function Translation (words, lng){
    // Based on Google Translate API
    // https://www.labnol.org/code/19909-google-translate-api
    
    let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en' +
    '&tl=' +
    lng +
    '&dt=t&q=' +
    encodeURI(words);

    const options = {
        method: 'GET'      
    };
    
   return ( await fetch( url , options)
        .then(response => response.json())   
        .catch(err => console.log(err))
    )
    
}

function GetLanguage (){
    const regex = /-\w{2}$/gm;
    
    const str = navigator.language;
    const subst = ``;
  
    const result = str.replace(regex, subst);

    return result;
}

