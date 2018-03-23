var express = require('express');
var router = express.Router();
var models = require('../models');
var select = require('./connection.js');

//获取歌单总数
router.get('/api/playlist/count', function(request, response) {
    var title = request.query.title ? "'%"+ request.query.title +"%'" : "'%%'";
    var TAG = request.query.TAG || '';
    var status = request.query.status || '';
    var nums = request.query.nums || '';
    var sql = `SELECT count(*) AS count, IFNULL(p1.nums, 0) AS nums
    FROM playlist AS p LEFT JOIN
    (SELECT
         t.playlist_id,
         COUNT(t.id) AS nums
       FROM mfm_track AS t
       GROUP BY t.playlist_id) AS p1
        ON p.id = p1.playlist_id
    WHERE title LIKE ${title}
    ${TAG? ' and TAG = ' + TAG : ''}
    ${nums? 'and nums is NULL' : ''}
    ${status? ' and status = ' + status : ''}`;
    select(sql, request, response);
});
//获取歌单
router.get('/api/playlist/list', function(request, response) {
    var page = request.query.page || 1;
    var pageNum = request.query.pageNum || 10;
    var title = request.query.title ? "'%"+ request.query.title +"%'" : "'%%'";
    var TAG = request.query.TAG || '';
    var status = request.query.status || '';
    var nums = request.query.nums || '';
    var sql = `SELECT
      p.*,
      IFNULL(p1.nums, 0) AS nums
    FROM playlist AS p LEFT JOIN
      (SELECT
         t.playlist_id,
         COUNT(t.id) AS nums
       FROM mfm_track AS t
       GROUP BY t.playlist_id) AS p1
        ON p.id = p1.playlist_id
    WHERE p.title LIKE ${title}
    ${TAG? ' and p.TAG = ' + TAG : ''}
    ${status? ' and p.status = ' + status : ''}
    ${nums? 'and nums is NULL' : ''}
    ORDER BY p.id DESC LIMIT ${((pageNum * page) - pageNum)} , ${pageNum}`;
    select(sql, request, response);
});
// 上/下线歌单
router.get('/api/playlist/editStatus', function(req, res, next){
    var id = req.query.id;
    var status = req.query.status || 1;
    if(!id){
        res.send({success: false, data: null, code: 400, msg: '缺少歌单id'});
    }else{
        models.playlist.update({status: status}, {where: {id: id}}).then(function(result){
            console.log(result)
            if(result[0] > 0){
                res.send({success: true, data: null, code: 200});
            }else{
                res.send({success: false, data: null, code: 200, msg: '找不到歌单'})
            }
        })
    }
});

// 新增和编辑歌单
router.post('/api/playlist/edit', function(req, res, next){
    var data = req.body;
    var id = data.id;
    if(id !== undefined && id !== ''){
        // 编辑
        models.playlist.update(data, {where: {id: id}, validate: false}).then(function(result){
            res.send({'success': true})
        });
    }else{
        // 新增
        models.playlist.create(data).then(function(result){
            res.send({'success': true})
        });
    }
});
module.exports = router;
