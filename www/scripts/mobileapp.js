$(document).ready( function(){
    /*hide the hideables */
    $('div#failed_logon').hide();
    
    $("#logontoacct").click(function(){
        $('div#failed_logon').hide();
    
    });
    /*handle logon action */
    $("a#app-login-button").click(function(event){
        /* Handle login */
        var user = $('#username').val();
        var password = $('#password').val();
        var ccode = $('#ccode').val();
        var loginType = "";
        
        if ( $("#radio-boss").is(':checked')){
            loginType = $("#radio-boss").val();
        }

        if ( $("#radio-sales").is(':checked') ){
            loginType = $("#radio-sales").val();
        }

        var data = {
            'user':user,
            'password':password,
            'type':loginType,
            'company_code':ccode,
            'apiKey':'fvfgdfsbg'
        };

		
        var url = 'http://api.bosstrader.com.ng/v1/login';

        $.ajax({
            type: 'POST',
            url: url,
            data:data,
            dataType: 'json',
            success: function(data, textStatus){
                for(var a in data){
                    if(a === 'failure'){
                       
                        
                        $("#failed_logon").show();
                        return;
                    }
                }
                
                //if there is no error, then store the json file in the webstorage
                window.localStorage.setItem('session' , JSON.stringify(data));
                window.location.href = "home.html";
            },
            error:function(xhr,textStatus,errorThrown){
                alert(this.url+' An error occurred! ' + ( errorThrown ? errorThrown : xhr.status ));
            }
        });

    });
});