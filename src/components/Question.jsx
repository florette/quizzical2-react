const Question = (props) => {
    const { question, allAnswers, id, selected, rightAnswer, correct_answer } =
        props.data;

    const decodeChar = (str) => {
        return str.replace(/&#([0-9]{1,4});/gi, function (match, numStr) {
            var num = parseInt(numStr, 10); // read num as normal number
            return String.fromCharCode(num);
        });
    };

    const answerList = allAnswers.map((answer, i) => {
        // Determine class to apply on selected answer
        let itemClass = "";
        // Select the answer
        if (selected === answer) {
            itemClass = "selected";

            // After all answers are submitted, apply right or wrong answer class
            if (rightAnswer && rightAnswer !== null) {
                itemClass = "rightAnswer";
            } else if (!rightAnswer && rightAnswer !== null) {
                itemClass = "wrongAnswer";
            }
        }

        // Show the right answer if user selected wrong answer
        if (answer === correct_answer && rightAnswer === false) {
            itemClass = "rightAnswer";
        }

        return (
            <li
                className={`answer-item ${itemClass}`}
                key={`${id}-a-${i}`}
                onClick={
                    !props.disableAnswers &&
                    (() => props.selectAnswer(answer, id))
                }>
                {decodeChar(answer)}
            </li>
        );
    });

    return (
        <div style={{ marginBottom: 30 }}>
            <h3>{decodeChar(question)}</h3>
            <ul className="answer-list">{answerList}</ul>
        </div>
    );
};
export default Question;
