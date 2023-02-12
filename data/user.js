export const user = {
  id: 1,
  fullName: "Filip Bjornson",
  email: "dbrobins@me.com",
  addressOne: "Lærerskolealleen 140",
  addressTwo: "",
  zip: "2408",
  city: "Elverum",
  country: "Norway",
  purchase: [
    {
      order: 1676106455627,
      status: "complete",
      date: "10-2-2023",
      games: [
        {
          id: 82,
          name: "The Witcher 3: Wild Hunt",
          price: {
            originalPrice: 49.99,
            purchasePrice: 34.99,
          },
        },
        {
          id: 75,
          name: "Cyberpunk 2077",
          price: {
            originalPrice: 59.99,
            purchasePrice: 59.99,
          },
        },
        {
          id: 68,
          name: "Ori and the Will of the Wisps",
          price: {
            originalPrice: 29.99,
            purchasePrice: 23.99,
          },
        },
      ],
    },
    {
      order: 1676106478049,
      status: "complete",
      date: "10-2-2023",
      games: [
        {
          id: 79,
          name: "Portal",
          price: {
            originalPrice: 9.99,
            purchasePrice: 4.99,
          },
        },
      ],
    },
    {
      order: 1676106492645,
      status: "complete",
      date: "10-2-2023",
      games: [
        {
          id: 87,
          name: "God of War",
          price: {
            originalPrice: 19.99,
            purchasePrice: 19.99,
          },
        },
      ],
    },
  ],
  sale: [
    {
      order: 1676106501530,
      status: "complete",
      date: "10-2-2023",
      id: 82,
      name: "The Witcher 3: Wild Hunt",
      price: {
        purchasePrice: 34.99,
        sellPrice: 5.24,
      },
    },
    {
      order: 1676106510847,
      status: "complete",
      date: "10-2-2023",
      id: 79,
      name: "Portal",
      price: {
        purchasePrice: 4.99,
        sellPrice: 0.74,
      },
    },
    {
      order: 1676106521648,
      status: "complete",
      date: "10-2-2023",
      id: 87,
      name: "God of War",
      price: {
        purchasePrice: 19.99,
        sellPrice: 2.99,
      },
    },
  ],
  ownedGames: [
    {
      id: 75,
      name: "Cyberpunk 2077",
      price: {
        originalPrice: 59.99,
        purchasePrice: 59.99,
      },
    },
    {
      id: 68,
      name: "Ori and the Will of the Wisps",
      price: {
        originalPrice: 29.99,
        purchasePrice: 23.99,
      },
    },
  ],
};
