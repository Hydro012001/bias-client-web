import "../CSS/investorDashboard.css";
import userIcon from "../../icons/user-pic.jpg";
import Calendar from "../../Components/Calendar";
import Calendars from "../../Components/Calendar";
export default function DashboardInvestor() {
  const abbreviateBalance = (balance) => {
    if (balance >= 1e9) return (balance / 1e9).toFixed(2) + "B";
    if (balance >= 1e6) return (balance / 1e6).toFixed(2) + "M";

    return balance;
  };
  return (
    <div className="mt-5 pt-4 container-fluid pb-4">
      <div className="d-flex justify-content-around mb-4">
        <span className="w-50 text-center align-items-center row">
          <h1>Welcome to Bias, Investor</h1>
        </span>
        <span className="d-flex align-items-center row w-25 justify-content-around">
          <span className="col">
            <label className="fw-bold">Nikke Bustamante</label>
            <label>09637451627</label>
          </span>

          <div style={{ height: "5rem" }} className="col align-items-center">
            <img
              src={userIcon}
              alt="user-pic"
              className="rounded-circle img-thumbnail h-75 mt-2"
            />
          </div>
        </span>
      </div>
      <div className="d-flex container-fluid">
        <div className="col-7 justify-content-evenly p-3 border">
          <div className="col border p-3 mb-3">
            <h5 className="card-title">Investment</h5>
            <div className="overflow-y-scroll" style={{ height: "10rem" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Business</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Amount Invested</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th scope="row">1.</th>
                    <td>Sari-Sari Store</td>
                    <td>Nikke Bustamante</td>
                    <td>Nikke@gmail.com</td>
                    <td>20,000.00</td>
                  </tr>
                  <tr className="">
                    <th scope="row">1.</th>
                    <td>Sari-Sari Store</td>
                    <td>Nikke Bustamante</td>
                    <td>Nikke@gmail.com</td>
                    <td>20,000.00</td>
                  </tr>
                  <tr className="">
                    <th scope="row">1.</th>
                    <td>Sari-Sari Store</td>
                    <td>Nikke Bustamante</td>
                    <td>Nikke@gmail.com</td>
                    <td>20,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col border p-3 ">
            <h5 className="card-title">Transactions</h5>
            <div className="overflow-y-scroll" style={{ height: "10rem" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Business</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Amount Invested</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="">
                    <th scope="row">1.</th>
                    <td>Sari-Sari Store</td>
                    <td>Nikke Bustamante</td>
                    <td>Nikke@gmail.com</td>
                    <td>20,000.00</td>
                  </tr>
                  <tr className="">
                    <th scope="row">1.</th>
                    <td>Sari-Sari Store</td>
                    <td>Nikke Bustamante</td>
                    <td>Nikke@gmail.com</td>
                    <td>20,000.00</td>
                  </tr>
                  <tr className="">
                    <th scope="row">1.</th>
                    <td>Sari-Sari Store</td>
                    <td>Nikke Bustamante</td>
                    <td>Nikke@gmail.com</td>
                    <td>20,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col container">
          <div className="d-flex flex-column  gap-4 align-items-center ">
            <div className="col-6 card text-center align-items-center row justify-content-center border-primary border-4 shadow-sm">
              <p className="col-10 fs-3 fw-bold">
                {" "}
                ₱ {abbreviateBalance(103440.12)}
              </p>
              <p className="col-6 fs-6">Balance</p>
            </div>
            <div className="col-6 card text-center align-items-center row justify-content-center bg-success shadow-sm">
              <p className="col-10 fs-3 fw-bold text-light">
                {" "}
                ₱ {abbreviateBalance(900123440.122)}
              </p>
              <p className="col-6 fs-6 text-light">Earnings</p>
            </div>
          </div>
          <div className="justify-content-center d-flex mt-5 col ">
            <Calendars />
          </div>
        </div>
      </div>
    </div>
  );
}
