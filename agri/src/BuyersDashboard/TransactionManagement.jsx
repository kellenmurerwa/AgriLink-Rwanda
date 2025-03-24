import { useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from "recharts";
import '../BuyersDashStyles/TransactionManagement.css'
const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([
    { _id: "1", product: { name: "Cassava" }, amount: 5000, status: "processed", date: "2025-03-01" },
    { _id: "2", product: { name: "Potatoes" }, amount: 10000, status: "pending", date: "2025-03-05" },
    { _id: "3", product: { name: "Beans" }, amount: 7500, status: "processed", date: "2025-03-10" },
  ]);

  const [totalSpent, setTotalSpent] = useState(22500);
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([
    { _id: "1", name: "Cassava", price: 5000, seller: { name: "Mukamana" }, location: "Kigali" },
    { _id: "2", name: "Potatoes", price: 10000, seller: { name: "Ineza" }, location: "Huye" },
    { _id: "3", name: "Beans", price: 7500, seller: { name: "Mugisha" }, location: "Musanze" },
    { _id: "4", name: "Maize", price: 6000, seller: { name: "Mukamana" }, location: "Rwamagana" },
    { _id: "5", name: "Rice", price: 12000, seller: { name: "Ineza" }, location: "Gisenyi" },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("momo");

  // Handle search query and filter products
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add product to the shopping list
  const addToCart = (product) => {
    setSelectedItems([...selectedItems, product]);
  };

  // Handle payment status
  const getPaymentStatus = (status) => {
    return status === "pending" ? "Pending" : "Processed";
  };

  // Prepare data for the graph (overview of purchases over time)
  const chartData = transactions.map((tx) => ({
    date: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount,
  }));

  // Handle transaction submission
  const handleTransaction = () => {
    alert(`Transaction submitted! Payment method: ${paymentMethod}`);
    // Here, you would implement logic to store the transaction, send it to the backend, etc.
  };

  return (
    <div className="dashboard-container">
      <h2>Transactions</h2>
      <h3>Total Spent: RWF {totalSpent}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      
      

      <div className="product-search">
        <input
          type="text"
          placeholder="Search for products (e.g., cassava, potatoes)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product._id}>
              <div>
                <h4>{product.name}</h4>
                <p>Price: RWF {product.price}</p>
                <p>Seller: {product.seller?.name || "Unknown"}</p>
                <p>Location: {product.location}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h3>Items in Your Cart</h3>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>
            {item.name} - RWF {item.price}
          </li>
        ))}
      </ul>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id}>
              <td>{tx.product?.name || "N/A"}</td>
              <td>RWF {tx.amount}</td>
              <td>{getPaymentStatus(tx.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Payment Method Selection */}
      <div className="payment-method">
        <h3>Select Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="momo">Momo Code</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      <button onClick={handleTransaction} className="submit-btn">
        Submit Transaction
      </button>
    </div>
  );
};

export default TransactionManagement;
