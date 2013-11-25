$(window).resize(function() {
  $("body").css("width","");
  pupMakeup();
});

$(window).load(function() {
  $("body").css("width",$("body").width()-1).css("width",$("body").width()+1);
});

$(document).ready(function () {

  // Simple slider
  
  if ($(".slider").length) {
    $(".slider").each(function() {
      $(this).simpleSlider({
        width:530
      });
    });
  }

  // Main regs jcarousel
  
  $(".mainpage-regs .jcarousel").jcarousel({
    scroll:4
  });

  $(".facts-tree .pup-trigger").hover(function() {
    var trigger = $(this);
    var popup = $(this).next(".tree-popup");
    
    if (trigger.offset().top - $(window).scrollTop() + trigger.height()/2 < $(window).height()/2) {
      popup.fadeToggle(250)
           .css("left",$(this).position().left - 200)
           .css("top",$(this).position().top + $(this).height() + 20)
           .removeClass("tree-popup-top")
    } else {
      popup.fadeToggle(250)
           .css("left",$(this).position().left - 200)
           .css("top",$(this).position().top - popup.height() - 20)
           .addClass("tree-popup-top")
    }
    
  })

  $(".main-slider").mainSlider();

  $(".fancybox").fancybox({
    padding: 0,
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  $(".form-text").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });

  $(".form-phone").mask("+7 (999) 999-99-99");

  //validateForms();

  makeup();
  
});

function makeup() {

  $("input.button").each(function () {
    if ($(this)[0].tagName == "INPUT" && !$(this).next("div.form-submit").length) {
      var divBtn = $("<div></div>");
      var submit = $(this);
      divBtn.attr("class",$(this).attr("class")).attr("id",$(this).attr("id")).html("<span>" + $(this).val() + "</span>");
      $(this).after(divBtn);
      $(this).hide();
      divBtn.on("click",function () {
        submit.click();
      });
    }
    
  });

  $("input:text, textarea").each(function() {
    $(this).addClass("initial");
    
    if ($(this).prop("tagName") == "INPUT") {
      // if (!$(this).parents(".input-wrapper").length) $(this).wrap("<div class='input-wrapper'></div>");
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        $(this).prev().prev(".placeholder").hide();
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    } else {
      $(this).focus(function() {
        $(this).removeClass("initial");
        $(this).parents(".form-item").find(".placeholder").hide();
      });
      $(this).blur(function() {
        if (!$(this).val()) {
          $(this).addClass("initial");
          $(this).parents(".form-item").find(".placeholder").show();
        }
      });
    }
      
    $(this).parents(".form-item").find(".placeholder").click(function() {
      $(this).focus();
    });
    
  });

  $("ul,ol").each(function() {
    if (!$(this).children("li").first().hasClass("first")) {
      $(this).children("li").last().addClass("last");
      $(this).children("li").first().addClass("first");
    }
  });

  $("ol li").each(function() {
    if (!$(this).find(".li-cont").length) {
      $(this).html("<span class='li-cont'>"+$(this).html()+"</span>")
    }
  });
  
  $("table").each(function() {
    if (!$(this).find("tr").first().hasClass("first")) {
      $(this).find("tr").last().addClass("last");
      $(this).find("tr").first().addClass("first");
      $(this).find("tr th").first().addClass("first");
    }
  });
  
  if ($(".page-content img").length) {
    $('.page-content img').filter(function() {
        var $th = $(this);
        return !$th.prev('img').length && !$(this).parents(".slider").length && ($th.parent().hasClass("page-content") || $th.parent("p").parent().hasClass("page-content")) && $(this).next('img').length;
    }).each(function() {
        
      var $th = $(this);
      if (!$th.parents(".slider").length) {
        if ($th.parents("p").length) {
          $th.parent().find("img").wrapAll('<div class="slider">');
        }
        $th.prev().nextUntil(':not(img)').wrapAll('<div class="slider">');
        $th.parents(".slider").simpleSlider({
          width:520,
          showtitles: false
        });
      }
    });
    
    $('.page-content img').filter(function() {
        var $th = $(this);
        return !$th.prev('img').length && !$(this).parents(".slider").length && ($th.parent().hasClass("page-content") || $th.parent("p").parent().hasClass("page-content")) && !$(this).next('img').length;
    }).each(function() {
        
      var $th = $(this);
      if (!$th.parents(".article-pic").length) {
        $th.wrap("<div class='article-pic' />")
        if ($th.attr("title")) $th.after("<div class='title' style='width:"+$th.width()+"px;'>"+$th.attr("title")+"</div>");
      }
    });
    
  }
  
  
  
}

function validateForms() {
  
  var validatoractionForm2 = $("#actionForm2").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    /*rules: {
      action_2_email: {
        required: true,
        email: true
      }
    },*/
    messages: {
      action_2_name: "Поле не заполнено!",
      action_2_phone: "Поле не заполнено!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#actionForm2").submit(function() {
    if ($("#actionForm2").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#action_2_subject").val(), 
            kind: $("#action_2_kind").val(), 
            name: $("#action_2_name").val(), 
            phone: $("#action_2_phone").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatoractionForm1 = $("#actionForm1").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    /*rules: {
      action_1_email: {
        required: true,
        email: true
      }
    },*/
    messages: {
      action_1_name: "Поле не заполнено!",
      action_1_phone: "Поле не заполнено!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#actionForm1").submit(function() {
    if ($("#actionForm1").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#action_1_subject").val(), 
            kind: $("#action_1_kind").val(), 
            name: $("#action_1_name").val(), 
            phone: $("#action_1_phone").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatoractionForm3 = $("#actionForm3").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      action_3_email: {
        email: true
      }
    },
    messages: {
      action_3_name: "Поле не заполнено!",
      action_3_phone: "Поле не заполнено!",
      action_3_email: "Введите правильный email!",
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#actionForm3").submit(function() {
    if ($("#actionForm3").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#action_3_subject").val(), 
            kind: $("#action_3_kind").val(), 
            name: $("#action_3_name").val(), 
            phone: $("#action_3_phone").val(),
            email: $("#action_3_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
   var validatoractionForm4 = $("#actionForm4").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      action_4_email: {
        email: true
      }
    },
    messages: {
      action_4_name: "Поле не заполнено!",
      action_4_phone: "Поле не заполнено!",
      action_4_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#actionForm4").submit(function() {
    if ($("#actionForm4").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#action_4_subject").val(), 
            kind: $("#action_4_kind").val(), 
            name: $("#action_4_name").val(), 
            phone: $("#action_4_phone").val(),
            email: $("#action_4_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatoractionForm5 = $("#actionForm5").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      action_5_email: {
        email: true
      }
    },
    messages: {
      action_5_name: "Поле не заполнено!",
      action_5_phone: "Поле не заполнено!",
      action_5_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#actionForm5").submit(function() {
    if ($("#actionForm5").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#action_5_subject").val(), 
            kind: $("#action_5_kind").val(), 
            name: $("#action_5_name").val(), 
            phone: $("#action_5_phone").val(),
            email: $("#action_5_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatoractionForm6 = $("#actionForm6").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      action_6_email: {
        email: true
      }
    },
    messages: {
      action_6_name: "Поле не заполнено!",
      action_6_phone: "Поле не заполнено!",
      action_6_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#actionForm6").submit(function() {
    if ($("#actionForm6").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#action_6_subject").val(), 
            kind: $("#action_6_kind").val(), 
            name: $("#action_6_name").val(), 
            phone: $("#action_6_phone").val(),
            email: $("#action_6_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatorcalcForm = $("#calcForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      calc_email: {
        email: true
      }
    },
    messages: {
      calc_name: "Поле не заполнено!",
      calc_phone: "Поле не заполнено!",
      calc_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors) {                    
            validatorcalc.errorList[0].element.focus();
        }
    } 
  });
    
  $("#calcForm").submit(function() {
    if ($("#calcForm").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#calc_subject").val(), 
            kind: $("#calc_kind").val(), 
            name: $("#calc_name").val(), 
            phone: $("#calc_phone").val(),
            email: $("#calc_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatormanagerForm = $("#managerForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      manager_email: {
        email: true
      }
    },
    messages: {
      manager_name: "Поле не заполнено!",
      manager_phone: "Поле не заполнено!",
      manager_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatormanager) {
        var errors = validatormanager.numberOfInvalids();
        if (errors) {                    
            validatormanager.errorList[0].element.focus();
        }
    } 
  });
    
  $("#managerForm").submit(function() {
    if ($("#managerForm").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#manager_subject").val(), 
            kind: $("#manager_kind").val(), 
            name: $("#manager_name").val(), 
            phone: $("#manager_phone").val(),
            email: $("#manager_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatorcallbackForm = $("#callbackForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    messages: {
      callback_name: "Поле не заполнено!",
      callback_phone: "Поле не заполнено!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorcallback) {
        var errors = validatorcallback.numberOfInvalids();
        if (errors) {                    
            validatorcallback.errorList[0].element.focus();
        }
    } 
  });
    
  $("#callbackForm").submit(function() {
    if ($("#callbackForm").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#callback_subject").val(), 
            kind: $("#callback_kind").val(), 
            name: $("#callback_name").val(), 
            phone: $("#callback_phone").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatorportfolioForm = $("#portfolioForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      portfolio_email: {
        email: true
      }
    },
    messages: {
      portfolio_name: "Поле не заполнено!",
      portfolio_phone: "Поле не заполнено!",
      portfolio_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorportfolio) {
        var errors = validatorportfolio.numberOfInvalids();
        if (errors) {                    
            validatorportfolio.errorList[0].element.focus();
        }
    } 
  });
    
  $("#portfolioForm").submit(function() {
    if ($("#portfolioForm").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#portfolio_subject").val(), 
            kind: $("#portfolio_kind").val(), 
            name: $("#portfolio_name").val(), 
            phone: $("#portfolio_phone").val(),
            email: $("#portfolio_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  var validatornyForm = $("#nyForm").bind("invalid-form.validate", function() {
  	    
    }).validate({
    focusInvalid: false,
    sendForm : false,
    rules: {
      ny_email: {
        email: true
      }
    },
    messages: {
      ny_name: "Поле не заполнено!",
      ny_phone: "Поле не заполнено!",
      ny_email: "Введите правильный email!"
    },
    errorPlacement: function(error, element) {
      // element.parents(".input-wrapper").addClass("input-wrapper-error");
      error.insertAfter(element);
    },
    unhighlight: function(element, errorClass, validClass) {
      // $(element).parents(".input-wrapper").removeClass("input-wrapper-error");
      $(element).removeClass(errorClass);
      $(element).next("label.error").remove();
    },
    invalidHandler: function(form, validatorny) {
        var errors = validatorny.numberOfInvalids();
        if (errors) {                    
            validatorny.errorList[0].element.focus();
        }
    } 
  });
    
  $("#nyForm").submit(function() {
    if ($("#nyForm").valid()) {
      //$(".loader").show();
      $.ajax({
        type: "POST",
        url: "order.php",
          data: { 
            subject: $("#ny_subject").val(), 
            kind: $("#ny_kind").val(), 
            name: $("#ny_name").val(), 
            phone: $("#ny_phone").val(),
            email: $("#ny_email").val()
          }
        }).done(function() {
        
        formSuccess()
        
      });
      return false;
    }
	});
  
  
}

function closePopup() {
  $(".tint").remove();
  $(".popup").hide();
}

function pupMakeup() {
  var popup = $(".popup-act");
  var pupTop = $(window).scrollTop() + ($(window).height() - popup.outerHeight(true))/2;
  if (pupTop < 20) pupTop = 20;
  $(".tint").css("height",$(document).height()).css("width",$("body").width());
  if (!popup.hasClass("price-popup")) {
    popup.css("top",pupTop).css("left",($(window).width()-popup.outerWidth(true))/2 - 20);
  } else {
    popup.css("margin-top",$(window).scrollTop() - popup.parent().offset().top - popup.parent().outerHeight(true) + ($(window).height()-popup.outerHeight(true))/2);
  }
  
}

function openPopup(pupId) {
  var popup = $("#"+pupId);
  popup.show().addClass("popup-act").fadeTo(0,1);
  $("body").append("<div class='tint' />");
  
  if (!popup.children(".popup-shadow").length) {
    popup.append("<div class='popup-shadow' />");
  } 
  
  popup.fadeIn(250);
  pupMakeup();
  $(".tint").fadeIn(250);
  jQuery(document).keydown(function(e){
    if (e == null) { // ie
      keycode = event.keyCode;
    } else { // mozilla
      keycode = e.which;
    }
    
    if(keycode == 27){ // escape, close box
      closePopup()
    }
    
  });
  
  $(".tint").on("click", function () {
    closePopup()
  });
  
  $(".popup .close, .popup .cancel").on("click", function () {
    closePopup()
  });
}

function formSuccess() {
  $(".popup").hide();
  $(".tint").remove();
  openPopup('successPopup');
  pupMakeup();
  
  var t = setTimeout(function() {
    closePopup('successPopup');
  },3000)
  
  
}

(function( jQuery ) {
  jQuery.fn.mainSlider = function() {
    var slider = $(this);
    var slides = slider.children(".slide");
    var sliderSize = slides.size();
    
    slider.append("<div class='prev'></div>");
    slider.append("<div class='next'></div>");
    
    var prevBtn = slider.children(".prev");
    var nextBtn = slider.children(".next");
    
    slides.hide();
    slides.eq(0).show().addClass("slide-act");
    
    prevBtn.on("click",function () {
      curSlide = slider.find(".slide-act");
      slides.fadeOut(1000).removeClass("slide-act");
      if (!curSlide.prevAll(".slide").length) {
        slides.eq(slides.length-1).fadeIn(1000).addClass("slide-act");
      } else {
        curSlide.prev(".slide").fadeIn(1000).addClass("slide-act");
      }
    });
    
    nextBtn.on("click",function () {
      curSlide = slider.find(".slide-act");
      slides.fadeOut(1000).removeClass("slide-act");
      if (!curSlide.nextAll(".slide").length) {
        slides.eq(0).fadeIn(250).addClass("slide-act");
      } else {
        curSlide.next(".slide").fadeIn(1000).addClass("slide-act");
      }
    });
    
    var play = 1;
    
    slider.bind("mouseover",function () {
      play = 0;
    });
    
    slider.bind("mouseout",function () {
      play = 1;
    });
    
    if (play) {
      var t = setInterval(function () {
        if (play) {
          nextBtn.click();
        }
      },10000);
    }
    
  }
})( jQuery );

(function( $ ) {
  $.fn.simpleSlider = function(options) {
    var slider = $(this);
    
    if (!slider.parents(".simple-slider").length) {
      slider.css("width",options.width);
      // slider.css("height",options.height);
      slider.wrap("<div class='simple-slider' />");
      slider.children().each(function() {
        $(this).wrap("<div class='slide'><div class='pic-wrapper'><div class='pic' style='width:"+options.width+"px;'></div></div></div>")
        if (options.showtitles && $(this).attr("title")) {
          $(this).parents(".slide").append("<div class='img-descr'>"+$(this).attr("title")+"</div>")
        }
      });
      var items = $(this).children("div.slide");
      
      var sliderSize = items.length;
      
      items.each(function() {
        $(this).addClass("slide").attr("index",$(this).index());
        imgMarginTop = -$(this).find("img").height()/2+options.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        $(this).find("img").css("margin-top",imgMarginTop).after("<div class='pic-mask' />");
        if ($(this).find("img").hasClass("noframe")) {
          $(this).find(".pic-mask").hide();
        }
      });
      
      items.hide();
      items.eq(0).addClass("current").show();
      
      slider.css("height",items.eq(0).height());
      
      if (sliderSize > 1) {
        slider.after("<div class='next' />");
        slider.after("<div class='prev' />");
      }
      
      // slider.find(".pic-mask").css("width",options.width-20)
      // slider.find(".pic-mask").css("height",options.height-20)
      
      var prevBtn = slider.parents(".simple-slider").find(".prev");
      var nextBtn = slider.parents(".simple-slider").find(".next");
      
      prevBtn.css("top",options.height/2-24)
      nextBtn.css("top",options.height/2-24)
      
      nextBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex < sliderSize-1) {
          curIndex++;
          items.eq(curIndex-1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(0).fadeIn(250).addClass("current");
          slider.css("height",items.eq(0).height());
        }
        imgMarginTop = -items.eq(curIndex).find("img").height()/2+slider.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        items.eq(curIndex).find("img").css("margin-top",imgMarginTop);
      });
      
      prevBtn.click(function() {
        curIndex = parseInt(slider.find(".current").attr("index"))
        if (curIndex > 0) {
          curIndex--;
          items.eq(curIndex+1).fadeOut(250).removeClass("current");
          items.eq(curIndex).fadeIn(250).addClass("current");
          slider.css("height",items.eq(curIndex).height());
        } else {
          items.eq(curIndex).fadeOut(250).removeClass("current");
          items.eq(sliderSize-1).fadeIn(250).addClass("current");
          slider.css("height",items.eq(sliderSize-1).height());
        }
        imgMarginTop = -items.eq(curIndex).find("img").height()/2+slider.height/2;
        if (imgMarginTop > 0) imgMarginTop = 0;
        items.eq(curIndex).find("img").css("margin-top",imgMarginTop);
      });
    
    }
    
  };
})( jQuery );
