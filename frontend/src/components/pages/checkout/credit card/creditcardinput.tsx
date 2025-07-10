import { useState } from "react";
import Input from "../../../reuseables/input";
import mastercard from "../../../../assets/mastercard-credit-card-payment-method-19676.svg"
import visa from "../../../../assets/visa-credit-card-payment-method-19674.svg"
import americanexpress from "../../../../assets/american-express-credit-card-payment-method-19678.svg"
import discovery from "../../../../assets/discover-credit-card-payment-method-19686.svg"
import defcard from "../../../../assets/credit-card-6379.svg"

const Creditcard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [cardType, setCardType] = useState('');
  const [expiry, setExpiry] = useState("");
const [cvc, setCvc] = useState("");
const [expiryError, setExpiryError] = useState("");
const [cvcError, setCvcError] = useState("");


  const formatCardNumber = (value: any) => {
    const digitsOnly = value.replace(/\D/g, "");
    const chunks = digitsOnly.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : "";
  };

  const handleChange = (e: any) => {
    const input = e.target.value;
    const formatted = formatCardNumber(input);
    setCardNumber(formatted);

    // Run Luhn check when enough digits
    const raw = formatted.replace(/\s/g, "");
    detectCardType(raw);
    if (raw.length >= 12) {
      setIsValid(luhnCheck(raw));
    } else {
      setIsValid(null);
    }
    
  };

  const luhnCheck = (num: any) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = num.length - 1; i >= 0; i--) {
      let digit = parseInt(num[i]);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;

    
  };

const detectCardType = (number:any) => {
    if (/^4/.test(number)) {
      setCardType('Visa');
    } else if (/^5[1-5]/.test(number) || /^2(2[2-9]|[3-6]|7[01])/.test(number)) {
      setCardType('MasterCard');
    } else if (/^(5060|5061|5078|6500|6502)/.test(number)) {
      setCardType('Verve');
    } else if (/^3[47]/.test(number)) {
      setCardType('American Express');
    } else if (/^6(011|5|4|22)/.test(number)) {
      setCardType('Discover');
    } else {
      setCardType('');
    }
  };


  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.replace(/\D/g, "");

  if (value.length >= 3) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }

  setExpiry(value);

  // Basic validation
  if (value.length === 5) {
    const [monthStr, yearStr] = value.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (month < 1 || month > 12) {
      setExpiryError("Invalid month");
    } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setExpiryError("Expired card");
    } else {
      setExpiryError("");
    }
  } else {
    setExpiryError("");
  }
};


const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.replace(/\D/g, "");

  // AmEx has 4-digit CVC; others usually 3
  const maxLength = cardType === "American Express" ? 4 : 3;

  if (value.length <= maxLength) {
    setCvc(value);
    setCvcError("");
  }

  if (value.length > 0 && value.length < maxLength) {
    setCvcError("Incomplete CVC");
  } else {
    setCvcError("");
  }
};

  return (
    <div style={{ maxWidth: 320 }}>
      <label style={{ display: "block", marginBottom: 4 }} className="mb-2">
        Credit Card Number
      </label>
      <Input
        value={cardNumber}
        onChange={handleChange}
        placeholder="1234 5678 9012 3456"
        maxLength={23}
        icon={
          cardType === "MasterCard"
            ?  <img src={mastercard} alt="mastercard" width={24}/>
            : cardType === "Visa"
            ?  <img src={visa} alt="visa" width={24}/>
            : cardType === "American Express"
            ?  <img src={americanexpress} alt="americanexpress" width={24}/>
            : cardType === "Discover"
            ? <img src={discovery} alt="discovery" width={24}/>
            : cardType === "Verve"
            ? <img alt="verve" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnVGAAS7O_98j1dM352hgCVB80myT39DxDzQ&s" width={24}/>
            :  <img src={defcard} alt="defcard" width={24}/>
        }
      />

      {isValid !== null && (
        <p style={{ color: isValid ? "green" : "red", marginTop: 6 }}>
          {isValid ? "Valid card number ✅" : "Invalid card number ❌"}
        </p>
      )}

      <div className="flex justify-between my-2.5">
        <div className="w-[45%]">
          <label htmlFor="expiration">Expiration</label>
          <Input placeholder="MM/YY" onChange={handleExpiryChange} value={expiry} maxLength={5}/>
          {expiryError && (
          <p  className="mt-2 text-red-500">{expiryError}</p>
  )}
        </div>
        
        <div className="w-[45%]">
          <label htmlFor="cvc">Cvc</label>
          <Input placeholder="123" onChange={handleCvcChange} value={cvc} maxLength={cardType === "American Express" ? 4 : 3}/>
          {expiryError && (
          <p  className="mt-2 text-red-500">{cvcError}</p>
  )}
        </div>
      </div>
    </div>
  );
};

export default Creditcard;
