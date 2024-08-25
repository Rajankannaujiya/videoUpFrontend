
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { RecoilRoot } from 'recoil'
import Posts from './pages/Posts'

import Navbar from './components/NavbarComp'
import Videos from './pages/Videos'
import Upload from './pages/Upload'
import Photo from './pages/Photo'
import MyPosts from './pages/MyPosts'
import FullPost from './pages/FullPost'
import UpdatePost from './pages/UpdatePost'

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
      <Route path='/photos' element={<Photo/>} />
      <Route path='/myPosts' element={<MyPosts />} />
      <Route path='/upload' element={<Upload />} />
      <Route path='/post/:id' element={<FullPost />} />
      <Route path='/video/:id' element={<FullPost />} />
      <Route path='/image/:id' element={<FullPost />} />
      <Route path='/update/:id' element={<UpdatePost/>} />
  
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
   </>
  )
}

export default App
