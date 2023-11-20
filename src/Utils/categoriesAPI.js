let categories = [];

export function handleSelectCategories(category, event) {
  const isCheck = event;

  if (category === "newLink") {
    return (categories = []);
  }
  if (isCheck) {
    categories.unshift(category);
  } else {
    categories = categories.filter((value) => value !== category);
  }

  return categories;
}

const searchFilter = [
  {
    category: "retail",
    data: [
      { businessType: "Apparel & Clothing Retailers", code: "01" },
      { businessType: "Electronics & Technology Stores", code: "02" },
      { businessType: "Local Convenience Stores", code: "03" },
      { businessType: "Furniture & Home Decor", code: "04" },
      { businessType: "Jewelry Stores", code: "05" },
    ],
  },
  {
    category: "food and beverage",
    data: [
      { businessType: "Restaurants", code: "06" },
      { businessType: "Bakeries", code: "07" },
      { businessType: "Cafes", code: "08" },
      { businessType: "Bars & Pubs", code: "09" },
      { businessType: "Specialty Food Stores", code: "10" },
    ],
  },
  {
    category: "e-commerce",
    data: [
      { businessType: "Online Retailers", code: "11" },
      { businessType: "E-commerce Marketplaces", code: "12" },
      { businessType: "Fashion E-commerce", code: "13" },
      { businessType: "Electronics E-commerce", code: "14" },
      { businessType: "Food Delivery Apps", code: "15" },
    ],
  },
  {
    category: "street vendors",
    data: [
      { businessType: "Food Carts", code: "16" },
      { businessType: "Street Food Vendors", code: "17" },
      { businessType: "Artisanal Craft Stalls", code: "18" },
      { businessType: "Secondhand Vendors", code: "19" },
      { businessType: "Local Farmers' Markets", code: "20" },
    ],
  },
  {
    category: "all",
    data: [],
  },
];

export { searchFilter };
