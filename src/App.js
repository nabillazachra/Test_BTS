import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route} from "react-router-dom";
import Addlist from "./pages/Addlist";
import Checklist from "./pages/Checklist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Itemlist from "./pages/Itemlist";
import Additem from "./pages/Additem";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/check-list" element={<Checklist />} />
      <Route exact path="/add-list" element={<Addlist />} />
      <Route exact path="/item-list/:id" element={<Itemlist />} />
      <Route exact path="/item-add" element={<Additem />} />
    </Routes>
  );
}

export default App;
