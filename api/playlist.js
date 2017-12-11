var express = require('express');
var router = express.Router();
var models = require('../models');
// var sequelize = require('sequelize');

// 获取歌单
router.get('/api/playlist/list', function(req, res, next){
    var page = req.query.page || 1;
    var pageNum = req.query.pageNum || 10;
    var title = req.query.title ? "%"+ req.query.title +"%" : "%%";
    var TAG = req.query.TAG || '';
    if(TAG) {
        var op = {
            limit: Number(pageNum),
            offset: (pageNum * page) - pageNum,
            row: true,
            order: [['id', 'DESC']],
            where: {
                title: {$like: title},
                TAG: TAG
            }
        }
    }else{
        var op = {
            limit: Number(pageNum),
            offset: (pageNum * page) - pageNum,
            row: true,
            order: [['id', 'DESC']],
            where: {
                title: {$like: title}
            }
        }
    }
    models.playlist.findAndCountAll(op).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
        return false;
    });
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
