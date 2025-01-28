'use strict'

const products = document.querySelectorAll('.product');
const btnPay = document.querySelector('.btn-pay');
const basket = document.querySelector('.basket');

let count = 0;

products.forEach(product => {
    product.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', product.id);
    })
})

basket.addEventListener('dragover', (event) => {
    event.preventDefault();
})

basket.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    console.log(id);
    const draggedElement = document.getElementById(id);

    if (count < 3) {
        count++;
        draggedElement.remove();
        basket.appendChild(draggedElement);
        draggedElement.style.cursor = 'not-allowed';
        draggedElement.draggable = false;
    }

    if (count === 3) {
        btnPay.classList.add('btn-pay-visible')
    }

})

btnPay.addEventListener('click', () => {
    window.location.href = 'https://lavka.yandex.ru/';
})










