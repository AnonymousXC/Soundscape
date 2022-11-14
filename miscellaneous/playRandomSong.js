function playRandomSong() {
    try {
        let recentEl = [...document.getElementById("recent-played-cards-el").childNodes, ...document.getElementById("trending-today-cards").childNodes]
        let randomEl = recentEl[Math.floor(Math.random() * recentEl.length)]
        randomEl.getElementsByTagName("button")[0].click()
    } catch(err) { console.log(err);}

    try {
        let favEl = document.getElementById("liked-cards-el")
        let randomEl = favEl.childNodes[Math.floor(Math.random() * favEl.childNodes.length)]
        randomEl.getElementsByTagName("button")[0].click()
    } catch {}
    
}

export { playRandomSong }