import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { staffAPI } from "../../services/api";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", credential: "", phone: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    const data = await staffAPI.getAll();
    setStaff(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await staffAPI.update(editId, formData);
    } else {
      await staffAPI.create(formData);
    }
    loadStaff();
    setFormData({ name: "", credential: "", phone: "" });
    setEditId(null);
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await staffAPI.delete(id);
    loadStaff();
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Staff Management</h2>
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          <i className="bi bi-plus-circle me-2"></i>Add Staff
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Credential</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.credential}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button className="btn btn-primary me-2" onClick={() => handleEdit(item)}>
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => {
                      if (window.confirm('Are you sure you want to delete this staff member?')) {
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
                <h5 className="modal-title">{editId ? "Edit" : "Add"} Staff</h5>
                <button className="btn-close" onClick={() => { setShowModal(false); setEditId(null); setFormData({ name: "", credential: "", phone: "" }); }}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">credential</label>
                    <input type="text" className="form-control" value={formData.credential} onChange={(e) => setFormData({ ...formData, credential: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => { setShowModal(false); setEditId(null); setFormData({ name: "", credential: "", phone: "" }); }}>Cancel</button>
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

export default Staff;
