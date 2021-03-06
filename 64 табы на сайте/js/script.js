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
    //* модально окно

    const btn = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }

    btn.forEach(item => {
        item.addEventListener('click', openModal);
    });
    function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
    }



    
    // close.addEventListener('click', closeModal); //*функцию передаем как callback таким образом она будет вызвана только после клика

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '' ) {//* закрываем модалку на крестик с помощью второго условия
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {    //* у обьекта события есть свойство code в котором хранится название клавиши которая была нажата
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    const modalTimer = setTimeout(openModal, 50000);                //*   запустит нашу функцию по открытию окна через 50 сек

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);   //* запускаем обработчик события 1 раз затем удаляем
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    
    
    //* используем классы для карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = +this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if(this.classes.length === 0 ) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }
            
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
    ).render();
    
    new MenuCard(
        "img/tabs/elite.jpg",
        "vegy",
        'Меню "Премиум"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        6,
        ".menu .container",

    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "vegy",
        'Меню "Постное"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        5,
        ".menu .container",
    ).render();
    

    //* отправка формы на сервер

    const forms = document.querySelectorAll('form');
    const msg = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Мы скоро с вами свяжемся...', 
        failrule: 'Что-то пошло не так... Извините!',
    };

    forms.forEach(item => {
        postData(item);  //* вызываем функцию postData с этим item(form)
    });
    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();   //* отмена стандартного поведения браузера

            let statusMsg = document.createElement('img');
            statusMsg.src = msg.loading;
            statusMsg.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend' , statusMsg);
            
            const r = new XMLHttpRequest();
            r.open('POST', 'server.php');

            r.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            const formData = new FormData(form);  //* помещаем в качестве аргумента ту форму с которой нужно собрать данные
            const obj = {};
            formData.forEach((item, i) => {
                obj[i] = item;
            });

            const json = JSON.stringify(obj);
            r.send(json);     //* отправка данных в формате json
            r.addEventListener('load', () => {
                if(r.status === 200) {
                    console.log(r.response);
                    showThanksModal(msg.success);
                    statusMsg.remove();   //* очистка сообщения
                    form.reset();    //* метод очистки формы
                    
                } else {
                    showThanksModal(msg.failrule);
                }
            });
        });
    }
    //* красивое оповещение пользователя
    function showThanksModal(message) {
        const prevModalDiaolog = document.querySelector('.modal__dialog');
        prevModalDiaolog.classList.add('hide');

        openModal();   //* отркытие модального окна

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDiaolog.classList.add('show');
            prevModalDiaolog.classList.remove('hide');
            closeModal();
        }, 4000);
    }   
});

 