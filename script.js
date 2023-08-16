const currencyElement_one = document.getElementById('currency-one')
const amountElement_one = document.getElementById('amount-one')
const currencyElement_two = document.getElementById('currency-two')
const amountElement_two = document.getElementById('amount-two')

const swap_element = document.getElementById('swap')
const rate_element = document.getElementById('rate')

// Retrieving the currency exchange rates
function rate_calculation() {
  const first_currency = currencyElement_one.value
  const second_currency = currencyElement_two.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${first_currency}`)
    .then((res) => res.json())
    .then((data) => {
      const exchange_rate = data.rates[second_currency]
      amountElement_two.value = (
        amountElement_one.value * exchange_rate
      ).toFixed(2)
      if (parseInt(amountElement_one.value) < 0) {
        amountElement_one.value = 0
      }
      if (parseInt(amountElement_two.value) < 0) {
        amountElement_two.value = 0
      }
      rate_element.innerText = `${amountElement_one.value} ${first_currency} = ${amountElement_two.value} ${second_currency}`
    })
}

// Adding event listeners for the HTML elements
currencyElement_one.addEventListener('change', rate_calculation)
amountElement_one.addEventListener('input', rate_calculation)
currencyElement_two.addEventListener('change', rate_calculation)
amountElement_two.addEventListener('input', rate_calculation)

swap_element.addEventListener('click', () => {
  const temp = currencyElement_one.value
  currencyElement_one.value = currencyElement_two.value
  currencyElement_two.value = temp
  rate_calculation() // calling the rate calculation function to generate the exchange rate
})

rate_calculation()
