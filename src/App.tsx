import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navigation from "./navigation"
import MySkills from "./Pages/myskills"
import Skills from "./Pages/skills"
import People from "./Pages/people"
import Home from "./Pages/home"
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className='flex justify-center routes-wrapper'>
        <div className='w-11/12'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/my-skills" element={<MySkills />} />
            <Route path="/people" element={<People />} />
            <Route path="/*" element={<Skills />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
