import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { tablesAPI } from "../../services/api";

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ number: "", capacity: "", status: "Available" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    const data = await tablesAPI.getAll();
    setTables(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await tablesAPI.update(editId, formData);
    } else {
      await tablesAPI.create(formData);
    }
    loadTables();
    setFormData({ number: "", capacity: "", status: "Available" });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await tablesAPI.delete(id);
    loadTables();
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Table Management</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>Add Table
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Table Number</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((item) => (
                <tr key={item.id}>
                  <td>{item.number}</td>
                  <td>{item.capacity}</td>
                  <td><span className={`badge bg-${item.status === "Available" ? "success" : "danger"}`}>{item.status}</span></td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(item)}>
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this table?')) {
                        handleDelete(item.id);
                      }
                    }}>
                      <i className="bi bi-trash me-1"></i>Delete
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
                <h5 className="modal-title">{editId ? "Edit" : "Add"} Table</h5>
                <button className="btn-close" onClick={() => { setShowModal(false); setEditId(null); setFormData({ number: "", capacity: "", status: "Available" }); }}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Table Number</label>
                    <input type="text" className="form-control" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Capacity</label>
                    <input type="number" className="form-control" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setEditId(null); setFormData({ number: "", capacity: "", status: "Available" }); }}>Cancel</button>
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

export default Tables;
