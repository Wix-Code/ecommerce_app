export const notifications = [
  {
    time: "Today",
    notify: [
      {
        title: "30% Special Discount!",
        note: "Special promotion only valid today.",
        icon: "percent",
        iconColor: "#FF6B00",
      },
      {
        title: "Your Order Has Been Shipped",
        note: "Your package is on the way.",
        icon: "box",
        iconColor: "#0066FF",
      },
    ],
  },
  {
    time: "Yesterday",
    notify: [
      {
        title: "New Arrival Alert!",
        note: "Check out our latest products.",
        icon: "bell",
        iconColor: "#00C853",
      },
    ],
  },
  {
    time: "This Week",
    notify: [
      {
        title: "Account Security Update",
        note: "Your password was changed successfully.",
        icon: "shield-check",
        iconColor: "#6200EA",
      },
    ],
  },
  {
    time: "June 7, 2023",
    notify: [
      {
        title: "Account Security Update",
        note: "Your password was changed successfully.",
        icon: "shield-check",
        iconColor: "#6200EA",
      },
    ],
  },
];

export const saved = [
  {
    id: 1,
    img: require("../assets/images/4.jpg"),
    price: 140,
    name: "Regular Fit Black Shirt",
    category: "shirts",
  },
  {
    id: 2,
    img: require("../assets/images/3.jpg"),
    price: 110,
    name: "Classic Running Shoes",
    category: "shoes",
  },
  {
    id: 3,
    img: require("../assets/images/5.jpg"),
    price: 170,
    name: "Slim Fit Denim Jeans",
    category: "jeans",
  },
  {
    id: 4,
    img: require("../assets/images/7.jpg"),
    price: 140,
    name: "Leather Jacket Brown",
    category: "jackets",
  },
  {
    id: 5,
    img: require("../assets/images/7.jpg"),
    price: 140,
    name: "Casual White Sneakers",
    category: "shoes",
  },
  {
    id: 6,
    img: require("../assets/images/1.jpg"),
    price: 160,
    name: "Cotton T-Shirt Blue",
    category: "shirts",
  },
  {
    id: 7,
    img: require("../assets/images/2.jpg"),
    price: 100,
    name: "Sports Watch Black",
    category: "accessories",
  },
  {
    id: 8,
    img: require("../assets/images/6.jpg"),
    price: 140,
    name: "Gym Shorts Gray",
    category: "sportswear",
  },
];

export const account = [
  {
    name: "My Order",
    acc: [
      {
        name: "My orders",
        icon: "box",
        iconColor: "#1A1A1A",
        route: "/orders",
      },
    ],
  },
  {
    name: "Details",
    acc: [
      {
        name: "My Details",
        icon: "user",
        iconColor: "#1A1A1A",
        route: "/my-details",
      },
      {
        name: "Address Book",
        icon: "location-dot",
        iconColor: "#1A1A1A",
        route: "/address-book",
      },
      {
        name: "Payment Method",
        icon: "credit-card",
        iconColor: "#1A1A1A",
        route: "/payment-method",
      },
      {
        name: "Notifications",
        icon: "bell",
        iconColor: "#1A1A1A",
        route: "/(tabs)/(home)/notifications",
      },
    ],
  },
  {
    name: "Help Center",
    acc: [
      {
        name: "FAQS",
        icon: "circle-question",
        iconColor: "#1A1A1A",
        route: "/faqs",
      },
      {
        name: "Help Center",
        icon: "headset",
        iconColor: "#1A1A1A",
        route: "/help-center",
      },
    ],
  },
];
