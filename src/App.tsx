import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./route";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={null}>
          <Router />
          {/* <Routes>
              <Route>
                <Route path="/" element={<Login />} />
                <Route path="/login"  element={<Login />}/>
              </Route>
            </Routes> */}
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
