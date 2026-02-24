import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaffLayout from "../../components/staff/StaffLayout";
import "./TableCart.css";

const TableCart = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTables = localStorage.getItem("restaurant_tables");
    setTables(storedTables ? JSON.parse(storedTables) : []);
  }, []);

  const handleTableClick = (table) => {
    navigate(`/staff/table/${table.id}`);
  };

  return (
    <StaffLayout>
      <div className="table-cart-container">
        <h2 className="mb-4">Table Cart</h2>

        <div className="tables-section">
          <h5 className="mb-3">Select a Table</h5>
          <div className="tables-grid">
            {tables.map(table => (
              <div
                key={table.id}
                className={`table-card ${table.status === "Reserved" ? "reserved" : "available"}`}
                onClick={() => handleTableClick(table)}
              >
                <div className="table-number">{table.number}</div>
                <div className="table-capacity">
                  <i className="bi bi-people"></i> {table.capacity}
                </div>
                <div className={`table-status ${table.status.toLowerCase()}`}>
                  {table.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaffLayout>
  );
};

export default TableCart;
