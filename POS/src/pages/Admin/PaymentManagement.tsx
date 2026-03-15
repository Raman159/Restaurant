import React from "react";

const PaymentManagement: React.FC = () => {
  const payments = [
    { id: 1, order: 101, method: "Card", amount: 45.50, status: "completed" },
    { id: 2, order: 102, method: "Cash", amount: 32.25, status: "completed" },
    { id: 3, order: 103, method: "Card", amount: 28.75, status: "pending" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Payment ID</th>
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Method</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="px-4 py-2">#{payment.id}</td>
                <td className="px-4 py-2">#{payment.order}</td>
                <td className="px-4 py-2">{payment.method}</td>
                <td className="px-4 py-2">${payment.amount}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    payment.status === "completed" ? "bg-green-100 text-green-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;