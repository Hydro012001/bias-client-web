import { useEffect, useState } from "react";
import "../Screens/CSS/Signup.css";
import {
  provinces,
  cities,
  barangays,
  provinceByName,
} from "select-philippines-address";
export default function Address({ addressData }) {
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [selectedProvince, setselectedProvince] = useState("");

  const [provinceList, setProvinceList] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [barangaysList, setBarangaysList] = useState([]);

  useEffect(() => {
    provinces("07").then((res) => setProvinceList(res));
  }, []);

  const settingProvince = (provinceName) => {
    provinceByName(provinceName)
      .then((province) => setProvinceCode(province.province_code))

      .then(() => setselectedProvince(provinceName));
  };

  useEffect(() => {
    cities(provinceCode).then((res) => setCitiesList(res));
  }, [provinceCode]);

  const settingCities = (citiesCode, citiesName) => {
    barangays(citiesCode).then((res) => setBarangaysList(res));

    setSelectCity(citiesName);
  };

  const selectedBarangays = (selected) => {
    setSelectedBarangay(selected);
  };

  useEffect(() => {
    addressData({
      province: selectedProvince,
      city: selectCity,
      barangay: selectedBarangay,
    });
  }, [addressData, selectCity, selectedBarangay, selectedProvince]);

  return (
    <>
      <select
        onChange={(e) => settingProvince(e.target.value)}
        className="form-select"
        aria-label="Default select example"
      >
        <option>Select Province</option>
        {provinceList.map((res) => (
          <option key={res.province_code} value={res.province_name}>
            {res.province_name}
          </option>
        ))}
      </select>
      <br />
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(e) =>
          settingCities(
            e.target.value,
            e.target.options[e.target.selectedIndex].text
          )
        }
      >
        <option>Select City</option>
        {citiesList.map((res) => (
          <option key={res.city_code} value={res.city_code}>
            {res.city_name}
          </option>
        ))}
      </select>

      <br />

      <select
        onChange={(e) => selectedBarangays(e.target.value)}
        className="form-select"
        aria-label="Default select example"
      >
        <option>Select Barangay</option>
        {barangaysList.map((res) => (
          <option key={res.brgy_code} value={res.brgy_name}>
            {res.brgy_name}
          </option>
        ))}
      </select>
    </>
  );
}
