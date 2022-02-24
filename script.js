const firstCurrency = document.querySelector('#currency-one');
const secondCurrency = document.querySelector('#currency-two');
const firstAmount = document.querySelector('.amount-one');
const secondAmount = document.querySelector('.amount-two');
const swapBtn = document.querySelector('.swap');
const rateInfo = document.querySelector('.rate-info');

const calculate = () => {
	fetch(
		`https://api.exchangerate.host/latest?base=${firstCurrency.value}&symbols=${secondCurrency.value}`
	)
		.then((res) => res.json())
		.then((data) => {
			const currencyOne = firstCurrency.value;
			const currencyTwo = secondCurrency.value;

			const rate = data.rates[currencyTwo];
			rateInfo.textContent = `1 ${currencyOne} = ${rate.toFixed(
				4
			)} ${currencyTwo}`;

			secondAmount.value = (firstAmount.value * rate).toFixed(2);
		});
};

const swap = (params) => {
    const oldValue = firstCurrency.value;

    firstCurrency.value = secondCurrency.value;
    secondCurrency.value = oldValue;
    calculate();
}

firstCurrency.addEventListener('change', calculate);
secondCurrency.addEventListener('change', calculate);
firstAmount.addEventListener('input', calculate);
swapBtn.addEventListener('click', swap)

calculate()