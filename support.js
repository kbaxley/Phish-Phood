document.addEventListener("DOMContentLoaded", () => {
    let questions = document.querySelectorAll(".faqs button");
    questions.forEach(element => {
        let answer = element.nextElementSibling;
        answer.hidden = true;
        element.addEventListener("click", () => {
            answer.hidden = !answer.hidden;
        });
    });
});