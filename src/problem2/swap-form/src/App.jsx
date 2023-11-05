import { useState, useEffect } from 'react'
import './App.css'
import CurrencyExchangeForm from './CurrencyExchangeForm'
import { fetchData } from './utils/currencyData';


function App() {
  const [currencyData, setCurrencyData] = useState([]);
  useEffect(() => {
    // Fetch the data when the component mounts
    fetchData()
      .then(data => {
        setCurrencyData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <CurrencyExchangeForm currencyData={currencyData} />
    </>
  )
}

export default App
