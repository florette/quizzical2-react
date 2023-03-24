import { useState } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Quiz from "./components/Quiz";

function App() {
    const [start, setStart] = useState(false);
    const [level, setLevel] = useState([
        { level: "easy", name: "easy", selected: true },
    ]);

    const startQuiz = (level) => {
        console.log(level);
        setLevel(level);
        setStart(true);
    };
    return (
        <div className="App">
            {start ? (
                <Quiz levelSelected={level} />
            ) : (
                <Intro startQuiz={startQuiz} />
            )}
        </div>
    );
}

export default App;
