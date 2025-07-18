import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MultiSectionForm from './components/MultiSectionForm/MultiSectionForm';
import UpdateClientForm from './components/MultiSectionForm/UpdateClientForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} /> {/* Login route */}
                
                {/* Protect the Dashboard route */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard /> {/* Only accessible if authenticated */}
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-client"
                    element={
                        <ProtectedRoute>
                        <MultiSectionForm />
                        </ProtectedRoute>
                    }
                    />

                {/* <Route
                    path="/clients/update/:clientId"
                    element={
                        <ProtectedRoute>
                        <UpdateClientForm />
                        </ProtectedRoute>
                    }
                    /> */}
                <Route
                path="/clients/update/:clientId"
                element={
                    <ProtectedRoute>
                    <UpdateClientForm userRole={localStorage.getItem('userRole')} />
                    </ProtectedRoute>
                }
                />

            </Routes>
        </Router>
    );
};

export default App;
