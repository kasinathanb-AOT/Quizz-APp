import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Auth from "./pages/auth/Auth";
import UserIndex from "./pages/userIndex/UserIndex";
import Error from "./components/error/Error";


function App() {
  return (
    <Router basename="/Quizz-APp">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/index/:username" element={<UserIndex />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
