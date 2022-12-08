(function () {
  const txtLng = document.querySelector('p.ask')
  txtLng.setAttribute('lang', navigator.language)
}())

addEventListener('load', function () {
  const originalTxt = document.querySelector('p.ask')
  const currentTxt = window.getComputedStyle(originalTxt, ':after').content

  translation(currentTxt, getLanguage())
    .catch(console.error)
    .then(function (txt) {
      const styles = document.createElement('style')
      const translateTxt = (typeof (txt) === 'undefined') ? currentTxt : txt[0][0][0]
      styles.innerText = `p.ask:lang(${getLanguage()})::after{ content :"${translateTxt.replaceAll('"', '')}";}`
      document.head.append(styles)
    })
})

async function translation (words, lng) {
  // Based on Google Translate API
  // https://www.labnol.org/code/19909-google-translate-api

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lng}&dt=t&q=${encodeURI(words)}`

  const options = {
    method: 'GET'
  }

  return (await fetch(url, options)
    .then((response) => {
      if (response.status === 200) return response.json()
    })
    .catch((err) => console.log(err))
  )
}

function getLanguage () {
  const regex = /-\w{2}$/gm

  const str = navigator.language

  const result = str.replace(regex, '')

  return result
}
