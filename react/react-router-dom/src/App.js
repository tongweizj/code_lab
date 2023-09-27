import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Homepage from "./Homepage";
import AboutLittleLemon from "./AboutLittleLemon";
import Contact from "./Contact";

function App() {
  return (
    <div>
      <nav>
        <Link to="/" className="nav-item">
          Homepage
        </Link>
        <Link to="/about" className="nav-item">
          About Little Lemon
        </Link>
        <Link to="/contact" className="nav-item">
          Contact
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<AboutLittleLemon />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </div>
  );
}

export default App;

//  * tips*
//  1. Link 负责前端显示出这个连接
//  2. route 部分负责跳转路径的设置
//  vue 系列的框架,都是单独有一个 route 配置文件, react 非常灵活,甚至临时.现用现设.
//  但管理是否会出现问题呢?
