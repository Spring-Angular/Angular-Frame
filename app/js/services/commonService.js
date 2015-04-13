/**
 * Created by dellx on 2015/3/3.
 */
var commonService = angular.module('commonService', ['ngResource']);

commonService.factory('baseUrlService', function () {
    var url={
        'baseUrl':'http://10.1.251.122:8080/bpms-webapp/v1/pms/',
        'pageSize':20
    };
    return url;
});



commonService.factory('shareDataService', function () {
    var shareData={
        'tempData':'',
        'idx':'',
        'service':'',
        'redirectUrl':'',
        'redirectParams':''
    };

    return shareData;
});

commonService.factory('locationToService', function ($window,baseUrlService) {
    return {
        'location': function (url,params) {
            var paramText='?';
            angular.forEach(params, function (val) {
                paramText=paramText+val.key+'='+val.value+'&';
            });
            paramText=paramText.substring(0,paramText.length-1);
            $window.location='#/'+url+paramText;
        },
        'redirect': function (url,params) {
            if(params===''){
                $window.location='#/'+url;
            }else{
                $window.location='#/'+url+params;
            }
        },
        'setRedirect': function (url,params) {
            var redirect={
                'url':'',
                'params':''
            };
            var paramText='?';
            angular.forEach(params, function (val) {
                paramText=paramText+val.key+'='+val.value+'&';
            });
            paramText=paramText.substring(0,paramText.length);
            paramText=paramText+'pageSize='+baseUrlService.pageSize;
            redirect.url=url;
            if(params===''){
                redirect.params='';
            }else{
                redirect.params=paramText;
            }

            return redirect;
        },
        'test': function () {
            alert();
        }
    }
});

commonService.factory('toolService', function ($window,$timeout) {
    return {
        'showMsg': function (msg) {
            $("#messageModal").find('h4').html(msg);
            $("#layer").show();
            $("#messageModal").niftyModal('show');
            $timeout(function () {
                $("#layer").hide();
                $("#messageModal").niftyModal('hide');
                $("#messageModal").find('h4').html('');
            }, 1000);
        }
    }
});

commonService.factory('testService', function ($window) {
    return {
        'test': function () {
            alert();
        }
    }
});