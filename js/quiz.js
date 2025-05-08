document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("userInput")
    const quizImage = document.querySelector(".teenieping")
    const questionNumText = document.getElementById("questionNum")
    const scoreText = document.getElementById("score")
    const hintText = document.getElementById("hint")
    const submitButton = document.getElementById("submitButton")
    const continueButton = document.getElementById("continueButton")
    
    const answers = [
        "하츄핑", "키키핑", "아잉핑", "부끄핑", "바로핑", "부투핑", "아자핑", "깜빡핑", "띠용핑", "차차핑", "주르핑", "차나핑",
        "라라핑", "따라핑", "나르핑", "무셔핑", "투투핑", "차캐핑", "떠벌핑", "다조핑", "화나핑", "시러핑", "바네핑", "악동핑",
        "덜덜핑", "그림핑", "무거핑", "꺼꿀핑", "씽씽핑", "베베핑", "코자핑", "딱풀핑", "모야핑", "토이핑", "또까핑", "플라핑",
        "노라핑", "노리핑", "해핑", "아휴핑", "똑똑핑", "꽁꽁핑", "찌릿핑", "홀로핑", "앙대핑", "다이아 하츄핑", "방글핑",
        "믿어핑", "조아핑", "까르핑", "아야핑", "소원핑", "토닥핑", "쪼꼼핑", "싹싹핑", "맛나핑", "포근핑", "메모핑", "공쥬핑",
        "짝짝핑", "주네핑", "뚝딱핑", "발레핑", "원더핑", "다해핑", "가면핑", "빨리핑", "얌얌핑", "뜨거핑", "삐뽀핑", "간호핑",
        "힘내핑", "고쳐핑", "아라핑", "패션핑", "꼼딱핑", "퐁당핑", "파티핑", "꾸며핑", "삐짐핑", "아아핑", "행운핑", "빙글핑",
        "베리 하츄핑", "샤샤핑", "말랑핑", "포실핑", "캔디핑", "머랭핑", "샌드핑", "또너핑", "와플핑", "롤리핑", "마카핑", "핫케핑",
        "머핑 & 커핑", "요거핑", "눈꽃핑", "푸딩핑", "멜로핑", "쪼꼬핑", "뿌뿌핑", "달콤핑", "새콤핑", "트러핑", "스타 하츄핑",
        "빛나핑", "초롱핑", "빤짝핑", "깡총핑", "훌라핑", "나눔핑", "딩동핑", "나그네핑", "고고핑", "뿌쵸핑", "고마핑", "아롱핑",
        "다롱핑", "뽀송핑", "유리핑", "함께핑", "댄스핑", "여우핑", "루루핑", "몰래핑", "뽀뽀핑", "오로라핑", "왕자핑"
    ]

    /** 쿠키 가져오기 */
    function getCookie(name) {
        return document.cookie
        .split("; ")
        .find(row => row.startsWith(`${name}=`))
        ?.split("=")[1]
    }

    const imageCount = answers.length
    const totalQuestions = parseInt(getCookie("totalQuestions")) || 50

    let usedNumbers = []
    let questionNum = 0
    let score = 0
    let currentQuestion = 0
    let continueStatus = 0

    var textHint

    /** 안 쓰인 숫자 중에서 무작위 숫자 생성하기 */
    function getRandomNumber() {
        if (usedNumbers.length >= imageCount) return null
    
        let randomNumber
        do {
            randomNumber = Math.floor(Math.random() * imageCount) + 1
        } while (usedNumbers.includes(randomNumber))
        
        usedNumbers.push(randomNumber)
        return randomNumber
    }

    /** 이미지 미리 불러오기 */
    function preloadImages() {
        for (let i = 1; i <= answers.length; i++) {
            new Image().src = `teenieping/${i}.png`
        }
    }

    /** 이미지 바꾸기 */
    function changeImage(imgElement, src) {
        const image = new Image()
        image.src = "teenieping/0.png"
        image.onload = () => { imgElement.src = src }
    }

    /** 정답 제출하기 */
    function submitAnswer() {
        const textInput = inputBox.value.trim()
        if (!textInput) return
        if (answers[currentQuestion - 1] === textInput) {
            score++
            hintText.style.color = "#64ff64"
        } else {
            hintText.style.color = "#ff6464"
        }
        textHint = answers[currentQuestion - 1]
        updateUI()
        toggleElement(inputBox)
        toggleElement(submitButton)
        toggleElement(continueButton)
        setTimeout(function() {continueStatus = 1}, 10)
    }

    /** 새 문제 불러오기 */
    function loadNewQuestion() {
        if (questionNum >= totalQuestions) {
            showResults()
            return
        } else {
            questionNum++
            hintText.style.color = "#f3f3f3"
            currentQuestion = getRandomNumber()
            changeImage(quizImage, `teenieping/${currentQuestion}.png`)
            inputBox.value = ""
            textHint = answers[currentQuestion - 1].replace("핑", "").replace(/[^\s]/g, "◯") + "핑"
            updateUI()
            toggleElement(inputBox)
            toggleElement(submitButton)
            toggleElement(continueButton)
            continueStatus = 0
            inputBox.focus()
            inputBox.select()
        }
    }

    /** 결과창 보여주기 */
    function showResults() {
        usedNumbers = []
        toggleElement(continueButton)
        toggleElement(quizImage)
        toggleElement(hint)
    }

    /** 텍스트 업데이트 */
    function updateUI() {
        questionNumText.innerHTML = `Q${questionNum}`
        scoreText.innerHTML = `${score}/${totalQuestions}`
        hintText.innerHTML = textHint
    }

    function toggleElement(element) {
        element.style.display = element.style.display === "none" ? "block" : "none"
    }

    /** 엔터키 눌렀을 때 */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && continueStatus === 1) {
            loadNewQuestion()
        }
    })

    inputBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            continueStatus === 1 ? loadNewQuestion() : submitAnswer()
        }
    })

    document.addEventListener("click", (e) => {
        if (e.target === submitButton) submitAnswer()
        if (e.target === continueButton) loadNewQuestion()
    })

    loadNewQuestion()
    toggleElement(inputBox)
    toggleElement(submitButton)

    preloadImages()
})