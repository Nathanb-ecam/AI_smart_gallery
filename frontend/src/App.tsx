import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import SendImageForm from './components/SendImageForm'
import ShowGallery from './components/ShowGallery'
import AppNavbar from './components/AppNavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppNavbar></AppNavbar>
    <div className="App-content">
      <SendImageForm></SendImageForm>
      <ShowGallery></ShowGallery>
    </div>
    </>
  )
}

export default App
