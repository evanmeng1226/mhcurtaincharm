	
jQuery(document).ready(function ($) {
	$('#send').click(function(){
		$('.error').fadeOut('slow');

		var error = false;

		var name = $('input#name').val();
		if(name == "" || name == " ") {
			$('#err-name').fadeIn('slow');
			error = true;
		}

		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
		var email = $('input#email').val();
		if (email == "" || email == " ") {
			$('#err-email').fadeIn('slow');
			error = true;
		}else if (!email_compare.test(email)) {
			$('#err-emailvld').fadeIn('slow');
			error = true;
		}

		if(error == true) {
			$('#err-form').slideDown('slow');
			return false;
		}

		var serializedData = new URLSearchParams(new FormData(this)).toString();

		$.ajax({
			type: "POST",
			url: $('#ajax-form').attr('action'),
			data: serializedData,
			timeout: 6000,
			error: function(request,error) {
				if (error == "timeout") {
					$('#err-timedout').slideDown('slow');
				}
				else {
					$('#err-state').slideDown('slow');
					$("#err-state").html('An error occurred: ' + error + '');
				}
			},
			success: function() {
				$('#ajax-form').slideUp('slow');
				$('#ajaxsuccess').slideDown('slow');
			}
		});

		return false;
	});
});
