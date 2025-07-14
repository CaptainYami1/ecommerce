import { useState, useEffect, useRef, useContext } from "react";
import { IoChevronBack } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { HiMiniShoppingBag } from "react-icons/hi2";
import Input from "../../reuseables/input";
import paypal from "../../../assets/paypal-credit-card-payment-method-19675.svg";
import card from "../../../assets/credit-card-6379.svg";
import crypto from "../../../assets/bitcoin-payment-method-19677.svg";
import Creditcard from "./credit card/creditcardinput";
import OrderSummary from "./order summary/ordersummary";
import Paypal from "./paypal/paypal";
import Crypto from "./crypto payment/crypto";
import useCrypto from "../../../hooks/useCrypto";
import { ShopContext } from "../../../context/shopContext";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";


const Checkout = () => {
  const [delivery, setDelivery] = useState(() => {
    const stored = localStorage.getItem("delivery");
    return stored && stored !== "undefined" ? JSON.parse(stored) : "";
  });

  useEffect(() => {
    if (delivery) {
      localStorage.setItem("delivery", JSON.stringify(delivery));
    }
  }, [delivery]);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("Click edit to change");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Focus input when switching to edit mode
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const [payment, setPayment] = useState("card");
  const [orderTotal, setOrderTotal] = useState(0);

  const { btcprice, tether, ton } = useCrypto();
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext not found");
  }
  const { selectedCrypto } = shopContext;

  const finalPrice = () => {
    if (selectedCrypto === "btc" && btcprice != null && tether != null) {
      return `${(orderTotal / (btcprice * (tether - 100))).toFixed(6)} btc`;
    } else if (selectedCrypto === "usdt" && tether != null) {
      return `${(orderTotal / (tether-100)).toFixed(2)} usdt`;
    } else if (selectedCrypto === "ton" && ton != null && tether != null) {
      return `${(orderTotal / (ton * (tether - 100))).toFixed(2)} ton`
    }else return null;
  }
const dispatch = useDispatch()
  const confirmation = ()=>{
    if (delivery === "") {
      toast.error("Please select a delivery option");
    }else{
      dispatch
    }
  }

  return (
    <div className="xl:grid xl:grid-cols-3 xl:gap-3 xl:px-10 sm:px-6 lg:px-8 mx-auto max-w-screen-2xl">
      
      <div className="col-span-2 p-8 dark:text-white mx-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.25)] h-fit">
        <ToastContainer position="top-right" autoClose={4000} theme="colored" />
        <button className="flex items-center gap-2 text-lg mb-6">
          <IoChevronBack /> Back
        </button>
        <div className="">
          <div
            className={
              delivery === "express"
                ? "flex items-center gap-3 text-lg border rounded-md p-2 my-2.5 bg-teal-50 dark:bg-teal-900 border-teal-600"
                : "flex items-center gap-3 text-lg border rounded-md p-2 my-2.5 border-gray-300 border-b"
            }
            onClick={() => setDelivery("express")}
          >
            <input
              type="radio"
              name="express-delivery"
              id="express-delivery"
              className="accent-teal-600 bg-transparent"
              onChange={() => setDelivery("express")}
              checked={delivery === "express"}
              title="Express Delivery"
            />
            <label
              htmlFor="express-delivery"
              className="flex items-center gap-2 cursor-pointer"
            >
              <TbTruckDelivery className="text-teal-600" />
              <h3>Get it delivered in 2 days</h3>
            </label>
          </div>

          <div
            className={
              delivery === "noexpress"
                ? "flex items-center gap-3 text-lg border rounded-md p-2 my-2.5 bg-teal-50 dark:bg-teal-900 border-teal-600"
                : "flex items-center gap-3 text-lg border rounded-md p-2 my-2.5 border-gray-300 border-b"
            }
            onClick={() => setDelivery("noexpress")}
          >
            <input
              type="radio"
              name="express-delivery"
              id="noexpress-delivery"
              onChange={() => setDelivery("noexpress")}
              className="accent-teal-600"
              checked={delivery === "noexpress"}
              title="Pickup at Store"
            />
            <label
              htmlFor="noexpress-delivery"
              className="flex items-center gap-2 cursor-pointer"
            >
              <HiMiniShoppingBag className="text-teal-600" />
              <h3>Pickup available at nearest store</h3>
            </label>
          </div>

          <div className={delivery === "express" ? "my-6" : "hidden"}>
            <h3 className="text-gray-500 my-2">Shipping address</h3>
            <div className="max-w-3/4">
              <Input
                btnClass="cursor-pointer bg-transparent"
                icon="✏️"
                ref={inputRef}
                value={value}
                readOnly={!isEditing}
                onChange={(e: any) => setValue(e.target.value)}
                onClick={toggleEdit}
              />
            </div>
          </div>

          <div className="xl:hidden mb-6">
            <OrderSummary delivery={delivery} setOrderTotal={setOrderTotal} />
          </div>

          <div className="">
            <h3 className="text-lg font-semibold mt-2">Payment information</h3>
            <div className="">
              <button
                title="Pay with Card"
                onClick={() => setPayment("card")}
                className={
                  payment === "card"
                    ? "border-4 border-teal-600 w-20 px-2 rounded-xl mr-2 bg-teal-100 dark:bg-teal-950"
                    : "w-20 px-2 mr-2"
                }
              >
                <img src={card} alt="Credit Card" />
              </button>
              <button
                title="Pay with PayPal"
                onClick={() => setPayment("paypal")}
                className={
                  payment === "paypal"
                    ? "border-4 border-teal-600 w-20 px-2 rounded-xl mr-2 bg-teal-100 dark:bg-teal-950"
                    : "w-20 px-2 mr-2"
                }
              >
                <img src={paypal} alt="PayPal" />
              </button>
              <button
                title="Pay with Crypto"
                onClick={() => setPayment("crypto")}
                className={
                  payment === "crypto"
                    ? "border-4 border-teal-600 w-20 px-2 rounded-xl mr-2 bg-teal-100 dark:bg-teal-950"
                    : "w-20 px-2 mr-2"
                }
              >
                <img src={crypto} alt="Cryptocurrency" />
              </button>
            </div>
            {payment === "card" ? (
              <div>
                <div className="max-w-96 my-4">
                  <h4 className="mb-2">Name on card</h4>
                  <Input
                    placeholder="Please enter name on card"
                    onChange={(e: any) => setValue(e.target.value)}
                  />
                </div>
                <Creditcard />
              </div>
            ) : payment === "paypal" ? (
              <div className="">
                <Paypal />
              </div>
            ) : payment === "crypto" ? (
              <div className="">
                <Crypto />
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex gap-5 mt-10">
          <button className="border border-gray-500 rounded-xl px-5 py-2 cursor-pointer">
            Back
          </button>
          <button className="rounded-xl px-5 py-2 cursor-pointer bg-teal-600 hover:bg-teal-400 text-white" onClick={confirmation}> 
            Confirm Payment{" "}
             {payment === "crypto"
               ? finalPrice()
               : orderTotal.toLocaleString("en-NG", {
                   style: "currency",
                   currency: "NGN",
                 })}
          </button>
        </div>
      </div>

      <div className="hidden xl:block xl:p-8 xl:dark:text-white xl:mx-2.5 xl:bg-gray-100 xl:dark:bg-gray-800 xl:rounded-xl xl:shadow-[0_2px_5px_rgba(0,0,0,0.25)] xl:h-fit">
        <OrderSummary delivery={delivery} setOrderTotal={setOrderTotal} />
      </div>
    </div>
  );
};

export default Checkout;
