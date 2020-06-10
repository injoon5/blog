let express = require('express')
let db = require('quick.db')
let crypto = require('crypto')
let app = express()

let port = 5500

app.use(express.static('./public'))
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/create', (req, res) => {
  res.render('create')
})

app.get('/api/users/login', (req, res) => {
  let data = db.get(`users.${req.query.username}`)
  if (
    crypto.createHash('sha512').update(req.query.password).digest('base64') ==
    data.password
  ) {
    res.send('success')
  } else {
    res.send('fail')
  }
})

app.get('/api/users/new', (req, res) => {
  if (!db.has(`users.${req.query.username}`)) {
    db.set(`users.${req.query.username}`, {
      username: req.query.username,
      password: crypto
        .createHash('sha512')
        .update(req.query.password)
        .digest('base64'),
      email: req.query.email,
    })
    console.log(req.query.username)
    res.send('success')
  } else {
    res.send('fail')
  }
  return
})

app.get('/api/blogs/new', (req, res) => {
  if (!db.has(`blogs.${req.query.name}`)) {
    db.set(`blogs.${req.query.name}`, {
      posts: [],
      title: `${req.query.name}님의 블로그`,
      l: 0,
      theme: 'default',
    })
    res.send('success')
  } else {
    res.send('fail')
  }
  return
})

app.get('/blog/:name', (req, res) => {
  if (db.has(`blogs.${req.params.name}`)) {
    res.render('blog', {
      title: db.get(`blogs.${req.params.name}`).title,
      posts: db.get(`blogs.${req.params.name}`).posts,
      name: req.params.name,
    })
  } else {
    res.render('404')
  }
})

app.get('/blog/:name/:id', (req, res) => {
  if (db.has(`blogs.${req.params.name}`)) {
    if (req.params.id > db.get(`blogs.${req.params.name}`).posts.length) {
      res.render('404')
    } else {
      res.render('viewer', {
        title: db.get(`blogs.${req.params.name}`).posts[req.params.id - 1].title,
        content: db.get(`blogs.${req.params.name}`).posts[req.params.id - 1]
          .content,
      })
    }
  } else {
    res.render('404')
  }
})

app.get('/api/blogs/edit/title', (req, res) => {
  if (db.has(`blogs.${req.query.name}`)) {
    db.set(`blogs.${req.query.name}`, {
      posts: db.get(`blogs.${req.query.name}`).posts,
      title: req.query.title,
      l: db.get(`blogs.${req.query.name}`).l,
      theme: db.get(`blogs.${req.query.name}`).theme,
    })
    res.send('success')
  } else {
    res.send('fail')
  }
})

app.get('/api/blogs/edit/theme', (req, res) => {
  if (db.has(`blogs.${req.query.name}`)) {
    db.set(`blogs.${req.query.name}`, {
      posts: db.get(`blogs.${req.query.name}`).posts,
      title: db.get(`blogs.${req.query.name}`).title,
      l: db.get(`blogs.${req.query.name}`).l,
      theme: req.query.theme,
    })
    res.send('success')
  } else {
    res.send('fail')
  }
})

app.get('/api/blogs/posts/new', (req, res) => {
  if (db.has(`blogs.${req.query.name}`)) {
    let posts = db.get(`blogs.${req.query.name}`).posts
    posts.push({
      id: db.get(`blogs.${req.query.name}`).l + 1,
      title: req.query.title,
      content: req.query.content,
    })
    db.set(`blogs.${req.query.name}`, {
      posts: posts,
      title: db.get(`blogs.${req.query.name}`).title,
      l: db.get(`blogs.${req.query.name}`).l + 1,
      theme: db.get(`blogs.${req.query.name}`).theme,
    })
    res.send('success')
  } else {
    res.send('fail')
  }
})

app.get('/posts/new', (req, res) => {
  res.render('write')
})

app.get('/api/users/check', (req, res) => {
  res.send(!db.has(`users.${req.query.username}`))
})  

app.get('/api/users/:username', (req, res) => {
  res.send(db.get(`users.${req.params.username}`))
})

app.get('/users/:username', (req, res) => {
  return
})

app.get('/posts/:username/:id', (req, res) => {
  res.send(req.params.id)
  return
})

app.use((req, res) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`http://localhost:5500`)
})