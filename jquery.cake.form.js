(function($){
    $.fn.cakeAjaxForm = function(options){
        settings = {
            success: function(){},
            failure: function(){}
        };
        $.extend(settings, options);

        this.ajaxForm({
                success: function(responseText, statusText, xhr, form){
                    eval('var json = '+responseText);
                    if (json.ok){
                        settings.success(responseText, statusText, xhr, form);
                    }
                    else{
                        $('div.error-message', form).remove();
                        for (var model in json.invalid){
                            for (var field in json.invalid[model]){
                                var name = 'data['+model+']['+field+']';
                                $('*[name="'+name+'"]', form).after('<div class="error-message">'+json.invalid[model][field]+'</div>');
                            }
                        }
                        settings.failure(responseText, statusText, xhr, form);
                    }
                }
            });
    }
})(jQuery);
