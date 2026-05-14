const Questions = {
    1: {
        question: "Whats my most used nickname?",
        options: ["Gabriel", "Tommy", "Tomtom", "Hapon"],
        correct: "Tomtom",
    },

    2: {
        question: "How did I approach you?",
        options: ["Through notes", "Through a friend", "Personal", "Through chats"],
        correct: "Through chats",
    },

    3: {
        question: "When's our anniversary?",
        options: ["April 15", "October 7", "January 15", "November 29"],
        correct: "April 15",
    }
};

const QNumber = document.getElementById("QNumber");
const Question = document.getElementById("Question");
const Modal = document.getElementById("Modal");

const MaxQuestions = 3;
let CurrentQuestion = 1;

function LoadQuestion(QuestionNumber) {

    // Get fresh buttons every time
    const Choices = document.querySelectorAll(".Choices");

    QNumber.innerText = `Question ${QuestionNumber}`;
    Question.innerText = Questions[QuestionNumber].question;

    Choices.forEach((choice, index) => {

        choice.innerText = Questions[QuestionNumber].options[index];

        // Remove old onclick first
        choice.onclick = null;

        choice.onclick = () => {

            if (choice.innerText === Questions[QuestionNumber].correct) {
                if (CurrentQuestion < MaxQuestions) {
                    console.log("Correct moving on to next question");
                    CurrentQuestion++;
                    LoadQuestion(CurrentQuestion);
                } else {

                    console.log("Quiz completed");
                    Modal.classList.remove("hide")
                    Modal.classList.add("show")
                }

            } else {

                console.log("Wrong try again");

            }
        };
    });
}
LoadQuestion(1);