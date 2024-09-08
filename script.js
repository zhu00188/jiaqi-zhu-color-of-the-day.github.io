const form = document.getElementById('form')
const date = document.getElementById('date')
const clear = document.getElementById('clear')
const responseContainer = document.getElementById('responseContainer')

let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []

// save search history to local storage
function saveToLocalStorage() {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
}


// display search history on the page
function displayHistory() {
    responseContainer.innerHTML = ''

    if (searchHistory) {
        searchHistory.forEach(item => {
            const historyItem = document.createElement('div')
            historyItem.classList.add('d-flex', 'flex-row', 'bg-light', 'mb-3')
            historyItem.style.height = '100px'
            historyItem.innerHTML = `
                <div class="d-flex align-items-center w-25" style="background-color: ${item.hex};"></div>
                <div class="d-flex align-items-center w-75 p-5">
                    Date: ${item.date}<br>
                    Hex: ${item.hex}
                </div>
            `
            responseContainer.append(historyItem)
        })
    }

}

displayHistory()

// form submission
form.addEventListener('submit', async function (e) {
    e.preventDefault()

    const selectedDate = date.value
    const response = await fetch(`https://colors.zoodinkers.com/api?date=${selectedDate}`)
    const colorData = await response.json()
    searchHistory.unshift(colorData)

    saveToLocalStorage()
    displayHistory()
  })

// clear search history
clear.addEventListener('click', function (e) {
    e.preventDefault()

    searchHistory = []
    saveToLocalStorage()
    displayHistory()
  })
