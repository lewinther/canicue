import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import './Styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error("Root container missing");

const root = ReactDOM.createRoot(container);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

