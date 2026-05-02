import React, { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import Button from '../components/Button';
import { branchOverview, booksOverview, dashboardStats, overdueBorrowers, usersOverview } from '../data/libraryData';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('books');

  const tabs = [
    { key: 'books', label: 'Books Management' },
    { key: 'users', label: 'Users Management' },
    { key: 'branches', label: 'Branches Management' },
  ];

  return (
    <DashboardLayout>
      <div className="page-hero">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back. Here is your library overview.</p>
        </div>
        <Button variant="secondary">Refresh Overview</Button>
      </div>

      <div className="stat-grid">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p>{stat.label}</p>
            <div className="stat-value">
              <span>{stat.value}</span>
              <span className="stat-change">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-grid two-up">
        <section className="panel">
          <div className="panel-header">
            <h2>Overdue Borrowers</h2>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Book</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
                {overdueBorrowers.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.userName}</td>
                    <td>{row.bookTitle}</td>
                    <td><span className="pill pill-danger">{row.daysOverdue} days</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <h2>Branch Network</h2>
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {branchOverview.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.location}</td>
                    <td>
                      <span className={`pill ${row.status === 'Active' ? 'pill-success' : 'pill-muted'}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="tabs" style={{ marginBottom: 0, borderBottom: 'none' }}>
            {tabs.map((tab) => (
              <button key={tab.key} type="button" className={`tab-button ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </button>
            ))}
          </div>
          <Button>
            <Plus size={18} />
            Add Record
          </Button>
        </div>
        <div className="panel-body">
          {activeTab === 'books' ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Language</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {booksOverview.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td>{row.language}</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-button" type="button"><Eye size={16} /></button>
                          <button className="icon-button" type="button"><Pencil size={16} /></button>
                          <button className="icon-button" type="button"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === 'users' ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersOverview.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.username}</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-button" type="button"><Eye size={16} /></button>
                          <button className="icon-button" type="button"><Pencil size={16} /></button>
                          <button className="icon-button" type="button"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {activeTab === 'branches' ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {branchOverview.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.location}</td>
                      <td>123-456-7890</td>
                      <td>
                        <div className="row-actions">
                          <button className="icon-button" type="button"><Eye size={16} /></button>
                          <button className="icon-button" type="button"><Pencil size={16} /></button>
                          <button className="icon-button" type="button"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>

      <div className="quote-box" style={{ marginTop: '1rem' }}>
        <p>
          "Embarking on the journey of reading fosters personal growth, nurturing a path towards excellence and the refinement of character."
        </p>
      </div>
    </DashboardLayout>
  );
}
