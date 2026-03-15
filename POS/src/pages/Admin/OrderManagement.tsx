import React from "react";

const OrderManagement: React.FC = () => {
  const orders = [
    { id: 1, table: 3, items: "Burger, Fries", status: "preparing", total: 25.99 },
    { id: 2, table: 1, items: "Pizza, Salad", status: "ready", total: 32.50 },
    { id: 3, table: 5, items: "Pasta, Wine", status: "served", total: 28.75 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Table</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">#{order.id}</td>
                <td className="px-4 py-2">{order.table}</td>
                <td className="px-4 py-2">{order.items}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    order.status === "preparing" ? "bg-yellow-100 text-yellow-800" :
                    order.status === "ready" ? "bg-green-100 text-green-800" :
                    "bg-blue-100 text-blue-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-2">${order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;