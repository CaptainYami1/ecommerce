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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
