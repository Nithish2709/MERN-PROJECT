
export const API="https://mern-project-1-qxri.onrender.com";




import usb from "../assets/usb.png"
import laptop from "../assets/laptop.jpeg"
import phone from "../assets/phone.jpeg"
import headset from "../assets/headset.jpeg"
import keyboard from "../assets/keyboard.jpeg"
import mouse from "../assets/mouse.jpg"
import smartwatch from "../assets/smartwatch.jpeg"
import speaker from "../assets/blue speaker.jpeg"
import monitor from "../assets/monitor.jpg"
import pendrive from "../assets/download.jpeg"


export const products = [
  {
    id: 1,
    name: "Laptop",
    price: 45000,
    image: laptop,
    description: "Powerful laptop suitable for work and gaming."
  },
  {
    id: 2,
    name: "Smartphone",
    price: 20000,
    image: phone,
    description: "Latest 5G smartphone with high performance."
  },
  {
    id: 3,
    name: "Headphones",
    price: 1500,
    image: headset,
    description: "Wireless headphones with noise cancellation."
  },
  {
    id: 4,
    name: "Keyboard",
    price: 800,
    image: keyboard,
    description: "Mechanical keyboard with RGB lighting."
  },
  {
    id: 5,
    name: "Mouse",
    price: 500,
    image: mouse,
    description: "Ergonomic wireless mouse with silent clicks."
  },
  {
    id: 6,
    name: "Smartwatch",
    price: 3500,
    image: smartwatch,
    description: "Fitness smartwatch with heart rate monitor."
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 2000,
    image: speaker,
    description: "Portable Bluetooth speaker with deep bass."
  },
  {
    id: 8,
    name: "Monitor",
    price: 7000,
    image: monitor,
    description: "24-inch Full HD monitor for work and gaming."
  },
  {
    id: 9,
    name: "USB Cable",
    price: 150,
    image: usb,
    description: "Durable fast-charging USB cable."
  },
  {
    id: 10,
    name: "Pendrive 32GB",
    price: 450,
    image: pendrive,
    description: "High-speed 32GB USB 3.0 pendrive."
  }
];
