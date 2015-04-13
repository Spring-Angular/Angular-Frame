/**
 * Created by dellx on 2015/3/3.
 */
var commonDirective = angular.module('commonDirective', []);

/*
 Tooltips component
 * */
commonDirective.directive('toolTips', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            angular.element($('.ttip, [data-toggle="tooltip"]').tooltip());
        }
    }
});

/*
 MessageModal component
 * */
commonDirective.directive('messageModal', function () {
    return {
        restrict: 'EAC',
        templateUrl: 'common/messageModal.html',
        link: function (scope, element, attrs) {

        }
    }
});

commonDirective.directive('showMessageModal', function (shareDataService) {
    return {
        restrict: 'EAC',
        scope: {
            'title': '@',
            'msg': '@'
        },
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#messageModal").find('h3').html(scope.title));
                angular.element($("#messageModal").find('h4').html(scope.msg));
                angular.element($("#layer").show());
                angular.element($("#messageModal").niftyModal('show'));
            });
        }
    }
});

commonDirective.directive('hideMessageModal', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#layer").hide());
                angular.element($("#messageModal").niftyModal('hide'));
            });
        }
    }
});

/*
 manulMessageModal component
 * */
commonDirective.directive('manulMessageModal', function () {
    return {
        restrict: 'EAC',
        templateUrl: 'common/manulMessageModal.html',
        link: function (scope, element, attrs) {

        }
    }
});

commonDirective.directive('showManulMessageModal', function (shareDataService) {
    return {
        restrict: 'EAC',
        scope: {
            'title': '@',
            'msg': '@'
        },
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#manulMessageModal").find('h3').html(scope.title));
                angular.element($("#manulMessageModal").find('h4').html(scope.msg));
                angular.element($("#layer").show());
                angular.element($("#manulMessageModal").niftyModal('show'));
            });
        }
    }
});

commonDirective.directive('hideManulMessageModal', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#layer").hide());
                angular.element($("#manulMessageModal").niftyModal('hide'));
            });
        }
    }
});

/*
 delete confirm modal
 * */
commonDirective.directive('deleteConfirmModal', function () {
    return {
        strict: 'EAC',
        templateUrl: 'common/deleteConfirmModal.html',
        link: function (scope, elm, attrs) {

        }
    }
});

commonDirective.directive('delete', function (shareDataService) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'idx': '=',
            'msg': '=',
            'service': '@',
            'url': '@',
            'params': '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                shareDataService.tempData = scope.data;
                shareDataService.idx = scope.idx;
                shareDataService.service = scope.service;
                shareDataService.redirectUrl = scope.url;
                shareDataService.redirectParams = scope.params;
                angular.element($("#deleteConfirmModal").find('h4').html('Ensure to delete ' + scope.msg + '?'));
                angular.element($("#layer").show());
                angular.element($("#deleteConfirmModal").niftyModal('show'));
            });
        }
    }
});

commonDirective.directive('insert', function (shareDataService, $rootScope) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'service': '@',
            'redirect': '='
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                console.log('OK');
                console.log(scope.redirect);
                shareDataService.tempData = scope.data;
                shareDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectParams = scope.redirect.params;
                }

                $rootScope.operationItem(1);
            });
        }
    }
});

commonDirective.directive('update', function (shareDataService, $rootScope) {
    return {
        strict: 'EAC',
        template: '',
        scope: {
            'data': '=',
            'service': '@',
            'redirect': '='
        },
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                shareDataService.tempData = scope.data;
                shareDataService.service = scope.service;
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectUrl = scope.redirect.url;
                }
                if (typeof (scope.redirect) !== 'undefined') {
                    shareDataService.redirectParams = scope.redirect.params;
                }

                $rootScope.operationItem(3);
            });
        }
    }
});

commonDirective.directive('hideDeleteConfirmrModal', function () {
    return {
        strict: 'EAC',
        template: '',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                angular.element($("#layer").hide());
                angular.element($("#deleteConfirmModal").niftyModal('hide'));
            });
        }
    }
});

/*
 * Multiple Select
 * */
commonDirective.directive("multipleSelect", function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs, ctrl) {
            angular.element($('.associateSelect').multiselect({
                buttonWidth: '100%',
                buttonClass: 'btn btn-default btn-sm',
                buttonText: function (options) {
                    if (options.length === 0) {
                        return 'None selected <b class="caret"></b>';
                    }
                    else {
                        var selected = '';
                        options.each(function () {
                            selected += $(this).text() + ', ';
                        });
                        return selected.substr(0, selected.length - 2) + ' <b class="caret"></b>';
                    }

                }
            }));
        }
    }
});

commonDirective.directive("refreshMultipleSelect", function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('click', function () {
                angular.element($('.associateSelect').multiselect('refresh'));
            });
        }
    }
});

/*
 * Form Validate
 * */
commonDirective.directive("formValidate", function ($timeout) {
    return {
        restrict: 'EAC',
        require: 'ngModel',
        scope: {
            'validData': '=',
            'validType': '@'
        },
        link: function (scope, elm, attrs) {
            var touch = false;
            var validAttr = attrs.name;
            elm.on('keyup', function () {
                $timeout(function () {
                    if (scope.validType.indexOf('require') >= 0) {
                        console.log(scope.validData);
                        if (typeof(scope.validData) === 'undefined' || scope.validData === '') {
                            elm.parent().next().html('');
                            elm.parent().next().append('<div class="errorTips"><span class="badge badge-danger" style="margin-top: 5px;"> <i class="fa fa-times"></i> </span> &nbsp; <span><strong>Error! </strong>' + validAttr + ' is required</span> </div>');
                        } else {
                            elm.parent().next().html('');
                            elm.parent().next().append('<div class="successTips"> <span class="badge badge-success" style="margin-top: 5px;"> <i class="fa fa-check"></i> </span> </div>');


                        }
                    } else if (scope.validType.indexOf('ip') >= 0) {
                        console.log(scope.validData);
                        var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
                        if (reg.test(scope.validData)) {
                            elm.parent().next().html('');
                            elm.parent().next().append('<div class="successTips"> <span class="badge badge-success" style="margin-top: 5px;"> <i class="fa fa-check"></i> </span> </div>');
                        } else {
                            elm.parent().next().html('');
                            elm.parent().next().append('<div class="errorTips"><span class="badge badge-danger" style="margin-top: 5px;"> <i class="fa fa-times"></i> </span> &nbsp; <span><strong>Error! </strong>' + validAttr + ' is illegal</span> </div>');
                        }
                    }
                }, 500);
            });

        }
    };
});

/*
 * Multiple Block Select
 * */

commonDirective.directive('multipleBlockSelect', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.select2({width: '100%', closeOnSelect: false});
        }
    }
});

commonDirective.directive('test', function () {
    return {
        restrict: 'EAC',
        link: function (scope, elm, attrs) {
            elm.on('click', function () {
                alert();
            });

        }
    }
});