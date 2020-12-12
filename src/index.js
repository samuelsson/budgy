const get = (id) => document.getElementById(id).value;
const set = (id, value) => document.getElementById(id).innerHTML = value;

const setLoan = () => {
  const loan = get('house-cost') - get('cash-payment');
  set('res-loan', loan);
}

const setMortgage = () => {
  const salary = get('salary');
  const houseCost = get('house-cost');
  const loan = houseCost - get('cash-payment');
  const loanPercentage = loan / houseCost;
  const salaryExceeded = loan > salary * 4.5;

  console.log(loanPercentage);

  let mortgagePercentage;

  if (loanPercentage > 0.7) {
    mortgagePercentage = salaryExceeded ? 3 : 2;
  } else if (loanPercentage <= 0.5) {
    mortgagePercentage = salaryExceeded ? 1 : 0;
  } else {
    mortgagePercentage = salaryExceeded ? 2 : 1;
  }

  const mortgagePaymentPerMonth = loan * (mortgagePercentage / 100) / 12;

  set(
    'res-mortgage',
    `${Math.round(mortgagePaymentPerMonth)} kr (${mortgagePercentage}%)`
  );
}

const setInterest = () => {
  const houseCost = get('house-cost');
  const loan = houseCost - get('cash-payment');
  const interest = loan * (get('interest') / 100) /12;
  set('res-interest', Math.round(interest));
}

const submit = () => {
  setLoan();
  setMortgage();
  setInterest();
}
