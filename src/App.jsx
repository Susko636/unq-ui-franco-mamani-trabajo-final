import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from '../src/components/home/Home.jsx'
import Board from '../src/components/board/Board.jsx'

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="board" element={<Board/>}/>
      </Routes>
    </Router>
  )
}

export default App
