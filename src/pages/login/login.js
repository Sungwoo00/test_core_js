import '@/pages/login/login.css';
import pb from '@/api/pocketbase.ts';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function render() {
  const tag = `
      <div class="container">
        <h1>로그인</h1>
        <hr />
        <form>
          <div>
            <label for="idField"></label>
            <input type="email" id="idField" placeholder="아이디" />
          </div>
          <div>
            <label for="pwField"></label>
            <input type="password" id="pwField" placeholder="비번" />
          </div>
          <button type="submit" class="login">LOGIN</button>
        </form>
        <a class="register" href="/src/pages/register/">간편 회원가입</a>
      </div>
    `;

  document.body.insertAdjacentHTML('beforeend', tag);
}

function handleLogin(e) {
  e.preventDefault();

  console.log('click');
  try {
    const id = 'sungwoo@gmail.com';
    const pw = 'sungwoo123';

    // const id = document.querySelector("#idField").value;
    // const pw = document.querySelector("#pwField").value;

    pb.collection('users').authWithPassword(id, pw);

    const { record, token } = JSON.parse(localStorage.getItem('pocketbase_auth'));

    localStorage.setItem(
      'auth',
      JSON.stringify({
        isAuth: !!record,
        user: record,
        token: token,
      })
    );

    Swal.fire({
      title: 'hello',
      text: 'hihi',
      icon: 'success',
    });

    alert('로그인 성공! 메인 페이지로 이동합니다.');

    location.href = '/index.html';
  } catch (error) {
    console.log('error: ', error);
  }
}

render();

const loginButton = document.querySelector('.login');

loginButton.addEventListener('click', handleLogin);
