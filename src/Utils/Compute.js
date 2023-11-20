import { Loan } from "loanjs";
export function calculateAge(birthdate) {
  const currentDate = new Date();

  const birthdateDate = new Date(birthdate);

  const timeDifference = currentDate - birthdateDate;

  const ageInMilliseconds = timeDifference;

  const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
  const ageInYears = ageInMilliseconds / millisecondsInYear;

  const age = Math.floor(ageInYears);

  return age;
}

export function calculateBirthdate(birthdate) {
  const bdate = new Date(birthdate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = `${bdate.toLocaleDateString(undefined, options)}`;

  return formattedDate;
}

export function calcualteLoan(amt, installNum, interestRate, loanType) {
  const loan = new Loan(amt, installNum, interestRate, loanType);
  return loan;
}

export function formatDateToCustomString(date) {
  const newDate = new Date(date);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[newDate.getMonth()];
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  return `${month} ${day}, ${year}`;
}

// export function SpliceDates(dates) {
//   const [startDate, endDate] = dates.split(" - ");

//   return `${formatDateToCustomString(
//     new Date(startDate)
//   )} - ${formatDateToCustomString(new Date(endDate))}`;
// }

export function computeDateStart(startDate, todayDate) {
  console.log(startDate);
  if (startDate === todayDate) {
    return "Started Today";
  } else if (startDate < todayDate) {
    return "Investments is started";
  } else if (startDate > todayDate) {
    return (
      <label>
        Invesment will start on
        <label className="fw-bold text-primary ms-1">
          {new Date(startDate).toLocaleDateString()}
        </label>
      </label>
    );
  } else {
    return "Nothign";
  }
}
