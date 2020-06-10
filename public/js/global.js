let parseHTML = (code) => {
  let t = document.createElement('template')
  t.innerHTML = code
  return t.content.cloneNode(true)
}

let setCookie = (cname, cvalue, exdays) => {
  let d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = `${cname}=${cvalue};${expires};path=/;Secure`
}

let getCookie = (cname) => {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

let removeCookie = (cname) => {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

let logout = () => {
  removeCookie('username')
  location.reload()
}

window.addEventListener('load', () => {
  if (getCookie('username') == '') {
    document.querySelector('.navbar-end .navbar-item').append(
      parseHTML(`<div class="buttons">
    <a class="button is-primary" href="/signup">
      <strong>회원가입</strong>
    </a>
    <a class="button is-light" href="/login">
      로그인
    </a>
  </div>`)
    )
  } else {
    document.querySelector('.navbar-end .navbar-item').append(
      parseHTML(`<div class="buttons">
    <a class="button" style="background-color: transparent; border: 0 !important;" href="/create">
      <strong>${getCookie('username')}</strong>
    </a>
    <a class="button is-light" onclick="logout()">
      로그아웃
    </a>
  </div>`)
    )
    if (location.pathname == '/') {
      document.querySelector('#start').querySelector('strong').innerHTML =
        '블로그 만들기'
      document.querySelector('#start').setAttribute('href', 'create')
    }
  }
})
