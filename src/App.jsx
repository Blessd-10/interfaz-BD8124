import { Routes, Route } from "react-router";
import EmailPage from "./pages/email";
import LoginPage from "./pages/login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<EmailPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
