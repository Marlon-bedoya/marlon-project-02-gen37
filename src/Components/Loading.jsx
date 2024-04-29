import { useEffect, useState } from 'react'
import './styles/Loading.css'



const Loading = () => {

  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
   setShowMessage(true)
  }, 3000)
  

  return (
    <div id="contenedor">
    <ul class="contenedor-loader">
      <li class="loader1"></li>
      <li class="loader2"></li>
      <li class="loader3"></li>
      <li class="loader4"></li>
    </ul>
    <div class="cargando">Loading...</div> 
    {
      showMessage && <p className='Pd'>Please enable location</p>
    }
  </div>
  )
}

export default Loading