class REVIEWSLIDER {
    constructor() {
        this.sliderOne = null;
        this.sliderTwo = null;
        this.$newPaginationItems = "";
        this.sliderItem = document.querySelector("[review-slider]");
        this.carouselWrapper = document.querySelector("[carousel='list']");
        this.init();
    }
    init() {
        this.activateSlider();
        this.activateCarousel();
        this.checkAndPlayPause();
    }

    //function to check the section comes into view.
    isInViewport(secEle) {
        var elementTop = $(secEle).offset().top;
        var elementBottom = elementTop + $(secEle).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    checkAndPlayPause() {
        window.addEventListener("scroll", () => {
            if (this.isInViewport(this.sliderItem) && !this.isPlaying) {
                this.sliderOne.slick("slickPlay");
                this.isPlaying = true;
            } else if (!this.isInViewport(this.sliderItem) && this.isPlaying) {
                this.sliderOne.slick("slickPause");
                this.isPlaying = false;
            }
        });
    }
    // activate slider
    activateSlider() {
        const $paginationBox = document.querySelector("[bread-crums-box]");
        const $patinationItem = $paginationBox.querySelectorAll("[breadcrum='dot']");
        // initially it will add the hide class to all the image-col and content-col(except the first one.)
        $("[review-slider]").on("init", (event) => {
            let slides = event.currentTarget.querySelectorAll(".slick-slide");
            slides.forEach((slide, index) => {
                if (index != 0) {
                    slide.querySelector("[review-container]").classList.add("hide");
                }
            });
        });
        this.sliderOne = $('[review-slider]').slick({
            dots: false,
            slidesToScroll: 1,
            slidesToShow: 1,
            infinite: true,
            autoplay: false,
            autoplaySpeed: 2000,
            arrows: false,
            speed: 200,
            fade: true,
            cssEase: "linear",
            appendDots: $paginationBox,
        });
        $patinationItem.forEach((item, index) => {
            item.setAttribute("item-ixd", index)
        })
        // replace the old dots array to new one -> animate.
        this.$newPaginationItems = $paginationBox.querySelectorAll("[breadcrum='dot']");
        // initial it starts from the first dot.
        this.addRemoveActive();
        // adding event listener into the dots, reviews.
        this.$newPaginationItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                const currIdx = e.currentTarget.getAttribute("item-ixd")
                this.sliderOne.slick("slickGoTo", currIdx);
                this.addRemoveActive(currIdx);
            });
        });
        this.sliderOne.on("swipe", (event, slick, direction) => {
            if (direction === "right") {
                this.addRemoveActive(slick.currentSlide);
            } else if (direction === "left") {
                this.addRemoveActive(slick.currentSlide);
            }
        });
        // show component one by one.
        this.sliderOne.on(
            "afterChange",
            (event, slick, currentSlide, nextSlide) => {
                let contentEle = event.target
                    .querySelector(".slick-active")
                    .querySelector("[review-container]");
                setTimeout(() => contentEle.classList.remove("hide"), 300);
                this.addRemoveActive(currentSlide);
            }
        );
        // hide component
        this.sliderOne.on(
            "beforeChange",
            (event, slick, currentSlide, nextSlide) => {
                let contentEle = event.target
                    .querySelector(".slick-active")
                    .querySelector("[review-container]");
                setTimeout(() => contentEle.classList.add("hide"), 20);
            }
        );
    }
    // remove and add active class into the dots.
    addRemoveActive(index = 0) {
        this.$newPaginationItems.forEach((item) =>
            item.classList.remove("active")
        );
        this.$newPaginationItems[index].classList.add("active");
    }

    activateCarousel(){
        let [prev, next] = document.querySelectorAll("[data-navi]");
        this.sliderTwo = $("[carousel='list']").slick({
            dots: false,
            slidesToScroll: 1,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 4000,
            variableWidth: true,
            arrows: false,
            centerMode: false,
            focusOnSelect:true,
            arrows: true,
            prevArrow: prev,
            nextArrow: next,
          });
    }
}
new REVIEWSLIDER();