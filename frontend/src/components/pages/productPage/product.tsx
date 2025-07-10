import { useContext } from "react";
import { ShopContext } from "../../../context/shopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "./breadcrum/breadcrum";
import ProductDisplay from "./productDisplay/productdisplay";

const Product = () => {
  const { all_product } = useContext(ShopContext)!;

  const { productId } = useParams();

  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
