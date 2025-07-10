import { useEffect, useState } from "react";
import axios from "axios";

const useCrypto = () => {
  const [btcprice, setBtcPrice] = useState<number | null>(null);
  const [tether, setTether] = useState<number | null>(null);
  const [ton, setTon] = useState<number | null>(null);
 

  useEffect(() => {
    const fetchCryptoPrice = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
        );
        const data = await res.json();
        setBtcPrice(data?.bitcoin?.usd ?? null);
      } catch (err) {
        console.error("Error fetching crypto price:", err);
        setBtcPrice(null);
      }
    };

    fetchCryptoPrice();
  }, []);

  useEffect(() => {
    const fetchUSDT = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=ngn"
        );
        const data = await res.json();
        setTether(data?.tether?.ngn ?? null);
      } catch (error) {
        console.error("Failed to fetch USDT price:", error);
      }
    };

    fetchUSDT();
  }, []);

  useEffect(() => {
    const fetchTON = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd"
        );

        setTon(res.data?.["the-open-network"]?.usd ?? null);
      } catch (error) {
        console.error("Failed to fetch USDT price:", error);
      }
    };

    fetchTON();
  }, []);
  return {
    btcprice,
    tether,
    ton,
    
  };
};

export default useCrypto;
