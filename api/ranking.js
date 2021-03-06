var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require('sequelize');
router.get('/api/app_down_url/list', function(req, res, next){
    models.app_down_url.findAll({
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
        return false;
    });
});
//修改版本
router.post('/api/app_down_url/edit', function(req, res, next){
    var data = req.body;
    var id = data.id?data.id: '';
    if(id !== undefined && id !== ''){
        // 编辑
        models.app_down_url.update(data, {where: {id: id}, validate: false}).then(function(result){
            res.send({'success': true})
        });
    }else{
        // 新增
        models.app_down_url.create(data).then(function(result){
            res.send({'success': true})
        });
    }
});
module.exports = router;
