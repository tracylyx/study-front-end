const http = require('http');
const fs = require('fs');
const url = require('url');
const etag = require('etag');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    if (pathname === '/') {
        const data = fs.readFileSync('./index.html');
        res.end(data);
    } else if (pathname === '/assets/img1.png') {
        const data = fs.readFileSync('./assets/img1.png');
        // 强制缓存
        res.writeHead(200, {
            // GMT 的时间格式 通过toUTCString获取
            Expires: new Date('2022-3-6 10:47').toUTCString() // 过期的时间，他是一个绝对时间，即 具体的一个时间
        });
        res.end(data);
    } else if (pathname === '/assets/img2.png') {
        const data = fs.readFileSync('./assets/img2.png');
        // 强制缓存
        res.writeHead(200, {
            // GMT 的时间格式 通过toUTCString获取
            'Cache-Control': 'max-age=5'
        });
        res.end(data);
    }  else if (pathname === '/assets/img3.png') {
        // fs.statSync 同步方式获取文件信息，如最后一次的文件修改时间
        // 文档：http://nodejs.cn/api/fs.html#stat-time-values
        const { mtime } = fs.statSync('./assets/img3.png');
        const mtimeUTC = mtime.toUTCString();
        const latModifiedSince = req.headers['if-modified-since'];
        console.log(latModifiedSince);
        console.log(mtime.toUTCString());
        if (mtimeUTC === latModifiedSince) {
            res.statusCode = 304;
            res.end();
            return;
        }

        const data = fs.readFileSync('./assets/img3.png');
        // 使用 last-modify 进行协商缓存
        res.setHeader('Last-Modified', mtimeUTC);
        res.setHeader('Cache-Control', 'no-cache');
        res.end(data);
    }  else if (pathname === '/assets/img4.png') {
        const data = fs.readFileSync('./assets/img4.png');
        // 文件指纹，标识文件
        const fileFingerPrint = etag(data);
        console.log(`fileFingerPrint: ${fileFingerPrint}`);
        const ifNoneMatch = req.headers['if-none-match'];

        if (ifNoneMatch === fileFingerPrint) {
            res.statusCode = 304;
            res.end();
            return;
        }

        // 基于 ETag 的协商缓存
        // ETag Entity tag 实体标签
        res.setHeader('ETag', fileFingerPrint);
        res.end(data);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(3000, () => {
    console.log('listen http://localhost:3000');
});