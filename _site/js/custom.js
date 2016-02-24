$(document).ready(function(){
	$(".email-alert").hide();
	$(".alert-thanks").hide();

	var emailinput;
	var alertValid;
	var thankyou;

	$(function(){
		$("#subscribe").on("submit", function(e){
			e.preventDefault();
			emailinput = document.getElementById("email1").value
			alertValid = $(".email-alert");
			thankyou = $(".alert-thanks");

			verifyEmail()
		})
	});

	function verifyEmail(){

        var status = false;     
        var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

        if(emailinput == ""){
            alertValid.show( "slow", function() {
                alertValid.delay(3000).hide(1000);
            });
        }
        else if (emailinput.search(emailRegEx) == -1) {
            alertValid.show( "fast", function() {
                alertValid.delay(3000).hide();
            });
        }
        else {
            postToGoogle();
        }
        return status;
    }

    function postToGoogle() {
        $.ajax({
            url: "https://docs.google.com/forms/d/1-4sEdqmtlM2T-bJQPvwFnabpMwyEl52XfdYEeUU8X9c/formResponse",
            data: {"entry.216132264": emailinput},
            type: "POST",
            dataType: "xml",
            statusCode: {
                0: function() {
                    thankyou.show( "slow", function() {
                        thankyou.delay(3000).hide(1000);
                    });
                    emailinput = "";
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

})
