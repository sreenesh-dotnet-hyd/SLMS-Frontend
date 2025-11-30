// File: SoftwareCatalog.jsx
import React, { useState, useMemo } from "react";
import "./SoftwareList.css";

const sampleData = [
  {
    id: 1,
    productName: "Adobe Photoshop",
    vendor: "Adobe",
    category: "Design",
    description: "Image editing and compositing software.",
    sku: "ADBE-PS-2024",
    status: "Active",
    createdAt: "2023-05-12T10:30:00Z",
  },
  {
    id: 2,
    productName: "IntelliJ IDEA",
    vendor: "JetBrains",
    category: "Development",
    description: "Java IDE with intelligent coding assistance.",
    sku: "JB-IDEA-ULT",
    status: "Active",
    createdAt: "2022-11-01T09:00:00Z",
  },
  {
    id: 3,
    productName: "Oracle Database",
    vendor: "Oracle",
    category: "Database",
    description: "Enterprise relational database system.",
    sku: "ORCL-DB-19c",
    status: "Retired",
    createdAt: "2019-08-20T12:00:00Z",
  },
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString();
}

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function SoftwareList({ data = sampleData }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(data.map(d => d.category || "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter(d =>
      (statusFilter === "All" || d.status === statusFilter) &&
      (categoryFilter === "All" || (d.category || "Uncategorized") === categoryFilter) &&
      (d.productName.toLowerCase().includes(query.toLowerCase()) ||
       d.vendor.toLowerCase().includes(query.toLowerCase()) ||
       d.sku.toLowerCase().includes(query.toLowerCase()))
    );
  }, [data, query, statusFilter, categoryFilter]);

  return (
    <section className="catalog-root">
      <header className="catalog-header">
        <h2>Software List</h2>
        <div className="controls">
          <input
            className="search"
            placeholder="Search by name, vendor or SKU..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Active</option>
            <option>Retired</option>
          </select>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </header>

      <main>
        {filtered.length === 0 ? (
          <p className="empty">No software matches your filters.</p>
        ) : (
          <table className="software-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Vendor</th>
                <th>Category</th>
                <th>SKU</th>
                <th>Status</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.vendor}</td>
                  <td>{item.category}</td>
                  <td>{item.sku}</td>
                  <td><StatusPill status={item.status} /></td>
                  <td>{formatDate(item.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </section>
  );
}