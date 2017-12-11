var express = require('express');
var router = express.Router();

var formidable = require('formidable');

var co = require('co');
var OSS = require('ali-oss');
var client = new OSS({
    region: 'oss-ap-northeast-1',
    accessKeyId: 'LTAIJf2Zfgz9pxn3',
    accessKeySecret: 'zS5uW1FQX6vqBhZoZFwC5WzAcMKWwE',
});

// 提交闪屏
router.post('/api/fileupload', function(request, response) {
    co(function* () {
        client.useBucket('photoh5-jp');
        var result = yield client.put('miscImg/'+request.files[0].originalname, request.files[0].path);
        response.send(result);
        response.end();
    });
});

module.exports = router;
