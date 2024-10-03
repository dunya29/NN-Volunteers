/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_ex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ex */ "./src/js/components/ex.js");


/***/ }),

/***/ "./src/js/components/ex.js":
/*!*********************************!*\
  !*** ./src/js/components/ex.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graph_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graph-tabs */ "./node_modules/graph-tabs/src/graph-tabs.js");
// Реализация табов

const profileTabs = document.querySelector('.profile__tabs');
if (profileTabs) {
  const tabs = new graph_tabs__WEBPACK_IMPORTED_MODULE_0__["default"]('profile');
}
const cityNizhny = document.querySelector('.city-nizhny');
if (cityNizhny) {
  const cityAnother = document.querySelector('.city-another');
  const input1 = cityNizhny.querySelector('input');
  input1.addEventListener('change', () => {
    if (input1.checked) {
      $('.js-city_area-spoiler').slideUp(300);
      $('.js-city_nizhny-spoiler').slideDown(300);
    }
  });
  const input2 = cityAnother.querySelector('input');
  input2.addEventListener('change', () => {
    if (input2.checked) {
      $('.js-city_nizhny-spoiler').slideUp(300);
      $('.js-city_area-spoiler').slideDown(300);
    }
  });
}
const testTimer = document.querySelector('#timer');
if (testTimer) {
  // const countDownEl = document.getelementById("#timer-minutes");
  const test = document.querySelector('.test');
  const testEnd = document.querySelector('.test__end');
  function updateCountdown() {
    let _time = Math.floor((Date.now() - start) / 1000);
	let timer = time - parseInt(_time);
	const minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    if(_time < time) {
		testTimer.innerHTML = `${minutes}:${seconds}`;
	}
    if (minutes <= 4) {
      testTimer.style.color = '#FF4D1C';
    }
    const form = document.querySelector('form');
    const formData = new FormData(form);
    formData.set('formid', 'save');
    if (_time >= time) {
        form.submit();
    } else {
        $.ajax({
            url : '/forms/',
            type: 'POST',
            data: formData,
            cache : false,
            processData: false,
            contentType: false,
        });
    }
  }
  setInterval(updateCountdown, 1000);
};
/*
const testSubmitBtn = document.querySelector('#test-submit');
if (testSubmitBtn) {
  const test = document.querySelector('.test');
  const testEnd = document.querySelector('.test__end');
  testSubmitBtn.addEventListener('click', e => {
    e.preventDefault();
    test.classList.add('hide');
    testEnd.classList.add('active');
  });
}
*/

// Input file
const fileInputWrap = document.querySelector('.upload__area');
const inputs = document.querySelectorAll('.input__file');
if (fileInputWrap) {
  const input = fileInputWrap.querySelector('input[type="file"]');
  let label = fileInputWrap.querySelector('.upload__area_text');
  let labelVal = label.querySelector('.user-file').innerText;
  input.addEventListener('change', function (e) {
    $('input[name="file"]').val('');
    let countFiles = '';
    if (this.files && this.files.length >= 1) countFiles = this.files.length;
    if (countFiles)
      // label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
      label.querySelector('.user-file').innerText = this.files[0].name;else label.querySelector('.user-file').innerText = labelVal;
    const uploadReq = document.querySelector('.upload__required');
    var fname = this.files[0].name;
    // var re = /(\.jpg|\.jpeg|\.pdf)$/i;
    // !re.exec(fname)
    var ext = fname.split('.').pop()
    if (!(ext === 'jpg' || ext === 'jpeg' || ext === 'pdf') || this.files[0].size >= 10485760) {
      uploadReq.classList.add('active');
      input.value = '';
      label.querySelector('.user-file').innerText = labelVal;
    } else {
      uploadReq.classList.remove('active');
        let formData = new FormData();
        formData.set('file', this.files[0]);
        formData.set('action', 'upload');
        $.ajax({
            url : '/actions/',
            type : "POST",
            data : formData,
            contentType : false,
            processData : false
        }).done(function(response){
            response = JSON.parse(response);
            if(response.success && typeof response.file !== 'undefined') {
                $('input[name="file"]').val(response.file);
                showMessages('info', 'Файл загружен')
            } else if(typeof response.message !== undefined) {
                showMessages('error', response.messages);
            }
        }).fail(function(){
            showMessages('error', 'Произошла ошибка')
        });
    }
  });
}

// change res of the test
const resInputs = document.querySelectorAll('.vol_ball_cur');
if (resInputs.length != 0) {
  const testResult = document.querySelector('#test-result');
  let res = 0;
  for (let i = 0; i < resInputs.length; i++) {
    res += parseInt(resInputs[i].value);
  }
  testResult.innerHTML = res;
  for (let j = 0; j < resInputs.length; j++) {
    resInputs[j].addEventListener('change', () => {
      let res = 0;
      for (let i = 0; i < resInputs.length; i++) {
        res += parseInt(resInputs[i].value);
      }
      testResult.innerHTML = res;
    });
  }
}

// password check
const passwordForm = document.querySelector('#password-form');
if (passwordForm) {
  const infoItems = passwordForm.querySelectorAll('input');
 console.log(infoItems);
  const passwordsError = document.querySelector('.passwords-error');
  const passwordSubmit = passwordForm.querySelector('.content-block__more');
  infoItems[2].addEventListener('input', () => {
    if (infoItems[1].value != '' && infoItems[2].value != infoItems[1].value) {
      passwordsError.classList.add('visible');
      passwordSubmit.classList.add('disabled');
    } else {
      passwordsError.classList.remove('visible');
      passwordSubmit.classList.remove('disabled');
    }
  });
  infoItems[1].addEventListener('input', () => {
    if (infoItems[0].value != '' && infoItems[0].value != infoItems[1].value) {
      passwordsError.classList.add('visible');
      passwordSubmit.classList.add('disabled');
    } else {
      passwordsError.classList.remove('visible');
      passwordSubmit.classList.remove('disabled');
    }
  });
}

/***/ }),

/***/ "./node_modules/graph-tabs/src/graph-tabs.js":
/*!***************************************************!*\
  !*** ./node_modules/graph-tabs/src/graph-tabs.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GraphTabs)
/* harmony export */ });
class GraphTabs {
  constructor(selector, options) {
    let defaultOptions = {
      isChanged: () => {}
    }
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = document.querySelector(`[data-tabs="${selector}"]`);
    if (this.tabs) {
      this.tabList = this.tabs.querySelector('.tabs__nav');
      this.tabsBtns = this.tabList.querySelectorAll('.tabs__nav-btn');
      this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
    } else {
      console.error('Селектор data-tabs не существует!');
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if (document.querySelectorAll(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error('Количество элементов с одинаковым data-tabs больше одного!');
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error('Количество кнопок и элементов табов не совпадает!');
      return;
    }
  }

  init() {
    this.tabList.setAttribute('role', 'tablist');

    this.tabsBtns.forEach((el, i) => {
      el.setAttribute('role', 'tab');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('id', `${this.selector}${i + 1}`);
      el.classList.remove('tabs__nav-btn--active');
    });

    this.tabsPanels.forEach((el, i) => {
      el.setAttribute('role', 'tabpanel');
      el.setAttribute('tabindex', '-1');
      el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
      el.classList.remove('tabs__panel--active');
    });

    this.tabsBtns[0].classList.add('tabs__nav-btn--active');
    this.tabsBtns[0].removeAttribute('tabindex');
    this.tabsBtns[0].setAttribute('aria-selected', 'true');
    this.tabsPanels[0].classList.add('tabs__panel--active');
  }

  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        let currentTab = this.tabList.querySelector('[aria-selected]');

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });

      el.addEventListener('keydown', (e) => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);

        let dir = null;

        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = 'down';
        } else {
          dir = null;
        }

        if (dir !== null) {
          if (dir === 'down') {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }

  switchTabs(newTab, oldTab = this.tabs.querySelector('[aria-selected]')) {
    newTab.focus();
    newTab.removeAttribute('tabindex');
    newTab.setAttribute('aria-selected', 'true');

    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');

    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

    this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
    this.tabsPanels[index].classList.add('tabs__panel--active');

    this.tabsBtns[oldIndex].classList.remove('tabs__nav-btn--active');
    this.tabsBtns[index].classList.add('tabs__nav-btn--active');

    this.options.isChanged(this);
  }
}

/***/ }),

/***/ "./src/js/vendor/datatables-ru.json":
/*!******************************************!*\
  !*** ./src/js/vendor/datatables-ru.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"processing":"Подождите...","search":"Поиск:","lengthMenu":"Показать _MENU_ записей","info":"Записи с _START_ до _END_ из _TOTAL_ записей","infoEmpty":"Записи с 0 до 0 из 0 записей","infoFiltered":"(отфильтровано из _MAX_ записей)","loadingRecords":"Загрузка записей...","zeroRecords":"Записи отсутствуют.","emptyTable":"В таблице отсутствуют данные","paginate":{"first":"Первая","previous":"Предыдущая","next":"Следующая","last":"Последняя"},"aria":{"sortAscending":": активировать для сортировки столбца по возрастанию","sortDescending":": активировать для сортировки столбца по убыванию"},"select":{"rows":{"1":"Выбрана одна запись","_":"Выбрано записей: %d"},"cells":{"1":"Выбрана 1 ячейка ","_":"Выбрано %d ячеек"},"columns":{"1":"Выбран 1 столбец ","_":"Выбрано %d столбцов "}},"searchBuilder":{"conditions":{"string":{"startsWith":"Начинается с","contains":"Содержит","empty":"Пусто","endsWith":"Заканчивается на","equals":"Равно","not":"Не","notEmpty":"Не пусто","notContains":"Не содержит","notStartsWith":"Не начинается на","notEndsWith":"Не заканчивается на"},"date":{"after":"После","before":"До","between":"Между","empty":"Пусто","equals":"Равно","not":"Не","notBetween":"Не между","notEmpty":"Не пусто"},"number":{"empty":"Пусто","equals":"Равно","gt":"Больше чем","gte":"Больше, чем равно","lt":"Меньше чем","lte":"Меньше, чем равно","not":"Не","notEmpty":"Не пусто","between":"Между","notBetween":"Не между ними"},"array":{"equals":"Равно","empty":"Пусто","contains":"Содержит","not":"Не равно","notEmpty":"Не пусто","without":"Без"}},"data":"Данные","deleteTitle":"Удалить условие фильтрации","logicAnd":"И","logicOr":"Или","title":{"0":"Конструктор поиска","_":"Конструктор поиска (%d)"},"value":"Значение","add":"Добавить условие","button":{"0":"Конструктор поиска","_":"Конструктор поиска (%d)"},"clearAll":"Очистить всё","condition":"Условие","leftTitle":"Превосходные критерии","rightTitle":"Критерии отступа"},"searchPanes":{"clearMessage":"Очистить всё","collapse":{"0":"Панели поиска","_":"Панели поиска (%d)"},"count":"{total}","countFiltered":"{shown} ({total})","emptyPanes":"Нет панелей поиска","loadMessage":"Загрузка панелей поиска","title":"Фильтры активны - %d","showMessage":"Показать все","collapseMessage":"Скрыть все"},"buttons":{"pdf":"PDF","print":"Печать","collection":"Коллекция <span class=\\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\\"></span>","colvis":"Видимость столбцов","colvisRestore":"Восстановить видимость","copy":"Копировать","copyKeys":"Нажмите ctrl or u2318 + C, чтобы скопировать данные таблицы в буфер обмена.  Для отмены, щелкните по сообщению или нажмите escape.","copyTitle":"Скопировать в буфер обмена","csv":"CSV","excel":"Excel","pageLength":{"1":"Показать 1 строку","-1":"Показать все строки","_":"Показать %d строк"},"removeState":"Удалить","renameState":"Переименовать","copySuccess":{"1":"Строка скопирована в буфер обмена","_":"Скопировано %d строк в буфер обмена"},"createState":"Создать состояние","removeAllStates":"Удалить все состояния","savedStates":"Сохраненные состояния","stateRestore":"Состояние %d","updateState":"Обновить"},"decimal":".","infoThousands":",","autoFill":{"cancel":"Отменить","fill":"Заполнить все ячейки <i>%d<i></i></i>","fillHorizontal":"Заполнить ячейки по горизонтали","fillVertical":"Заполнить ячейки по вертикали","info":"Информация"},"datetime":{"previous":"Предыдущий","next":"Следующий","hours":"Часы","minutes":"Минуты","seconds":"Секунды","unknown":"Неизвестный","amPm":["AM","PM"],"months":{"0":"Январь","1":"Февраль","2":"Март","3":"Апрель","4":"Май","5":"Июнь","6":"Июль","7":"Август","8":"Сентябрь","9":"Октябрь","10":"Ноябрь","11":"Декабрь"},"weekdays":["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]},"editor":{"close":"Закрыть","create":{"button":"Новый","title":"Создать новую запись","submit":"Создать"},"edit":{"button":"Изменить","title":"Изменить запись","submit":"Изменить"},"remove":{"button":"Удалить","title":"Удалить","submit":"Удалить","confirm":{"1":"Вы точно хотите удалить 1 строку?","_":"Вы точно хотите удалить %d строк?"}},"multi":{"restore":"Отменить изменения","title":"Несколько значений","noMulti":"Это поле должно редактироватся отдельно, а не как часть групы","info":"Выбранные элементы содержат разные значения для этого входа.  Чтобы отредактировать и установить для всех элементов этого ввода одинаковое значение, нажмите или коснитесь здесь, в противном случае они сохранят свои индивидуальные значения."},"error":{"system":"Возникла системная ошибка (<a target=\\"\\\\\\" rel=\\"nofollow\\" href=\\"\\\\\\">Подробнее</a>)."}},"searchPlaceholder":"Что ищете?","stateRestore":{"creationModal":{"button":"Создать","search":"Поиск","columns":{"search":"Поиск по столбцам","visible":"Видимость столбцов"},"name":"Имя:","order":"Сортировка","paging":"Страницы","scroller":"Позиция прокрутки","searchBuilder":"Редактор поиска","select":"Выделение","title":"Создать новое состояние","toggleLabel":"Включает:"},"removeJoiner":"и","removeSubmit":"Удалить","renameButton":"Переименовать","duplicateError":"Состояние с таким именем уже существует.","emptyError":"Имя не может быть пустым.","emptyStates":"Нет сохраненных состояний","removeConfirm":"Вы уверены, что хотите удалить %s?","removeError":"Не удалось удалить состояние.","removeTitle":"Удалить состояние","renameLabel":"Новое имя для %s:","renameTitle":"Переименовать состояние"},"thousands":" "}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_datatables_ru_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor/datatables-ru.json */ "./src/js/vendor/datatables-ru.json");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_components */ "./src/js/_components.js");
$(document).ready(function () {
  if ($("#aero_phone").length) {
    $("#aero_phone").inputmask('9-999-999-99-99');
  }
  if ($("#law_phone").length) {
    $("#law_phone").inputmask('9-999-999-99-99');
  }
  $("#become_vol").validate({
    errorElement: "div",
    ignore: ":hidden",
    errorPlacement: function(error, element) {
      if (element.attr("name") == "proficiency_in_english" || element.attr("name") == "size_clothes" || element.attr("name") == "size_clothes_niz" || element.attr("name") == "city" || element.attr("name") == "state[]") {
        error.insertBefore(element);
      } else {
        error.insertAfter(element);
      }
    },
    rules: {
      fullname: {
        required: true
      },
      dob: {
        required: true
      },
      user_dob_agreement: {
        required: true,
        accept: "pdf|jpg|jpeg",
        extension: "pdf|jpg|jpeg"
      },
      user_photo: {
        required: true
      },
      gender: {
        required: true
      },
      citizenship: {
        required: true
      },
      phone: {
        required: true
      },
      email: {
        required: true
      },
      vk_link: {
        required: true,
        url: true
      },
      tg_link: {
        required: false,
        url: true
      },
      inst_link: {
        required: true
      },
      preferred_direction_of_volunteering: {
        required: true
      },
      preferred_direction_of_volunteering_sob: {
        required: true
      },
      proficiency_in_english: {
        required: true,
      },
      other_languages: {
        required: true
      },
      other_lang_text: {
        required: true
      },
      proficiency_in_other_lang: {
        required: true
      },
      size_clothes: {
        required: true,
      },
      size_clothes_niz: {
        required: true
      },
      city: {
        required: true
      },
      city_area: {
        required: true
      },
      study_place: {
        required: true
      },
      study_class: {
        required: true
      },
      study_family: {
        required: true
      },
      volunteered_at_the_сhampionships: {
        required: true
      },
      volunteered_at_the_forum: {
        required: true
      },
      experience: {
        required: true
      },
      state_awards: {
        required: true
      },
      experience_leading: {
        required: true
      },
      why_volunteer: {
        required: true
      },
      work: {
        required: true
      },
      passport_ser_num: {
        required: true
      },
      passport_date: {
        required: true
      },
      passport_who: {
        required: true
      },
      passport_address: {
        required: true
      },
      passport_address_fact: {
        required: true
      },
      trustee: {
        required: true
      },
      terms_ok: {
        required: true
      },
      terms_ok2: {
        required: true
      },
      user_dob_fio: {
        required: true
      },
      user_dob_phone: {
        required: true
      },
      fullname_f: {
        required: true
      },
      fullname_i: {
        required: true
      },
      fullname_o: {
        required: true
      },
      law_name: {
        required: true
      },
      law_phone: {
        required: true
      },
      address: {
        required: true
      },
      upload: {
        required: true
      },
      agree: {
        required: true
      },
      state: {
        required: true
      },
      other_city: {
        required: true
      },
      "state[]": {
        required: true
      },
      last_name: {
        required: true
      },
      middle_name: {
        required: true
      },
      first_name: {
        required: true
      }
    },
    messages: {
      username: {
        required: "Это поле должно быть заполнено",
        email: "Введите корректный email"
      },
      terms_ok: {
        required: "Вы должны подтвердить"
      },
      terms_ok2: {
        required: "Вы должны подтвердить"
      },
      agree: {
        required: "Вы должны подтвердить"
      },
      "state[]": "Выберите хотя бы одну смену"
    }
  });
  $("#enter-form").validate({
    errorElement: "div",
    ignore: ":hidden",
    errorPlacement: function(error, element) {
      error.insertBefore(element);
    },
    rules: {
      email: {
        required: true
      },
      fullname: {
        required: true
      },
      agree: {
        required: true
      },
      password: {
        required: true
      },
      repeat: {
        required: true
      },
    },
    messages: {
        agree: {
        required: "Вы должны подтвердить"
      }
    }
  });
  $("#login-form").validate({
    errorElement: "div",
    ignore: ":hidden",
    rules: {
      email: {
        required: true
      },
      password: {
        required: true
      },
    },
    messages: {
      agree: {
        required: "Вы должны подтвердить"
      }
    }
  });
  $("#password-form").validate({
    errorElement: "div",
    ignore: ":hidden",
    rules: {
      password: {
        required: true
      },
      repeat: {
        required: true
      }
    }
  });
  $("#question-form").validate({
    errorElement: "div",
    ignore: ":hidden",
    rules: {
      question: {
        required: true
      }
    }
  });
});
$.extend($.validator.messages, {
  required: "Это поле необходимо заполнить.",
  url: "Введите корретную ссылку"
});
$(document).ready(function () {
  $('input[name="passport_ser_num"]').inputmask({
    "mask": "9999 999999"
  });
  $('.js-dob-calendar').datepicker({
    dateFormat: 'dd.mm.yyyy',
    // view: 'years',
    // minDate: '0',
    // maxDate: "0",

    onSelect: function (dateText, inst) {
      var birthDay = dateText;
      var dateYear = birthDay.slice(6)
      var dateMonth = birthDay.slice(3,5) - 1
      var dateNumber = birthDay.slice(0,2)
      var DOB = new Date(dateYear, dateMonth, dateNumber);
      var today = new Date();
      var age = today.getTime() - DOB.getTime();
      age = Math.floor(age / (1000 * 60 * 60 * 24 * 365.25));
      
      const formWrap = document.querySelector('.form-wrap')
      const gender = document.querySelector('.gender')

      if ($('.js-dob-calendar').hasClass('city-nizhny-input')) {
        if (parseInt(age) < 18) {
          $('.js-dob-spoiler').slideDown(300);
        } else {
          $('.js-dob-spoiler').slideUp(300);
        }

        if (parseInt(age) < 16) {
          formWrap.style.display = 'none'
          gender.style.display = 'none'
          $('#become_vol .content-block__more').addClass('disabled');
          $('#become_vol .content-block__more .youshallnotpass').remove();
          $('#become_vol .content-block__more').append('<span class="youshallnotpass">К сожалению, вы не можете отправить анкету, так как вы младше 16 лет.</span>');
        } else {
          formWrap.style.display = 'block'
          gender.style.display = 'block'
          $('#become_vol .content-block__more').removeClass('disabled');
          $('#become_vol .content-block__more .youshallnotpass').remove();
        }
      }
      if ($('.js-dob-calendar').hasClass('city-other-input')) {
        if (parseInt(age) < 18 || parseInt(age) > 35) {
          formWrap.style.display = 'none'
          gender.style.display = 'none'
          $('#become_vol .content-block__more').addClass('disabled');
          $('#become_vol .content-block__more .youshallnotpass').remove();
          $('#become_vol .content-block__more').append('<span class="youshallnotpass">Становиться кандидатами в «Волонтёры Молодёжной столицы России» могут граждане в возрасте от 18 до 35 лет</span>');
        } else {
          formWrap.style.display = 'block'
          gender.style.display = 'block'
          $('#become_vol .content-block__more').removeClass('disabled');
          $('#become_vol .content-block__more .youshallnotpass').remove();
        }
      }
  
    }
  });
});

var adminTable = $('#admin-table').DataTable({
  responsive: true,
  dom: 'Bfrtip',
  buttons: ['excel'],
  language: _vendor_datatables_ru_json__WEBPACK_IMPORTED_MODULE_0__,
    processing: true,
    serverSide: true,
    serverMethod: 'post',
    searchDelay: 500,
    ajax: {
        url: '/actions/',
        type: 'POST',
        data: {
            action: 'users'
        }
    },
    'columns': [
        { data: 'internalKey' },
        { data: 'fullname' },
        { data: 'link', sortable: false },
        { data: 'test', sortable: true },
        { data: 'status', sortable: false },
    ],
    buttons: [
    ]
});
/*
var testTable = $('#test-table').DataTable({
  responsive: true,
  language: _vendor_datatables_ru_json__WEBPACK_IMPORTED_MODULE_0__,
  "ordering": false,
  paging: false,
  "searching": false
});
*/
const inputRanges = document.querySelectorAll('.input-range');
if (inputRanges.length != 0) {
  inputRanges.forEach(inputRange => {
    inputRange.addEventListener('input', () => {
      if (inputRange.value != '' && inputRange.value > 3) {
        inputRange.value = '3';
      } else if (inputRange.value != '' && inputRange.value < 0) {
        inputRange.value = '0';
      }
    });
  });
}


const passwordInputBtns = document.querySelectorAll('.password-eye')

if (passwordInputBtns) {
  passwordInputBtns.forEach((el) => {
    el.addEventListener('click', () => {
      show_hide_password(el)
    })
  })

  function show_hide_password(target){
    var input = target.previousElementSibling
    if (input.getAttribute('type') == 'password') {
      target.classList.add('view');
      input.setAttribute('type', 'text');
    } else {
      target.classList.remove('view');
      input.setAttribute('type', 'password');
    }
  }
}

})();

/******/ })()
;
