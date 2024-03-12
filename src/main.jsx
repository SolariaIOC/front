import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TarjetaVivienda } from './components/tarjeta_vivienda/tarjeta_vivienda.jsx';


const root =  ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
  <TarjetaVivienda nombre='Un nombre' ></TarjetaVivienda>
  </>
)


