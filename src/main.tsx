
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add viewport meta tag for mobile optimization
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
document.getElementsByTagName('head')[0].appendChild(meta);

createRoot(document.getElementById("root")!).render(<App />);
