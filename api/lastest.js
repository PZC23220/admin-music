var express = require('express');
var router = express.Router();
var models = require('../models');
var select = require('./connection.js');

//获取歌单总数
router.get('/api/latest/count', function(request, response) {
    var title = request.query.title ? "'%"+ request.query.title +"%'" : "'%%'";
    var status = request.query.status || '';
    var nums = request.query.nums || '';
    var type = request.query.type ? "'"+ request.query.type +"'" : "";
    var sql = `SELECT count(*) AS count
    FROM latest AS r
    LEFT JOIN mfm_track AS t ON r.track_id = t.id
    WHERE t.title LIKE ${title}
    ${nums ? 'and t.duration_in_seconds >= '+ nums : ''}
    ${type? ' and r.type = ' + type : ''}
    ${status? ' and t.status = ' + status : ''}`;
    select(sql, request, response);
});
//获取歌单
router.get('/api/latest/list', function(request, response) {
    var page = request.query.page || 1;
    var pageNum = request.query.pageNum || 10;
    var title = request.query.title ? "'%"+ request.query.title +"%'" : "'%%'";
    var status = request.query.status || '';
    var nums = request.query.nums || '';
    var type = request.query.type ? "'"+ request.query.type +"'" : "";
    var sql = `SELECT r.*, t.channel_title, t.original_id, t.artwork_url, t.title, t.status , t.played, t.duration_in_seconds
    FROM latest AS r
    LEFT JOIN mfm_track AS t ON r.track_id = t.id
    WHERE t.title LIKE ${title}
    ${nums ? 'and t.duration_in_seconds >= '+ nums : ''}
    ${status? ' and t.status = ' + status : ''}
    ${type? ' and r.type = ' + type : ''}
    ORDER BY r.id DESC LIMIT ${((pageNum * page) - pageNum)} , ${pageNum}`;
    select(sql, request, response);
});
module.exports = router;
