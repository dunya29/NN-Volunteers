document.addEventListener("DOMContentLoaded", () => {

    function select() {
        const SELECT_SELECTOR = '.js-select';
        const BTN_SELECTOR = '.js-select-btn';
        const LIST_SELECTOR = '.js-select-list';
        const OPTION_SELECTOR = '.js-select-option';

        const CLASS_ACTIVE = 'active';

        const SELECTS = document.querySelectorAll('.js-select');
        if (!SELECTS.length) return;

        function closeAllSelect() {
            const btnList = document.querySelectorAll(BTN_SELECTOR);
            const selectList = document.querySelectorAll(LIST_SELECTOR);

            btnList.forEach((el) => el.classList.remove(CLASS_ACTIVE));
            selectList.forEach((el) => el.classList.remove(CLASS_ACTIVE));
        }

        SELECTS.forEach((select) => {
            const btn = select.querySelector(BTN_SELECTOR);
            const selectList = select.querySelector(LIST_SELECTOR);
            const optionList = selectList.querySelectorAll(OPTION_SELECTOR);

            btn.addEventListener('click', (e) => {
                const target = e.target.closest(BTN_SELECTOR);

                if (target.classList.contains(CLASS_ACTIVE)) {
                    target.classList.remove(CLASS_ACTIVE);
                    selectList.classList.remove(CLASS_ACTIVE);
                } else {
                    closeAllSelect();
                    target.classList.add(CLASS_ACTIVE);
                    selectList.classList.add(CLASS_ACTIVE);
                }
            });


            selectList.addEventListener('click', (e) => {
                const target = e.target.closest(OPTION_SELECTOR);

                if (target) {
                    const value = target.getAttribute('data-value');
                    const content = target.innerHTML;
                    const selectItem = target.textContent;

                    optionList.forEach((option) => option.classList.remove(CLASS_ACTIVE));

                    target.classList.add(CLASS_ACTIVE);
                    btn.classList.remove(CLASS_ACTIVE);
                    btn.innerHTML = content;
                    btn.setAttribute('data-value', value);
                    selectList.classList.remove(CLASS_ACTIVE);
                    if (document.getElementById('select-service')) document.getElementById('select-service').value = selectItem;
                }
            });
        });

        document.addEventListener('click', (e) => {
            const target = e.target;

            if (target && !target.closest(SELECT_SELECTOR)) {
                closeAllSelect();
            }
        });
    }

    select();

    const swiperFoucs = document.querySelector('.focus__swiper');

    if (swiperFoucs) {
        const workSlider = new Swiper(swiperFoucs, {
            slidesPerView: 'auto',
            loop: false,
            effect: 'fade',
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.focus__next',
                prevEl: '.focus__prev',
            },
        });

        workSlider.on('slideChange', function () {
            focusItem.forEach(el => {
                el.classList.remove('active');
            });

            document.querySelector(`.focus-articles__item[data-index="${workSlider.realIndex}"]`).classList.add('active');
        })

        const focusItem = document.querySelectorAll('.focus-articles__item');
        focusItem.forEach((el, idx) => {
            el.setAttribute('data-index', idx)
            el.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;

                focusItem.forEach(el => {
                    el.classList.remove('active');
                })

                e.currentTarget.classList.add('active');

                workSlider.slideTo(index);
            })
        })
    }

    function menu() {
        const windowEl = window;
        const documentEl = document;
        const htmlEl = document.documentElement;
        const bodyEl = document.body;


        const headerHeight = document?.querySelector('.header').offsetHeight;
        document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);


        function disableScroll() {
            const fixBlocks = document?.querySelectorAll('.fixed-block');
            const pagePosition = window.scrollY;
            const paddingOffset = `${(windowEl.innerWidth - bodyEl.offsetWidth)}px`;

            fixBlocks.forEach(el => {
                el.style.paddingRight = paddingOffset;
            });
            bodyEl.style.paddingRight = paddingOffset;
            bodyEl.classList.add('dis-scroll');
            bodyEl.dataset.position = pagePosition;
            bodyEl.style.top = `-${pagePosition}px`;
        }

        function enableScroll() {
            const fixBlocks = document?.querySelectorAll('.fixed-block');
            const body = document.body;
            const pagePosition = parseInt(bodyEl.dataset.position, 10);
            fixBlocks.forEach(el => {
                el.style.paddingRight = '0px';
            });
            bodyEl.style.paddingRight = '0px';
            bodyEl.style.top = 'auto';
            bodyEl.classList.remove('dis-scroll');
            window.scroll({
                top: pagePosition,
                left: 0
            });
            bodyEl.removeAttribute('data-position');
        }

        const burger = document?.querySelector('[data-burger]');
        const menu = document?.querySelector('[data-menu]');

        burger?.addEventListener('click', (e) => {
            burger?.classList.toggle('burger--active');
            menu?.classList.toggle('menu--active');

            if (menu?.classList.contains('menu--active')) {
                burger?.setAttribute('aria-expanded', 'true');
                burger?.setAttribute('aria-label', 'Закрыть меню');
                disableScroll();
            } else {
                burger?.setAttribute('aria-expanded', 'false');
                burger?.setAttribute('aria-label', 'Открыть меню');
                enableScroll();
            }
        });

        const appHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        };
        window.addEventListener('resize', appHeight);
        appHeight();
    }

    menu();

    // function headerMenu() {

    //     const dropDown = document.querySelectorAll('.nav__item');

    //     dropDown.forEach(el => {
    //         el.addEventListener('click', (e) => {
    //             const self = e.currentTarget;
    //             const control = self.querySelector('.nav__link');
    //             const content = self.querySelector('.nav__submenu');

    //             self.classList.toggle('open');

    //             // если открыт аккордеон
    //             if (self.classList.contains('open')) {
    //                 content.style.maxHeight = 74 + content.scrollHeight + 'px';
    //             } else {
    //                 content.style.maxHeight = null;
    //             }
    //         });
    //     });

    // };

    // headerMenu();

    function footerDropDwon() {

        const dropDown = document.querySelectorAll('.dropdown-footer');

        dropDown.forEach(el => {
            el.addEventListener('click', (e) => {
                const self = e.currentTarget;
                const control = self.querySelector('.footer-link');
                const content = self.querySelector('.footer-nav');

                self.classList.toggle('open');

                // если открыт аккордеон
                if (self.classList.contains('open')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        });

    };

    footerDropDwon();

    if (document.getElementById("phone-number")) {
        const phoneMask = () => {
            const mask = (input) => {
                let matrix = "+7 (___) ___-__-__";
                let i = 0;
                let def = matrix.replace(/\D/g, "");
                let val = input.value.replace(/\D/g, "");

                if (def.length >= val.length) val = def;
                input.value = matrix.replace(/./g, function (a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
                });
            };

            const number = document.getElementById("phone-number");
            number.addEventListener("click", function () {
                number.addEventListener("input", mask.bind(null, number), false);
                number.addEventListener("focus", mask.bind(null, number), false);
                number.addEventListener("blur", mask.bind(null, number), false);
            });
        };

        phoneMask();
    }

    //  Валидация и отправка формы
    const formSubmission = () => {
      const form = document.querySelector(".js-form");
      
      if (form) {
        const pristine = new Pristine(form);
        form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const valid = pristine.validate();
            if (valid == true) {
              evt.target.submit();
              form.reset();
            }
          });
      }
    };

    formSubmission();

    
function hero() {
    const hero = document.querySelector('.hero');
  
    if (hero) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(hero, {
        scrollTrigger: {
          trigger: hero,
          start: '1800 bottom',
          scrub: true,
        },
        opacity: 0,
      })
    }
  }
  
  hero();
    const swiperThumb = new Swiper(".swiper--topical-thumb", {
        slidesPerView: 'auto',
        freeMode: false,
        watchSlidesProgress: false,
        allowTouchMove: false,
    });
    const swiperTopical = new Swiper(".swiper--topical", {
        spaceBetween: 10,
        slidesPerView: 'auto',
        navigation: {
            nextEl: ".topical__next",
            prevEl: ".topical__prev",
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        thumbs: {
            swiper: swiperThumb,
        },
        on: {
            slideChange() {
                const currentSlide = this.realIndex + 1;
                const sliderSlideCurrent = document.querySelector('.current-slide');
                sliderSlideCurrent.textContent = currentSlide;
            },
            beforeInit() {
                const numOfSlides = this.wrapperEl.querySelectorAll('.swiper-slide').length;
                const totalSlide = document.querySelector('.total-slides');
                totalSlide.textContent = numOfSlides;
            },
        },
    });

    const showPopupBtns = document.querySelectorAll('.js-show-popup');
    const popups = document.querySelectorAll('.js-popup');
    const body = document.body;
    const overlay = document.querySelector('.js-overlay');

    const CLASS_ACTIVE = 'active';
    const CLASS_OVERFLOW = 'overflow';

    const popupsFunc = (() => {
        const showPopup = (event) => {
            const openBtn = event.target.closest('.js-show-popup');
            const activePopup = document.querySelector('.js-popup.active');
            const targetPopup = document.querySelector(`[data-popup=${openBtn.dataset.trigger}]`);

            if (activePopup) {
                activePopup.classList.remove(CLASS_ACTIVE);
            }

            if (openBtn.dataset.tab) {
                targetPopup.querySelector(`[data-tab="${openBtn.dataset.tab}"]`).classList.add(CLASS_ACTIVE);
                targetPopup.querySelector(`[data-content="${openBtn.dataset.tab}"]`).classList.add(CLASS_ACTIVE);
            }

            targetPopup.classList.add(CLASS_ACTIVE);
            body.classList.add(CLASS_OVERFLOW);
            overlay.classList.add(CLASS_ACTIVE);
        };

        const hidePopup = (activePopup) => {
            if (!activePopup) {
                return;
            }
            body.classList.remove(CLASS_OVERFLOW);
            overlay.classList.remove(CLASS_ACTIVE);
            activePopup.classList.remove(CLASS_ACTIVE);

            if (document.querySelector('.active[data-content]') && document.querySelector('.active[data-tab]')) {
                document.querySelector('.active[data-content]').classList.remove(CLASS_ACTIVE);
                document.querySelector('.active[data-tab]').classList.remove(CLASS_ACTIVE);
            }
        };


        const showPopupInit = () => {
            if (showPopupBtns.length) {
                showPopupBtns.forEach((opener) => {
                    opener.addEventListener('click', (event) => {
                        showPopup(event);
                    });
                });
            }

            if (overlay) {
                overlay.addEventListener('click', () => {
                    hidePopup(document.querySelector('.js-popup.active'));
                });
            }
            if (popups.length) {
                popups.forEach((popup) => {
                    popup.addEventListener('click', (event) => {
                        const closeBtn = event.target.closest('.js-popup-close');
                        if (!closeBtn) {
                            return;
                        }
                        hidePopup(popup);
                    });
                });
            }
        };

        const init = () => {
            if (popups.length) {
                showPopupInit();
            }
        };

        return {
            init,
        };
    })();

    jQuery(document).ready(function ($) {
        document.addEventListener('wpcf7mailsent', function (event) {
            const targetPopup = document.querySelector('[data-popup=some-popup]');

            targetPopup.classList.add(CLASS_ACTIVE);
            body.classList.add(CLASS_OVERFLOW);
            overlay.classList.add(CLASS_ACTIVE);

        }, false);
    });

    popupsFunc.init();


    function searchBox() {
        const searchBtn = document.querySelector('.btn-search');
        const search = document.querySelector('.header__search');
    
        if (search) {
          searchBtn.addEventListener('click', () => {
            search.classList.toggle('active');
            searchBtn.classList.toggle('active');
          })
    
          document.addEventListener('click', (e) => {
            if (!e.target.classList.contains('header__search') && !e.target.closest('.header__search') && !e.target.classList.contains('btn-search')) {
              search.classList.remove('active');
              searchBtn.classList.remove('active');
            }
          });
        }
      }
    
     searchBox();
     const accordions = document.querySelectorAll('.accordion'); //находим все аккардионы

     accordions.forEach(el => {
       el.addEventListener('click', (e) => {
         const self = e.currentTarget;
         const control = self.querySelector('.accordion__control'); //
         const content = self.querySelector('.accordion__content'); //то что будем открывать
   
         self.classList.toggle('open');
   
   
         // если открыт аккордеон
         if (self.classList.contains('open')) {
           control.setAttribute('aria-expanded', true);
           content.setAttribute('aria-hidden', false);
           content.style.maxHeight = content.scrollHeight + 'px';
           console.log('test')
         } else {
           control.setAttribute('aria-expanded', false);
           content.setAttribute('aria-hidden', true);
           content.style.maxHeight = null;
         }
       });
     });
});