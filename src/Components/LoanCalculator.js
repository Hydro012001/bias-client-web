import { v4 as uuidv4 } from "uuid";
export function LoanCalculate(amount, months, percent, currentDate) {
  let Payments = [];
  const listStartDate = [];
  const listEndDate = [];
  const numberOfTimes = months / 12;
  const decimal = percent / 100;
  //Interest amount added
  const AnnualIntrestRate = amount * decimal * numberOfTimes;
  //Total amount will return
  const totalAmountReturn = parseFloat(amount) + parseFloat(AnnualIntrestRate);
  const MonthlyPayments = totalAmountReturn / months;

  const startDate = currentDate ? new Date(currentDate) : new Date();
  for (let x = 0; x < months; x++) {
    const nextStartDate = new Date(startDate);
    nextStartDate.setMonth(startDate.getMonth() + x);
    listStartDate.push(nextStartDate);

    const nextEndDate = new Date(nextStartDate);
    nextEndDate.setMonth(nextStartDate.getMonth() + 1);
    nextEndDate.setDate(nextStartDate.getDate() - 1);
    listEndDate.push(nextEndDate);
    Payments.push({ installment: MonthlyPayments });
  }
  const updateReturnsWithDate = Payments.map((item, index) => ({
    ...item,
    mindate: `${listStartDate[index].toDateString()} `,
    maxdate: `${listEndDate[index].toDateString()}`,

    id: `${uuidv4()}`,
  }));

  return { totalAmountReturn, updateReturnsWithDate, AnnualIntrestRate };
}
