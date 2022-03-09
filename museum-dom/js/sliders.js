$(document).ready(function(){
    $('.welcome__slider--inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $('.welcome__slider--control-btn'),
        appendDots: $('.welcome__slider--control'),
        prevArrow: ' <button class="welcome__slider--control_arrow welcome__slider--control_arrowL"></button>',
        nextArrow: '<button class="welcome__slider--control_arrow welcome__slider--control_arrowR"></button>',
        dots: true,
        dotsClass: 'welcome__slider--control_boolet'
    });

    $('.welcome__slider--inner').on('afterChange', function(event, slick, currentSlide){
        document.querySelector('.span__num').textContent = `0${currentSlide+1}`;
      });

  });
