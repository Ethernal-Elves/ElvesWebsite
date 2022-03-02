import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './ThemeContext';
import Background from './Background';
import { MoralisProvider } from "react-moralis";
require('dotenv').config();

const appId = process.env.REACT_APP_MORALIS_APPKEY;

//const creds = {appId: appId, serverUrl: "https://btx7uykjbmv4.usemoralis.com:2053/server"};

const creds = {appId: "pkIG80bKDzQ6scPI3xvnfxUXeOfw2OnmR6F1WnaA", serverUrl: "https://8vjltfmbhcn7.usemoralis.com:2053/server"}; //Mainnet

ReactDOM.render(
  <MoralisProvider appId={creds.appId} serverUrl={creds.serverUrl}>
  <React.StrictMode>
        <ThemeProvider>
           <Background>      
              <App />
          </Background>
    </ThemeProvider>
  </React.StrictMode>
  </MoralisProvider>,
  document.getElementById('root')
);


