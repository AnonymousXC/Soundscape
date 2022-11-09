function playRandomSong() {
    try {
        let recentEl = document.getElementById("recent-played-cards-el")
        let randomEl = recentEl.childNodes[Math.floor(Math.random() * recentEl.childNodes.length)]
        randomEl.getElementsByTagName("button")[0].click()
    } catch {}

    try {
        let favEl = document.getElementById("liked-cards-el")
        let randomEl = favEl.childNodes[Math.floor(Math.random() * favEl.childNodes.length)]
        randomEl.getElementsByTagName("button")[0].click()
    } catch {}
}

export { playRandomSong }