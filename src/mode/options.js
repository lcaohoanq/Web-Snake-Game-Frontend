import { playIntroSound } from "../util/soundEffects.js";

$(document).ready(function () {
  //Play the intro sound
  playIntroSound();

  var inputPreview = $(".input-preview"),
    input = $(".input");

  TweenMax.set(input, {
    scale: 1.2,
    alpha: 0,
  });

  inputPreview.on("click", function () {
    var that = $(this);

    that.toggleClass("active");

    if (that.hasClass("active")) {
      TweenMax.staggerTo(
        input,
        1.25,
        {
          scale: 1,
          alpha: 1,
          ease: Elastic.easeOut,
        },
        0.1
      );
    } else {
      TweenMax.staggerTo(
        input,
        1,
        {
          scale: 1.2,
          alpha: 0,
          ease: Elastic.easeOut,
        },
        0.1
      );
    }
  });

  input.on("click", function () {
    var tlInput = new TimelineMax({
      onComplete: done,
    });

    var that = $(this),
      siblings = that.siblings(".input"),
      data = that.data("val"),
      top = that.css("top");

    siblings.removeClass("active");
    console.log(that.data("val"));
    tlInput
      .to(siblings, 0.25, {
        alpha: 0,
      })
      .to(that, 0.25, {
        scale: 1.2,
      })
      .to(that, 0.25, {
        top: 0,
      })
      .set(inputPreview, {
        display: "none",
      })
      .to(that, 0.25, {
        scale: 1,
      })
      .to(that, 0.5, {
        backgroundColor: "#1D77EF",
      })
      .set(inputPreview, {
        text: data,
        display: "block",
      })
      .to(that, 0.25, {
        alpha: 0,
      });

    function done() {
      inputPreview.removeClass("active");
      that.css("top", top).addClass("active");

      TweenMax.set(input, {
        scale: 1.2,
        alpha: 0,
        backgroundColor: "#fff",
      });
    }

    // direct to page mode respective to the selected mode
    let direct = checkMode(that.data("val"));
    window.location.href = direct;
  });
});

const checkMode = (mode) => {
  let direct = "";
  if (mode === "NoMaze") {
    direct = pathModeOptions[0];
  }
  if (mode === "Box") {
    direct = pathModeOptions[1];
  }
  if (mode === "Tunnel") {
    direct = pathModeOptions[2];
  }
  if (mode === "Mill") {
    direct = pathModeOptions[3];
  }
  if (mode === "Rails") {
    direct = pathModeOptions[4];
  }
  if (mode === "Campaign") {
    direct = pathModeOptions[5];
  }
  if (mode === "Apartment") {
    direct = pathModeOptions[6];
  }
  return direct;
};

const pathModeOptions = [
  "./nomaze/nomaze.html",
  "./box/box.html",
  "./tunnel/tunnel.html",
  "./mill/mill.html",
  "./rails/rails.html",
  "./campaign/campaign.html",
  "./apartment/apartment.html",
];

const modeOptions = [
  "NoMaze",
  "Box",
  "Tunnel",
  "Mill",
  "Rails",
  "Campaign",
  "Apartment",
];
