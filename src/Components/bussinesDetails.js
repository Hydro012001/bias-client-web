const businessLikes = [
  "Grocery/ Sari Sari Stores",
  "Fashion apparel Stores / Ukay2 Stores",
  "Convenience Stores",
  "Food and Beverage Stores",
  "Bakeries",
  "Printing Services",
  "Small Hardwares",
  "Furnitures",
  "Small Drugstores",
  "Pharmacies",
  "Barbershops",
  "Small Salons and Beauty Services",
  "Handmade Art Craft Shops",
  "Photobooth Gallery",

  "Restaurants",
  "Cafes",
  "Bars & Pubs",
  "Specialty Food Stores",
  "Online Retailers",
  "E-commerce Marketplaces",
  "Fashion E-commerce",
  "Electronics E-commerce",
  "Food Delivery Apps",
  "Food Carts",
  "Street Food Vendors",
  "Artisanal Craft Stalls",
  "Secondhand Vendors",
  "Local Farmers' Markets",
  "Water Refilling Station",
  "Local Bookstores",
  "Mobile Repair Shops",
  "Artisanal Soap Shops",
  "Coffee Shops",
  "Event Planning Services",
  "Tutoring Services",
];

const bussinesTypeList = [
  { id: "01", category: "Retails", category_code: "001" },
  { id: "02", category: "Technology", category_code: "002" },
  { id: "03", category: "Manufacturing", category_code: "003" },
  { id: "04", category: "Health Services", category_code: "004" },
  { id: "05", category: "Personal Care Services", category_code: "005" },
  { id: "06", category: "Arts and Crafts", category_code: "006" },
  { id: "07", category: "Food and Beverage", category_code: "007" },
  { id: "08", category: "Home Services", category_code: "008" },
  { id: "09", category: "Entertainment", category_code: "009" },
  { id: "10", category: "Education", category_code: "010" },
  // Add more categories as needed
];

const bussinessList = [
  {
    id: "01",
    bussiness: "Grocery/ Sari Sari Stores",
    category_code: "001",
    category: "Retails",
  },
  {
    id: "02",
    bussiness: "Fashion apparel Stores / Ukay2 Stores",
    category_code: "001",
    category: "Retails",
  },
  {
    id: "03",
    bussiness: "Convenience Stores",
    category_code: "001",
    category: "Retails",
  },
  {
    id: "04",
    bussiness: "Food and Beverage Stores",
    category_code: "001",
    category: "Retails",
  },
  {
    id: "05",
    bussiness: "Bakeries",
    category_code: "001",
    category: "Retails",
  },
  {
    id: "06",
    bussiness: "Printing Services",
    category_code: "002",
    category: "Technology",
  },
  {
    id: "07",
    bussiness: "Small Hardwares",
    category_code: "003",
    category: "Manufacturing",
  },
  {
    id: "08",
    bussiness: "Furnitures",
    category_code: "003",
    category: "Manufacturing",
  },
  {
    id: "09",
    bussiness: "Small Drugstores",
    category_code: "004",
    category: "Health Services",
  },
  {
    id: "10",
    bussiness: "Pharmacies",
    category_code: "004",
    category: "Health Services",
  },
  {
    id: "11",
    bussiness: "Barbershops",
    category_code: "005",
    category: "Personal Care Services",
  },
  {
    id: "12",
    bussiness: "Small Salons and Beauty Services",
    category_code: "005",
    category: "Personal Care Services",
  },
  {
    id: "13",
    bussiness: "Handmade Art Craft Shops",
    category_code: "006",
    category: "Arts and Crafts",
  },
  {
    id: "14",
    bussiness: "Photobooth Gallery",
    category_code: "006",
    category: "Arts and Crafts",
  },
  {
    id: "15",
    bussiness: "Local Bookstores",
    category_code: "007",
    category: "Food and Beverage",
  },
  {
    id: "16",
    bussiness: "Mobile Repair Shops",
    category_code: "008",
    category: "Home Services",
  },
  {
    id: "17",
    bussiness: "Artisanal Soap Shops",
    category_code: "006",
    category: "Arts and Crafts",
  },
  {
    id: "18",
    bussiness: "Coffee Shops",
    category_code: "007",
    category: "Food and Beverage",
  },
  {
    id: "19",
    bussiness: "Event Planning Services",
    category_code: "009",
    category: "Entertainment",
  },
  {
    id: "20",
    bussiness: "Tutoring Services",
    category_code: "010",
    category: "Education",
  },
  // Add more businesses as needed
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

export { bussinessTypes, bussinessesName, businessLikes };
