const shortid = require("shortid");

let item1 = {
  itemName: "10 inch Basic Small Pizza",
  itemId: shortid.generate(),
  basePrice: 8.99,
  description: "Six slices",
  itemSections: [
    {
      sectionName: "Choice of Crust",
      minMaxSelection: {
        max: 1,
        min: 1
      },
      sectionOptions: [
        {
          price: 0,
          name: "Original Crust"
        },
        {
          price: 0,
          name: "Whole Wheat Crust"
        },
        {
          price: 0,
          name: "Thick Crust"
        },
        {
          price: 0,
          name: "Thin Crust"
        }
      ]
    },
    {
      sectionName: "Add Toppings",
      minMaxSelection: {
        max: 28,
        min: 0
      },
      sectionOptions: [
        {
          price: 1.19,
          name: "Tomatoes"
        },
        {
          name: "Double Cheese",
          price: 2.38
        },
        {
          name: "Ham",
          price: 1.19
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
  itemName: "Wings",
  itemId: shortid.generate(),
  basePrice: 10.99,
  description: "These are our wings",
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
          name: "Ten Pieces"
        },
        {
          price: 9,
          name: "Twenty Pieces"
        },
        {
          price: 18,
          name: "Thirty Pieces"
        }
      ]
    },
    {
      sectionOptions: [
        {
          price: 0,
          name: "Mild"
        },
        {
          price: 0,
          name: "Medium"
        },
        {
          price: 0,
          name: "Hot"
        },
        {
          name: "Thai",
          price: 0
        },
        {
          price: 0,
          name: "Honey Garlic"
        },
        {
          price: 0,
          name: "Buffalo"
        }
      ],
      sectionName: "Choice of Sauce",
      minMaxSelection: {
        min: 1,
        max: 1
      }
    },
    {
      sectionName: "Special Instructions",
      text: "Add a note here (Optional)"
    }
  ]
};

let item3 = {
  itemName: "Wedges",
  itemId: shortid.generate(),
  basePrice: 8.99,
  description: "These are our wedges",
  itemSections: [
    {
      sectionOptions: [
        {
          price: 0,
          name: "8 oz"
        },
        {
          name: "18 oz",
          price: 1.7
        },
        {
          price: 3.7,
          name: "26 oz"
        }
      ],
      sectionName: "Choice of Size",
      minMaxSelection: {
        min: 1,
        max: 1
      }
    },
    {
      sectionName: "Add-ons",
      minMaxSelection: {
        max: 5,
        min: 0
      },
      sectionOptions: [
        {
          price: 0.59,
          name: "Garlic Dipping Sauce"
        },
        {
          price: 0.59,
          name: "Cheddar Hebanera Dipping Sauce"
        },
        {
          name: "Ranch Dipping Sauce",
          price: 0.59
        },
        {
          name: "Marina Dipping Sauce",
          price: 0.59
        },
        {
          price: 0.59,
          name: "Parmesan Cheese"
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
  name: "Pizza Pizza",
  menu: [
    {
      categoryName: '10" Small Pizzas',
      items: [item1]
    },
    {
      categoryName: "Sides",
      items: [item2, item3]
    }
  ],
  thumbnail:
    "https://firebasestorage.googleapis.com/v0/b/utm-eats.appspot.com/o/restaurant_images%2Fpizza-pizza.png?alt=media&token=13cbd8ca-7bcb-4997-b8a5-02073ac971a6",
  description: "Bringing you fresh pizza everyday!"
};

exports.restaurant = restaurant;
