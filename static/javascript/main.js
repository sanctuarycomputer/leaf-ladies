$(document).ready(function() {

  (function ($) {
    'use strict';
    $.mailchimpSingleOptIn = {
      init: function (selector, options) {
        $(selector).mailchimpSingleOptIn(options);
      }
    };
    $.fn.mailchimpSingleOptIn = function (options) {
      $(this).each(function(i, elem) {
        var form = $(elem);
        var email = form.find('input[type=email]');
        var settings = $.extend({
          onSubmit: function() {},
          onError: function() {},
          onSuccess: function() {}
        }, options);
        form.attr('novalidate', 'true');
        email.attr('name', 'email');
        form.submit(function (e) {
          e.preventDefault();
          var data = { list_id: settings.listID };
          var dataArray = form.serializeArray();
          $.each(dataArray, function (index, item) {
            data[item.name] = item.value;
          });
          settings.onSubmit();
          $.ajax({
            method: 'POST',
            url: settings.url,
            data: data,
            success: settings.onSuccess,
            error: settings.onError
          });
        });
      });
      return this;
    };
  })(jQuery);

  $('#mailchimp-form').mailchimpSingleOptIn({
    listID: '4b2836518e',
    url: 'https://bsc-mailchimp.herokuapp.com/',
    onSubmit: function() {
      $('#mailchimp-outlet').text('Submitting...');
    },
    onError: function(request) {
      $('#mailchimp-outlet').text(request.responseJSON.detail);
    },
    onSuccess: function() {
      $('#mailchimp-outlet').text("Thanks - you're in the draw!");
    }
  });

  $('.autofocus').on('click', function() {
    $(window).scrollTo($('#mailchimp-form').offset().top - 200, 800);
    $('#mailchimp-form input').focus();
  });
})
