import { Route, Routes } from "react-router";
// UI
import { Toaster } from "@/components/ui/toaster";
// Pages
import EmailPage from "./pages/email";
import LoginPage from "./pages/login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/email" element={<EmailPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
