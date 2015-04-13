/**
 * Created by dellx on 2015/4/1.
 */
var mainController = angular.module('mainController', []);

mainController.controller('mainController', function ($timeout,$injector, $scope, $rootScope,shareDataService, locationToService) {
    //console.log($injector.has("aaService"));
    //console.log($injector.has('ngRoute'));
    $scope.$on('BUSY', function () {
        $scope.busy = true;
    });

    $scope.$on('UNBUSY', function () {
        $scope.busy = false;
    });

    $rootScope.operationItem = function (type) {
        hideModal();
        $scope.busy = true;
        switch (type) {
            case 1:                              /*add item*/
                $injector.get(shareDataService.service).save({},angular.toJson(shareDataService.tempData), function (resp) {
                    $scope.responseWay(resp,1);
                });
                break;
            case 2:                             /*delete item*/
                $injector.get(shareDataService.service).delete({id: shareDataService.tempData.id}, angular.toJson(shareDataService.tempData), function (resp) {
                    $scope.responseWay(resp,2);
                });
                break;
            case 3:                             /*update item*/
                $injector.get(shareDataService.service).update({id: shareDataService.tempData.id}, angular.toJson(shareDataService.tempData), function (resp) {
                    $scope.responseWay(resp,3);
                });
                break;
        }
    };

    $scope.responseWay = function (resp,type) {
        $scope.busy = false;
        if (resp.status === true) {
            if(type!==2){
                message('Operation is successful!');
            }
            if(type===2){
                if(typeof($rootScope.$$childHead.$$childHead.$$childHead.dataList.content)==='undefined'){
                    $rootScope.$$childHead.$$childHead.$$childHead.dataList.splice(shareDataService.idx,1);
                }else{
                    $rootScope.$$childHead.$$childHead.$$childHead.dataList.content.splice(shareDataService.idx,1);
                    $rootScope.$$childHead.$$childHead.$$childHead.dataList.totalElements=$rootScope.$$childHead.$$childHead.$$childHead.dataList.totalElements-1;
                }

            }
            if (shareDataService.redirectUrl !== '' && typeof (shareDataService.redirectUrl)!='undefined') {
                var tempUrl = shareDataService.redirectUrl;
                var tempParams = shareDataService.redirectParams;
                shareDataService.redirectUrl = '';
                shareDataService.redirectParams = '';
                $timeout(function () {
                    locationToService.redirect(tempUrl, tempParams);
                },500);
            }
        } else {
            message(resp.error.rawMessage);
        }

    };

    function hideModal() {
        $("#layer").hide();
        $("#deleteConfirmModal").niftyModal('hide');
    }

    function message(msg) {
        $("#messageModal").find('h4').html(msg);
        $("#layer").show();
        $("#messageModal").niftyModal('show');
        $timeout(function () {
            $("#layer").hide();
            $("#messageModal").niftyModal('hide');
            $("#messageModal").find('h4').html('');
        }, 1000);
    }


});