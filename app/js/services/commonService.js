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

/*
 * support basic formValidate reg to commonDirecitve -> commonValidate
 *
 * example to see commonValidate annotation
 *
 * you also can add your own reg in this service just like "test".
 * */
commonService.factory('validateService',function(){
    return {
        'choice':function(choice){
            var result={
                'reg':'',
                'errMsg':''
            };
            switch(choice){
                case 'test':
                    result.reg =/[0-3]/;
                    result.errMsg = 'test';
                    break;
                case 'url':
                    result.reg = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
                    result.errMsg = 'url input is illegal ';
                    break;
                case 'email':
                    result.reg =/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i;
                    result.errMsg = 'email input is illegal';
                    break;
                case 'number':
                    var reg =/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
                    result.reg = reg;
                    result.errMsg = 'num input is illegal';
                    break;
                case 'date':
                    result.reg = /^(\d{4})-(\d{2})-(\d{2})$/;
                    result.errMsg = 'date input is illegal';
                    break;
                case 'datetime':
                    result.reg = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/;
                    result.errMsg = 'datetime input is illegal';
                    break;
                case 'week':
                    result.reg=/^(\d{4})-W(\d\d)$/;
                    result.errMsg = 'week input is illegal';
                    break;
                case 'month':
                    result.reg =/^(\d{4})-(\d\d)$/;
                    result.errMsg = 'month input is illegal';
                    break;
                case 'time':
                    result.reg = /^(\d\d):(\d\d)$/;
                    result.errMsg = 'time input is illegal';
                    break;
            }
            return result;
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