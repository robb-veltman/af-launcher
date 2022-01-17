import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
const electron = window.require('electron')

function App() {
  useEffect(() => {
    const { ipcRenderer } = electron
    console.log({ ipcRenderer })
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      document.getElementById('version').innerText = 'Version ' + arg.version;
    });
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p id="version"></p>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
