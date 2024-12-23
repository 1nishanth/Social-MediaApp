
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Pages from './Components/Pages/Page';
// import AuthProvider from './Components/context/AuthContext';
import AuthProvider from './Components/context/AuthContext';
import MediaProvider from './Components/context/PostContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MediaProvider>
            <Pages>
              <ToastContainer />
            </Pages>
          </MediaProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
