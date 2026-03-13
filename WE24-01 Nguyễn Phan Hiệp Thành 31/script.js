// ===========================
// MusicShop Giỏ hàng v2
// ===========================

// Lấy giỏ hàng từ localStorage
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Lưu giỏ hàng vào localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Thêm sản phẩm
function addToCart(productName, price = 0) {
    const cart = getCart();
    cart.push({name: productName, price: price});
    saveCart(cart);
    alert(productName + " đã được thêm vào giỏ hàng!");
}

// Xóa sản phẩm theo index
function removeFromCart(index){
    const cart = getCart();
    cart.splice(index,1);
    saveCart(cart);
    renderCart();
}

// Thanh toán
function checkoutCart(){
    const cart = getCart();
    if(cart.length === 0){
        alert("Giỏ hàng trống!");
        return;
    }
    let total = cart.reduce((sum,item)=>sum + item.price,0);
    alert(`Thanh toán thành công! Tổng tiền: ${total.toLocaleString()} VND`);
    saveCart([]);
    renderCart();
}

// Render giỏ hàng trong cart.html
function renderCart(){
    const cartItemsDiv = document.getElementById('cart-items');
    if(!cartItemsDiv) return; // không phải trang cart

    const cart = getCart();
    cartItemsDiv.innerHTML = '';

    if(cart.length === 0){
        cartItemsDiv.innerHTML = '<p>Giỏ hàng trống!</p>';
        return;
    }

    cart.forEach((item,index)=>{
        const div = document.createElement('div');
        div.className = 'cart-item fade-in';
        div.innerHTML = `
            <span>${item.name} - ${item.price.toLocaleString()} VND</span>
            <button onclick="removeFromCart(${index})">Xóa</button>
        `;
        cartItemsDiv.appendChild(div);
    });

    // Hiển thị tổng tiền
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    const total = cart.reduce((sum,item)=>sum + item.price,0);
    totalDiv.innerHTML = `<strong>Tổng tiền: ${total.toLocaleString()} VND</strong>`;
    cartItemsDiv.appendChild(totalDiv);
}

// Khi load trang cart
document.addEventListener('DOMContentLoaded', ()=>{
    renderCart();
});const productsData = {
    guitar: {
        name: "Guitar Acoustic",
        price: 2000000,
        desc: "Guitar chất lượng cao, âm thanh ấm và bền.",
        img: "images/guitar.jpg"
    },
    piano: {
        name: "Piano Điện",
        price: 15000000,
        desc: "Piano điện hiện đại, đa chức năng.",
        img: "images/piano.jpg"
    },
    drum: {
        name: "Trống Điện",
        price: 8000000,
        desc: "Trống điện dành cho người mới và chuyên nghiệp.",
        img: "images/drum.jpg"
    },
    violin: {
        name: "Violin Cổ Điển",
        price: 3500000,
        desc: "Violin chất lượng tốt cho học sinh và nghệ sĩ.",
        img: "images/violin.jpg"
    }
};

function addToCartJS(){
    if(prod){
        addToCart(prod.name, prod.price);
    }
}