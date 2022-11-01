import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Slots from "./Pages/Slots";
import Success from "./Pages/Success";
import UserAppoint from "./Pages/UserAppoint";
import Navbar from "./Components/Navbar";

const App = () => {

  const user = useSelector((state)=> state?.authReducer?.authData)

  return (
    <div style={{margin: '10px'}}>
      <Navbar />
      <BrowserRouter>
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/success" exact element={user ? <Success />:<Auth />} />
              <Route path="/appoint-data/:id" exact element={user ? <UserAppoint />:<Auth />} />
              <Route path="/auth" exact element={user ? <Navigate to="/" />:<Auth />} />
              <Route path="/take-slot/:date" exact element={user ? <Slots />:<Auth />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
