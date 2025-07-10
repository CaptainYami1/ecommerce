import p1_img from "../../../../../assets/p1_product_i1.png";
import p2_img from "../../../../../assets/p1_product_i2.png";
import p3_img from "../../../../../assets/p1_product_i3.png";
import p4_img from "../../../../../assets/p1_product_i4.png";
import type { Product } from "./types/types";

const data_product: Product[] = [
  {
    id: 1,
    name: "Product 1",
    image: p1_img,

    category: "women",
    new_price: 100000,
    old_price: 120000,
  },
  {
    id: 2,
    name: "Product 2",
    image: p2_img,
    category: "women",
    new_price: 200000,
    old_price: 220000,
  },
  {
    id: 3,
    name: "Product 3",
    image: p3_img,
    category: "women",
    new_price: 300000,
    old_price: 320000,
  },
  {
    id: 4,
    name: "Product 4",
    image: p4_img,
    category: "women",
    new_price: 400000,
    old_price: 420000,
  },
];

export default data_product;
