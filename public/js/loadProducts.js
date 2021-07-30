import { handleFormSubmission } from './stripePurchase.js'

function createItemFromTemplate(item) {
  const template = document.querySelector('#product');
  const product = template.content.cloneNode(true);

  product.querySelector('h2').innerHTML = item.name;
  product.querySelector('.description').innerHTML = item.description;
  product.querySelector('[name=sku]').value = item.sku;
  product.querySelector('.price').innerHTML = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: item.currency
  }).format((item.amount / 100).toFixed(2));
  
  const img = product.querySelector('img');
  img.src = item.image;
  img.alt = item.name;

  const form = product.querySelector('form');
  form.addEventListener("submit", handleFormSubmission);

  return product;
}

export async function loadProducts() {
  const data = await fetch('/.netlify/functions/getProducts')
    .then((result) => {
      return result.json();
    }).catch((err) => {
      console.error(err);
    });

  const products = document.querySelector('.products');
  data.forEach(item => {
    const product = createItemFromTemplate(item);
    products.appendChild(product);
  });
}