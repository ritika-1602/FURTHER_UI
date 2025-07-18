import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { UserProvider } from './components/UserContext'; // 👈 NEW LINE

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> {/* 👈 WRAP APP */}
      <App />
    </UserProvider>
  </StrictMode>
);