var express = require('express');
var router = express.Router();
var models = require('../models');
var sequelize = require('sequelize');
router.get('/api/mfm_track/list', function(req, res, next){
    var page = req.query.page || 1;
    var pageNum = req.query.pageNum || 10;
    var status = req.query.status || '';
    var title = req.query.title || '';
    var nums = req.query.nums || '';
    var desc =  req.query.desc ? req.query.desc : 'id';
    var obj;
    if(status && nums) {
        obj = {
            title: { $like: '%'+title+'%'},
            duration_in_seconds: { $gte: nums},
            status: status
        }

    }else if (status || nums) {
        if(status) {
            obj = {
                title: { $like: '%'+title+'%'},
                status: status
            }
        }else {
            obj = {
                title: { $like: '%'+title+'%'},
                duration_in_seconds: { $gte: nums}
            }
        }

    }else {
        obj = {
            title: { $like: '%'+title+'%'}
        }
    }
    models.mfm_track.findAndCountAll({
        limit: Number(pageNum),
        offset: (pageNum * page) - pageNum,
        row: true,
        where: obj,
        order: [[desc, 'DESC']],
        attributes: ['id', 'title', 'channel_title', 'original_id', 'playlist_id', 'artwork_url', 'artwork_big_url', 'duration_in_seconds', 'played', 'play_error', 'status', ['UNIX_TIMESTAMP(create_time)*1000', 'create_time']]
    }).then(function(result){
        res.send(result);
    }).catch(function(err){
        res.send(err);
        return false;
    });
});

// 新增和编辑活动
router.post('/api/mfm_track/edit', function(req, res, next){
    var data = req.body;
    var id = data.id;
    console.log(data)
    if(id !== undefined && id !== ''){
        // 编辑
        models.mfm_track.update(data, {where: {id: id}, validate: false}).then(function(result){
            res.send({'success': true})
        });
    }else{
        res.send({'success': false,'error': '缺少Id'})
    }
});

// 修改活动的status
router.get('/api/mfm_track/edit_status', function(req, res, next){
    var id = req.query.id;
    var status = req.query.status;
    if(!id){
        res.send({success: false, data: null, code: 400, msg: '缺少闪屏id'});
    }else{
        models.mfm_track.update({status: status}, {where: {id: id}}).then(function(result){
            if(result[0] > 0){
                res.send({success: true, data: null, code: 200});
            }else{
                res.send({success: false, data: null, code: 200, msg: '找不到闪屏id'})
            }
        })
    }
});
module.exports = router;
