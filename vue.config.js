module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before (app) {
        // 中间件
        app.use(function (req, res, next) {
          // 检查token
          if (/^\/api/.test(req.path)) { // 校验/api开头的请求
            if (req.path == '/api/login' || req.headers.token) {
              next()
            } else {
              res.sendStatus(401) // 错误状态提示用户需要登录
            }
          } else {
            next()
          }
        })
        app.get('/api/goods', function (req, res) {
          res.json({
            code: 0,
            slider: [
              {
                id: 21,
                img: '/img/画板.png'
              },
              {
                id: 22,
                img: '/img/画板.png'
              },
              {
                id: 23,
                img: '/img/画板.png'
              }
            ],
            data: {
              fanchao: [
                {
                  id: 1,
                  title: '凡超的小店',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                },
                {
                  id: 2,
                  title: '凡超的外套',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                }
              ],
              liqun: [
                {
                  id: 3,
                  title: '李群的小店',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                },
                {
                  id: 4,
                  title: '李群的外套',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                }
              ],
              guoyaning: [
                {
                  id: 5,
                  title: '郭亚宁的小店',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                },
                {
                  id: 6,
                  title: '郭亚宁的外套',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                }
              ],
              yangyang: [
                {
                  id: 7,
                  title: '杨扬的小店',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                },
                {
                  id: 8,
                  title: '杨扬的外套',
                  price: '1000',
                  img: '/img/画板.png',
                  count: 1000
                }
              ],
            },
            keys: ['fanchao', 'liqun', 'guoyaning', 'yangyang']
          })
        })
        app.post('/api/login' , function (req, res) {
          let body = []
          req.on('data', chunk => {
            // 接收到一部分数据
            console.log(chunk) // chunk是Buffer对象
            body.push(chunk)
          })
          .on('end', () => {
            // 数据接收完毕
            // 将body转换为完整的buffer
            body = Buffer.concat(body).toString()
            // 转换并保存前台传递的user
            const { username, password } = JSON.parse(body) // {name: 'aaa', age: 20}
            if (username === 'jerry' && password === '123') {
              res.json({
                code: 0,
                token: 'jilei'
              })
            } else {
              res.json({
                code: 1,
                message: '用户名或者密码错误'
              })
            }
          })
        })
        app.get('/api/logout', function (req, res) {
          res.json({
            code: -1
          })
        })
      } 
    }
  }
}
