import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import iconlogo from "../../icons/logo.jpg";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { searchFilter } from "../../Utils/categoriesAPI";
import axios from "axios";
function CategoryBusiness(props) {
  const { category, typeKey } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_NETWORK_ADD}/list`)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.result;
          if (category !== "all") {
            const categoryData = category.split(",");
            const matchElement = data.filter((item) =>
              categoryData.includes(item.buss_type_name)
            );
            console.log(matchElement);
          } else {
          }
        } else {
          console.log(res.data.error);
        }
      })
      .catch((error) => console.log(error));
  }, [category]);

  const handleAbbreviatedValue = (value) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + "B";
    }
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value;
    }
  };

  // useEffect(() => {
  //   const filterCategory = searchFilter.filter(
  //     (item) =>
  //       item.category.toLocaleLowerCase() === typeKey.toLocaleLowerCase()
  //   );

  //   const searchCode = filterCategory.map((item) => {
  //     return item.data;
  //   });

  //   const matchCode = searchCode[0].filter((item) => item.code === category);
  // }, [category, typeKey]);

  return (
    <div>
      {category}
      <div className="contianer me-5 d-flex flex-wrap justify-content-evenly">
        <div class="card mt-3 " style={{ width: "20rem" }}>
          <div className="bg-secondary text-center p-3 position-relative">
            <img src={iconlogo} class="card-img-top w-50 rounded-0" alt="..." />
          </div>

          <div class="card-body d-flex flex-column ">
            <span className="mb-3 ">
              <label className="" style={{ fontWeight: "500" }}>
                Anne Sari Sari Store
              </label>
            </span>

            <div
              className="d-flex align-items-center justify-content-center  mb-3 position-absolute "
              style={{ top: "0rem", right: "0px" }}
            >
              <span
                className="d-flex bg-primary text-light p-1 rounded rounded-end-0 shadow align-items-center justify-content-center  "
                style={{ fontSize: "12px" }}
              >
                <label className="">1 year with 3% return</label>
              </span>
              {/* <span
                className="d-flex flex-column bg-primary  text-light shadow align-items-center justify-content-center  border border-secondary border-2"
                style={{ width: "2rem", height: "2rem", fontSize: "12px" }}
              ></span> */}
            </div>

            <label
              className="w-100 text-truncate  "
              style={{ fontSize: "12px" }}
            >
              This is my busienss description is all abotu the business i made
            </label>
            <div className="d-flex gap-2 mt-2">
              <label
                class="  border border-dark border-1 w-50 rounded-0 d-flex align-items-center justify-content-center ps-2 pe-2"
                title={` ₱ 13000034.00 `}
              >
                ₱ {handleAbbreviatedValue("13000034")}
              </label>

              <button type="button" class=" btn btn-primary rounded-0 w-75">
                <Nav.Link as={NavLink} to={"/investor/business-details/1"}>
                  More +
                </Nav.Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryBusiness;
