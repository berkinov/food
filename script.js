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


const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
const addCart = document.querySelector('.addCart');
const receipt = document.querySelector('.receipt');
const receiptOut = document.querySelector('.receipt__window-out');
const receiptWindow = document.querySelector('.receipt__window');
const receiptBtn = document.querySelector('.receipt__window-btn');
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    btnPlusOrMinus[i].addEventListener("click", function() {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    const parent = element.closest(".main__product");
    const parentId = parent.getAttribute("id");
    console.log(parentId);
    const elementData = element.getAttribute("data-symbol");
    if (elementData == "+" && product[parentId].amount < 10) {
        product[parentId].amount++;
    } else if (elementData == "-" && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    const out = parent.querySelector(".main__product-num")
    const price = parent.querySelector(".main__product-price span") 
    const kcall = parent.querySelector(".main__product-kcall span")

    out.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Summ;
    kcall.innerHTML = product[parentId].Kcall;
}

for (let i = 0; i < checkExtraProduct.length; i++) {
    checkExtraProduct[i].addEventListener("click", function () {
        addExtraProduct(this)
    })
}

function addExtraProduct(element) {
    const parent = element.closest(".main__product");
    const parentId = parent.id;
    const elAtr = element.getAttribute("data-extra")
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

let arrayProduct = []  
let totalName = ""
let totalPrice = 0 
let totalKcall = 0   

addCart.addEventListener("click", function() {
    for (const key in product) {
        const po = product[key]
        if (po.amount > 0 ) {
            arrayProduct.push(po);
            for ( const infoKey in po) {
                if(po[infoKey] === true) {
                    po.name = po.name + "\n" + extraProduct[infoKey].name
                }
            po.price = po.Summ; 
            po.kcall = po.Kcall; 
        }
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalName += "\n" + el.name+ "\n";
        totalPrice += el.price; 
        totalKcall += el.kcall;
    }

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
