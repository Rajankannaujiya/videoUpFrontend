
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { RecoilRoot } from 'recoil'
import Posts from './pages/Posts'

function App() {


  return (
   <>
   <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />}/>
      <Route path='/login' element={<Signin />} />
      <Route path='/posts' element={<Posts />} />
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
   </>
  )
}

export default App
