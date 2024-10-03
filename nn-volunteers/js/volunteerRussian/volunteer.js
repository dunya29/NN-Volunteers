const swiperExperince = document?.querySelector('.swiper--experience');
const experienceSlider = new Swiper(swiperExperince, {
    slidesPerView: 'auto',
    loop: false,
  
    // Navigation arrows
    navigation: {
      nextEl: '.experience__next',
      prevEl: '.experience__prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
  });

const swiperHistory = document?.querySelector('.swiper--history');

const historySlider = new Swiper(swiperHistory, {
    slidesPerView: 'auto',
    loop: false,
  
    // Navigation arrows
    navigation: {
      nextEl: '.valounteer-history__next',
      prevEl: '.valounteer-history__prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
  });
jQuery(document).ready(function($) {
    $('.js-anchor').click(function () {
      var elementClick = $(this).attr('href');
      var destination = $(elementClick).offset().top - $(".header").height() - 70
      if (document.querySelector(".burger--active")) {
        document.querySelector(".burger--active").click()
      }
      $('html,body').animate({ scrollTop: destination }, 1000);
      return false;
  });
})