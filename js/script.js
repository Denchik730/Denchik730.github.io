$(document).ready(function(){
	$('.carousel__inner').slick({
		speed: 1200,
		// adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron_left_solid.png"</button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron_right_solid.png"</button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					dots: true,
					arrows: false
				}				
			}
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
		$(this)
			.addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});


	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		})
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__list__back');

	// Modal
	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow');

	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #thanks, #order').fadeOut('slow')
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});


	function validateForms(form){
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожайлуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов!")
				},
				phone: "Пожайлуйста, введите свой номер телефон",
				email: {
					required: "Пожайлуйста, введите свою почту",
					email: "Неправильно введен адрес почты"
				}
			}
		});
	};

	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #application').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

	// Smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
		  // Prevent default anchor click behavior
		  event.preventDefault();
	
		  // Store hash
		  var hash = this.hash;
	
		  // Using jQuery's animate() method to add smooth page scroll
		  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
	
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		  });
		} // End if
	  });
	  new WOW().init();
});



// const slider = tns({
//     container: '.carousel__inner',
//     items: 1,
//     slideBy: 'page',
//     autoplay: false,
//     controls: false,
//     nav: false
//   });

// document.querySelector('.prev').addEventListener('click', function () {
//   slider.goTo('prev');
// });

// document.querySelector('.next').addEventListener('click', function () {
//   slider.goTo('next');
// });