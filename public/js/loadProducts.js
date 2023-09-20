import { handleFormSubmission } from './stripePurchase.js'

const isDev = globalThis.location.hostname === 'localhost';

const DEMO_PRODUCTS = [
  {
    "sku": "DEMO002",
    "name": "Adventure Mug",
    "description": "We’re going on an adventure! Photo by Annie Spratt on Unsplash.",
    "image": "https://images.unsplash.com/photo-1454329001438-1752daa90420?auto=format&fit=crop&w=600&h=600&q=80",
    "amount": 1500,
    "currency": "USD"
  }
];

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
  let data;

  if (isDev) {
    data = DEMO_PRODUCTS;
  } else {
    data = await fetch('/.netlify/functions/getProducts')
      .then((result) => {
        return result.json();
      }).catch((err) => {
        console.error(err);
      });
  }


  const products = document.querySelector('.products');
  data.forEach(item => {
    const product = createItemFromTemplate(item);
    products.appendChild(product);
  });
}