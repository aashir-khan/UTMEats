const firebase = require("../libs/firebase-lib");

exports.createMockOrdersController = async function(req, res) {
  const ret = await createMockOrders();
  if (!ret) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(200);
};

createMockOrders = async function() {
  let c1ngXBmW6zXAoZJobCIJ;
  const order1 = await firebase.set(
    "orders",
    null,
    {
      restaurantId: "c1ngXBmW6zXAoZJobCIJ",
      customerId: "d2PVb0H9xxgzo2GeNzuubhyq6Xm1",
      status: "received",
      ETA: "To be determined",
      deliveryLocation: "IB 140",
      deliveryInstructions:
        "Make sure to knock on the door before coming in please.",
      items: [
        {
          itemId: "someId2",
          itemName: "Wings",
          quantity: 3,
          description: "No description",
          basePrice: 10.99,
          itemSections: [
            {
              sectionName: "Choice of Size",
              sectionOptions: [
                {
                  name: "Twenty Pieces (+$9)",
                  price: 9
                }
              ]
            },
            {
              sectionName: "Choice of Sauce",
              sectionOptions: [
                {
                  name: "Medium",
                  price: 0
                }
              ]
            }
          ]
        }
      ],
      costs: {
        food: 10,
        foodTax: 2,
        delivery: 3,
        deliveryTax: 1,
        tip: 2,
        total: 18
      },
      createdAt: Date.now()
    },
    "orderId"
  );

  const order2 = await firebase.set(
    "orders",
    null,
    {
      restaurantId: "c1ngXBmW6zXAoZJobCIJ",
      customerId: "d2PVb0H9xxgzo2GeNzuubhyq6Xm1",
      status: "received",
      ETA: "To be determined",
      deliveryLocation: "IB 140",
      deliveryInstructions:
        "Make sure to knock on the door before coming in please.",
      items: [
        {
          itemId: "someId1",
          itemName: "Fries",
          quantity: 3,
          description: "They are the best",
          basePrice: 1.0,
          itemSections: [
            {
              sectionName: "Size",
              sectionOptions: [
                {
                  name: "Small",
                  price: 3
                }
              ]
            },
            {
              sectionName: "Color",
              sectionOptions: [
                {
                  name: "Yellow",
                  price: 0
                }
              ]
            }
          ]
        }
      ],
      costs: {
        food: 10,
        foodTax: 2,
        delivery: 3,
        deliveryTax: 1,
        tip: 2,
        total: 18
      },
      createdAt: Date.now()
    },
    "orderId"
  );

  c1ngXBmW6zXAoZJobCIJ;
  const order3 = await firebase.set(
    "orders",
    null,
    {
      restaurantId: "c1ngXBmW6zXAoZJobCIJ",
      customerId: "d2PVb0H9xxgzo2GeNzuubhyq6Xm1",
      status: "accepted",
      ETA: "To be determined",
      deliveryLocation: "IB 140",
      deliveryInstructions:
        "Make sure to knock on the door before coming in please.",
      items: [
        {
          itemId: "someId1",
          itemName: "Fries",
          quantity: 3,
          description: "They are the best",
          basePrice: 1.0,
          itemSections: [
            {
              sectionName: "Size",
              sectionOptions: [
                {
                  name: "Small",
                  price: 3
                }
              ]
            },
            {
              sectionName: "Color",
              sectionOptions: [
                {
                  name: "Yellow",
                  price: 0
                }
              ]
            }
          ]
        }
      ],
      costs: {
        food: 10,
        foodTax: 2,
        delivery: 3,
        deliveryTax: 1,
        tip: 2,
        total: 18
      },
      createdAt: Date.now()
    },
    "orderId"
  );

  c1ngXBmW6zXAoZJobCIJ;
  const order4 = await firebase.set(
    "orders",
    null,
    {
      restaurantId: "c1ngXBmW6zXAoZJobCIJ",
      customerId: "d2PVb0H9xxgzo2GeNzuubhyq6Xm1",
      status: "at restaurant",
      ETA: "To be determined",
      deliveryLocation: "IB 140",
      deliveryInstructions:
        "Make sure to knock on the door before coming in please.",
      items: [
        {
          itemId: "someId1",
          itemName: "Fries",
          quantity: 3,
          description: "They are the best",
          basePrice: 1.0,
          itemSections: [
            {
              sectionName: "Size",
              sectionOptions: [
                {
                  name: "Small",
                  price: 3
                }
              ]
            },
            {
              sectionName: "Color",
              sectionOptions: [
                {
                  name: "Yellow",
                  price: 0
                }
              ]
            }
          ]
        }
      ],
      costs: {
        food: 10,
        foodTax: 2,
        delivery: 3,
        deliveryTax: 1,
        tip: 2,
        total: 18
      },
      createdAt: Date.now()
    },
    "orderId"
  );

  c1ngXBmW6zXAoZJobCIJ;
  const order5 = await firebase.set(
    "orders",
    null,
    {
      restaurantId: "c1ngXBmW6zXAoZJobCIJ",
      customerId: "d2PVb0H9xxgzo2GeNzuubhyq6Xm1",
      status: "on way customer",
      ETA: "To be determined",
      deliveryLocation: "IB 140",
      deliveryInstructions:
        "Make sure to knock on the door before coming in please.",
      items: [
        {
          itemId: "someId1",
          itemName: "Fries",
          quantity: 3,
          description: "They are the best",
          basePrice: 1.0,
          itemSections: [
            {
              sectionName: "Size",
              sectionOptions: [
                {
                  name: "Small",
                  price: 3
                }
              ]
            },
            {
              sectionName: "Color",
              sectionOptions: [
                {
                  name: "Yellow",
                  price: 0
                }
              ]
            }
          ]
        }
      ],
      costs: {
        food: 10,
        foodTax: 2,
        delivery: 3,
        deliveryTax: 1,
        tip: 2,
        total: 18
      },
      createdAt: Date.now()
    },
    "orderId"
  );

  c1ngXBmW6zXAoZJobCIJ;
  const order6 = await firebase.set(
    "orders",
    null,
    {
      restaurantId: "c1ngXBmW6zXAoZJobCIJ",
      customerId: "d2PVb0H9xxgzo2GeNzuubhyq6Xm1",
      status: "delivered",
      ETA: "To be determined",
      deliveryLocation: "IB 140",
      deliveryInstructions:
        "Make sure to knock on the door before coming in please.",
      items: [
        {
          itemId: "someId1",
          itemName: "Fries",
          quantity: 3,
          description: "They are the best",
          basePrice: 1.0,
          itemSections: [
            {
              sectionName: "Size",
              sectionOptions: [
                {
                  name: "Small",
                  price: 3
                }
              ]
            },
            {
              sectionName: "Color",
              sectionOptions: [
                {
                  name: "Yellow",
                  price: 0
                }
              ]
            }
          ]
        }
      ],
      costs: {
        food: 10,
        foodTax: 2,
        delivery: 3,
        deliveryTax: 1,
        tip: 2,
        total: 18
      },
      createdAt: Date.now()
    },
    "orderId"
  );
  if (order1 && order2 && order3 && order4 && order5 && order6) {
    return true;
  }
};
