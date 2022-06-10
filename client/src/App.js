import { Routes, Route } from "react-router-dom";
import Home from "./components/home.jsx";
import Landing from "./components/landing.jsx";
import Details from "./components/detailsG.jsx";
import CreateForm from "./components/createForm"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/videogames" element={<Home/>}/>
        <Route path="/videogames/:id" element={<Details/>} />
        <Route exact path="/videogame" element= {<CreateForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
