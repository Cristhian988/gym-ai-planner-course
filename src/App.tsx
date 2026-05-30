import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Profile from "./pages/Profile.tsx";
import Auth from "./pages/Auth.tsx";
import Account from "./pages/Account.tsx";
import Navbar from "./components/layout/Navbar.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth/:pathname" element={<Auth />} />
            <Route path="/account/:pathname" element={<Account />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
