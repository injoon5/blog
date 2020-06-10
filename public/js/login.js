document.querySelector('#create').addEventListener('click', async (e) => {
  if (
    (await (
      await fetch(
        `/api/users/login?username=${
          document.querySelector('#username').value
        }&password=${document.querySelector('#passwd').value}`
      )
    ).text()) == 'success'
  ) {
    setCookie('username', document.querySelector('#username').value, '365')
    location.href = '/'
  } else {
    document.querySelector('.help.is-danger').innerHTML =
      '아이디 또는 비밀번호가 일치하지 않습니다.'
  }
})
