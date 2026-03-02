import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

export default function AddStock() {
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    buyPrice: '',
    quantity: '',
    buyDate: '',
    targetPrice: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, 'users', user.uid, 'stocks'), {
      ...form,
      buyPrice: Number(form.buyPrice),
      quantity: Number(form.quantity),
      targetPrice: Number(form.targetPrice),
      currentPrice: 0,
      createdAt: serverTimestamp(),
    });

    setForm({
      name: '',
      symbol: '',
      buyPrice: '',
      quantity: '',
      buyDate: '',
      targetPrice: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form">
      <input
        name="name"
        placeholder="Stock Name"
        onChange={handleChange}
        value={form.name}
      />
      <input
        name="symbol"
        placeholder="Symbol (SBIN.NS)"
        onChange={handleChange}
        value={form.symbol}
      />
      <input
        name="buyPrice"
        type="number"
        placeholder="Buy Price"
        onChange={handleChange}
        value={form.buyPrice}
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
        value={form.quantity}
      />
      <input
        name="buyDate"
        type="date"
        onChange={handleChange}
        value={form.buyDate}
      />
      <input
        name="targetPrice"
        type="number"
        placeholder="Target Price"
        onChange={handleChange}
        value={form.targetPrice}
      />

      <button type="submit">Add Stock</button>
    </form>
  );
}
