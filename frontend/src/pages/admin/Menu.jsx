import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { menuAPI } from "../../services/api";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", price: "", complementary: "", addOns: [], image: "" });
  const [addOnInput, setAddOnInput] = useState({ name: "", price: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editId, setEditId] = useState(null);

  const loadMenu = async () => {
    const data = await menuAPI.getAll();
    setMenu(data);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await menuAPI.update(editId, formData);
    } else {
      await menuAPI.create(formData);
    }
    loadMenu();
    setFormData({ name: "", category: "", price: "", complementary: "", addOns: [], image: "" });
    setAddOnInput({ name: "", price: "" });
    setImageFile(null);
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setFormData({ ...item, addOns: item.addOns || [], image: item.image || "" });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, image: file.name });
    }
  };

  const addAddOn = () => {
    if (addOnInput.name.trim() && addOnInput.price) {
      setFormData({ ...formData, addOns: [...formData.addOns, { name: addOnInput.name.trim(), price: parseFloat(addOnInput.price) }] });
      setAddOnInput({ name: "", price: "" });
    }
  };

  const removeAddOn = (index) => {
    setFormData({ ...formData, addOns: formData.addOns.filter((_, i) => i !== index) });
  };

  const handleDelete = async (id) => {
    await menuAPI.delete(id);
    loadMenu();
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Menu Management</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>
          Add Item
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Add-ons</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.name}
                    {item.complementary && <span className="text-muted"> ({item.complementary})</span>}
                  </td>
                  <td>{item.category}</td>
                  <td>Rs.{item.price}</td>
                  <td>
                    {item.addOns && item.addOns.length > 0 && (
                      <div>

                        <div className="small text-muted">
                          {item.addOns.map((addon, i) => (
                            <div key={i}>{addon.name} (+Rs.{addon.price})</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)}>
                       <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                     <i className="bi bi-trash me-1"></i> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? "Edit" : "Add"} Menu Item</h5>
                <button className="btn-close" onClick={() => { setShowModal(false); setEditId(null); setFormData({ name: "", category: "", price: "", complementary: "", addOns: [], image: "" }); setAddOnInput({ name: "", price: "" }); setImageFile(null); }}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Item Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                      <option value="">Select Category</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Appetizer">Appetizer</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Beverage">Beverage</option>
                      <option value="Snacks">Snacks</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price (in Rs)</label>
                    <input type="number" step="0.01" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Complementary Item</label>
                    <input type="text" className="form-control" placeholder="e.g., French Fries" value={formData.complementary} onChange={(e) => setFormData({ ...formData, complementary: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                    {formData.image && <small className="text-muted d-block mt-1">Current: {formData.image}</small>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Add-ons</label>
                    <div className="row g-2 mb-2">
                      <div className="col-7">
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Add-on name" 
                          value={addOnInput.name} 
                          onChange={(e) => setAddOnInput({ ...addOnInput, name: e.target.value })} 
                        />
                      </div>
                      <div className="col-3">
                        <input 
                          type="number" 
                          className="form-control" 
                          placeholder="Price" 
                          value={addOnInput.price} 
                          onChange={(e) => setAddOnInput({ ...addOnInput, price: e.target.value })} 
                        />
                      </div>
                      <div className="col-2">
                        <button type="button" className="btn btn-success w-100" onClick={addAddOn}>
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {formData.addOns.map((addon, index) => (
                        <span key={index} className="badge bg-secondary">
                          {addon.name} (Rs.{addon.price})
                          <i className="bi bi-x ms-1" style={{ cursor: "pointer" }} onClick={() => removeAddOn(index)}></i>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setEditId(null); setFormData({ name: "", category: "", price: "", complementary: "", addOns: [], image: "" }); setAddOnInput({ name: "", price: "" }); setImageFile(null); }}>Cancel</button>
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Menu;
