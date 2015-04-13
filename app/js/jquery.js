/**
 * Created by jabriel on 2015/1/21.
 */
$(function () {
    $(".cl-vnavigation").children("li").click(function () {
        $(".cl-vnavigation").children("li").removeClass("active");
        $(this).addClass("active");
    });


    /*DateTime Picker*/
    $(".datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});

    $(".multiselect-container li").click(function () {
        alert();
    });

    $(".btn-group").click(function () {
        alert();
    });



});