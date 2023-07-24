// eslint-disable-next-line no-undef
var http = require('http')
// eslint-disable-next-line no-undef
var url = require('url')

http
  .createServer(function (req, res) {
    console.log('start request:', req.url)

    var option = url.parse(req.url)
    option.headers = req.headers

    var proxyRequest = http.request(option, function (proxyResponse) {
      proxyResponse.on('data', function (chunk) {
        console.log('proxyResponse length', chunk.length)
      })
      proxyResponse.on('end', function () {
        console.log('proxyed request ended')
        res.end()
      })

      res.writeHead(proxyResponse.statusCode, proxyResponse.headers)
    })

    req.on('data', function (chunk) {
      console.log('in request length:', chunk.length)
      proxyRequest.write(chunk, 'binary')
    })

    req.on('end', function () {
      console.log('original request ended')
      proxyRequest.end()
    })
  })
  .listen(8080)

// 如果抓取数据失效,可以自己多一个代理，然后再代理种做数据拦截保存下来数据
