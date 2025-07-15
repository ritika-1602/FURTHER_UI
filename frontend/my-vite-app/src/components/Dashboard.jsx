// import React, { useState, useEffect } from 'react';
// import LogoutButton from './LogoutButton';
// import styles from './Dashboard.module.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//     const [file, setFile] = useState(null);
//     const [uploadStatus, setUploadStatus] = useState('');
//     const [tableData, setTableData] = useState([]); // Table data state
//     const navigate = useNavigate();

//     // Fetch all uploaded user details from the backend when the component mounts
//     useEffect(() => {
//         const fetchTableData = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8000/api/allusers/');
//                 setTableData(response.data.data); // Set the table data with the response
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//             }
//         };

//         fetchTableData();
//     }, []); // Empty dependency array means this will run only once when the component mounts

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleFileUpload = async (e) => {
//         e.preventDefault();

//         if (!file) {
//             setUploadStatus('Please select a file first.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/uploadPDF/', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             setUploadStatus('File uploaded successfully!');
//             setTableData((prevData) => [...prevData, response.data.user_details]); // Append new data to table
//         } catch (err) {
//             if (err.response && err.response.status === 400) {
//                 alert('Resume already existed');  // Show pop-up for duplicate resume
//                 setUploadStatus('Resume already exists');
//             } else {
//                 setUploadStatus('File upload failed!');
//             }
//         }
//     };

//     return (
//         <div className={styles.dashboardContainer}>
//             <h1 className={styles.dashboardTitle}>Resume Dashboard</h1>
//             <h4 className={styles.dashboardSubtitle}>Here are the details of applications received.</h4>
//             {/* Navigate to Multi-Section Form */}
//             <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
//                 <button
//                     onClick={() => navigate('/create-client')}
//                     className={styles.navigateButton} // Or use inline styles
//                 >
//                     Create New Client
//                 </button>
//             </div>

//             {/* File upload form */}
//             <form onSubmit={handleFileUpload} className={styles.uploadForm}>
//                 <input
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleFileChange}
//                     required
//                     className={styles.fileInput}
//                 />
//                 <button type="submit" className={styles.uploadButton}>Upload PDF</button>
//             </form>
//             {uploadStatus && <p className={styles.uploadStatus}>{uploadStatus}</p>}

//             {/* Display extracted user details in a table */}
//             {tableData.length > 0 && (
//                 <div className={styles.dataTableContainer}>
//                     <table className={styles.dataTable}>
//                         <thead>
//                             <tr>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {tableData.map((data, index) => (
//                                 <tr key={index}>
//                                     <td>{data.name}</td>
//                                     <td>{data.email}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* Logout Button */}
//             <LogoutButton />
//         </div>
//     );
// };

// export default Dashboard;


import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-further-2.svg'
 
const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
 
    return (
        <div className={styles.dashboardContainer}>
            {/* NAVBAR */}
            <nav className={styles.navbar}>
                <img src={logo} alt="further image" className={styles.logo}/>
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
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
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
                        </tr>
                    </thead>
                   
                </table>
            </div>
        </div>
    );
};
 
export default Dashboard;