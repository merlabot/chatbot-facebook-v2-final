'use strict';
const request = require('request');
const config = require('./config');
const pg = require('pg');
pg.defaults.ssl = true;

module.exports = {

    readAllColors: function(callback) {
        var pool = new pg.Pool(config.PG_CONFIG);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client
                .query(
                    'SELECT restaurant_name FROM public.food WHERE food_type=$1 AND fb_id=$2',
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback([]);
                        } else {
                            let colors = [];
                            for (let i = 0; i < result.rows.length; i++) {
                                colors.push(result.rows[i]['color']);
                            }
                            callback(colors);
                        };
                    });
        });
        pool.end();
    },


    returnRestaurant: function(callback, userId) {
        var pool = new pg.Pool(config.PG_CONFIG);
        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            client.query(
                    'SELECT restaurant_name FROM public.food WHERE food_type=$1 AND fb_id=$2',
                    [userId],
                    function(err, result) {
                        if (err) {
                            console.log(err);
                            callback('');
                        } else {
                            callback(result.rows[0]['restaurant_name']);
                        };
                    });

        });
        pool.end();
    },

//    returnRestaurant: function(food_type, userId, restaurant_name) {
//        var pool = new pg.Pool(config.PG_CONFIG);
//        pool.connect(function(err, client, done) {
//            if (err) {
//                return console.error('Error acquiring client', err.stack);
//            }
//            let sql = 'SELECT restaurant_name FROM public.food WHERE food_type=$1 AND fb_id=$2';
//            client.query(sql,
//                [
//                    restaurant_name,
//                    userId
//                ]);
//
//        });
//        pool.end();
//    }


}
