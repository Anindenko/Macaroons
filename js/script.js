$(document).ready(function () {
    new WOW().init();
    $('.product__image').magnificPopup({type: 'image'});
    let productInput = $('#product-input');
    $('.product__btn').click((e) => {
        productInput.val($(e.target).parents('.product').find('.product__title').text());
        $('.order')[0].scrollIntoView({behavior: 'smooth'});

    });
    $('#burger').on('click', function () {
        $('#menu').addClass('open');
    });

    $('#menu *').on('click', function () {
        $('#menu').removeClass('open');
    });

    $('#choose-macaroon').click(function () {
        $('html, body').scrollTop($('#products').offset().top);
    });

    $('.responsive').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 758,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });
    $('#submit').click(function () {
        let name = $('#firstName');
        let numberPhone = $('#numberPhone');
        let hasError = false;

        $('.error-input').hide();

        if (!productInput.val()) {
            productInput.next().show();
            productInput.css('border-color', 'red');
            hasError = true;
        } else productInput.css('border-color', '#821328');
        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        } else name.css('border-color', '#821328');
        if (!numberPhone.val()) {
            numberPhone.next().show();
            numberPhone.css('border-color', 'red');
            hasError = true;
        } else numberPhone.css('border-color', '#821328');

        if (!hasError) {
            let loader = $('.loader');
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {product: productInput.val(), name: name.val(), phone: numberPhone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('.order__actions').css('display', 'none');
                        $('.order-popup').css('display', 'block');
                        setTimeout(function () {
                            $('.order-popup').hide();
                            $('.order__actions').show();
                            $('.order__form')[0].reset();
                            $('.error-input').hide();
                            $('.order__input').css('border-color', '#821328');
                        }, 6000);
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                    }
                });
        }
    })
    $('#numberPhone').inputmask('(+7) 999-999-99-99');
});
