// javascript event handlers https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
// hier wird die scroll Funktion abgehört, immer wenn der User scrollt wird die gesamte Funktion ausgeführt
window.onscroll = function() {
    //alle Elemente mit dem Tag article werden in die Variable articles geschrieben, diese ist ein Array mit allenfalls mehreren Einträgen
    let articles = document.getElementsByTagName("article");

    //hier wird durch alle Einträge im Array durchgeloopt
    //
    for (let i = 0; i < articles.length; i++) {
        // bei jedem einzelnen wird abgetragt, wo er sich im Moment in Bezug auf den Viewport befindet
        let domRect = articles[i].getBoundingClientRect();
        /* https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect*/

        //falls die Distanz der oberen Ecke zum viewport kleiner ist als die Höhe des viewports
        // ist das Element entweder im viewport oder bereits oben wieder rausgerutscht
        if (domRect.top < window.innerHeight) {
            console.log("ich bin im viewport");
            articles[i].setAttribute("class", "myclass");

            // falls der untere Punkt im Minus liegt ist es oben rausgerutscht
            if (domRect.bottom < 0) {
                console.log("ich bin oben rausgerutscht");
                articles[i].classList.remove("myclass");
            }
        } else {
            console.log("ich bin noch nicht im viewport");
            articles[i].classList.remove("myclass");
        }

        // die console.log könnt ihr im live modus auskommentieren! Sind bloss zum Testen da.

    }
};