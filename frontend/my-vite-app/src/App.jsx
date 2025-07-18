import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MultiSectionForm from './components/MultiSectionForm/MultiSectionForm';
import UpdateClientForm from './components/MultiSectionForm/UpdateClientForm';
import { UserContext } from './components/UserContext'; // 👈 NEW LINE

const App = () => {
  const { userRole } = useContext(UserContext); // 👈 LIVE userRole sync

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-client"
          element={
            <ProtectedRoute>
              <MultiSectionForm
                isCreateMode={true}
                isEditMode={false}
                userRole={userRole} // ✅ LIVE
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clients/update/:clientId"
          element={
            <ProtectedRoute>
              <UpdateClientForm userRole={userRole} /> {/* ✅ LIVE */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;