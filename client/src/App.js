import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './Pages/Home'
import Auth from './Pages/Auth'

const App = () => {

  const user = useSelector((state)=> state?.authReducer?.authData)

  return (
    <div style={{margin: '10px'}}>
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/auth" exact element={user ? <Navigate to="/" />:<Auth />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
