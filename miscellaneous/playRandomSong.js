function playRandomSong() {
    let recentEl = document.getElementById("recent-played-cards-el")
    let randomEl = recentEl.childNodes[Math.floor(Math.random() * recentEl.childNodes.length)]
    randomEl.getElementsByTagName("button")[0].click()
}

export { playRandomSong }