const nav = document.getElementById('navbar');
const bar = document.getElementById('bar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

const products = [
    {
        id: 1,
        name: 'TechTop Gaming Pro',
        image: 'img/products/f1.jpg',
        price: '25,000,000'
    },
    {
        id: 2,
        name: 'TechTop Ultra Slim',
        image: 'img/products/f2.jpg',
        price: '20,000,000'
    },
    {
        id: 3,
        name: 'TechTop VR Ready',
        image: 'img/products/f3.jpg',
        price: '35,000,000'
    },
    {
        id: 4,
        name: 'TechTop Budget Friendly',
        image: 'img/products/f4.jpg',
        price: '10,000,000'
    },
    {
        id: 5,
        name: 'TechTop High Performance',
        image: 'img/products/f5.jpg',
        price: '28,000,000'
    },
    {
        id: 6,
        name: 'TechTop Student Edition',
        image: 'img/products/f6.jpg',
        price: '12,000,000'
    },
    {
        id: 7,
        name: 'TechTop Home Office',
        image: 'img/products/f7.jpg',
        price: '15,000,000'
    },
    {
        id: 8,
        name: 'TechTop Workstation X',
        image: 'img/products/f8.jpg',
        price: '30,000,000'
    },
    {
        id: 9,
        name: 'TechTop Custom Build',
        image: 'img/products/f9.jpg',
        price: '100,000,000'
    }   
];

let productInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productInCart));
}

function renderProducts() {
    let data = '';
    products.map(value => {
        data += `
            <div class="pro">
                <img src="${value.image}" alt="">
                <div class="des">
                    <span>MSI</span>
                    <h5>${value.name}</h5>
                    <div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h4>${value.price} VND</h4>
                </div>
                <a href="#" onclick="addToCart(${value.id})"><i class="fal fa-shopping-cart cart"></i></a>
            </div>
        `;
    });
    document.getElementById('products').innerHTML = data;
}

function addToCart(id) {
    let checkProduct = productInCart.some(value => value.id === id);

    if (!checkProduct) {
        let product = products.find(value => value.id === id);
        productInCart.unshift({
            ...product,
            quantity: 1
        });
        saveToLocalStorage();
        calculatorTotal();
        updateCartCount(); // Cập nhật số lượng giỏ hàng
    } else {
        let product = productInCart.find(value => value.id === id);
        let getIndex = productInCart.findIndex(value => value.id === id);
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity
        };
        saveToLocalStorage();
        updateCartCount(); // Cập nhật số lượng giỏ hàng
    }
}

function calculatorTotal() {
    document.getElementById('total').innerHTML = productInCart.length;
}

function updateCartCount() {
    document.getElementById('total').innerHTML = productInCart.length;
}

function indexLoadPage() {
    renderProducts();
    calculatorTotal();
    updateCartCount(); // Cập nhật số lượng giỏ hàng trên trang index
}

function renderProductsToTable() {
    let data = '';
    productInCart.map((value, index) => {
        data += `
            <tr>
                <td>${value.name}</td>
                <td><img width="100" src="${value.image}" alt=""></td>
                <td>${value.price}</td>
                <td>
                    <button onclick="plusQuantity(${index})"><i class="fas fa-plus"></i></button>
                    <span>${value.quantity}</span>
                    <button onclick="minusQuantity(${index}, ${value.quantity})"><i class="fas fa-minus"></i></button>
                </td>
                <td>${(value.quantity * value.price.replace(/,/g, '')).toLocaleString()}</td>
                <td><button onclick="deleteProductInCart(${index})"><i class="fas fa-trash-alt"></i></button></td>
            </tr>
        `;
    });
    document.getElementById('products-cart').innerHTML = data;
}


function plusQuantity(index) {
    productInCart[index] = {
        ...productInCart[index],
        quantity: ++productInCart[index].quantity
    };
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
    updateCartCount(); // Cập nhật số lượng giỏ hàng
}

function minusQuantity(index, quantity) {
    if (quantity > 1) {
        productInCart[index] = {
            ...productInCart[index],
            quantity: --productInCart[index].quantity
        };
        saveToLocalStorage();
        renderProductsToTable();
        totalMoney();
        updateCartCount(); // Cập nhật số lượng giỏ hàng
    } else {
        alert('Quantity min is 1');
    }
}

function deleteProductInCart(index) {
    productInCart.splice(index, 1);
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
    updateCartCount(); // Cập nhật số lượng giỏ hàng
}

function totalMoney() {
    if (productInCart.length > 0) {
        let total = 0;
        for (let i = 0; i < productInCart.length; i++) {
            total += productInCart[i].quantity * productInCart[i].price.replace(/,/g, '');
        }
        document.getElementById('total-money').innerHTML = total.toLocaleString();
    }
}

function cartLoadPage() {
    renderProductsToTable();
    totalMoney();
    updateCartCount(); // Cập nhật số lượng giỏ hàng trên trang giỏ hàng
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    // Set the notification message
    notificationMessage.textContent = message;
    
    // Add the 'show' class to make it visible
    notification.classList.add('show');
    
    // Remove the 'show' class after 3 seconds to hide the notification
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('fade-out');
        
        // Remove 'fade-out' class after animation ends
        setTimeout(() => {
            notification.classList.remove('fade-out');
        }, 500); // Time should match the CSS transition duration
    }, 3000); // Notification stays for 3 seconds
}


function addToCart(id) {
    let checkProduct = productInCart.some(value => value.id === id);

    if (!checkProduct) {
        let product = products.find(value => value.id === id);
        productInCart.unshift({
            ...product,
            quantity: 1
        });
        saveToLocalStorage();
        showNotification(`${product.name} added to cart!`);
        calculatorTotal();
        updateCartCount(); // Update cart count
    } else {
        let product = productInCart.find(value => value.id === id);
        let getIndex = productInCart.findIndex(value => value.id === id);
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity
        };
        saveToLocalStorage();
        showNotification(`${product.name} quantity updated in cart!`);
        updateCartCount(); // Update cart count
    }
}
