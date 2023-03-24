import { useState } from "react";

const Intro = (props) => {
    const [levelOptions, setLevelOptions] = useState([
        { level: "easy", name: "easy", selected: true },
        { level: "medium", name: "intermediate", selected: false },
        { level: "hard", name: "difficult", selected: false },
    ]);

    const selectLevel = (e) => {
        setLevelOptions((prev) => {
            return prev.map((level) => {
                if (level.name === e.target.innerText) {
                    return { ...level, selected: true };
                } else {
                    return { ...level, selected: false };
                }
            });
        });
    };

    const findLevel = () => {
        return levelOptions.filter((level) => level.selected);
    };

    const start = () => {
        const level = findLevel();
        props.startQuiz(level);
    };

    const levelList = levelOptions.map((level) => {
        return (
            <li
                onClick={selectLevel}
                className={`answer-item ${level.selected && "selected"}`}
                key={level.level}>
                {level.name}
            </li>
        );
    });
    return (
        <div>
            <h1>Quizzical</h1>
            <p>Choose your level:</p>
            <ul className="answer-list">{levelList}</ul>
            <button className="start__btn" onClick={start}>
                Start quiz
            </button>
        </div>
    );
};
export default Intro;
