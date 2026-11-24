import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import NotFound from "./pages/NotFound";

function PublicLayout({ children }) { return <><Navbar/>{children}<Footer/></>; }
export default function App() {
  return <Routes>
    <Route path="/" element={<PublicLayout><Home/></PublicLayout>}/>
    <Route path="/about" element={<PublicLayout><About/></PublicLayout>}/>
    <Route path="/products" element={<PublicLayout><Products/></PublicLayout>}/>
    <Route path="/offers" element={<PublicLayout><Offers/></PublicLayout>}/>
    <Route path="/contact" element={<PublicLayout><Contact/></PublicLayout>}/>
    <Route path="/admin/login" element={<AdminLogin/>}/>
    <Route path="/admin" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    <Route path="*" element={<PublicLayout><NotFound/></PublicLayout>}/>
  </Routes>;
}
