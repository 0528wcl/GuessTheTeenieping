// 입력 박스
document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("userInput")
    inputBox.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            enterAnswer()
        }
    })
})

// 리스트 만들기
const count = 45
const list = []

function getRandomNumber() {
    let randomNumber
    if (list.length >= count) {
        console.log("All numbers have been generated.")
        return null
    }

    do {
        randomNumber = Math.floor(Math.random() * count) + 1
    } while (list.includes(randomNumber))

    list.push(randomNumber)
    return randomNumber
}

function changeImg(img, src) {
    var image = new Image()
    image.onload = function() {
        img.src = this.src
    }
    image.onerror = function() {
        console.error("Image failed to load " + src);
    }
    image.src = src;
}

// 답 입력됐을 때
function isCorrectAnswer(answer) {
    const randomNumber = list[list.length - 1]
    return answers[randomNumber].answer.toLowerCase() === answer.toLowerCase()
}

function enterAnswer() {
    var inputText = document.getElementById("userInput").value.trim();
    if (inputText === "") {
        return; 
    }

    const quizImg = document.querySelector(".teenieping");
    let random = getRandomNumber();

    if (random) {
        const bgImg = document.getElementsByClassName("bg-image")[0];
        changeImg(quizImg, `teenieping/${random}.png`);

        document.getElementById("userInput").value = "";
    }
}