import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

export default function StockList() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, 'users', user.uid, 'stocks');
    const unsub = onSnapshot(ref, (snap) => {
      setStocks(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <table className="stock-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Buy</th>
          <th>Current</th>
          <th>Invested</th>
          <th>P/L</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => {
          const investedAmount = stock.quantity * stock.buyPrice;
          const currentValue = stock.quantity * stock.currentPrice;
          const profitLoss = currentValue - investedAmount;
          const targetAchieved = stock.currentPrice >= stock.targetPrice;

          return (
            <tr
              key={stock.id}
              style={{ background: targetAchieved ? '#c8f7c5' : 'transparent' }}
            >
              <td>{stock.name}</td>
              <td>{stock.quantity}</td>
              <td>₹{stock.buyPrice}</td>
              <td>₹{stock.currentPrice}</td>
              <td>₹{investedAmount}</td>
              <td style={{ color: profitLoss >= 0 ? 'green' : 'red' }}>
                ₹{profitLoss}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
