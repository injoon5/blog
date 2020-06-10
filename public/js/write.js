tinymce.init({
  selector: '#editor',
  plugins: 'preview paste importcss searchreplace autolink directionality code visualblocks visualchars fullscreen image link media template codesample charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap emoticons',
  imagetools_cors_hosts: ['picsum.photos'],
  menubar: false,
  toolbar: 'undo redo | image | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen preview | media link anchor codesample | ltr rtl',
  toolbar_sticky: false,
  textpattern_patterns: [
    {start: '#', format: 'h1'},
    {start: '##', format: 'h2'},
    {start: '###', format: 'h3'},
    {start: '####', format: 'h4'},
    {start: '#####', format: 'h5'},
    {start: '######', format: 'h6'},
    {start: '---', replacement: '<hr/>'},
    {start: '(c)', replacement: '©'},
  ]
})

document.querySelector('.post').addEventListener('click', async () => {
  if (document.querySelector('#postTitle').value == '') {
    alert('제목을 입력해주세요.')
    return
  }
  await fetch(
    `/api/blogs/posts/new?name=${getCookie('username')}&title=${
      document.querySelector('#postTitle').value
    }&content=${tinyMCE.get()[0].getContent()}`
  )
  alert('글 작성을 성공했습니다!')
  location.href = '/blog/thoratica'
})