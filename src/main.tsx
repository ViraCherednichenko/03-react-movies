import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import 'modern-normalize/modern-normalize.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
