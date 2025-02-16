import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { MainPage } from "./pages/MainPage";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {/* <Sidebar />
      <Card title="Important links" type="youtube" link="https://youtube.com" />  */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<MainPage />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
