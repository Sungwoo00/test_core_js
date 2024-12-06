import '@/pages/newPost/newPost.css';
import pb from '@/api/pocketbase';

function render() {
  const tag = /* html */ `
     <div class="container">
      <div class="wrapper">
        <div class="brand">
          <label for="brand">브랜드</label>
          <input type="text" id="brand" />
        </div>

        <div class="visual">
          <label for="imgField"></label>
          <input type="file" id="imgField" />
          <div class="render"></div>
        </div>

        <div class="desc">
          <label for="description">상품 설명</label>
          <input type="text" id="description" />
        </div>

        <div class="price">
          <label for="price">가격</label>
          <input type="text" id="price" />
        </div>

        <div class="discount">
          <label for="discount">할인율(%)</label>
          <input type="text" id="discount" />
        </div>

        <div class="buttonGroup">
          <button type="button" class="cancel">취소</button>
          <button type="button" class="add">추가</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', tag);

  newPost();
}

function newPost() {
  const add = document.querySelector('.add');
  const cancel = document.querySelector('.cancel');
  const brand = document.querySelector('#brand');
  const price = document.querySelector('#price');
  const discount = document.querySelector('#discount');
  const description = document.querySelector('#description');
  const imgField = document.querySelector('#imgField');

  function handleNewPost() {
    const formData = new FormData();

    formData.append('brand', brand.value);
    formData.append('price', price.value);
    formData.append('discount', discount.value);
    formData.append('description', description.value);
    formData.append('photo', imgField.files[0]);

    pb.collection('products')
      .create(formData)
      .then(() => {
        location.href = '/src/pages/product/';
      });
  }

  function handleUpload(e) {
    const { files } = e.target;

    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));

    const file = fileImages.map((f) => `<img src="${f.image}" alt="${f.label}" />`).join('');

    document.querySelector('.render').insertAdjacentHTML('beforeend', file);
  }

  add.addEventListener('click', handleNewPost);
  imgField.addEventListener('change', handleUpload);
  cancel.addEventListener('click', () => history.back());
}

render();
