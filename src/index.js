import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './ThemeContext';
import Background from './Background';
require('dotenv').config();

ReactDOM.render(

  <React.StrictMode>
        <ThemeProvider>
           <Background>      
              <App />
          </Background>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


