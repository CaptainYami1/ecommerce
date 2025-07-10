import { useState } from "react";
import Input from "../../../reuseables/input";
import { PiWarningDiamond } from "react-icons/pi";

const Paypal = () => {
  const [paypal, setPaypal] = useState("");
  const [touched, setTouched] = useState(false);

  const isValidEmail = (paypal: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypal);

  const isValid = isValidEmail(paypal);
  const showError = touched && !isValid;

  const handleBlur = () => {
    setTouched(true);
  };
  return (
    <div className="mt-6 ">
        
      <label className="">Enter paypal email</label>
      <div className="mt-2.5"></div>
      <Input
        name="paypal"
        type="paypal"
        value={paypal}
        onChange={(e: any) => setPaypal(e.target.value)}
        placeholder="Please input paypal email"
        onBlur={handleBlur}
    
      />
      {showError && <p className="my-2 text-red-500">Please enter a valid email</p>}
      <div className="p-2.5 flex bg-gray-200 dark:bg-gray-700 text-yellow-500 rounded-xl items-center mt-3 ">
        <p><PiWarningDiamond /></p> <p className="p-2.5">Note that once payment has been made, your order would automatically start processing. But upon failure, u would be directed back to this page to re-initiate.</p>
      </div>
      
    </div>
  );
};

export default Paypal;
