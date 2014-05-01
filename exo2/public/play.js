$(document).ready(function () {
    $('.square').mouseenter(function () {
        $(this).fadeTo('slow', 0.25);
    });
    $('.square').mouseleave(function () {
        $(this).fadeTo('slow', 1);
    });
    $('.square').mouseleave(function () {
        $(this).fadeTo('slow', 1);
    });
    $('.square').click(function () {
        $(this).slideUp();
    });
});
