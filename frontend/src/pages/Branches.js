import React, { useState } from 'react';
import { Eye, MapPin, Pencil, Phone, Plus, Trash2, Clock } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import ConfirmModal from '../components/Modals/ConfirmModal';
import FormModal from '../components/Modals/FormModal';
import ViewModal from '../components/Modals/ViewModal';
import { branches as initialBranches } from '../data/libraryData';

export default function Branches() {
  const [branches, setBranches] = useState(initialBranches);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', contact: '', manager: '', employees: 0, status: 'Active' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setFormData({ name: '', location: '', contact: '', manager: '', employees: 0, status: 'Active' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (branch) => {
    setSelectedBranch(branch);
    setFormData(branch);
    setIsEditModalOpen(true);
  };

  const openViewModal = (branch) => {
    setSelectedBranch(branch);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (branch) => {
    setSelectedBranch(branch);
    setIsDeleteModalOpen(true);
  };

  const handleAddBranch = (event) => {
    event.preventDefault();
    const newBranch = { id: `BR-${String(branches.length + 1).padStart(3, '0')}`, ...formData };
    setBranches((current) => [...current, newBranch]);
    setIsAddModalOpen(false);
  };

  const handleEditBranch = (event) => {
    event.preventDefault();
    setBranches((current) => current.map((branch) => (branch.id === selectedBranch.id ? { ...branch, ...formData } : branch)));
    setIsEditModalOpen(false);
  };

  const handleDeleteBranch = () => {
    setBranches((current) => current.filter((branch) => branch.id !== selectedBranch.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <div>
          <h1 className="page-title">Branches Management</h1>
          <p className="page-subtitle">Oversee all library branch locations and their operations.</p>
        </div>
        <Button onClick={openAddModal}><Plus size={18} /> Add Branch</Button>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <div className="stat-card"><p>Total Branches</p><div className="stat-value"><span>12</span><span className="stat-change">+1</span></div></div>
        <div className="stat-card"><p>Active Locations</p><div className="stat-value"><span>11</span><span className="stat-change">92%</span></div></div>
        <div className="stat-card"><p>Total Staff</p><div className="stat-value"><span>87</span><span className="stat-change">+12</span></div></div>
      </div>

      <section className="panel">
        <div className="panel-header"><h2>Branch Locations</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Manager</th>
                <th>Staff</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td><span style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center' }}><MapPin size={14} /> {row.location}</span></td>
                  <td><span style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center' }}><Phone size={14} /> {row.contact}</span></td>
                  <td>{row.manager}</td>
                  <td><span className="pill pill-success">{row.employees} staff</span></td>
                  <td><span className={`pill ${row.status === 'Active' ? 'pill-success' : 'pill-muted'}`}>{row.status}</span></td>
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

      <section className="panel">
        <div className="panel-header"><h2>Standard Operating Hours</h2></div>
        <div className="panel-body section-grid two-up">
          <div className="feature-card" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Clock size={20} color="hsl(var(--libsmart-blue))" />
            <div><p style={{ fontWeight: 700 }}>Weekdays</p><p className="help-text">9:00 AM - 6:00 PM</p></div>
          </div>
          <div className="feature-card" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Clock size={20} color="hsl(var(--libsmart-blue))" />
            <div><p style={{ fontWeight: 700 }}>Weekends</p><p className="help-text">10:00 AM - 4:00 PM</p></div>
          </div>
        </div>
      </section>

      <FormModal isOpen={isAddModalOpen} title="Add New Branch" onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddBranch} submitText="Add Branch">
        <div className="field"><label className="field-label">Branch Name *</label><input className="field-input" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Location *</label><input className="field-input" value={formData.location} onChange={(event) => setFormData((current) => ({ ...current, location: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Contact Number *</label><input className="field-input" value={formData.contact} onChange={(event) => setFormData((current) => ({ ...current, contact: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Manager Name</label><input className="field-input" value={formData.manager} onChange={(event) => setFormData((current) => ({ ...current, manager: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Number of Employees</label><input type="number" className="field-input" value={formData.employees} onChange={(event) => setFormData((current) => ({ ...current, employees: Number(event.target.value) || 0 }))} /></div>
        <div className="field"><label className="field-label">Status</label><select className="field-select" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}><option>Active</option><option>Inactive</option></select></div>
      </FormModal>

      <FormModal isOpen={isEditModalOpen} title={`Edit ${selectedBranch?.name || 'Branch'}`} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditBranch} submitText="Update Branch">
        <div className="field"><label className="field-label">Branch Name *</label><input className="field-input" value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Location *</label><input className="field-input" value={formData.location} onChange={(event) => setFormData((current) => ({ ...current, location: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Contact Number *</label><input className="field-input" value={formData.contact} onChange={(event) => setFormData((current) => ({ ...current, contact: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Manager Name</label><input className="field-input" value={formData.manager} onChange={(event) => setFormData((current) => ({ ...current, manager: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Number of Employees</label><input type="number" className="field-input" value={formData.employees} onChange={(event) => setFormData((current) => ({ ...current, employees: Number(event.target.value) || 0 }))} /></div>
        <div className="field"><label className="field-label">Status</label><select className="field-select" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}><option>Active</option><option>Inactive</option></select></div>
      </FormModal>

      {selectedBranch ? (
        <ViewModal isOpen={isViewModalOpen} title={selectedBranch.name} onClose={() => setIsViewModalOpen(false)}>
          <div className="section-grid">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Branch ID</p><p>{selectedBranch.id}</p></div>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</p><p>{selectedBranch.status}</p></div>
            </div>
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Location</p><p>{selectedBranch.location}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Contact</p><p>{selectedBranch.contact}</p></div>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Employees</p><p>{selectedBranch.employees}</p></div>
            </div>
          </div>
        </ViewModal>
      ) : null}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Branch"
        message={`Are you certain you wish to proceed with the deletion of ${selectedBranch?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteBranch}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="Delete Branch"
        isDangerous
      />
    </DashboardLayout>
  );
}
