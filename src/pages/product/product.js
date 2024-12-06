import { getPbImageURL } from '@/api/getPbImageURL';

// console.log(import.meta.env);

async function renderProduct() {
  const response = await fetch(`${import.meta.env_VITE_PB_API}/collections/products/records`);

  const data = await response.json();
  console.log(data);

  const items = data.items
    .map(
      (item) => `
        <li>
          <a href="/">
            <figure>
              <img src="${getPbImageURL(item)}" alt="${item.photo}" />
            </figure>
            <span class="brand">${item.brand}</span>
            <span class="description">${item.description}</span>
            <span class="price">${item.price}원</span>
            <div>
              <span class="discount">${item.discount}%</span>
              <div class="real-price">${(item.price - (item.price * item.discount) / 100).toLocaleString()}원</div>
            </div>
          </a>
        </li>
      `
    )
    .join('');

  const tag = `
    <div class="container">
      <ul>
        ${items}
      </ul>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', tag);
}

renderProduct();
