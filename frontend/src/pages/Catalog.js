import React, { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import ConfirmModal from '../components/Modals/ConfirmModal';
import FormModal from '../components/Modals/FormModal';
import ViewModal from '../components/Modals/ViewModal';
import { catalogs as initialCatalogs } from '../data/libraryData';

export default function Catalog() {
  const [catalogs, setCatalogs] = useState(initialCatalogs);
  const [selectedCatalog, setSelectedCatalog] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', bookCount: 0, status: 'Active' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setFormData({ title: '', description: '', bookCount: 0, status: 'Active' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (catalog) => {
    setSelectedCatalog(catalog);
    setFormData({ title: catalog.title, description: catalog.description, bookCount: catalog.bookCount, status: catalog.status });
    setIsEditModalOpen(true);
  };

  const openViewModal = (catalog) => {
    setSelectedCatalog(catalog);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (catalog) => {
    setSelectedCatalog(catalog);
    setIsDeleteModalOpen(true);
  };

  const handleAddCatalog = (event) => {
    event.preventDefault();
    const newCatalog = {
      id: `CAT-${String(catalogs.length + 1).padStart(3, '0')}`,
      ...formData,
    };
    setCatalogs((current) => [...current, newCatalog]);
    setIsAddModalOpen(false);
  };

  const handleEditCatalog = (event) => {
    event.preventDefault();
    setCatalogs((current) => current.map((catalog) => (catalog.id === selectedCatalog.id ? { ...catalog, ...formData } : catalog)));
    setIsEditModalOpen(false);
  };

  const handleDeleteCatalog = () => {
    setCatalogs((current) => current.filter((catalog) => catalog.id !== selectedCatalog.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <div>
          <h1 className="page-title">Catalog Management</h1>
          <p className="page-subtitle">Manage your library catalog collections and categories.</p>
        </div>
        <Button onClick={openAddModal}><Plus size={18} /> Add Catalog</Button>
      </div>

      <section className="panel">
        <div className="panel-header"><h2>Book Collections</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Books</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {catalogs.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{row.bookCount}</td>
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

      <FormModal isOpen={isAddModalOpen} title="Add New Catalog" onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddCatalog} submitText="Add Catalog">
        <div className="field">
          <label className="field-label" htmlFor="title">Collection Title *</label>
          <input id="title" className="field-input" value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="description">Description *</label>
          <textarea id="description" className="field-textarea" rows={3} value={formData.description} onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="bookCount">Number of Books</label>
          <input id="bookCount" type="number" className="field-input" value={formData.bookCount} onChange={(event) => setFormData((current) => ({ ...current, bookCount: Number(event.target.value) || 0 }))} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="status">Status</label>
          <select id="status" className="field-select" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </FormModal>

      <FormModal isOpen={isEditModalOpen} title={`Edit ${selectedCatalog?.title || 'Catalog'}`} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditCatalog} submitText="Update Catalog">
        <div className="field">
          <label className="field-label" htmlFor="edit-title">Collection Title *</label>
          <input id="edit-title" className="field-input" value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="edit-description">Description *</label>
          <textarea id="edit-description" className="field-textarea" rows={3} value={formData.description} onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="edit-bookCount">Number of Books</label>
          <input id="edit-bookCount" type="number" className="field-input" value={formData.bookCount} onChange={(event) => setFormData((current) => ({ ...current, bookCount: Number(event.target.value) || 0 }))} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="edit-status">Status</label>
          <select id="edit-status" className="field-select" value={formData.status} onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value }))}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </FormModal>

      {selectedCatalog ? (
        <ViewModal isOpen={isViewModalOpen} title={selectedCatalog.title} onClose={() => setIsViewModalOpen(false)}>
          <div className="section-grid">
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Catalog ID</p><p>{selectedCatalog.id}</p></div>
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Description</p><p>{selectedCatalog.description}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Book Count</p><p>{selectedCatalog.bookCount} books</p></div>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</p><p>{selectedCatalog.status}</p></div>
            </div>
          </div>
        </ViewModal>
      ) : null}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Catalog"
        message={`Are you certain you wish to proceed with the deletion of ${selectedCatalog?.title}? This action cannot be undone.`}
        onConfirm={handleDeleteCatalog}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="Delete Catalog"
        isDangerous
      />
    </DashboardLayout>
  );
}
