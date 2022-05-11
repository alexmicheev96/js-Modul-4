'use strict';

const btns = document.querySelectorAll('button'),
      wrapper = document.querySelector('.btn-block');

console.log(btns[0].classList.item(0));   //* получаем класс расположенный под определенным индексом
console.log(btns[0].classList.length);   //* длина, а точнее количество классов у данного элемента


// btns[0].addEventListener('click', () => {
//     if(!btns[0].classList.contains('red')) {  //* если у второй кнопки нету класса ред то мы его добавляем
//         btns[0].classList.add('red');
//     } else {
//         btns[0].classList.remove('red');
//     }
// });





wrapper.addEventListener('click', (e) => {
    if (e.target && e.target.matches('button.red')) {
        console.log('hello');
        
    }
});

const btn = document.createElement('button');
btn.classList.add('red');
wrapper.append(btn);


// btns.forEach(item => {
//     item.addEventListener('click', () => {
//         item.classList.toggle('red');
//     });
    
// });
const inner = document.querySelector('.inner');          //*  создаем спан и оборачиваем в него текст содержащийся в иннере
let span = document.createElement('span');
inner.prepend(span);
span.append(span.nextSibling);