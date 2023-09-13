const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMilliBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const wealthBtn = document.getElementById('calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

// fetch random user and add money
async function getRandomUser() {
    // call api
  const res = await fetch('https://randomuser.me/api/')
  // save results to data varable
  const data = await res.json()

  const user = data.results[0]

  // create obj of what you want to display
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser)
}

function doubleMoney() {
    // you have access to the data array above - that we are pushing the api response obj we created
    data = data.map(user => {
        // return an object of a copy of each user
        return { ...user, money: user.money * 2 }
    })
    
    updateDOM()
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDOM()
}

function showMillionaire() {
    data = data.filter((item) => item.money > 1000000)

    updateDOM()
}

function accumulateAll() {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0)

   const wealthElement = document.createElement('div')
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthElement)
}

// add new obj to data array
function addData(obj) {
    data.push(obj)

    updateDOM()
}

// update DOM
function updateDOM(providedData = data) {
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
        // create div element 
        const element = document.createElement('div')
        // add person classlist for css
        element.classList.add('person')
        // add html you want populated in that div
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

// format number as money
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//event listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMilliBtn.addEventListener('click', showMillionaire)
wealthBtn.addEventListener('click', accumulateAll)