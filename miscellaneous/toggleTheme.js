

function toogleCurrTheme() {
    let currTheme = window.getComputedStyle(document.body).filter
    console.log(currTheme);
    if(currTheme === "none" || currTheme === "invert(0)")
    {
        document.body.style.filter = "invert(1)"
        document.styleSheets[0].cssRules[2].style.filter = "invert(1)"
    }
    else
    {
        document.body.style.filter = "invert(0)"
        document.styleSheets[0].cssRules[2].style.filter = "invert(0)"
    }
}

export default toogleCurrTheme