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

export function computeDateStart(startDate, todayDate, endDate) {
  if (startDate === todayDate) {
    return "Started Today";
  } else if (startDate < todayDate) {
    if (todayDate >= endDate) {
      return "Investment is ready to be claim";
    } else {
      return "Investments is started";
    }
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

export function calculateUserStatus(status) {
  if (status === "basic") {
    return 0;
  } else if (status === "verified") {
    return 100;
  }
}

export function displayBusinessStation(stationname) {
  try {
    return JSON.parse(stationname).map((item) => (
      <span
        className="border p-2 hover"
        title={`${item.address ? item.address : ""}`}
        style={{ cursor: "pointer" }}
      >
        {item.name}
      </span>
    ));
  } catch (error) {
    return (
      <span className="border p-2 hover" style={{ cursor: "pointer" }}>
        {stationname}
      </span>
    );
  }
}

// export function removeDuplicateBussID(array) {
//   const seenIds = {};
//   const duplicates = [];
//   const uniqueItems = [];
//   for (const item of array) {
//     const id = item.buss_id;

//     if (seenIds[id]) {
//       duplicates.push(id);
//     } else {
//       seenIds[id] = true;
//       uniqueItems.push(item);
//     }
//   }

//   return uniqueItems;
// }

// export default function calculateTotalInvest(investment) {
//   const investDetails = investment.map((item) => item);

//   let totalSum = 0;

//   for (let i = 0; i < investDetails.length; i++) {
//     if (investDetails[i].invst_status !== "cancel") {
//       totalSum += parseFloat(investDetails[i].invst_amount);
//     } else {
//     }
//   }
//   if (totalSum) {
//     return totalSum;
//   } else {
//     return 0;
//   }
// }
export default function calculateTotalInvest(investment) {
  const investDetails = investment.map((item) => item.invest_amount);

  let totalSum = 0;

  for (let i = 0; i < investDetails.length; i++) {
    totalSum += parseFloat(investDetails[i]);
  }
  if (totalSum) {
    return totalSum;
  } else {
    return 0;
  }
}
// const calculateTotalInvest = (investment) => {
//   const investDetails = investment.map((item) => item);

//   let totalSum = 0;

//   for (let i = 0; i < investDetails.length; i++) {
//     if (investDetails[i].invst_status !== "cancel") {
//       totalSum += parseFloat(investDetails[i].invst_amount);
//     } else {
//     }
//   }
//   if (totalSum) {
//     return totalSum;
//   } else {
//     return 0;
//   }
// };
