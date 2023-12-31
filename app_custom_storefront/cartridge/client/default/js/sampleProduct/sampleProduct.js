'use strict';

/**
 * Display the returned message.
 * @param {string} data - data returned from the server's ajax call
 * @param {Object} button - button that was clicked for contact us sign-up
 */
function displayMessage(data, button) {
    $.spinner().stop();
    var status;
    if (data.success) {
        status = 'alert-success';
    } else {
        status = 'alert-danger';
    }

    if ($('.sampleForm-signup-message').length === 0) {
        $('body').append(
            '<div class="sampleForm-signup-message"></div>'
        );
    }
    $('.sampleForm-signup-message')
        .append('<div class="sampleForm-signup-alert text-center ' + status + '" role="alert">' + data.msg + '</div>');

    setTimeout(function () {
        $('.sampleForm-signup-message').remove();
        button.removeAttr('disabled');
    }, 3000);
}

module.exports = {
    subscribeContact: function () {
        $('form.sampleForm').submit(function (e) {
            console.log ("hello akash");
            e.preventDefault();
            var form = $(this);
            var button = $('.subscribe-sampleForm');
            var url = form.attr('action');

            $.spinner().start();
            button.attr('disabled', true);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: form.serialize(),
                success: function (data) {
                    displayMessage(data, button);
                    if (data.success) {
                        $('.sampleForm').trigger('reset');
                    }
                },
                error: function (err) {
                    displayMessage(err, button);
                }
            });
        });
    }
};
