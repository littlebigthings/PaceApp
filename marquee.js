
function Marquee() {
    let scrollElem = document.querySelector("[data-slider='vertical']");
    let marginToSet =window.getComputedStyle(document.querySelector("[logo-item='item']")).getPropertyValue("margin-bottom");
    if(scrollElem != undefined || scrollElem != null){
        $(scrollElem).marquee({
            //duration in milliseconds of the marquee
            duration: 20000,
            //gap in pixels between the tickers
            gap: marginToSet,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 200,
            //'left' or 'right'
            direction: 'up',
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            startVisible :true,
        });
    }
  }
  Marquee()