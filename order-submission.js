const database = firebase.database();

// Populate menu items
const menu = document.getElementById('menu');
const items = [
  { name: 'Big Mac', price: 39.00 },
  { name: 'McChicken', price: 39.00 },
  { name: 'Chicken McNuggets Team Box - 18 STK', price: 73.00 }
];

items.forEach(item => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `<span>${item.name}</span> - <span>${item.price.toFixed(2)} kr.</span> <button class="add-to-cart" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>`;
  menu.appendChild(listItem);
});

// Handle add to cart button click
const cart = document.getElementById('cart');
let total = 0;

menu.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-to-cart')) {
    const itemName = event.target.getAttribute('data-name');
    const itemPrice = parseFloat(event.target.getAttribute('data-price'));
    const cartItem = document.createElement('li');
    cartItem.textContent = `${itemName} - ${itemPrice.toFixed(2)} kr.`;
    cart.appendChild(cartItem);
    total += itemPrice;
    document.getElementById('total').textContent = total.toFixed(2) + ' kr.';
  }
});

// Handle submit order button click
document.getElementById('submit-order').addEventListener('click', function() {
  const orderRef = database.ref('orders').push({
    items: Array.from(cart.children).map(item => item.textContent.trim()).join('\n'),
    totalAmount: total.toFixed(2)
  });
  orderRef.then(() => {
    alert('Order submitted successfully!');
    cart.innerHTML = '';
    total = 0;
    document.getElementById('total').textContent = '0.00 kr.';
  }).catch(error => {
    console.error('Error submitting order:', error);
    alert('Failed to submit order. Please try again.');
  });
});
