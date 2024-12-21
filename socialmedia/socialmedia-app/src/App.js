
import './App.css';
import { BrowserRouter } from "react-router-dom";
// import Pages from './Pages/Page';
import Pages from './Components/Pages/Page';
import AuthProvider from './Components/context/AuthContext';
import MediaProvider from './Components/context/MediaContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <MediaProvider>
            <Pages></Pages>
          </MediaProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
