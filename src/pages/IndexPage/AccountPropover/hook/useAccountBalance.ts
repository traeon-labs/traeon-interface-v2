import axios from "axios";
import { useEffect, useState } from "react";
// import TonWeb from "tonweb";

// const tonweb = new TonWeb(); // Initialize TonWeb

// Define the hook with the wallet address as an argument
export function useTonBalance(walletAddress: string) {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!walletAddress) return;
      setLoading(true);
      setError(null);

      try {
        // Fetch balance in nanocoins (1 TON = 1e9 nanocoins)
        const res = await axios.get(`https://toncenter.com/api/v3/accountStates?address=${walletAddress}&include_boc=true`)
        const balanceTon = res.data[0]?.balance ? res.data[0]?.balance / 1e9 : 0.21; // Convert to TON
        setBalance(balanceTon);
      } catch (err) {
        setError("Failed to fetch balance.");
        console.error("Error fetching balance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [walletAddress]);

  return { balance, loading, error };
}
