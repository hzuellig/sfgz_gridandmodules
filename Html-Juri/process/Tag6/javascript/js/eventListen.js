window.onscroll = function() {
    let articles = document.getElementsByTagName("article");
    articles[0].setAttribute("class", "myclass");

    let i;
    for (i = 0; i < articles.length; i++) {
        articles[i].setAttribute("class", "myclass");
    }
};