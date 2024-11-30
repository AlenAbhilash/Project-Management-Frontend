import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './assets/BootstrapTheme.css';
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './Context Api/ContextShare.jsx'; 
import TokenAuthProvider from './Context Api/TokenAuth.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenAuthProvider>
      <ContextShare>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextShare>
    </TokenAuthProvider>
  </StrictMode>,
);
