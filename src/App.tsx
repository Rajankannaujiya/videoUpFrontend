
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { RecoilRoot } from 'recoil'
import Posts from './pages/Posts'

import Navbar from './components/NavbarComp'
import Videos from './pages/Videos'
import MyVideos from './pages/MyVideos'
import Upload from './pages/Upload'

function App() {


  return (
   <>
   <RecoilRoot>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Signup />}/>
      <Route path='/login' element={<Signin />} />
      <Route path='/posts' element={<Posts />} />
      <Route path='/videos' element={<Videos />} />
      <Route path='/myvideos' element={<MyVideos />} />
      <Route path='/upload' element={<Upload />} />
  
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
   </>
  )
}

export default App
