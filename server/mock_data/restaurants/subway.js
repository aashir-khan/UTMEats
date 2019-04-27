const shortid = require("shortid");

let item1 = {
  itemName: "Veggie Delite",
  itemId: shortid.generate(),
  basePrice: 4.49,
  description: "This is our veggie delite sub.",
  itemSections: [
    {
      sectionName: "Size",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "6 inch"
        },
        {
          price: 2.5,
          name: "12 inch"
        }
      ]
    },
    {
      sectionName: "Choice of Bread",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "9-Grain Wheat Bread"
        },
        {
          price: 0,
          name: "9-Grain Honey Oat Bread"
        },
        {
          price: 0,
          name: "Italien Bread"
        },
        {
          price: 0,
          name: "Italian Herbs and Cheese Bread"
        },
        {
          price: 0,
          name: "White Flatbread"
        },
        {
          price: 0,
          name: "Whole Wheat Flatbread"
        },
        {
          price: 0,
          name: "White Wrap"
        }
      ]
    },
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let item2 = {
  itemName: "Crispy Chicken",
  itemId: shortid.generate(),
  basePrice: 6.69,
  description: "This is our crispy chicken sub.",
  itemSections: [
    {
      sectionName: "Size",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "6 inch"
        },
        {
          price: 3.1,
          name: "12 inch"
        }
      ]
    },
    {
      sectionName: "Choice of Bread",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "9-Grain Wheat Bread"
        },
        {
          price: 0,
          name: "9-Grain Honey Oat Bread"
        },
        {
          price: 0,
          name: "Italien Bread"
        },
        {
          price: 0,
          name: "Italian Herbs and Cheese Bread"
        },
        {
          price: 0,
          name: "White Flatbread"
        },
        {
          price: 0,
          name: "Whole Wheat Flatbread"
        },
        {
          price: 0,
          name: "White Wrap"
        }
      ]
    },
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let item3 = {
  itemName: "Chicken Teriyaki",
  itemId: shortid.generate(),
  basePrice: 8.49,
  description: "This is our chicken terikyaki salad",
  itemSections: [
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let item4 = {
  itemName: "Chocolate Milk",
  itemId: shortid.generate(),
  basePrice: 2.79,
  description: "This is our chocolate milk (500 ml)",
  itemSections: [
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let restaurant = {
  name: "Subway",
  menu: [
    {
      categoryName: "Sandwiches",
      items: [item1, item2]
    },
    {
      categoryName: "Salads",
      items: [item3]
    },
    {
      categoryName: "Drinks",
      items: [item4]
    }
  ],
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/utm-eats.appspot.com/o/restaurant_images%2Fsubway.png?alt=media&token=2ac2cd16-8b2e-48a9-97e2-a237110c29c5",
  description: "Eat Fresh"
};

exports.restaurant = restaurant;
