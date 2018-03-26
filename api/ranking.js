var express = require('express');
var router = express.Router();
var models = require('../models');
var select = require('./connection.js');

//获取歌单总数
router.get('/api/ranking/count', function(request, response) {
    var title = request.query.title ? "'%"+ request.query.title +"%'" : "'%%'";
    var status = request.query.status || '';
    var sql = `SELECT count(*) AS count
    FROM ranking AS r
    LEFT JOIN mfm_track AS t ON r.track_id = t.id
    WHERE t.title LIKE ${title}
    ${status? ' and t.status = ' + status : ''}`;
    select(sql, request, response);
});
//获取歌单
router.get('/api/ranking/list', function(request, response) {
    var page = request.query.page || 1;
    var pageNum = request.query.pageNum || 10;
    var title = request.query.title ? "'%"+ request.query.title +"%'" : "'%%'";
    var status = request.query.status || '';
    var sql = `SELECT r.id, r.track_id, t.channel_title, t.original_id, t.artwork_url, t.title, t.status , t.played, t.duration_in_seconds
    FROM ranking AS r
    LEFT JOIN mfm_track AS t ON r.track_id = t.id
    WHERE t.title LIKE ${title}
    ${status? ' and t.status = ' + status : ''}
    ORDER BY r.id DESC LIMIT ${((pageNum * page) - pageNum)} , ${pageNum}`;
    select(sql, request, response);
});
module.exports = router;
