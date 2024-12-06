import "@/pages/detail/detail.css";
import pb from '@api/pocketbase'

function render() {
  const tag = html` <div class="container">
      <div class="wrapper">
        <label for="brand">브랜드</label>
        <input type="text" id="brand" value="{brand}" />
      </div>

      <div class="visual">
        <img src="${getPbImageURL(product)}" alt="" />
      </div>

      <div class="desc">
        <label for="description">상품 설명</label>
        <input type="text" class="description" value="{description}"/>
      </div>

      <div class="price">
        <label for="price">가격</label>
        <input type="text" id="price" value="{price}" />
      </div>

      <div class="discount">
        <label for="discount">할인율</label>
        <input type="text" id="discount" value="{discount}"/>
      </div>

      <div class="real-price">${ price - (price * discount * 0.01)}원</div>
    </div>

    <div class="buttonGroup">
      <button type="button" class="cancel">취소</button>
      <button type="button" class="modify">수정</button>
    </div>`;

  document.body.insertAdjacentHTML("beforeend", tag);
  detail()
}

function detail(product) {
  const { price, discount } = product;
  const priceInput = document.querySelector("#price");
  const discountInput = document.querySelector("#discount");
  const cacel = document.querySelector('.cancel');
  const modify = document.querySelector('.modify');

  function handleDiscount() {
    let newPrice = price;
    let newDiscount = discount;

    newPrice = priceInput.value;
    newDiscount = discountInput.value;

    const ratio = newPrice * (newDiscount * 0.01)
    const realPrice = newPrice - ratio;

    document.querySelector('.real-price').textContent = realPrice.toLocaleString() + '원'
  }

  function handleModify(){
    
    const brand = document.querySelector('#brand').value;
    const price = document.querySelector('#price').value;
    const discount = document.querySelector('#discount').value;
    const description = document.querySelector('#description').value;

    pb.collection('products').update(id,{ brand, price, discount, description })
    .then(()=>{
      location.href = '/src/pages/product/'
    })
    .catch(()=>{
      console.error('...');
    })

  }

  priceInput.addEventListener("input", handleDiscount);
  discountInput.addEventListener('input',handleDiscount)

  cancle.addEventListener('click',()=>history.back())
  modify.addEventListener('click',handleModify)
}


async function renderProduct() {
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get('product')

  const product = await pb.collection('producs').getOne(id)

}

render()



