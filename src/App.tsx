import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const Login = lazy(
  () => import(/*WebpackChunkName: Login */ "@/components/Login")
);
const Home = lazy(
  () => import(/*WebpackChunkName: Home */ "@/components/Home")
);
const NotFound = lazy(
  () => import(/*WebpackChunkName: NotFound */ "@/components/NotFound")
);

function RequireAuth(props: any) {
  const auth = sessionStorage.getItem("token");
  return auth ? props.children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/home/*"
              element={
                <RequireAuth>
                <Home />
                </RequireAuth>
              }
            >
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
