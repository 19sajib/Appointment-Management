import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './Pages/Home'

const App = () => {

  // const user = useSelector((state)=> state?.authReducer?.authData)

  return (
    <div style={{margin: '10px'}}>
      Empty React App
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<Home />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
