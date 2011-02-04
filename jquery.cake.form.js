(function($){
    $.fn.cakeAjaxForm = function(options){
        var settings = {
            success: function(){},
            failure: function(){},
            beforeSubmit: function(){},
            loadingSuccessSelector: '',
            loadingSelector: 'div.submit',
            loadingSuccessTimeout: 1000,
            loadingFadeSpeed: 1000,
            rowForm: false,
            successElem: '<div class="content-box changes-saved">'+
                           '<h4>Changes Saved</h4>'+
                           '<p>Thank you, your changes have been saved.</p>'+
                           '</div>'
        };
        $.extend(settings, options);

        function relativeTo(form){
            return (settings.rowForm ? form.parent() : form);
        }
        function loadingElem(form){
            return (settings.loadingSelector ? $(settings.loadingSelector, relativeTo(form)) : form);
        }
        function loadingSuccessElem(form){
            return (settings.loadingSuccessSelector ? $(settings.loadingSuccessSelector, relativeTo(form)) : form);
        }

        function traverseErrors(arr, name, callback){
            if (typeof(arr) != 'string'){
                for (key in arr){
                    traverseErrors(arr[key], name+'['+key+']', callback);
                }
            }
            else{
                callback(name, arr);
            }
        }

        this.live('submit', function(){
            $(this).ajaxSubmit({
                beforeSubmit: function(formData, jqForm, options){
                    var cont = settings.beforeSubmit(formData, jqForm, options);
                    if (cont){
                        loadingElem(jqForm).addClass('loading');
                    }
                    return cont;
                },
                success: function(responseText, statusText, xhr, form){
                    eval('var json = '+responseText);

                    $('div.error-message', relativeTo(form)).remove();
                    loadingElem(form).removeClass('loading');
                    setToSuccess(loadingSuccessElem(form), json.ok);

                    if (json.ok){
                        var success = $(settings.successElem).clone();
                        $(form).find('input[type="submit"]').after(success);

                        setTimeout(function(){
                            success.fadeOut(500, function(){success.remove();});
                        }, 3000);

                        settings.success(responseText, statusText, xhr, form, json);
                    }
                    else{
                        traverseErrors(json.invalid, 'data', function(name, msg){
                            $('*[name="'+name+'"]:last', relativeTo(form)).after('<div class="error-message">'+msg+'</div>');
                        });

                        settings.failure(responseText, statusText, xhr, form, json);
                    }
                }
            });
            return false;
        });

        //Generic loading gif stuff
        function setToSuccess(elem, success){
            elem.removeClass('loading');
            elem.addClass('loading-'+(success ? 'success' : 'failure'));
            setTimeout(
                function(){
                    elem.removeClass('loading-'+(success ? 'success' : 'failure'), settings.loadingFadeSpeed);
                },
                settings.loadingSuccessTimeout);
        }

    }
})(jQuery);
