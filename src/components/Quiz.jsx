import { useState, useEffect } from "react";
import Question from "./Question";

const Quiz = (props) => {
    const [questions, setQuestions] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [totalRight, setTotalRight] = useState(0);
    const [questionsLoading, setQuestionsLoading] = useState(true);
    const [activeBtn, setActiveBtn] = useState(false);
    const [disableAnswers, setDisableAnswers] = useState(false);

    useEffect(
        () => console.log(props.levelSelected[0].level),
        [questionsLoading]
    );

    const getQuestions = () => {
        fetch(
            `https://opentdb.com/api.php?amount=5&category=9&difficulty=${props.levelSelected[0].level}`
        )
            .then((res) => res.json())
            .then((data) => {
                const combineAnswers = data.results.map((q, i) => {
                    let answerListRaw = [
                        ...q.incorrect_answers,
                        q.correct_answer,
                    ];
                    const shuffledAnswers = answerListRaw.sort(
                        () => Math.random() - 0.5
                    );

                    return {
                        ...q,
                        allAnswers: shuffledAnswers,
                        id: `q-${i}`,
                        selected: "",
                        rightAnswer: null,
                    };
                });

                setQuestions(combineAnswers);
                setQuestionsLoading(false);
            });
    };

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        countRightAnswers();
    }, [showResult]);

    useEffect(() => {
        activateBtn();
    }, [questions]);

    // console.log(questions);

    const selectAnswer = (answer, qId) => {
        setQuestions((prevState) => {
            const withSelectedAnswer = prevState.map((q) => {
                if (q.id === qId) {
                    return { ...q, selected: answer };
                } else {
                    return q;
                }
            });
            return withSelectedAnswer;
        });
    };

    const checkAnswers = () => {
        setQuestions((prevState) => {
            return prevState.map((q) => {
                return {
                    ...q,
                    rightAnswer: q.correct_answer === q.selected ? true : false,
                };
            });
        });

        setShowResult(true);
        setDisableAnswers(true);
    };

    const countRightAnswers = () => {
        const rightAnswers = questions.filter((q) => q.rightAnswer);
        setTotalRight(rightAnswers.length);
    };

    const reset = () => {
        getQuestions();
        setTotalRight(0);
        setShowResult(false);
        setQuestionsLoading(true);
        setDisableAnswers(false);
    };

    const activateBtn = () => {
        const checkAllAnswered = questions.some((q) => q.selected === "");
        checkAllAnswered ? setActiveBtn(false) : setActiveBtn(true);
    };

    const questionsList = questions.map((q) => {
        return (
            <Question
                data={{ ...q }}
                key={q.id}
                selectAnswer={selectAnswer}
                disableAnswers={disableAnswers}
            />
        );
    });

    const buttons = () => {
        if (!showResult) {
            return (
                <>
                    <button
                        onClick={checkAnswers}
                        disabled={activeBtn ? "" : "disabled"}>
                        Check answers
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <button onClick={reset}>Play again</button>
                    <p>
                        You have {totalRight} good answer
                        {totalRight > 1 ? "s" : ""}.
                    </p>
                </>
            );
        }
    };

    return (
        <div className={`quiz ${disableAnswers && "disabled-answers"}`}>
            {questionsLoading ? "Loading questions" : questionsList}
            {!questionsLoading && buttons()}
        </div>
    );
};
export default Quiz;
