import React, { useState } from 'react';
import { Eye, Pencil, Plus, Trash2, User } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import ConfirmModal from '../components/Modals/ConfirmModal';
import FormModal from '../components/Modals/FormModal';
import ViewModal from '../components/Modals/ViewModal';
import { users as initialUsers } from '../data/libraryData';

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Member', status: 'Active' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setFormData({ name: '', email: '', role: 'Member', status: 'Active' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setIsEditModalOpen(true);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleAddUser = (event) => {
    event.preventDefault();
    const newUser = {
      id: `US-${String(users.length + 1).padStart(3, '0')}`,
      ...formData,
      joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
    };
    setUsers((current) => [...current, newUser]);
    setIsAddModalOpen(false);
  };

  const handleEditUser = (event) => {
    event.preventDefault();
    setUsers((current) => current.map((user) => (user.id === selectedUser.id ? { ...user, ...formData } : user)));
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = () => {
    setUsers((current) => current.filter((user) => user.id !== selectedUser.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <div>
          <h1 className="page-title">Users Management</h1>
          <p className="page-subtitle">Manage library members and staff accounts.</p>
        </div>
        <Button onClick={openAddModal}><Plus size={18} /> Add User</Button>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
        <div className="stat-card"><p>Total Users</p><div className="stat-value"><span>1,843</span><span className="stat-change">+45</span></div></div>
        <div className="stat-card"><p>Active Members</p><div className="stat-value"><span>1,621</span><span className="stat-change">88%</span></div></div>
        <div className="stat-card"><p>Librarians</p><div className="stat-value"><span>42</span><span className="stat-change">+3</span></div></div>
        <div className="stat-card"><p>Admins</p><div className="stat-value"><span>5</span><span className="stat-change">—</span></div></div>
      </div>

      <section className="panel">
        <div className="panel-header"><h2>User Accounts</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td><span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}><User size={14} /> {row.role}</span></td>
                  <td><span className={`pill ${row.status === 'Active' ? 'pill-success' : 'pill-muted'}`}>{row.status}</span></td>
                  <td>{row.joinDate}</td>
                  <td>
                    <div className="row-actions">
                      <button className="icon-button" onClick={() => openViewModal(row)} type="button"><Eye size={16} /></button>
                      <button className="icon-button" onClick={() => openEditModal(row)} type="button"><Pencil size={16} /></button>
                      <button className="icon-button" onClick={() => openDeleteModal(row)} type="button"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FormModal isOpen={isAddModalOpen} title="Add New User" onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddUser} submitText="Add User">
        <div className="field"><label className="field-label">Full Name *</label><input className="field-input" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Email Address *</label><input type="email" className="field-input" value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Role</label><select className="field-select" value={formData.role} onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}><option>Member</option><option>Librarian</option><option>Admin</option></select></div>
        <div className="field"><label className="field-label">Status</label><select className="field-select" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}><option>Active</option><option>Inactive</option></select></div>
      </FormModal>

      <FormModal isOpen={isEditModalOpen} title={`Edit ${selectedUser?.name || 'User'}`} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditUser} submitText="Update User">
        <div className="field"><label className="field-label">Full Name *</label><input className="field-input" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Email Address *</label><input type="email" className="field-input" value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Role</label><select className="field-select" value={formData.role} onChange={(event) => setFormData((current) => ({ ...current, role: event.target.value }))}><option>Member</option><option>Librarian</option><option>Admin</option></select></div>
        <div className="field"><label className="field-label">Status</label><select className="field-select" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}><option>Active</option><option>Inactive</option></select></div>
      </FormModal>

      {selectedUser ? (
        <ViewModal isOpen={isViewModalOpen} title={selectedUser.name} onClose={() => setIsViewModalOpen(false)}>
          <div className="section-grid">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>User ID</p><p>{selectedUser.id}</p></div>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</p><p>{selectedUser.status}</p></div>
            </div>
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email</p><p>{selectedUser.email}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Role</p><p>{selectedUser.role}</p></div>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Join Date</p><p>{selectedUser.joinDate}</p></div>
            </div>
          </div>
        </ViewModal>
      ) : null}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete User"
        message={`Are you certain you wish to proceed with the deletion of ${selectedUser?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteUser}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="Delete User"
        isDangerous
      />
    </DashboardLayout>
  );
}
