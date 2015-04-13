/**
 * Created by dellx on 2015/4/9.
 */
var commonFilter = angular.module("commonFilter", []);

commonFilter.filter('timeFilter', function () {
    return function(input) {
        return new Date(input);
    };
});

commonFilter.filter('fieldFilter', function () {
    return function(input) {
        var temp=input;
        var count=0;
        for(var i=0;i<temp.length;i++){
            if(temp[i]!==';'){
                temp=temp.substring(i);
                count=i;
                break;
            }
        }
        for(var j=0;j<temp.length;j++){
            if(temp[j]===';'){
                temp=temp.substring(0,j);
                break;
            }
        }
        return temp;
    };
});