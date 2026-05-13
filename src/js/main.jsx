import React from 'react'
import ReactDOM from 'react-dom/client'
import ToDo from './components/ToDos';

// index.css'
import '../styles/index.css'

// components
import Home from './components/Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToDo/>
  </React.StrictMode>,
)