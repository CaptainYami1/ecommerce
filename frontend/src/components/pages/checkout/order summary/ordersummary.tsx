import { useContext, useEffect } from "react";
import { ShopContext } from "../../../../context/shopContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import Input from "../../../reuseables/input";
import { BiSolidCoupon } from "react-icons/bi";

const OrderSummary = ({ delivery,setOrderTotal }:any) => {
  const {
    all_product,
    cartItems,
    removeFromCart,
    getUnitPrice,
  } = useContext(ShopContext)!;

  const realPrice = (product: any, cartItem: any) => {
    const unitPrice = getUnitPrice(product, cartItem.size);
    return unitPrice * cartItem.quantity!;
  };

const deliveryFee = delivery === "express" ? 5000 : 0;
const formattedDeliveryFee = deliveryFee.toLocaleString("en-Us", {
  style: "currency",
  currency: "NGN",
});

const discount =  0;
const formattedDiscount = discount.toLocaleString("en-Us", {
  style: "currency",
  currency: "NGN",
});

const total = cartItems.reduce((acc, item) => acc + item.price, 0)
const totalPrice = total + deliveryFee + discount;

const tax = totalPrice *0.075

const orderTotal = totalPrice + tax
useEffect(() => {
  setOrderTotal(orderTotal);
}, [orderTotal, setOrderTotal]);
  return (
    <div className="text-black dark:text-white">
      <h2 className="font-semibold text-lg">Order Summary</h2>
      <div className="">
        {cartItems.map((cartItem) => {
          const product = all_product.find((p) => p.id === cartItem.id);
          if (!product) return null;
          {
            return (
    
                <div key={`${cartItem.id}-${cartItem.size}`}>
                  <div className="flex items-center justify-between w-full  gap-4 my-5 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-7">
                      <p className="">x{cartItem.quantity}</p>

                      <h3 className="text-sm ">{product.name}</h3>
                    </div>

                    <div className="">
                      <span className="text-sm">
                        {cartItem.size?.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-7">
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
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl cursor-pointer"
                      >
                        <RiDeleteBin6Line />
                      </div>
                    </div>
                  </div>
                </div>
              
            );
          }
        })}
          <hr className="my-4 border-gray-300 dark:border-gray-700   w-full " />
          <div className="text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <h2>Delivery</h2>
           <p>{formattedDeliveryFee}</p>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <h2>Discount</h2>
           <p>{formattedDiscount}</p>
          </div>
          </div>

          <hr className="my-4 border-gray-300 dark:border-gray-700   w-full " />
           <div className="text-gray-600 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <h2>Total (exc tax)</h2>
           <p>{totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <h2>Tax</h2>
           <p>{tax.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
          </div>
          </div>
           <hr className="my-4 border-gray-200 dark:border-gray-800   w-full " />
           <div className="flex items-center justify-between font-semibold text-lg ">
            <h2>Order Total</h2>
           <p>{orderTotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "NGN",
                  })}</p>
          </div>
          <hr className="my-4 border-gray-300 dark:border-gray-700   w-full " />
          <div className="flex gap-2.5 w-full">
            <div className="flex items-center border border-gray-500 rounded-xl dark:border-white w-full">
            <BiSolidCoupon size={24} className="mx-1.5 text-gray-500"/>
            <Input placeholder="Coupon code"/>
            </div>
            <button type="button" className="py-1.5 px-2.5 border border-gray-500 rounded-xl dark:border-white w-fit">Apply</button>
          </div>
      </div>
    </div>
  );
};

export default OrderSummary;
