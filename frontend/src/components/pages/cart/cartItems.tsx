import { useContext } from "react";
import { ShopContext } from "../../../context/shopContext";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CartItems = () => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    clearCart,
    updateQuantity,
    getUnitPrice,
  } = useContext(ShopContext)!;

  const realPrice = (product: any, cartItem: any) => {
    const unitPrice = getUnitPrice(product, cartItem.size);
    return unitPrice * cartItem.quantity!;
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const taxAmount = totalPrice * 0.075;
  const deliveryAmount = totalPrice < 100000 ? 3500 : 5000;
  const tax = taxAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const delivery = deliveryAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "NGN",
  });
  const totalAmount = totalPrice + taxAmount + deliveryAmount;

  return (
    <div className="min-h-screen">
      <div className="flex justify-between mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-teal-600 sm:text-2xl">
          Shopping Cart
        </h2>
        <button
          onClick={clearCart}
          className="text-sm text-red-500  hover:text-red-700 border-1 rounded-md px-1.5 border-red-500 hover:border-red-700 transition-colors duration-300"
        >
          Clear Cart
        </button>
      </div>
      <hr className="my-4 border-gray-200 dark:border-gray-700  mx-auto max-w-screen-xl " />

      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 overflow-x-auto">
        {cartItems.map((cartItem) => {
          const product = all_product.find((p) => p.id === cartItem.id);
          if (!product) return null;
          {
            return (
              <div className="">
                <div key={`${cartItem.id}-${cartItem.size}`}>
                  <div className="flex items-center justify-between w-full  gap-4 my-5">
                    <div className="flex items-center gap-7">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />

                      <h3 className="text-lg font-semibold dark:text-white w-[300px]">
                        {product.name}
                      </h3>
                    </div>

                    <div className="dark:text-white">
                      Size:{" "}
                      <span className="font-semibold">
                        {cartItem.size?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-3.5 text-md text-gray-600 dark:text-gray-300 ">
                      <span
                        className="text-lg"
                        onClick={() =>
                          cartItem.quantity! > 1 &&
                          updateQuantity(cartItem.id, cartItem.quantity! - 1)
                        }
                      >
                        <IoRemoveCircleOutline />
                      </span>{" "}
                      {cartItem.quantity}{" "}
                      <span
                        className="text-lg"
                        onClick={() =>
                          updateQuantity(cartItem.id, cartItem.quantity! + 1)
                        }
                      >
                        <IoAddCircleOutline />
                      </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {realPrice(product, cartItem).toLocaleString("en-US", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </p>

                    <div
                      onClick={() =>
                        removeFromCart(cartItem.id, cartItem.size!)
                      }
                      className="text-red-600 hover:text-red-800 text-xl cursor-pointer"
                    >
                      <RiDeleteBin6Line />
                    </div>
                  </div>
                </div>
                <hr className="w-full border-gray-200 dark:border-gray-700" />
              </div>
            );
          }

          return null;
        })}
      </div>
      <div className=" mx-auto max-w-screen-xl px-4 2xl:px-0">
        {cartItems.length > 0 ? (
          <div className="dark:text-white ">
            <h1 className="my-5 text-xl font-bold">Order Summary</h1>
            <div className="text-lg">
              <div className="flex justify-between items-center mb-2 ">
                <h2>Items Amount</h2>
                <p>
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </p>
              </div>
              <div className="flex justify-between items-center my-2 ">
                <h2>Discount</h2>
                <p>
                  {(0).toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </p>
              </div>
              <div className="flex justify-between items-center my-2 ">
                <h2>Tax</h2>
                <p>{tax}</p>
              </div>
              <div className="">
                <div className="flex justify-between items-center mt-2 ">
                  <h2>Delivery Fee</h2>
                  <p>{delivery}</p>
                </div>
                <p className="text-sm">
                  <span className="text-red-500">Note: </span> Delivery fee may
                  change based on location.
                </p>
              </div>
              <hr className="w-full border-gray-200 dark:border-gray-700" />
              <div className="flex justify-between items-center mt-4 text-xl font-bold">
                <h2>Total Amount</h2>
                <p>
                  {totalAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}
                </p>
              </div>
            </div>
            <Link to="/checkout">
              {" "}
              <div className="flex justify-center items-center my-[30px] mx-auto  px-10 py-3 bg-teal-600 border border-teal-600 border-solid rounded-[40px] cursor-pointer hover:bg-teal-800  transition-colors duration-300 font-bold text-[18px] text-white">
                <button>Proceed to Checkout</button>
              </div>
            </Link>
            <Link to="/">
              <div className="flex justify-center gap-1.5 items-center my-[30px] mx-auto  px-10 py-3 text-teal-600 border border-teal-600 border-solid rounded-[40px] cursor-pointer hover:bg-teal-600 hover:text-white transition-colors duration-300 font-bold text-[18px]">
                <div className="text-3xl font-bold">
                  <IoArrowBackCircleOutline />
                </div>{" "}
                <button> Back to Shopping</button>
              </div>
            </Link>
          </div>
        ) : (
          <div className=" dark:text-white items-center justify-items-center place-content-center w-full h-150 ">
            <h1 className="font-semibold text-xl">Your cart is empty.</h1>
            <p className="my-2 text-gray-400">
              Continue shopping to explore more
            </p>
            <Link to="/">
              <button className="py-2.5 px-5 bg-teal-600 hover:bg-transparent border border-teal-600 border-solid rounded-[40px] cursor-pointer transition-colors duration-300 text-white hover:text-teal-600">
                Explore products
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
