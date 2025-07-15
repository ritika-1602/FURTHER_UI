import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MultiSectionForm from './components/MultiSectionForm/MultiSectionForm';

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

            </Routes>
        </Router>
    );
};

export default App;
