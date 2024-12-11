document.addEventListener("DOMContentLoaded", () => {
    let questions = document.querySelectorAll(".faqs button");

    questions.forEach((element) => {
        let answer = element.nextElementSibling;
        answer.hidden = true;

        element.addEventListener("click", () => {
            // Toggle visibility of the answer
            answer.hidden = !answer.hidden;

            // Toggle active class for the button and answer
            element.classList.toggle("active", !answer.hidden);
            answer.classList.toggle("active", !answer.hidden);

            // Remove active state from other buttons and answers
            questions.forEach((btn) => {
                if (btn !== element) {
                    btn.classList.remove("active");
                    btn.nextElementSibling.classList.remove("active");
                    btn.nextElementSibling.hidden = true;
                }
            });
        });
    });
});
