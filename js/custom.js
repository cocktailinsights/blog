$(document).ready(function(){
	$("#email-alert").hide();
	$("#alert-thanks").hide();
    $("#alert-name").hide();

    var $form = $('#subscribe');

    var emailinput;
    var fname;
    var alertValid;
    var thankyou;

    $(function(){
      $("#subscribe").on("submit", function(e){
         e.preventDefault();
         emailinput = document.getElementById("email").value;
         fname = document.getElementById("name").value;
         alertValid = $("#email-alert");
         thankyou = $("#alert-thanks");
         alertName = $("#alert-name");

         verifyEmail()
     })
  });

    function verifyEmail(){

        var status = false;     
        var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

        if(emailinput == ""){
            alertValid.show( "slow", function() {
                alertValid.delay(1000).hide(1000);
            });
        }
        else if (emailinput.search(emailRegEx) == -1) {
            alertValid.show( "slow", function() {
                alertValid.delay(1000).hide(1000);
            });
        }
        else if(fname == ""){
            alertName.show("slow", function(){
                alertName.delay(1000).hide(1000);
            });
        }
        else {
            postToMailChimp()  
        }
        return status;
    }


    function postToMailChimp() {
        $.ajax({
            url: "https://us13.api.mailchimp.com/3.0/lists/d572aeae8a/members",
            headers:{
                Authorization: 'apikey f874f3a198d224e89df4f5e3fb7a7f55-us13'
            },
            data: { 
                "email_address": emailinput,
                "status":"pending",
                "merge_fields":{
                    "FNAME":fname
                }
            },
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            statusCode: {
                404: function() {
                    alert("page not found");
                },
                200: function() {
                    thankyou.show( "slow", function() {
                        thankyou.delay(3000).hide(1000);
                    });
                    emailinput = "";
                }
            }
        });
    }

    // function postToMailChimp($form) {
    //     var $form = $('#subscribe');
    //     $.ajax({
    //         type: $form.attr('method'),
    //         url: $form.attr('action'),
    //         data: $form.serialize(),
    //         cache       : false,
    //         dataType    : 'json',
    //         contentType: "application/json; charset=utf-8",
    //         error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
    //         success     : function(data) {
    //             if (data.result != "success") {
    //                 alert("ooops");
    //             } else {
    //                 thankyou.show( "slow", function() {
    //                     thankyou.delay(3000).hide(1000);
    //                 });
    //                 emailinput = "";
    //             }
    //         }
    //     });
    // }

});

