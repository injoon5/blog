if (getCookie('username') == '') {
  location.pathname = '/login'
}
window.addEventListener('load', async () => {
  if (await (await fetch(`/api/blogs/new?name=${getCookie('username')}`)).text() == 'success') {
    location.href = `/blog/${getCookie('username')}`
  } else {
    document.querySelector('.title').innerHTML = '블로그가 이미 있습니다.'
    location.href = `/blog/${getCookie('username')}`
  }
})