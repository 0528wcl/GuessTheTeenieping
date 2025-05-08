function replaceText(a) {
    if (a.nodeType === Node.TEXT_NODE) {
        a.textContent = "tralalero tralala"
    } else{
        for(let child of a.childNodes) replaceText(child)
    }
}

replaceText(document.body)