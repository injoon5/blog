document.querySelector('input#username').addEventListener('change', async e => {
  if (await (await fetch(`/api/users/check?username=${e.target.value}`)).text() == 'true') {
    e.target.classList.add('is-success')
    e.target.classList.remove('is-danger')
    document.querySelector('.help').classList.add('is-success')
    document.querySelector('.help').classList.remove('is-danger')
    document.querySelector('.help').innerHTML = '사용할 수 있는 아이디입니다.'
  } else {
    e.target.classList.add('is-danger')
    e.target.classList.remove('is-success')
    document.querySelector('.help').classList.add('is-danger')
    document.querySelector('.help').classList.remove('is-success')
    document.querySelector('.help').innerHTML = '사용할 수 없는 아이디입니다.'
  }
  if (!(/^[a-zA-Z0-9]{4,12}$/).test(e.target.value)) {
    e.target.classList.add('is-danger')
    e.target.classList.remove('is-success')
    document.querySelector('.help').classList.add('is-danger')
    document.querySelector('.help').classList.remove('is-success')
    document.querySelector('.help').innerHTML = '아이디는 4~12 글자 사이의 알파벳이여야 합니다.'
  }
})

document.querySelector('#create').addEventListener('click', async e => {
  let err = 0
  if (document.querySelector('#passwd').value == '') {
    document.querySelector('#passwd').parentNode.parentNode.querySelector('.help').innerHTML = '필수 입력란입니다.'
    document.querySelector('#passwd').classList.add('is-danger')
    document.querySelector('#passwd').classList.remove('is-success')
    err++
  }
  if (document.querySelector('#passwd2').value == '') {
    document.querySelector('#passwd2').parentNode.parentNode.querySelector('.help').innerHTML = '필수 입력란입니다.'
    document.querySelector('#passwd2').classList.add('is-danger')
    document.querySelector('#passwd2').classList.remove('is-success')
    err++
  }
  if (document.querySelector('#email').value == '') {
    document.querySelector('#email').parentNode.parentNode.querySelector('.help').innerHTML = '필수 입력란입니다.'
    document.querySelector('#email').classList.add('is-danger')
    document.querySelector('#email').classList.remove('is-success') 
    err++
  }
  if (document.querySelector('#username').value == '') {
    document.querySelector('#username').parentNode.parentNode.querySelector('.help.is-danger').innerHTML = '필수 입력란입니다.'
    document.querySelector('#username').classList.add('is-danger')
    document.querySelector('#username').classList.remove('is-success')
    err++
  }
  if (document.querySelector('#passwd').value != document.querySelector('#passwd2').value) {
    document.querySelector('#passwd2').parentNode.parentNode.querySelector('.help').innerHTML = '비밀번호가 일치하지 않습니다.'
    document.querySelector('#passwd2').classList.add('is-danger')
    document.querySelector('#passwd2').classList.remove('is-success')
    err++
  }
  if (err > 0) {
    return
  }
  (await fetch(`/api/users/new?username=${document.querySelector('#username').value}&email=${document.querySelector('#email').value}&password=${document.querySelector('#passwd').value}`)).json()
  location.href = '/'
})