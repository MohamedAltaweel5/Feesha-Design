$(document).ready(function () {
    var bgImageArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
    var base = "img/header-sec/";
    var secs = 4;

    bgImageArray.forEach(function (img) {
        new Image().src = base + img;
    });

    function backgroundSequence() {
        window.clearTimeout();
        var k = 0;
        for (i = 0; i < bgImageArray.length; i++) {
            setTimeout(function () {
                document.getElementById("header-bg").style.backgroundImage = "url(" + base + bgImageArray[k] + ")";
                if ((k + 1) === bgImageArray.length) {
                    setTimeout(function () {
                        backgroundSequence()
                    }, (secs * 1000))
                }
                else {
                    k++;
                }
            }, (secs * 1000) * i)
        }
    }
    backgroundSequence();
});

$(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $("header").addClass("browsing-state");
            $(".navbar-brand img").attr("src", "img/feesha-logo-a.png");
        }
        else {
            $("header").removeClass("browsing-state");
            $(".navbar-brand img").attr("src", "img/feesha-logo-b.png");
        }
    });
});

$(document).ready(function () {
    $('#feesha-video').backgroundVideo({
        pauseVideoOnViewLoss: false,
        parallax: true,
        parallaxOptions: { effect: 2 },
        preventContextMenu: true
    });
});

$("#video-volume").click(function () {
    if ($(this).hasClass("fa fa-volume-up")) {
        $(this).attr("class", "fa fa-volume-off");
        $(this).css("right", "30px");
        $("video").prop('muted', true);
    }
    else {
        $(this).attr("class", "fa fa-volume-up");
        $(this).css("right", "14px");
        $("video").prop('muted', false);
    }
});

$(function () {
    var form = $('#submit-contact-us-form');
    var formMessages = $('#form-submission-alert');

    $(form).submit(function (event) {
        // Stop the browser from submitting the form.
        event.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('alert alert-danger');
            $(formMessages).addClass('alert alert-success');

            // Set the message text.
            $(formMessages).text(response);

            // Clear the form.
            $('#name-contact-us-form').val('');
            $('#email-contact-us-form').val('');
            $('#textarea-contact-us-form').val('');
        }).fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('alert alert-success');
            $(formMessages).addClass('alert alert-danger');

            // Set the message text.
            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});

$(function () {
    var subscription = $('#submit-subscription-form');
    var subscriptionMessages = $('#subscription-submission-alert');

    $(subscription).submit(function (event) {
        // Stop the browser from submitting the subscription.
        event.preventDefault();

        // Serialize the subscription data.
        var subscriptionData = $(subscription).serialize();

        // Submit the subscription using AJAX.
        $.ajax({
            type: 'POST',
            url: $(subscription).attr('action'),
            data: subscriptionData
        }).done(function (response) {
            // Make sure that the subscriptionMessages div has the 'success' class.
            $(subscriptionMessages).removeClass('alert alert-danger');
            $(subscriptionMessages).addClass('alert alert-success');

            // Set the message text.
            $(subscriptionMessages).text(response);

            // Clear the form.
            $('#subscription-email').val('');
        }).fail(function (data) {
            // Make sure that the subscriptionMessages div has the 'error' class.
            $(subscriptionMessages).removeClass('alert alert-success');
            $(subscriptionMessages).addClass('alert alert-danger');

            // Set the message text.
            if (data.responseText !== '') {
                $(subscriptionMessages).text(data.responseText);
            } else {
                $(subscriptionMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });
});

var height = $(window).height();
var controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({ triggerElement: "#top", duration: height })
    .setClassToggle("#home-sec", "active")
    .addTo(controller);
new ScrollMagic.Scene({ triggerElement: "#services", duration: height })
    .setClassToggle("#services-sec", "active")
    .addTo(controller);
new ScrollMagic.Scene({ triggerElement: "#about", duration: height * 2.5 })
    .setClassToggle("#about-sec", "active")
    .addTo(controller);
new ScrollMagic.Scene({ triggerElement: "#contact-us", duration: height })
    .setClassToggle("#contact-us-sec", "active")
    .addTo(controller);