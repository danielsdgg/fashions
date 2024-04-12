import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Ensure this file exists and contains the CSS you need
import App from './App'; // Ensure this is the correct path to your App component
import { UserProvider } from './context/UserContext'; // Check the path is correct
import "bulma/css/bulma.min.css"; // Ensure this module is installed via npm or yarn

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);

// Optional: Setup for measuring performance in your application
// import reportWebVitals from './reportWebVitals';
// reportWebVitals(console.log);
