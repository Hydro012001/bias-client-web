import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faFilter } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import "../CSS/investorFeed.css";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import {
  handleSelectCategories,
  searchFilter,
} from "../../Utils/categoriesAPI";
import newIcon from "../../icons/newIcon.png";
import { Button, ListGroup, Modal } from "react-bootstrap";
import axios from "axios";
import { businessLikes } from "../../Components/bussinesDetails";
export default function Feeds() {
  const navigate = useNavigate();
  const { typeKey, category } = useParams();
  const [activeKey, setActiveKey] = useState("retail");
  const [clickedCode, setClickedCode] = useState([]);
  const [listBusiness, setListBusiness] = useState([]);

  // useEffect(() => {
  //   navigate(`?category=${selectedItems.join(",")}`);
  // }, [selectedItems, navigate]);

  const [checkBoxsData, setCheckBoxData] = useState([]);

  const getLinkClassName = (eventKey) => {
    return activeKey === eventKey ? "text-primary fw-bold" : "text-dark";
  };

  useEffect(() => {
    const filteredSearch = searchFilter.find(
      (item) => item.category === typeKey
    );

    if (filteredSearch) {
      setCheckBoxData(filteredSearch.data);
    }
  }, [typeKey]);

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

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
    // const joinCategories = categories.includes(e);
    // console.log(joinCategories);
  };
  useEffect(() => {
    setClickedCode(category);
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
            New{" "}
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
          <Nav.Link
            to={"list/investee/category/all"}
            eventKey={"investee"}
            as={NavLink}
            className={getLinkClassName("investee")}
          >
            Investee
          </Nav.Link>

          <Nav.Link
            to={"list/retail/category/all"}
            eventKey={"retail"}
            as={NavLink}
            className={getLinkClassName("retail")}
          >
            Retail
          </Nav.Link>
          <Nav.Link
            eventKey="street vendors"
            to={"list/street vendors/category/all"}
            as={NavLink}
            className={getLinkClassName("street vendors")}
          >
            Street Vendors
          </Nav.Link>
          <Nav.Link
            eventKey="food and beverage"
            to={"list/food and beverage/category/all"}
            as={NavLink}
            className={getLinkClassName("food and beverage")}
          >
            Food and Beverage
          </Nav.Link>
          <Nav.Link
            eventKey="e-commerce"
            to={"list/e-commerce/category/all"}
            as={NavLink}
            className={getLinkClassName("e-commerce")}
          >
            E-commerce
          </Nav.Link>
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
                    id={item.code}
                    key={index}
                    label={item.businessType}
                    style={{ fontSize: "14px" }}
                    value={item.businessType}
                    onChange={(e) => {
                      handleNavigateCategories(e.target.value, e);
                    }}
                    checked={
                      clickedCode ? clickedCode.includes(item.businessType) : ""
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
