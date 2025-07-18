import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import styles from './Dashboard.module.css';
import logo from '../assets/logo-further-2.svg';
import * as XLSX from 'xlsx';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Clients');
  XLSX.writeFile(workbook, filename);
};
  const navigate = useNavigate();

  const fetchClients = async (page = 1) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/auth/clients/?page=${page}`);
      setClients(res.data.results);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching clients:", err);
      alert("Failed to load clients.");
    }
  };

  useEffect(() => {
    fetchClients(1); // fetch page 1 initially
  }, []);

  const handleDownloadAll = async () => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/api/auth/clients/?page_size=1000'); // ensure large enough
        exportToExcel(res.data.results, 'All_Clients.xlsx');
    } catch (err) {
        console.error("Failed to download all clients:", err);
        alert("Error downloading all records.");
    }
    };
   
   const handleDownloadCurrent = () => {
    exportToExcel(filteredClients, 'Current_Page_Clients.xlsx');
    };
 
  const filteredClients = clients.filter(client =>
    client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.clientCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.dashboardContainer}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <img src={logo} alt="further logo" className={styles.logo} />
        <LogoutButton />
      </nav>

      {/* HEADER */}
      <div className={styles.headerSection}>
        <h1 className={styles.dashboardTitle}>Administration Dashboard</h1>
        <button onClick={() => navigate('/create-client')} className={styles.navigateButton}>
          Create New Client
        </button>
      </div>

      {/* SEARCH BOX */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search by client name or code"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

       <div className={styles.downloadSection}>
        <button onClick={handleDownloadCurrent} className={styles.exportButton}>
            Download Current Page
        </button>
        <button onClick={handleDownloadAll} className={styles.exportButton}>
            Download All Records
        </button>
        </div>
 
      {/* TABLE */}
      <div className={styles.dataTableContainer}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Reinsurer</th>
              <th>Region</th>
              <th>Country</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td>{client.clientCode}</td>
                <td>{client.clientName}</td>
                <td>{client.reinsurer}</td>
                <td>{client.category || '-'}</td>
                <td>{client.clientCountry}</td>
                <td>{client.channel}</td>
                <td>{client.monthlyReport ? 'Active' : 'Inactive'}</td>
                <td>
                  <button
                    className={styles.navigateButton}
                    onClick={() => navigate(`/clients/update/${client.id}`)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
            {filteredClients.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No clients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION CONTROLS */}
      <div className={styles.paginationControls}>
        <button
          disabled={!prevPageUrl}
          onClick={() => fetchClients(currentPage - 1)}
          className={styles.paginationButton}
        >
          Previous
        </button>
        <span style={{ margin: '0 12px' }}>Page {currentPage}</span>
        <button
          disabled={!nextPageUrl}
          onClick={() => fetchClients(currentPage + 1)}
          className={styles.paginationButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;