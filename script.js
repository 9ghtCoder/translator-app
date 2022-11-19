const selectTag = document.querySelectorAll('select');
const translateBtn = document.querySelector('button');
const fromText = document.querySelector('.from-text');
const toText = document.querySelector('.to-text');
const exchangeIcon = document.querySelector('.exchange');
const icons = document.querySelectorAll('.trans i')


selectTag.forEach((tag, id) => {
    for(const country_code in countries) {
        let selected;
        if(id == 0 && country_code == 'en-GB') {
            selected = 'selected'
        }
        if(id == 1 && country_code == 'fr-FR') {
            selected = 'selected'
        }
        let option = `<option value='${country_code}' ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option)
    }
})

translateBtn.addEventListener('click', () => {
    let text = fromText.value
    translateFrom = selectTag[0].value
    translateTo = selectTag[1].value
    if(!text) return;
    toText.setAttribute('placeholder', 'Translating...')
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            toText.value = data.responseData.translatedText
            toText.setAttribute('placeholder', 'Translation')
        })
        .catch(error => console.log(`Error message: ${error.message}`))
})

exchangeIcon.addEventListener('click', () => {
    let tempText = fromText.value
    fromText.value = toText.value
    toText.value = tempText
})

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        if(target.classList.contains('fa-copy')) {
            if(target.id == 'from') {
                navigator.clipboard.writeText(fromText.value)
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            let utterance;
            if(target.id == 'from') {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})
//console.log(icons)