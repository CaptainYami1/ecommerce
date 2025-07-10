import { useContext, } from "react";
import { ShopContext } from "../../../../context/shopContext";
import Input from "../../../reuseables/input";
import { CgCopy } from "react-icons/cg";
import { ToastContainer,toast, Bounce } from "react-toastify";
import { PiWarningDiamond } from "react-icons/pi";

const Crypto = () => {
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext not found");
  }
  const { selectedCrypto, setSelectedCrypto } = shopContext;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCrypto(e.target.value);
  };



  const getAddress = () => {
    if (selectedCrypto === "btc" || selectedCrypto === "usdt") {
      return "0x7d5533121657a9a133fecc124503d607f6acb7ea";
    } else if (selectedCrypto === "ton") {
      return "UQC7Menp2sFr3DoICloCQbpFXPcKd48SIo_dUIXOyN4tgGyR";
    }
    return "";
  };

  const handleCopy = () => {
    const address = getAddress();
    if (address) {
      navigator.clipboard.writeText(address);

      toast.success("Wallet Address Copied!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Bounce,
      });
    }
  };
  return (
    <div className="">
        <ToastContainer />
      <div className="mt-6 flex gap-6 items-center">
        <label htmlFor="cryptocurrency">Choose a cryptocurrency</label>
        <select
          onChange={handleChange}
          name="cryptocurrency"
          id="cryptocurrency"
          className="pr-3 border border-gray-800 rounded-xl pl-1 py-1"
        >
          <option value="btc">Bitcoin</option>
          <option value="usdt">Usdt</option>
          <option value="ton">Ton</option>
        </select>
      </div>

      <div className="lg:max-w-2/3 my-3">
        <Input
          icon={<CgCopy />}
          readOnly={true}
          placeholder={
            selectedCrypto === "btc"
              ? "0x7d5533121657a9a133fecc124503d607f6acb7ea"
              : selectedCrypto === "usdt"
              ? "0x7d5533121657a9a133fecc124503d607f6acb7ea"
              : selectedCrypto === "ton"
              ? "UQC7Menp2sFr3DoICloCQbpFXPcKd48SIo_dUIXOyN4tgGyR"
              : null
          }
          onClick={() => handleCopy()}
          btnClass="cursor-pointer"
        />
        <p className="text-gray-500 text-sm mt-2">
          Network:{" "}
          <span className="text-teal-600 font-semibold">
            {selectedCrypto === "ton"
              ? "TON(The Open Network)"
              : "BEP20(Binance Smart Chain)"}
          </span>
        </p>
      </div>
      <div className="p-2.5 flex bg-gray-200 dark:bg-gray-700 text-yellow-500 rounded-xl items-center mt-3 ">
       <p> <PiWarningDiamond /></p>
        <p className="p-2.5">
          Note that once payment has been made, your order would automatically
          start processing. But upon failure, u would be directed back to this
          page to re-initiate. Carefully copy the wallet address and send the
          exact amount to the address provided. If you send less than the exact
          amount, your order will not be processed. If you send more than the
          exact amount, the excess will not be refunded. And if you send to the
          wrong address, your funds will be lost and the company will not be
          liable for any loss.
        </p>
      </div>
    </div>
  );
};

export default Crypto;
