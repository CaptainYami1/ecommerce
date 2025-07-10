import Star_icon from "../../../../assets/star_icon.png";
import Star_dull from "../../../../assets/star_dull_icon.png";
import { useContext, useState } from "react";
import Description from "../productDisplay/description/description";
import Reviews from "../productDisplay/review/reviews";
import RelatedProducts from "./related products/RelatedProducts";
import { ShopContext } from "../../../../context/shopContext";

const ProductDisplay = (props: any) => {
  const [size, setSize] = useState("s");
  const [desandrev, setDesandrev] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(ShopContext)!;
  const { product } = props;
  const price = () => {
    if (size === "s") return product?.new_price * quantity;
    if (size === "m") return (product?.new_price+ 5000) * quantity ;
    if (size === "l") return (product?.new_price + 10000) * quantity;
    if (size === "xl") return (product?.new_price + 15000)* quantity ;
    if (size === "xxl") return (product?.new_price + 20000)* quantity ;
    return product?.new_price * quantity; // default case
  }
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Left Image Panel */}

          <div className="  rounded-lg  mb-4 flex ">
            <img src={product?.image} alt="" className="w-[440px] rounded-lg" />
            <div className="mx-2 rounded-lg">
              <img
                src={product?.image}
                alt=""
                className=" px-2 h-[120px] rounded-lg mb-[16px]"
              />
              <img
                src={product?.image}
                alt=""
                className=" px-2 h-[120px] rounded-lg mb-[16px]"
              />
              <img
                src={product?.image}
                alt=""
                className=" mb-[16px] flex-1 px-2 h-[120px] rounded-lg"
              />
              <img
                src={product?.image}
                alt=""
                className="flex-1 px-2 h-[120px] rounded-lg"
              />
            </div>
          </div>

          {/* Right Product Info */}
          <div className="md:flex-1 px-4">
            <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 dark:text-white text-2xl md:text-3xl">
              {product?.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              By{" "}
              <a href="#" className="text-teal-600 hover:underline">
                ABC Company
              </a>
            </p>

            <div className="flex items-center space-x-4 my-4">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-800 flex py-2 px-3">
                <span className="font-bold text-teal-600 text-3xl">
                  {price().toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Inclusive of all Taxes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[5px] text-base my-6">
              <img src={Star_icon} alt="" />
              <img src={Star_icon} alt="" />
              <img src={Star_icon} alt="" />
              <img src={Star_icon} alt="" />
              <img src={Star_dull} alt="" />
              <p className="px-[10px] text-[#1c1c1c] dark:text-[#b1b1b1] ">
                (407)
              </p>
            </div>

            <p className="text-gray-500 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              exercitationem porro saepe ea harum.
            </p>
            <div className="">
              <h1 className="mt-[25px] text-xl font-semibold text-[#656565] dark:text-[#d5d5d5]">
                Select Size
              </h1>
              <div className="flex gap-[15px] my-2.5">
                <div
                  onClick={() => setSize("s")}
                  className={
                    size === "s"
                      ? "py-3.5 px-3.5 text-white cursor-pointer rounded-sm border border-gray-400 bg-teal-600"
                      : "py-3.5 px-3.5 cursor-pointer rounded-sm border border-gray-400 bg-gray-100 hover:bg-gray-200"
                  }
                >
                  S
                </div>
                <div
                  onClick={() => setSize("m")}
                  className={
                    size === "m"
                      ? "py-3.5 px-3.5 text-white cursor-pointer rounded-sm border border-gray-400 bg-teal-600"
                      : "py-3.5 px-3.5 cursor-pointer rounded-sm border border-gray-400 bg-gray-100 hover:bg-gray-200"
                  }
                >
                  M
                </div>
                <div
                  onClick={() => setSize("l")}
                  className={
                    size === "l"
                      ? "py-3.5 px-3.5 text-white cursor-pointer rounded-sm border border-gray-400 bg-teal-600"
                      : "py-3.5 px-3.5 cursor-pointer rounded-sm border border-gray-400 bg-gray-100 hover:bg-gray-200"
                  }
                >
                  L
                </div>
                <div
                  onClick={() => setSize("xl")}
                  className={
                    size === "xl"
                      ? "py-3.5 px-3.5 text-white cursor-pointer rounded-sm border border-gray-400 bg-teal-600"
                      : "py-3.5 px-3.5 cursor-pointer rounded-sm border border-gray-400 bg-gray-100 hover:bg-gray-200"
                  }
                >
                  XL
                </div>
                <div
                  onClick={() => setSize("xxl")}
                  className={
                    size === "xxl"
                      ? "py-3.5 px-3.5 text-white cursor-pointer rounded-sm border border-gray-400 bg-teal-600"
                      : "py-3.5 px-3.5 cursor-pointer rounded-sm border border-gray-400 bg-gray-100 hover:bg-gray-200"
                  }
                >
                  XXL
                </div>
              </div>
            </div>
            <div className="flex py-4 space-x-4">
              <div className="relative">
                <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 dark:text-gray-500 tracking-wide font-semibold">
                  Qty
                </div>
                <select
                  aria-label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="cursor-pointer appearance-none rounded-xl border border-gray-200 dark:border-gray-600 pl-4 pr-8 h-14 flex items-end pb-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                >
                  {[1, 2, 3, 4, 5].map((qty) => (
                    <option key={qty}>{qty}</option>
                  ))}
                </select>
                <svg
                  className="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
              </div>

              <button
                type="button"
                className="h-14 px-6 py-2 font-semibold rounded-xl bg-teal-600 hover:bg-teal-500 text-white"
                onClick={() => {
                  addToCart(product, quantity, price(), size);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center font-semibold mt-8 dark:text-white -mx-4 gap-4 border-b border-gray-200 dark:border-gray-700 ">
          <h1
            onClick={() => setDesandrev("description")}
            className={
              desandrev === "description"
                ? "border-b border-teal-600 pb-4 px-4 cursor-pointer"
                : "pb-4 px-4 cursor-pointer"
            }
          >
            Description
          </h1>
          <h1
            onClick={() => setDesandrev("review")}
            className={
              desandrev === "review"
                ? "border-b border-teal-600 pb-4 px-4 cursor-pointer"
                : "pb-4 px-4 cursor-pointer"
            }
          >
            Reviews
          </h1>
        </div>
        {desandrev === "description" ? (
          <Description />
        ) : (
          <Reviews image={product?.image} />
        )}

        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDisplay;
