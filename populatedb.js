require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/category");
const Desktop = require("./models/desktop");
const Headphone = require("./models/headphone");
const Keyboard = require("./models/keyboard");
const Laptop = require("./models/laptop");
const Mouse = require("./models/mouse");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

async function populateDatabase() {
  try {
    const desktopData = [
      {
        brand: "ASUS",
        model: "ASUS Model 1",
        description: "First ASUS desktop",
        price: 999.99,
        numberInStock: 10,
      },
      {
        brand: "ACER",
        model: "ACER Envy",
        description: "ACER's fastest desktop",
        price: 2039.99,
        numberInStock: 2,
      },
    ];
    await Desktop.insertMany(desktopData);

    const headphoneData = [
      {
        brand: "Sony",
        model: "Sony 1000X",
        description: "High-quality over-ear headphone",
        price: 150.99,
        numberInStock: 10,
      },
      {
        brand: "Apple",
        model: "Apple AirPod",
        description: "High-quality on-ear headphone",
        price: 100.99,
        numberInStock: 30,
      },
    ];
    await Headphone.insertMany(headphoneData);

    const keyboardData = [
      {
        brand: "Red Dragon",
        model: "MK51",
        description: "Blue-switch mechanical keyboard",
        price: 50.99,
        numberInStock: 30,
      },
      {
        brand: "Glorious",
        model: "Glorious MMK",
        description: "High-quality brown-switch mechanical keyboard",
        price: 150.99,
        numberInStock: 10,
      },
    ];
    await Keyboard.insertMany(keyboardData);

    const laptopData = [
      {
        brand: "Apple",
        model: "MacBook Pro",
        description: "Apple M2 MacBook Pro",
        price: 1500.99,
        numberInStock: 30,
      },
    ];
    await Laptop.insertMany(laptopData);

    const mouseData = [
      {
        brand: "Logitech",
        model: "Logitech G40",
        description: "Ergonomic gaming mouse",
        price: 49.99,
        numberInStock: 25,
      },
    ];
    await Mouse.insertMany(mouseData);

    const categoryData = [
      {
        name: "Desktops",
        description: "Desktop computers",
      },
      {
        name: "Headphones",
        description: "Headphones for audio enthusiasts",
      },
      {
        name: "Keyboards",
        description: "Mechanical keyboards for gaming",
      },
      {
        name: "Laptop",
        description: "Laptop computers",
      },
      {
        name: "Mouse",
        description: "Ergonomic gaming mouse",
      },
    ];
    await Category.insertMany(categoryData);

    console.log("Data has been populated successfully.");
    process.exit();
  } catch (error) {
    console.error("Error populating data:", error);
    process.exit(1);
  }
}

populateDatabase();
