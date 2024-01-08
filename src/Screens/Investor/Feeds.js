import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faFilter } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import "../CSS/investorFeed.css";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import {
  handleSelectCategories,
  searchFilter,
} from "../../Utils/categoriesAPI";
import newIcon from "../../icons/newIcon.png";
import axios from "axios";

export default function Feeds() {
  const navigate = useNavigate();
  const { typeKey, category } = useParams();
  const [activeKey, setActiveKey] = useState("retail");
  const [clickedCode, setClickedCode] = useState([]);
  const [bussinessCategory, setBussinessCategory] = useState([]);
  const [businessSubCategory, setBusinessSubCategory] = useState([]);
  const [checkBoxsData, setCheckBoxData] = useState([]);

  const getLinkClassName = (eventKey) => {
    return activeKey === eventKey ? "text-primary fw-bold" : "text-dark";
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_NETWORK_ADD}/bussinesTypeList`)
      .then((res) => {
        if (res.data.status) {
          setBussinessCategory(res.data.categoryres);

          setBusinessSubCategory(res.data.subcategoryRes);
          setCheckBoxData(res.data.subcategoryRes);
        } else {
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  useEffect(() => {
    // const filteredSearch = businessSubCategory.find(
    //   (item) => item.ctg_name === typeKey
    // );

    if (typeKey === "all" || typeKey === "new") {
      setCheckBoxData(businessSubCategory);
    } else {
      const filteredSearch = businessSubCategory.reduce(
        (result, curretnItem) => {
          if (curretnItem.ctg_name === typeKey) {
            result.push({
              sub_ctg_name: curretnItem.sub_ctg_name,
              sub_ctg_id: curretnItem.sub_ctg_id,
            });
          }
          return result;
        },
        []
      );

      if (filteredSearch) {
        setCheckBoxData(filteredSearch);
      }
    }
  }, [typeKey]);

  useEffect(() => {
    setActiveKey(typeKey);
  }, [typeKey]);

  const handleNavigateCategories = (e, isCheck) => {
    const categories = handleSelectCategories(e, isCheck.target.checked);

    if (categories.length > 0) {
      navigate(`list/${typeKey}/category/${categories}`);
    } else {
      navigate(`list/${typeKey}/category/all`);
    }
  };
  useEffect(() => {
    setClickedCode(category);
  }, [category]);

  // const handleAbbreviatedValue = (value) => {
  //   if (value >= 1000000000) {
  //     return (value / 1000000000).toFixed(1) + "B";
  //   }
  //   if (value >= 1000000) {
  //     return (value / 1000000).toFixed(1) + "M";
  //   }
  //   if (value >= 1000) {
  //     return (value / 1000).toFixed(1) + "K";
  //   } else {
  //     return value;
  //   }
  // };

  return (
    <div className="mt-5 pt-3">
      <div className="d-flex flex-column float-start ps-3 pe-3 pt-2">
        <label className="fw-bold d-flex gap-2 align-items-center ">
          <FontAwesomeIcon icon={faList} />
          ALL CATEGORIES
        </label>

        <Nav
          className="flex-column w-100 shadow-none text-dark h-25"
          activeKey={activeKey}
          onClick={() => handleSelectCategories("newLink")}
        >
          <Nav.Link
            to={"list/all/category/all"}
            eventKey={"all"}
            as={NavLink}
            className={getLinkClassName("all")}
          >
            All
          </Nav.Link>
          <Nav.Link
            to={"list/new/category/all"}
            eventKey={"new"}
            as={NavLink}
            className={`${getLinkClassName("new")} position-relative`}
          >
            New
            <img
              src={newIcon}
              alt="..."
              style={{
                height: "1.5rem",
                width: "1.5rem",
                top: "0px",
                left: "0px",
              }}
              className="position-absolute"
            />
          </Nav.Link>
          <div className="overflow-auto" style={{ height: "10rem" }}>
            {bussinessCategory.map((item) => (
              <Nav.Link
                to={`list/${item.ctg_name}/category/all`}
                eventKey={`${item.ctg_name}`}
                as={NavLink}
                className={getLinkClassName(`${item.ctg_name}`)}
                key={item.ctg_id}
              >
                {item.ctg_name}
              </Nav.Link>
            ))}
          </div>

          {/* <Nav.Link
            eventKey="Retails"
            to={"list/Retails/category/all"}
            as={NavLink}
            className={getLinkClassName("Retails")}
          >
            Retails
          </Nav.Link>

          <Nav.Link
            eventKey="Technology"
            to={"list/Technology/category/all"}
            as={NavLink}
            className={getLinkClassName("Technology")}
          >
            Technology
          </Nav.Link>
          <Nav.Link
            eventKey="Manufacturing"
            to={"list/Manufacturing/category/all"}
            as={NavLink}
            className={getLinkClassName("Manufacturing")}
          >
            Manufacturing
          </Nav.Link>
          <Nav.Link
            eventKey="Health Services"
            to={"list/Health Services/category/all"}
            as={NavLink}
            className={getLinkClassName("Health Services")}
          >
            Health Services
          </Nav.Link>
          <Nav.Link
            eventKey="Personal Care Services"
            to={"list/Personal Care Services/category/all"}
            as={NavLink}
            className={getLinkClassName("Personal Care Services")}
          >
            Personal Care Services
          </Nav.Link>
          <Nav.Link
            eventKey="Arts and Crafts"
            to={"list/Arts and Crafts/category/all"}
            as={NavLink}
            className={getLinkClassName("Arts and Crafts")}
          >
            Arts and Crafts
          </Nav.Link>
          <Nav.Link
            eventKey="Food and Beverage"
            to={"list/Food and Beverage/category/all"}
            as={NavLink}
            className={getLinkClassName("Food and Beverage")}
          >
            Food and Beverage
          </Nav.Link>
          <Nav.Link
            eventKey="Food and Beverage"
            to={"list/Food and Beverage/category/all"}
            as={NavLink}
            className={getLinkClassName("Food and Beverage")}
          >
            Food and Beverage
          </Nav.Link>
          <Nav.Link
            eventKey="Home Services"
            to={"list/Home Services/category/all"}
            as={NavLink}
            className={getLinkClassName("Home Services")}
          >
            Home Services
          </Nav.Link>
          <Nav.Link
            eventKey="Entertainment"
            to={"list/Entertainment/category/all"}
            as={NavLink}
            className={getLinkClassName("Entertainment")}
          >
            Entertainment
          </Nav.Link>
          <Nav.Link
            eventKey="Education"
            to={"list/Education/category/all"}
            as={NavLink}
            className={getLinkClassName("Education")}
          >
            Education
          </Nav.Link> */}
        </Nav>

        <div className="d-flex flex-column row pt-3 ">
          <label className="fw-bold mb-2 d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faFilter} />
            SEARCH FILTER
          </label>
          <div className="ps-4 overflow-auto " style={{ height: "13rem" }}>
            <label style={{ fontWeight: "500" }}>By Category</label>
            {checkBoxsData ? (
              <div className="">
                {checkBoxsData.map((item, index) => (
                  <Form.Check
                    type={"checkbox"}
                    id={item.sub_ctg_id}
                    key={index}
                    label={item.sub_ctg_name}
                    style={{ fontSize: "14px" }}
                    value={item.sub_ctg_name}
                    onChange={(e) => {
                      handleNavigateCategories(e.target.value, e);
                    }}
                    checked={
                      clickedCode ? clickedCode.includes(item.sub_ctg_name) : ""
                    }
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
