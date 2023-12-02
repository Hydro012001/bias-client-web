import React, { useEffect, useState } from "react";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./loader";

function AutoCompleteAddress({ address, hasBuilding, buildingsNearTheEntrep }) {
  const [value, setValue] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [bussLocationYes, setBussLocationYes] = useState(true);
  const [bussLocationNo, setBussLocationNo] = useState(false);
  const [buildingsNearMe, setbuildingNearMe] = useState([]);
  const [buildingId, setBuildingId] = useState("");
  const [place, setPlace] = useState("");
  const [height, setHeight] = useState("0");
  const onPlaceSelect = (result) => {
    if (result) {
      address(result.properties.formatted);
      setPlace(result.properties.formatted);
      const placeId = result.properties.place_id;
      setHeight("0");
      //console.log(result.properties.formatted);

      setBuildingId(placeId);
    } else {
      setPlace("");
      setHeight("0");
      setValue("");
      setBussLocationYes(false);
      setBussLocationNo(false);
      setBuildings("");
    }
  };
  const handleSetBuildingNearMe = (name, place_id, address) => {
    setbuildingNearMe((prevBuildings) => [
      ...prevBuildings,
      { name, place_id, address },
    ]);
  };

  const handleRemoveBuildingNearMe = (place_id) => {
    setbuildingNearMe((prevBuildings) =>
      prevBuildings.filter((building) => building.place_id !== place_id)
    );
  };

  //   const handleSetBuildingNearMe = (item, place_id) => {
  //     const isDuplicate = buildingsNearMe.some(
  //       (building) => building.place_id === place_id
  //     );

  //     if (!isDuplicate) {
  //       setbuildingNearMe((prevBuildings) => [
  //         ...prevBuildings,
  //         { name: item, place_id: place_id },
  //       ]);
  //     }
  //   };

  useEffect(() => {
    console.log(buildingsNearMe);
    buildingsNearTheEntrep(buildingsNearMe);
  }, [buildingsNearMe]);

  const handleGetBuildings = async () => {
    setShowLoader(true);
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=commercial,education,accommodation,healthcare,national_park,tourism,building,public_transport,populated_place&filter=place:${buildingId}&limit=100&apiKey=42e3fa0dc85346009b4c1bb9570870ff`
    );
    const data = await response.json();
    const dataDetails = data.features;
    const buildingsArray = dataDetails
      .map((item) => ({
        name: item.properties.name,
        formatted: item.properties.formatted,
        place_id: item.properties.place_id,
      }))
      .filter((building) => building.name);
    setShowLoader(false);
    console.log(buildingsArray);
    setBuildings(buildingsArray);
  };
  const handleCheckboxChangeLocation = (check) => {
    console.log(check);

    if (check) {
      handleGetBuildings();
      hasBuilding("yes");
    } else {
      setbuildingNearMe("");
      setBuildings("");
      hasBuilding("false");
    }
  };
  const handleInputChange = (newValue) => {
    console.log(newValue);
    // setBussLocationNo(false);
    setbuildingNearMe("");
    setBussLocationYes(false);
    setBuildings("");
    if (newValue.length >= 4) {
      setHeight("300");
    } else {
      setHeight("0");
    }
    setValue(newValue);
  };

  return (
    <div>
      <div
        style={{
          height: `${height === "300" ? `${height}px ` : "auto"}`,
          overflowY: "auto",
        }}
      >
        <GeoapifyContext apiKey="42e3fa0dc85346009b4c1bb9570870ff">
          <GeoapifyGeocoderAutocomplete
            placeholder="Enter address here"
            value={value}
            limit={100}
            placeSelect={onPlaceSelect}
            onUserInput={handleInputChange}
          />
        </GeoapifyContext>
      </div>

      <div className="mb-3 d-flex mt-4">
        <label className="form-label  fw-bold">
          Does you business is near a school, department store, crowded places
          or etc...?
        </label>
        <div
          class="form-check ms-3 bg-dark d-flex  justify-content-center  "
          style={{ width: "1rem", height: "1rem" }}
        >
          <input
            class="form-check-input "
            type="checkbox"
            id="flexCheckDefault"
            disabled={place !== "" ? false : true}
            onChange={(item) =>
              handleCheckboxChangeLocation(item.target.checked)
            }
          />
        </div>

        {/* <label className="form-lable mt-3">
          If yes. Provide the name of the building or place?
        </label>
        <input
          type="text"
          placeholder="e.g Sm Seaside"
          className="form-control ms-3"
          disabled={textDisable}
          onChange={(e) => setbussBuildingPlaceName(e.target.value)}
        /> */}
      </div>

      {showLoader ? (
        <div className="d-flex align-items-center justify-content-center mt-4">
          <Loader />
        </div>
      ) : (
        ""
      )}
      {buildings ? (
        <div className="d-flex justify-content-between flex-wrap mt-3">
          {buildings.map((item, index) => (
            <div
              class="form-check w-50"
              key={index}
              title={`${item.formatted}`}
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={item.name}
                id="flexCheckDefault"
                onChange={(e) =>
                  e.target.checked
                    ? handleSetBuildingNearMe(
                        item.name,
                        item.place_id,
                        item.formatted
                      )
                    : handleRemoveBuildingNearMe(item.place_id)
                }
              />
              {/* <input
                class="form-check-input"
                type="checkbox"
                value={item.name}
                id="flexCheckDefault"
                onChange={(e) =>
                  handleSetBuildingNearMe(e.target.value, item.place_id)
                }
              /> */}
              <label
                class="form-check-label"
                for="flexCheckDefault"
                style={{ cursor: "pointer" }}
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AutoCompleteAddress;
