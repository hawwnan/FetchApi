const dropdowns = document.querySelectorAll('.dropdown select')
console.log(dropdowns)
const btn = document.querySelector('form button')
const fromCurr = document.querySelector('.from select')
const toCurr = document.querySelector('.to select')
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const msg = document.querySelector('.msg')



for (let select of dropdowns){
   for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode

        select.append(newOption)
   }

   select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
   })
}


const updateFlag = (element) => {
    console.log(element)
    let currCode = element.value
    let countryCode = countryList[currCode]
    console.log(countryCode)
    let img = element.parentElement.querySelector('img')
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`
}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector('.amount input')
    let amtVal = amount.value
    if(amtVal === "" || amtVal < 1){
        amtVal = 1
        amount.value = "1"
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    console.log(rate)
    let finalAmount = (amtVal * rate).toFixed(2)
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})