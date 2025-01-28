'use strict'

const products = document.querySelectorAll('.product');
const btnPay = document.querySelector('.btn-pay');
const basket = document.querySelector('.basket');

let count = 0;
let draggedProduct = null;
let offsetX = 0;
let offsetY = 0;

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


// Мобильные события для перетаскивания
products.forEach(product => {
    product.addEventListener('touchstart', (event) => {
        event.preventDefault();
        draggedProduct = product;
        const touch = event.touches[0];
        offsetX = touch.clientX - product.getBoundingClientRect().left;
        offsetY = touch.clientY - product.getBoundingClientRect().top;

        product.style.position = 'absolute';
        document.body.appendChild(product);
    });

    product.addEventListener('touchmove', (event) => {
        if (draggedProduct) {
            const touch = event.touches[0];
            draggedProduct.style.left = `${touch.clientX - offsetX}px`;
            draggedProduct.style.top = `${touch.clientY - offsetY}px`;
        }
    });

    product.addEventListener('touchend', (event) => {
        if (draggedProduct) {
            const touch = event.changedTouches[0];
            const basketRect = basket.getBoundingClientRect();

            // Проверяем, попала ли точка в корзину
            const isInBasket = touch.clientX >= basketRect.left && touch.clientX <= basketRect.right &&
                touch.clientY >= basketRect.top && touch.clientY <= basketRect.bottom;

            if (isInBasket && count < 3 && !basket.contains(draggedProduct)) {
                count++;
                draggedProduct.remove();
                basket.appendChild(draggedProduct);
                draggedProduct.style.cursor = 'not-allowed';
                draggedProduct.draggable = false;
            } else {
                draggedProduct.style.position = 'static'; // Возвращаем на исходную позицию, если не в корзине
            }

            if (count === 3) {
                btnPay.classList.add('btn-pay-visible');
            }

            draggedProduct = null;
        }
    });
});





btnPay.addEventListener('click', () => {
    window.location.href = 'https://lavka.yandex.ru/';
})










