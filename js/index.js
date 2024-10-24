// 끄고 키기
function toggleElement(id) {
    const element = document.getElementById(id)
    
    if (element.classList.contains("active")) {

        element.classList.remove("active")
        element.classList.add("hidden")

        setTimeout(() => {
            element.style.display = "none"
        }, 100)
    } else {
        element.style.display = "block"
        setTimeout(() => {
            element.classList.add("active")
            element.classList.remove("hidden")
        }, 10)
    }
}

// 쿠키 설정
function setCookie(cname, cvalue, exdays) {
    const date = new Date()
    date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000))
    let expires = "expires=" + date.toUTCString()

    // Determine the SameSite value
    let sameSiteValue = "SameSite=Lax; Secure" // Use Secure if you're using HTTPS

    // Set the cookie with the appropriate attributes
    document.cookie = `${cname}=${cvalue}; ${expires}; path=/; ${sameSiteValue}`
    console.log(`Cookie Set: ${cname}=${cvalue}; ${expires}; path=/; ${sameSiteValue}`)
}

// 쿠키 가져오기
function getCookie(cname) {
    let name = cname + "="
    let ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim()
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

// 질문 개수 쿠키 설정
function setQuestionNum() {
    const textInput = document.getElementById("noOfQuestionsInput").value

    if (textInput && !isNaN(textInput) && textInput > 0) {
        setCookie("totalQuestions", textInput, 365)
    }
}

// 질문 개수 가져오기
function loadQuestionNum() {
    const cookieValue = getCookie("totalQuestions")
    const inputField = document.getElementById("noOfQuestionsInput")
    if (cookieValue) inputField.value = cookieValue
}

window.onload = loadQuestionNum