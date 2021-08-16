const get = (id) => document.getElementById(id).value;
const set = (id, value) => document.getElementById(id).innerHTML = value;

const setLoan = () => {
  const houseCost = get('house-cost');
  const loan = houseCost - get('cash-payment');
  const loanPercentage = loan / houseCost * 100;
  set('res-loan', `${loan} kr (${Math.round(loanPercentage)}%)`);
}

const generateMortgage = () => {
  const salary = get('salary');
  const houseCost = get('house-cost');
  const loan = houseCost - get('cash-payment');
  const loanPercentage = loan / houseCost;
  const salaryExceeded = loan > salary * 12 * 4.5;

  let mortgagePercentage;

  if (loanPercentage > 0.7) {
    mortgagePercentage = salaryExceeded ? 3 : 2;
  } else if (loanPercentage <= 0.5) {
    mortgagePercentage = salaryExceeded ? 1 : 0;
  } else {
    mortgagePercentage = salaryExceeded ? 2 : 1;
  }

  const mortgagePaymentPerMonth = loan * (mortgagePercentage / 100) / 12;

  return {mortgagePaymentPerMonth, mortgagePercentage};
}

const generateInterest = () => {
  const houseCost = get('house-cost');
  const loan = houseCost - get('cash-payment');
  const interest = get('interest');
  return loan * (interest / 100) /12;
}

const setMortgage = () => {
  const {mortgagePaymentPerMonth, mortgagePercentage} = generateMortgage();

  set(
    'res-mortgage',
    `${Math.round(mortgagePaymentPerMonth)} kr (${mortgagePercentage}%)`
  );
}

const setInterest = () => {
  const interest = generateInterest();
  set('res-interest', `${Math.round(interest)} kr`);
}

const setTotal = () => {
  const {mortgagePaymentPerMonth} = generateMortgage();
  const interest = generateInterest();
  const operatingCost = get('operating-cost');
  set('res-total', `${Math.round(interest + mortgagePaymentPerMonth + +operatingCost)} kr`);
}

const setOneTimePayment = () => {
  const cashPayment = get('cash-payment');
  const deedOfTrust = get('deed-of-trust');
  const houseCost = get('house-cost');
  const loan = houseCost - get('cash-payment');

  const propertyTitle = houseCost * 0.015; // lagfart
  const newDeedOfTrustCost = (loan - deedOfTrust) * 0.02;

  set('res-one-time-payment', `${Math.round(+cashPayment + propertyTitle + newDeedOfTrustCost)} kr`);
}

const submit = () => {
  setLoan();
  setMortgage();
  setInterest();
  setTotal();
  setOneTimePayment();
}
