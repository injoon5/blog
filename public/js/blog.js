let changeName = () => {
  document.querySelector('#modal').classList.add('is-active')
}

if (getCookie('username') == location.pathname.split('/')[2]) {
  document.querySelector('.title').append(parseHTML('<br><a style="font-size: 1rem; color: white;" href="/posts/new"><i class="fas fa-plus"></i> 글쓰기</a>'))
  document.querySelector('.title').append(parseHTML('<div style="margin-right: 1.2rem; display: inline;"></div><a style="font-size: 1rem; color: white;" onclick="changeName()"><i class="far fa-edit"></i> 이름 바꾸기</a>'))
}

document.querySelector('.modal-background').addEventListener('click', () => {
  document.querySelector('#modal').classList.remove('is-active')
})
document.querySelector('.modal-close').addEventListener('click', () => {
  document.querySelector('#modal').classList.remove('is-active')
})
document.querySelector('#change').addEventListener('click', async () => {
  await fetch(`/api/blogs/edit/title?name=${getCookie('username')}&title=${document.querySelector('#newName').value}`)
  document.querySelector('#modal').classList.remove('is-active')
  location.reload()
})