import mongoose from "mongoose";
import { Product } from "./models/productModel.js";


export const seedProducts = [
  {
    productName: "Levi's Logo T-Shirt",
    productDesc: "Cotton casual t-shirt",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        public_id: "t1",
      },
    ],
    productPrice: 999,
    category: "T-Shirt",
    brand: "Levi's",
  },
  {
    productName: "Nike Sports T-Shirt",
    productDesc: "Breathable sports wear",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
        public_id: "t2",
      },
    ],
    productPrice: 1299,
    category: "T-Shirt",
    brand: "Nike",
  },
  {
    productName: "Adidas Casual T-Shirt",
    productDesc: "Comfort fit t-shirt",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f",
        public_id: "t3",
      },
    ],
    productPrice: 1199,
    category: "T-Shirt",
    brand: "Adidas",
  },
  {
    productName: "Arrow Formal Shirt",
    productDesc: "Slim fit office shirt",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
        public_id: "s1",
      },
    ],
    productPrice: 1599,
    category: "Shirt",
    brand: "Arrow",
  },
  {
    productName: "Raymond White Shirt",
    productDesc: "Premium formal shirt",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
        public_id: "s2",
      },
    ],
    productPrice: 1799,
    category: "Shirt",
    brand: "Raymond",
  },
  {
    productName: "Zara Casual Shirt",
    productDesc: "Trendy casual wear",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
        public_id: "s3",
      },
    ],
    productPrice: 1999,
    category: "Shirt",
    brand: "Zara",
  },
  {
    productName: "Levi's Slim Fit Jeans",
    productDesc: "Stretchable denim jeans",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
        public_id: "j1",
      },
    ],
    productPrice: 2499,
    category: "Jeans",
    brand: "Levi's",
  },
  {
    productName: "Wrangler Regular Jeans",
    productDesc: "Classic blue denim",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1475178626620-a4d074967452",
        public_id: "j2",
      },
    ],
    productPrice: 2199,
    category: "Jeans",
    brand: "Wrangler",
  },
  {
    productName: "Lee Slim Jeans",
    productDesc: "Modern fit jeans",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1516822003754-cca485356ecb",
        public_id: "j3",
      },
    ],
    productPrice: 2299,
    category: "Jeans",
    brand: "Lee",
  },
  {
    productName: "Pepe Jeans Denim",
    productDesc: "Stylish denim jeans",
    productImg: [
      {
        url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
        public_id: "j4",
      },
    ],
    productPrice: 2599,
    category: "Jeans",
    brand: "Pepe Jeans",
  },
];

const monogo = "mongodb://henilp1508_db_user:ovTx5NlMPyzW9Fir@ac-fgksmx9-shard-00-00.qmhp5lq.mongodb.net:27017,ac-fgksmx9-shard-00-01.qmhp5lq.mongodb.net:27017,ac-fgksmx9-shard-00-02.qmhp5lq.mongodb.net:27017/?ssl=true&replicaSet=atlas-ykdwda-shard-0&authSource=admin&appName=Cluster0-e-commerce"

const seedDB = async () => {
  try {
    await mongoose.connect(monogo);

   
    await Product.insertMany(seedProducts);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();