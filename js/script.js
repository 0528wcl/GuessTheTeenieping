document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("userInput")
    const quizImg = document.querySelector(".teenieping")
    const questionNumText = document.getElementById("questionNum")
    const scoreText = document.getElementById("score")
    const hintText = document.getElementById("hint")
    const submitButton = document.getElementById("submitButton")

    const answers = [
        "하츄핑", "키키핑", "아잉핑", "부끄핑", "바로핑", "부투핑", "아자핑", "깜빡핑", "띠용핑", "차차핑", "주르핑", "차나핑",
        "라라핑", "따라핑", "나르핑", "무셔핑", "투투핑", "차캐핑", "떠벌핑", "다조핑", "화나핑", "시러핑", "바네핑", "악동핑",
        "덜덜핑", "그림핑", "무거핑", "꺼꿀핑", "씽씽핑", "베베핑", "코자핑", "딱풀핑", "모야핑", "토이핑", "또까핑", "플라핑",
        "노라핑", "노리핑", "해핑", "아휴핑", "똑똑핑", "꽁꽁핑", "찌릿핑", "홀로핑", "앙대핑"
    ]

    const totalQuestions = answers.length

    let usedNumbers = []
    let questionNum = 0
    let score = 0
    let currentQuestion, hint

    function getRandomNumber() {
        let randomNumber
        [...Array(totalQuestions - 1).keys()]
    
        do {
            randomNumber = Math.floor(Math.random() * totalQuestions) + 1
        } while (usedNumbers.includes(randomNumber))
    
        usedNumbers.push(randomNumber)
        return randomNumber
    }

    // 이미지 바꾸기
    async function changeImage(imgElement, src) {
        try {
            const image = new Image()
            image.src = src
            await image.decode()
            imgElement.src = src
        } catch (error) {
            console.error(`Failed to load image '${src}'`)
        }
    }

    // 정답 체크
    function isCorrectAnswer(answer) {
        return answers[currentQuestion - 1] === answer
    }

    // 새 문제 불러오기
    function loadNewQuestion() {
        currentQuestion = getRandomNumber()
        changeImage(quizImg, `teenieping/${currentQuestion}.png`)
        inputBox.value = ""
        hint = answers[currentQuestion - 1].replace("핑", "").replace(/./g, "◯") + "핑"
        updateUI()
    }

    // 텍스트 업데이트
    function updateUI() {
        questionNumText.innerHTML = `Q${questionNum + 1}`
        scoreText.innerHTML = `${score}/${totalQuestions}`
        hintText.innerHTML = hint
    }

    // 정답 입력했을 때
    function submitAnswer() {
        const textInput = inputBox.value.trim()
        if (!textInput) return
        if (isCorrectAnswer(textInput)) score++
        questionNum++
        loadNewQuestion()
    }

    // 엔터키
    inputBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            submitAnswer()
        }
    })

    submitButton.addEventListener("click", submitAnswer)

    loadNewQuestion()
})