(function ($) {

    $.deparam = $.deparam || function (uri) {
        if (uri === 'undefined') {
            uri = window.location.pathname;
        }
        let value1 = window.location.pathname;
        let value2 = value1.split('/');
        let value3 = value2.pop();
        return value3;
    }

})(jQuery);