import React, { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import ConfirmModal from '../components/Modals/ConfirmModal';
import FormModal from '../components/Modals/FormModal';
import ViewModal from '../components/Modals/ViewModal';
import { books as initialBooks } from '../data/libraryData';

export default function Books() {
  const [books, setBooks] = useState(initialBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState({ title: '', author: '', category: '', available: 0, borrowed: 0 });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => {
    setFormData({ title: '', author: '', category: '', available: 0, borrowed: 0 });
    setIsAddModalOpen(true);
  };

  const openEditModal = (book) => {
    setSelectedBook(book);
    setFormData(book);
    setIsEditModalOpen(true);
  };

  const openViewModal = (book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  const openDeleteModal = (book) => {
    setSelectedBook(book);
    setIsDeleteModalOpen(true);
  };

  const handleAddBook = (event) => {
    event.preventDefault();
    const newBook = { id: `BK-${String(books.length + 1).padStart(3, '0')}`, ...formData };
    setBooks((current) => [...current, newBook]);
    setIsAddModalOpen(false);
  };

  const handleEditBook = (event) => {
    event.preventDefault();
    setBooks((current) => current.map((book) => (book.id === selectedBook.id ? { ...book, ...formData } : book)));
    setIsEditModalOpen(false);
  };

  const handleDeleteBook = () => {
    setBooks((current) => current.filter((book) => book.id !== selectedBook.id));
    setIsDeleteModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="page-hero">
        <div>
          <h1 className="page-title">Books Management</h1>
          <p className="page-subtitle">Manage and track all books in your library inventory.</p>
        </div>
        <Button onClick={openAddModal}><Plus size={18} /> Add Book</Button>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <div className="stat-card"><p>Total Books</p><div className="stat-value"><span>1,247</span><span className="stat-change">+24</span></div></div>
        <div className="stat-card"><p>Currently Borrowed</p><div className="stat-value"><span>645</span><span className="stat-change">+18%</span></div></div>
        <div className="stat-card"><p>Available</p><div className="stat-value"><span>602</span><span className="stat-change">48%</span></div></div>
      </div>

      <section className="panel">
        <div className="panel-header"><h2>Book Inventory</h2></div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Available</th>
                <th>Borrowed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.author}</td>
                  <td>{row.category}</td>
                  <td><span className="pill pill-success">{row.available}</span></td>
                  <td><span className="pill pill-warning">{row.borrowed}</span></td>
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

      <FormModal isOpen={isAddModalOpen} title="Add New Book" onClose={() => setIsAddModalOpen(false)} onSubmit={handleAddBook} submitText="Add Book">
        <div className="field"><label className="field-label">Book Title *</label><input className="field-input" value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Author *</label><input className="field-input" value={formData.author} onChange={(event) => setFormData((current) => ({ ...current, author: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Category</label><input className="field-input" value={formData.category} onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
          <div className="field"><label className="field-label">Available Copies</label><input type="number" className="field-input" value={formData.available} onChange={(event) => setFormData((current) => ({ ...current, available: Number(event.target.value) || 0 }))} /></div>
          <div className="field"><label className="field-label">Borrowed Copies</label><input type="number" className="field-input" value={formData.borrowed} onChange={(event) => setFormData((current) => ({ ...current, borrowed: Number(event.target.value) || 0 }))} /></div>
        </div>
      </FormModal>

      <FormModal isOpen={isEditModalOpen} title={`Edit ${selectedBook?.title || 'Book'}`} onClose={() => setIsEditModalOpen(false)} onSubmit={handleEditBook} submitText="Update Book">
        <div className="field"><label className="field-label">Book Title *</label><input className="field-input" value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Author *</label><input className="field-input" value={formData.author} onChange={(event) => setFormData((current) => ({ ...current, author: event.target.value }))} /></div>
        <div className="field"><label className="field-label">Category</label><input className="field-input" value={formData.category} onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
          <div className="field"><label className="field-label">Available Copies</label><input type="number" className="field-input" value={formData.available} onChange={(event) => setFormData((current) => ({ ...current, available: Number(event.target.value) || 0 }))} /></div>
          <div className="field"><label className="field-label">Borrowed Copies</label><input type="number" className="field-input" value={formData.borrowed} onChange={(event) => setFormData((current) => ({ ...current, borrowed: Number(event.target.value) || 0 }))} /></div>
        </div>
      </FormModal>

      {selectedBook ? (
        <ViewModal isOpen={isViewModalOpen} title={selectedBook.title} onClose={() => setIsViewModalOpen(false)}>
          <div className="section-grid">
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Book ID</p><p>{selectedBook.id}</p></div>
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Author</p><p>{selectedBook.author}</p></div>
            <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Category</p><p>{selectedBook.category || 'Uncategorized'}</p></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.9rem' }}>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Available</p><p>{selectedBook.available} copies</p></div>
              <div><p className="help-text" style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Borrowed</p><p>{selectedBook.borrowed} copies</p></div>
            </div>
          </div>
        </ViewModal>
      ) : null}

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Book"
        message={`Are you certain you wish to proceed with the deletion of ${selectedBook?.title}? This action cannot be undone.`}
        onConfirm={handleDeleteBook}
        onCancel={() => setIsDeleteModalOpen(false)}
        confirmText="Delete Book"
        isDangerous
      />
    </DashboardLayout>
  );
}
