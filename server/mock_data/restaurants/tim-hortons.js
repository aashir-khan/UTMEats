const shortid = require("shortid");

let item1 = {
  itemName: "Original Coffee",
  itemId: shortid.generate(),
  basePrice: 1.33,
  description: "This is our original coffee",
  itemSections: [
    {
      sectionName: "Choice of Size",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0.24,
          name: "Medium"
        },
        {
          price: 0.38,
          name: "Large"
        },
        {
          price: 0.57,
          name: "X-Large"
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
  itemName: "French Vanilla",
  itemId: shortid.generate(),
  basePrice: 1.74,
  description: "This is our French Vanilla",
  itemSections: [
    {
      sectionName: "Choice of Size",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "Small"
        },
        {
          price: 0.31,
          name: "Medium"
        },
        {
          price: 0.61,
          name: "Large"
        },
        {
          price: 0.85,
          name: "X-Large"
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
  itemName: "Muffins",
  itemId: shortid.generate(),
  basePrice: 1.19,
  description: "These are our muffins",
  itemSections: [
    {
      sectionName: "Amount",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "Each"
        },
        {
          price: 4.8,
          name: "1/2 dozen"
        },
        {
          price: 8.8,
          name: "dozen"
        }
      ]
    },
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let item4 = {
  itemName: "Chicken Salad",
  itemId: shortid.generate(),
  basePrice: 3.29,
  description: "This is our chicken salad",
  itemSections: [
    {
      sectionName: "Extras",
      minMaxSelection: {
        min: 1,
        max: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "Each"
        },
        {
          price: 1.66,
          name: "Donut Combo"
        },
        {
          price: 3,
          name: "Soup Combo"
        }
      ]
    },
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let restaurant = {
  name: "Tim Hortons",
  menu: [
    {
      categoryName: "Hot Beverages",
      items: [item1, item2]
    },
    {
      categoryName: "Bakery Fresh",
      items: [item3]
    },
    {
      categoryName: "Classic Sandwiches",
      items: [item4]
    }
  ],
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/utm-eats.appspot.com/o/restaurant_images%2Ftim-hortons.png?alt=media&token=68451969-c320-4e78-939f-a4b75e089e3a",
  description: "Always fresh, always Tim Hortons!"
};

exports.restaurant = restaurant;
