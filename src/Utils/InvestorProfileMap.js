import React from "react";
const mapInvestorProfile = (investments, size) => {
  const firstThreeElements = investments
    .filter((data, index) => data.investor_id && index < 5)
    .map((data, index) => (
      <React.Fragment key={data.investor_id}>
        {data.investor_id ? (
          <img
            src={data.investor_profile}
            className="rounded-circle"
            alt="..."
            style={{ width: `${size}rem`, height: `${size}rem` }}
            title={`${data.investor_fname} ${data.investor_lname}`}
          />
        ) : (
          ""
        )}
      </React.Fragment>
    ));

  return firstThreeElements;
};

export { mapInvestorProfile };
