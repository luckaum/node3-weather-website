const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('/weather?local=' + location).then((response) => {
    response.json().then((data) => {
        if (data.message) {
            messageOne.textContent = data.message
        }else {
            messageOne.textContent = data.cityName
            messageTwo.textContent = data.temperature
        }
    })
})
})
