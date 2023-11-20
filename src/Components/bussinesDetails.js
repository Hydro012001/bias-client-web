//This is an array object for business type

const bussinesTypeList = [
  { id: "01", category: "Retail", category_code: "001" },
  { id: "02", category: "Food and Beverage", category_code: "002" },
  { id: "03", category: "E-commerce", category_code: "003" },
  { id: "04", category: "Street Vendors", category_code: "004" },
];

//This are business list of each business type
const bussinessList = [
  {
    id: "01",
    bussiness: "Apparel & Clothing Retailers",
    category_code: "001",
    category: "Retail",
  },
  {
    id: "02",
    bussiness: "Electronics & Technology Stores",
    category_code: "001",
    category: "Retail",
  },
  {
    id: "03",
    bussiness: "Local Convenience Stores",
    category_code: "001",
    category: "Retail",
  },
  {
    id: "04",
    bussiness: "Furniture & Home Decor",
    category_code: "001",
    category: "Retail",
  },
  {
    id: "05",
    bussiness: "Jewelry Stores",
    category_code: "001",
    category: "Retail",
  },
  {
    id: "06",
    bussiness: "Restaurants",
    category_code: "002",
    category: "Food and Beverage",
  },
  {
    id: "07",
    bussiness: "Bakeries",
    category_code: "002",
    category: "Food and Beverage",
  },
  {
    id: "08",
    bussiness: "Cafes",
    category_code: "002",
    category: "Food and Beverage",
  },
  {
    id: "09",
    bussiness: "Bars & Pubs",
    category_code: "002",
    category: "Food and Beverage",
  },
  {
    id: "10",
    bussiness: "Specialty Food Stores",
    category_code: "002",
    category: "Food and Beverage",
  },
  {
    id: "11",
    bussiness: "Online Retailers",
    category_code: "003",
    category: "E-commerce",
  },
  {
    id: "12",
    bussiness: "E-commerce Marketplaces",
    category_code: "003",
    category: "E-commerce",
  },
  {
    id: "13",
    bussiness: "Fashion E-commerce",
    category_code: "003",
    category: "E-commerce",
  },
  {
    id: "14",
    bussiness: "Electronics E-commerce",
    category_code: "003",
    category: "E-commerce",
  },
  {
    id: "15",
    bussiness: "Food Delivery Apps",
    category_code: "003",
    category: "E-commerce",
  },
  {
    id: "16",
    bussiness: "Food Carts",
    category_code: "004",
    category: "Street Vendors",
  },
  {
    id: "17",
    bussiness: "Street Food Vendors",
    category_code: "004",
    category: "Street Vendors",
  },
  {
    id: "18",
    bussiness: "Artisanal Craft Stalls",
    category_code: "004",
    category: "Street Vendors",
  },
  {
    id: "19",
    bussiness: "Secondhand Vendors",
    category_code: "004",
    category: "Street Vendors",
  },
  {
    id: "20",
    bussiness: "Local Farmers' Markets",
    category_code: "004",
    category: "Street Vendors",
  },
];

//When you call this function in your .js file this will return all the business type
function bussinessTypes() {
  return bussinesTypeList;
}

//When you call this function it has a parameteres which is the code of the business type
//and it will return the business list that has the busiess type code of it
function bussinessesName(code) {
  //This function use to filter the business type code of the business list that is match on the code you pass as a parameters
  return bussinessList.filter((item) => item.category_code === code);
}

export { bussinessTypes, bussinessesName };
