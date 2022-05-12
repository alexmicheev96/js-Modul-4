window.addEventListener('DOMContentLoaded', () => {

    //! tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');    //* скрываем
            item.classList.remove('show', 'fade');  //* удаляем классы активности

        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {  //* используем делегирование событий, вешаем обработчик на родителя
            tabs.forEach((item, i) => {
                if (target == item) {      //* таргет тот элемент в который мы только что кликнули будет совпадать с элементом который мы сейчас перебираем будем вызавыть две функции
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }

    });

    //! Timer

    const deadline = '2022-05-30';    //* помещаем строку которая будет у нас парситься отправная точка в таком формате input type date возвращет вот такую строку
    
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());   //*количество милисекунд в конечном времени

        if( t <= 0  ) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

        } else {
              days = Math.floor( t / (1000 * 60 * 60 * 24)),
              hours = Math.floor( ( t / (1000 * 60 * 60) ) % 24 ),
              minutes = Math.floor(( t / 1000 / 60 ) % 60),
              seconds = Math.floor ( (t / 1000) % 60);
        }
              
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes': minutes,
            'seconds' : seconds,
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock( selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        updateClock();                              //* для того чтобы не было моргание верстки а именно счетчика
        function updateClock() {
            const t = getTimeRemaining(endtime);    //* результат работы функции это обьект с разными значениями

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);


            if (t.total <= 0) {
                // const endAction = document.querySelector('.promotion__timer'); //* второй вариант скрытия счетчика при отрицательном значении
                // endAction.innerHTML = '';      
                // const endTitile = document.createElement('h1');
                // endTitile.innerText = 'Увы, Акция закончилась';
                // endAction.style.cssText = 'display: flex; align-items: center; justify-content: center;'
                // endAction.prepend(endTitile);
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
});

