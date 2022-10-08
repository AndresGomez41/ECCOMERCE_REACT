import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home, ProductDetails, Login, Signup } from "./pages";
import { NavBar , LoadingScreen, ProtectedRoutes } from "./components";
import { useSelector } from 'react-redux'
import Purchases from "./pages/Purchases";



function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      { isLoading && <LoadingScreen/> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>

      </Routes>
    </HashRouter>
  );
}

export default App;
