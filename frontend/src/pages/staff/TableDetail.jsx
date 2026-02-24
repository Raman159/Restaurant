import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StaffLayout from "../../components/staff/StaffLayout";
import "./TableDetail.css";

const TableDetail = () => {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState(null);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedTables = localStorage.getItem("restaurant_tables");
    const storedMenu = localStorage.getItem("restaurant_menu");
    const storedOrders = localStorage.getItem(`table_${tableId}_orders`);

    if (storedTables) {
      const tables = JSON.parse(storedTables);
      setTable(tables.find(t => t.id === parseInt(tableId)));
    }
    setMenu(storedMenu ? JSON.parse(storedMenu) : []);
    setOrders(storedOrders ? JSON.parse(storedOrders) : []);
  }, [tableId]);

  const addItemToTable = (menuItem) => {
    const existingItem = orders.find(item => item.id === menuItem.id);
    let newOrders;

    if (existingItem) {
      newOrders = orders.map(item =>
        item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newOrders = [...orders, { ...menuItem, quantity: 1, selectedAddOns: [] }];
    }

    setOrders(newOrders);
    localStorage.setItem(`table_${tableId}_orders`, JSON.stringify(newOrders));
    updateTableStatus("Reserved");
  };

  const updateTableStatus = (status) => {
    const storedTables = localStorage.getItem("restaurant_tables");
    if (storedTables) {
      const tables = JSON.parse(storedTables);
      const updatedTables = tables.map(t =>
        t.id === parseInt(tableId) ? { ...t, status } : t
      );
      localStorage.setItem("restaurant_tables", JSON.stringify(updatedTables));
      setTable(updatedTables.find(t => t.id === parseInt(tableId)));
    }
  };

  const toggleAddOn = (orderIndex, addon) => {
    const newOrders = [...orders];
    const item = newOrders[orderIndex];
    const addonIndex = item.selectedAddOns.findIndex(a => a.name === addon.name);

    if (addonIndex > -1) {
      item.selectedAddOns.splice(addonIndex, 1);
    } else {
      item.selectedAddOns.push(addon);
    }

    setOrders(newOrders);
    localStorage.setItem(`table_${tableId}_orders`, JSON.stringify(newOrders));
  };

  const updateQuantity = (orderIndex, change) => {
    const newOrders = [...orders];
    newOrders[orderIndex].quantity = Math.max(1, newOrders[orderIndex].quantity + change);
    setOrders(newOrders);
    localStorage.setItem(`table_${tableId}_orders`, JSON.stringify(newOrders));
  };

  const removeItem = (orderIndex) => {
    const newOrders = orders.filter((_, i) => i !== orderIndex);
    setOrders(newOrders);
    localStorage.setItem(`table_${tableId}_orders`, JSON.stringify(newOrders));

    if (newOrders.length === 0) {
      updateTableStatus("Available");
    }
  };

  const calculateTotal = () => {
    return orders.reduce((total, item) => {
      const addOnsTotal = item.selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
      return total + (item.price + addOnsTotal) * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    localStorage.removeItem(`table_${tableId}_orders`);
    setOrders([]);
    updateTableStatus("Available");
    navigate("/staff/table-cart");
  };

  const rightSidebarContent = orders.length > 0 && (
    <div className="calculator-panel">
      <div className="calculator-header">
        <h5>Order Summary</h5>
      </div>

      <div className="calculator-body">
        <div className="order-list">
          {orders.map((item, index) => (
            <div key={index} className="order-item">
              <div className="order-item-header">
                <strong>{item.name}</strong>
                <button className="btn-remove" onClick={() => removeItem(index)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>

              <div className="order-item-price">Rs.{item.price}</div>

              {item.addOns && item.addOns.length > 0 && (
                <div className="addons-section">
                  <small className="text-muted">Add-ons:</small>
                  {item.addOns.map((addon, i) => (
                    <label key={i} className="addon-checkbox">
                      <input
                        type="checkbox"
                        checked={item.selectedAddOns.some(a => a.name === addon.name)}
                        onChange={() => toggleAddOn(index, addon)}
                      />
                      <span>{addon.name} (+Rs.{addon.price})</span>
                    </label>
                  ))}
                </div>
              )}

              <div className="quantity-control">
                <button onClick={() => updateQuantity(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(index, 1)}>+</button>
              </div>

              <div className="item-subtotal">
                Subtotal: Rs.{((item.price + item.selectedAddOns.reduce((sum, a) => sum + a.price, 0)) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="calculator-footer">
        <div className="grand-total">
          <strong>Grand Total:</strong>
          <strong>Rs.{calculateTotal().toFixed(2)}</strong>
        </div>
        <button className="btn-checkout" onClick={handleCheckout}>
          <i className="bi bi-check-circle me-2"></i>
          Checkout
        </button>
      </div>
    </div>
  );

  if (!table) return null;

  return (
    <StaffLayout showRightSidebar={orders.length > 0} rightSidebarContent={rightSidebarContent}>
      <div className="table-detail-container">
        <div className="table-detail-header">
          <button className="btn-back" onClick={() => navigate("/staff/table-cart")}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Tables
          </button>
          <h2>Table {table.number}</h2>
          <div className={`table-status-badge ${table.status.toLowerCase()}`}>
            {table.status}
          </div>
        </div>

        <h4 className="mb-4">Menu Items</h4>
        <div className="menu-items-grid">
          {menu.map(item => (
            <div key={item.id} className="menu-card" onClick={() => addItemToTable(item)}>
              <div className="menu-card-image">
                {item.image ? (
                  <img src={`/images/${item.image}`} alt={item.name} />
                ) : (
                  <div className="no-image">
                    <i className="bi bi-image"></i>
                  </div>
                )}
                <div className="menu-card-overlay">
                  <h5>{item.name}</h5>
                  <p className="menu-card-category">{item.category}</p>
                  <div className="menu-card-price">Rs.{item.price}</div>
                  {item.addOns && item.addOns.length > 0 && (
                    <span className="menu-card-addons">Add-ons available</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaffLayout>
  );
};

export default TableDetail;
