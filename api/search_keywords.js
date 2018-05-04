var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require('sequelize');
router.get('/api/search_keywords/list', function(req, res, next){
    var page = req.query.page || 1;
    var pageNum = req.query.pageNum || 10;
    var active = req.query.active || '';
    var keyword = req.query.keyword || '';
    var obj;
    if(active) {
        obj = {
            keyword: { $like: '%'+keyword+'%'},
            active: active
        }
    }else {
        obj = {
            keyword: { $like: '%'+keyword+'%'}
        }
    }
    models.search_keywords.findAndCountAll({
        limit: Number(pageNum),
        offset: (pageNum * page) - pageNum,
        row: true,
        where: obj,
        order: [['sum', 'DESC']],
        attributes: ['id', 'keyword', 'icon', 'type', 'position', 'active', 'sum', ['UNIX_TIMESTAMP(create_time)*1000', 'create_time'], ['UNIX_TIMESTAMP(update_time)*1000', 'update_time']]
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
        return false;
    });
});

// 新增和编辑活动
router.post('/api/search_keywords/edit', function(req, res, next){
    var data = req.body;
    var id = data.id;
    console.log(data)
    if(id !== undefined && id !== ''){
        // 编辑
        models.search_keywords.update(data, {where: {id: id}, validate: false}).then(function(result){
            res.send({'success': true})
        });
    }else{
        res.send({'success': false,'error': '缺少Id'})
    }
});

// 修改活动的status
router.get('/api/search_keywords/edit_status', function(req, res, next){
    var id = req.query.id;
    var active = req.query.active;
    if(!id){
        res.send({success: false, data: null, code: 400, msg: '缺少热词id'});
    }else{
        models.search_keywords.update({active: active}, {where: {id: id}}).then(function(result){
            if(result[0] > 0){
                res.send({success: true, data: null, code: 200});
            }else{
                res.send({success: false, data: null, code: 200, msg: '找不到热词id'})
            }
        })
    }
});
module.exports = router;
