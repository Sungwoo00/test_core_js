import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import resetCSS from '../Layout/restCSS';
import pb from '../api/pocketbase';

@customElement('new-post')
class NewPost extends LitElement {
  @property() fileImages: { image: string; label: string }[] = [
    {
      image: '',
      label: '',
    },
  ];

  static styles: CSSResultGroup = [
    resetCSS,
    css`
      .container {
        padding: 2rem;
        margin: 0 auto;

        .wrapper {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 400px;
        }

        & input {
          padding: 0.5rem;
          border: 1px solid white;
          width: 100%;
        }
      }

      .buttonGroup {
        text-align: center;

        & button {
          padding: 0.5rem 1rem;
          border: 1px solid white;
          cursor: pointer;
          margin-top: 2rem;
        }

        .add {
          background-color: dodgerblue;
          color: white;
        }
      }
    `,
  ];

  get inputs() {
    return this.renderRoot.querySelectorAll('input');
  }

  handleNewPost() {
    const formData = new FormData();
    const imgField = this.inputs[1] as HTMLInputElement;

    if (!imgField.files) throw new Error('file의 값이 들어오지 않았습니다.');

    // formData.append('brand',this.inputs[0].value)
    // formData.append('description',this.inputs[2].value)
    // formData.append('price',this.inputs[3].value)
    // formData.append('discount',this.inputs[4].value)
    // formData.append('photo',imgField.files[0])

    this.inputs.forEach((input) => formData.append(input.id, input.value));
    formData.append('photo', imgField.files[0]);

    pb.collection('products')
      .create(formData)
      .then(() => {
        location.href = '/src/pages/product/';
      })
      .catch(() => {
        console.error('err!');
      });
  }

  handleUpload(e: Event) {
    const { files } = e.target as HTMLInputElement;

    if (!files) throw new Error('file값이 존재하지 않습니다.');

    const fileImages = Array.from(files).map((file) => ({
      image: URL.createObjectURL(file),
      label: file.name,
    }));

    this.fileImages = fileImages;
  }

  render() {
    const image = this.fileImages[0].image;

    return html`
      <div class="container">
        <div class="wrapper">
          <div class="brand">
            <label for="brand">브랜드</label>
            <input type="text" id="brand" />
          </div>

          <div class="visual">
            <label for="imgField"></label>
            <input @change=${this.handleUpload} type="file" id="imgField" />
            <div class="render">${image ? html`<img src="${image}" alt="" />` : ''}</div>
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
            <button @click=${this.handleNewPost} type="button" class="add">추가</button>
          </div>
        </div>
      </div>
    `;
  }
}
