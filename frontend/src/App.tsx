import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import SendImageForm from './components/SendImageForm'
import ShowGallery from './components/ShowGallery'
import AppNavbar from './components/AppNavBar'
import { BASE_URL } from './utils/constants'

function App() {
  const [formSubmitted, setFormSubmitted] = useState(true);

  const handleFormSubmit = () => {
    console.log("submitted")
    setFormSubmitted(true);
  };


  return (
    <>
      <AppNavbar></AppNavbar>
    <div className="App-content">
 
      <ShowGallery formSubmitted={formSubmitted} BASE_URL={BASE_URL} ></ShowGallery>
    </div>
    <SendImageForm onSubmit = {handleFormSubmit}></SendImageForm>
    </>
  )
}

export default App
