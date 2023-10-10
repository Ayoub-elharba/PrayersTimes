// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Footer from './components/Footer';
// import Button from '@mui/material/Button';
import MainCo from './components/MainCo';
import { Container } from '@mui/material';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div style={{
      display:'flex',
      justifyContent:'center',
      // textAlign:'center', 
      width:'100vw'
      }}>

      <Container maxWidth="xl">
        <MainCo/>
      </Container>
      
        </div>
        <>
        <Footer/>
        </>
    </>
  )
}

export default App
