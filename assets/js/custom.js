$(document).ready(function () {
  "use strict";

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 600) {
      $(".return-to-top").fadeIn();
    } else {
      $(".return-to-top").fadeOut();
    }
  });
  $(".return-to-top").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
    return false;
  });

  $(".header-area").sticky({
    topSpacing: 0,
  });

  $("li.smooth-menu a").bind("click", function (event) {
    event.preventDefault();
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top - 0,
        },
        1200,
        "easeInOutExpo"
      );
  });

  $("body").scrollspy({
    target: ".navbar-collapse",
    offset: 0,
  });

  var dataToggleTooTip = $('[data-toggle="tooltip"]');
  var progressBar = $(".progress-bar");
  if (progressBar.length) {
    progressBar.appear(function () {
      dataToggleTooTip
        .tooltip({
          trigger: "manual",
        })
        .tooltip("show");
      progressBar.each(function () {
        var each_bar_width = $(this).attr("aria-valuenow");
        $(this).width(each_bar_width + "%");
      });
    });
  }

  $("#client").owlCarousel({
    items: 7,
    loop: true,
    smartSpeed: 1000,
    autoplay: true,
    dots: false,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      415: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1199: {
        items: 4,
      },
      1200: {
        items: 7,
      },
    },
  });

  $(".play").on("click", function () {
    owl.trigger("play.owl.autoplay", [1000]);
  });
  $(".stop").on("click", function () {
    owl.trigger("stop.owl.autoplay");
  });

  $(window).load(function () {
    $(".header-text h2,.header-text p")
      .removeClass("animated fadeInUp")
      .css({ opacity: "0" });
    $(".header-text a")
      .removeClass("animated fadeInDown")
      .css({ opacity: "0" });
  });

  $(window).load(function () {
    $(".header-text h2,.header-text p")
      .addClass("animated fadeInUp")
      .css({ opacity: "0" });
    $(".header-text a").addClass("animated fadeInDown").css({ opacity: "0" });
  });
});

function submitForm(e) {
  e.preventDefault();
  const url = "https://api.web3forms.com/submit";

  // <input type="text" id="name"

  const nameInput = e.target.querySelector('input[name="name"]');
  const emailInput = e.target.querySelector('input[name="email"]');
  const messageInput = e.target.querySelector('textarea[name="message"]');

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  if (!name || !email || !message) {
    return;
  }
  if (!email.includes("@")) {
    return;
  }

  const submitButton = e.target.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerText = "Sending...";

  let ipAddress = "Unknown";
  try {
    const xmlHttpReq = new XMLHttpRequest();
    xmlHttpReq.open("GET", "https://api.ipify.org?format=json", false);
    xmlHttpReq.send(null);
    ipAddress = JSON.parse(xmlHttpReq.responseText).ip;
  } catch {}

  const formData = {
    access_key: "b7a46c4c-836f-4438-9e1f-3dc46b7da4f5",
    redirect: "https://belov.us/success.html",
    subject: "New Submission from belov.us",
    from_name: "Vadim Belov",
    replyto: "job@belov.us",
    name: name,
    email: email,
    message: message,
    browser: navigator.appVersion,
    os: navigator.platform,
    ipAddress: "https://2ip.io/whois/?ip=" + ipAddress,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = formData.redirect;
        return;
      } else {
        alert("Failed to submit form: " + response.statusText);
        submitButton.disabled = false;
        submitButton.innerText = "SUBMIT";
      }
    })
    .catch((error) => {
      alert("Failed to submit form: " + error);
      submitButton.disabled = false;
      submitButton.innerText = "SUBMIT";
      console.log("error :>> ", error);
    });
}
