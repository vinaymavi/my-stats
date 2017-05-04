/**
 * Check and set all configs.
 */
'use strict';
var myConfig = (function () {
    var config = {};
    config.APP_CONFIG = "app_config";
    config.USER_CONFIG = 'user_config';
    config.STORAGE_NAME = 'my_stats';
    config.SERVER_URL = "https://my-stats-ext.appspot.com/_ah/api";

    config.hasDeviceId = function () {
        var dfd = jQuery.Deferred();
        myDb.deviceId().then(function (resp) {
            console.log(resp);
            if (typeof resp[config.APP_CONFIG] === "undefined") {
                dfd.resolve(false);
            } else {
                dfd.resolve(true);
            }

        }, function (resp) {
            dfd.reject();
        });
        return dfd.promise();
    };
    config.setDeviceId = function (device_id) {
        var dfd = jQuery.Deferred();
        var data = {};
        data[config.APP_CONFIG] = {"device_id": device_id};
        myDb.setData(data).then(function (resp) {
            dfd.resolve();
        }, function () {
            dfd.reject();
        });
        return dfd.promise();
    };
    return config;
}());
