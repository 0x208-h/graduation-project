import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "@/components/Home"
import Router from "./route";

// const Login = lazy(
//   () => import(/*WebpackChunkName: Login */ "@/components/Login")
// );
// const Home = lazy(
//   () => import(/*WebpackChunkName: Home */ "@/components/Home")
// );
// const Users = lazy(
//   () => import(/*WebpackChunkName: Users */ "@/components/Users")
// );
// const Goods = lazy(
//   () => import(/*WebpackChunkName: Goods */ "@/components/Goods")
// );

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         {/* <Suspense fallback={null}> */}
          <Router /> 
          {/* <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />}>
              <Route path="good" element={<Goods />} />
              <Route path="user" element={<Users />} />
            </Route>
          </Routes> */}
        {/* </Suspense> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
