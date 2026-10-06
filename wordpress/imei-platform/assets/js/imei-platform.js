jQuery(function ($) {
    $('.imei-platform-form').on('submit', function (e) {
        e.preventDefault();

        var $form = $(this);
        var action = $form.data('action');
        var $result = $form.next('.imei-platform-result');

        $.ajax({
            url: imeiPlatform.ajaxUrl,
            method: 'POST',
            data: {
                action: action,
                security: imeiPlatform.nonce,
                ...$form.serializeArray().reduce(function (acc, item) {
                    acc[item.name] = item.value;
                    return acc;
                }, {})
            },
            success: function (response) {
                $result
                    .addClass('is-visible')
                    .text(response.data && response.data.message ? response.data.message : 'Request completed.');
            },
            error: function () {
                $result
                    .addClass('is-visible')
                    .text('There was an error while processing your request.');
            }
        });
    });
});
