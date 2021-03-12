 // const user = {
//     name: "Вася",
//     surname: "Васильев",
//     get fullName() {return `${this.name} ${this.surname}`},
//     set fullName(value) {
//         let str = value.split(" ")
//         this.name = str[0]
//         this.surname = str[1]
//     }
// }
// console.log(user.fullName);
// user.fullName = "Петя Петров"
// console.log(user.fullName);
// console.log(user);

// Создаем основной обьект с продуктами
const product = {
    plainBurger: {
        name: "Гамбургер простой",
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: "Гамбургер FRESH",
        price: 20500,
        kcall: 500,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: "FRESH COMBO",
        price: 31900,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.amount * this.price
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
} 

// Создаем обьект с ингредиентами
const extraProduct = {
    doubleMayonnaise: {
        name: "Двойной майонез",
        price: 500,
        kcall: 50
    },
    lettuce: {
        name: "Салатный лист",
        price: 300,
        kcall: 10
    },
    cheese: {
        name: "Сыр",
        price: 400,
        kcall: 30
    }
}

// кнопки + и - товарa
const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');

// чекбоксы ингредиенты
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');

// кнопка заказа
const addCart = document.querySelector('.addCart');

// модальное окно Чека
const receipt = document.querySelector('.receipt');

// описание Чека
const receiptOut = document.querySelector('.receipt__window-out');

//  основной блок Чека
const receiptWindow = document.querySelector('.receipt__window');

// кнопка Чека 
const receiptBtn = document.querySelector('.receipt__window-btn');
// перебираем продукты
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function() {
        // если было нажатие, то запустим функцию
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    //  closest() - метод обьекта возваращает указанного потомка
    const parent = element.closest(".main__product");
    // hasAttribute("name") - возвращает true если атрибут есть
    // setAttribute("name", "value") - добавляет атрибут со значением
    // removeAttribute("name") - кдаляет атрибут
    // getAttribute("name") - возвращает значение атрибута
    const parentId = parent.getAttribute("id"); 
    // получаем значение атрибута ID секции
    console.log(parentId);
    const elementData = element.getAttribute("data-symbol");
    // получаем знак операции из атрибута "data-symbol"
    if (elementData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    const out = parent.querySelector(".main__product-num")
    // в секции поключаемся к полю количества товара
    const price = parent.querySelector(".main__product-price span") 
    // в секции подключаемся к цене
    const kcall = parent.querySelector(".main__product-kcall span")
    // в секции подключаемся к калориям

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

// перебираем чекбоксы
for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function () {
        // если было нажатия то запускаем функцию addExtraProduct()
        addExtraProduct(this)
    })
}
// функция для работы чеккбокса
function addExtraProduct(element) {
    const parent = element.closest(".main__product");
    // бургер к которому относится чекбокс
    const parentId = parent.id;
    // название бургера ( ключ )
    const elAtr = element.getAttribute("data-extra")
    // название чекбокса ( ключ )
    product[parentId][elAtr] = element.checked;
    if (product[parentId][elAtr] == true) {
        product[parentId].price += extraProduct[elAtr].price
        product[parentId].kcall += extraProduct[elAtr].kcall
    } else {
        product[parentId].price -= extraProduct[elAtr].price
        product[parentId].kcall -= extraProduct[elAtr].kcall
    }

    const price = parent.querySelector('.main__product-price span')
    const kcall = parent.querySelector('.main__product-kcall span')
    price.innerHTML = product[parentId].Summ
    kcall.innerHTML = product[parentId].Kcall
}

// Вывод стоимости заказов
let arrayProduct = []  
// выбранная продукция
let totalName = ""
// список выбраных товаров
let totalPrice = 0 
// общая стоимость
let totalKcall = 0   
// общая каллорийность


addCart.addEventListener("click", function() {
    // перебираем весь обьект
    for (const key in product) {
    //    po - (productObject) сам продукт с ключами
        const po = product[key]
        // пропускаем только товар с количеством больше нуля
        if (po.amount > 0 ) {
            //  добавляем в массив выбранные товары
            arrayProduct.push(po);
            // перебор ключей выбраного продукта
            for ( const infoKey in po) {
                // провера наличие ингредиента
                if(po[infoKey] === true) {
                    //  \n - символ преноса строки
                    // добавляем к имени продукта выбранный ингредиент
                    po.name = po.name + "\n" + extraProduct[infoKey].name
                }
            }
            // обновляем стоимость
            po.price = po.Summ; 
            po.kcall = po.Kcall; 
        }
    }
    // console.log(arrayProduct);
    // перебор выбранной продукцию
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalName += "\n" + el.name+ "\n"; //собираем все название товаров
        totalPrice += el.price; // суммируем общую стоимость товаров
        totalKcall += el.kcall; // суммируем общую стоимость каллорийность товаров
    }
    // Вывод в чек
    receiptOut.innerHTML = `\nВы купили: \n${totalName} \nКаллорийность: ${totalKcall} \nСтоимость заказа: ${totalPrice} сумм`
    receipt.style.display = "flex";
    setTimeout(() => {
        receipt.style.opacity = 1;
        receiptWindow.style.top = 0;
    }, 10);
    
    document.body.style.overflow = "hidden";
    
    const countNum = document.querySelectorAll('.main__product-num');
    const priceNum = document.querySelectorAll('.main__product-price span');
    const kcallNum = document.querySelectorAll('.main__product-kcall span');
    console.log(countNum);
    for (let i = 0; i < countNum.length; i++) {
        countNum[i].innerHTML = 0;
        priceNum[i].innerHTML = 0;
        kcallNum[i].innerHTML = 0;
    }
}) 

receiptBtn.addEventListener("click", function() {
    location.reload()
})
console.log(window);

const productImg = document.querySelectorAll('.main__product-info');
const view = document.querySelector('.view');
const viewImg = view.querySelector('img');
const viewClose = view.querySelector('.view__close');

for (let i = 0; i < productImg.length; i++) {
    productImg[i].addEventListener("dblclick", function() {
        view.classList.add("active");
        const img = this.querySelector('img');
        let imgSrc = img.getAttribute("src");
        viewImg.setAttribute("src", imgSrc);
    })
}

viewClose.addEventListener("click", function() {
    view.classList.remove("active");
})