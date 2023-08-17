const scroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});

const firstPageAnimation = () => {
  let tl = gsap.timeline();

  tl.from(".nav", {
    y: "10",
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut,
  })

    .to(".bounding-elem", {
      y: "0",
      duration: 1.5,
      ease: Expo.easeInOut,
      stagger: 0.2,
      delay: -1,
    })
    .from(".herofooter", {
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -0.8,
    })
    .to(".bounding-elem2", {
      y: "0",
      duration: 2,
      ease: Expo.easeInOut,
      delay: -1.5,
    });
};

let timeout;

const miniCircleHandler = () => {
  let xScale = 1;
  let yScale = 1;

  let xPrev = 0;
  let yPrev = 0;
  window.addEventListener("mousemove", (event) => {
    clearTimeout(timeout);

    let xDiff = event.clientX - xPrev;
    let yDiff = event.clientY - yPrev;

    xPrev = event.clientX;
    yPrev = event.clientY;

    xScale = gsap.utils.clamp(0.7, 1.2, xDiff);
    yScale = gsap.utils.clamp(0.7, 1.2, yDiff);

    circleaMouseFollower(xScale, yScale);

    timeout = setTimeout(() => {
      document.querySelector(
        ".mini-circle"
      ).style.transform = `translate(${event.clientX}px,${event.clientY}px) scale(1,1)`;
    }, 100);
  });
};

function circleaMouseFollower(xScale, yScale) {
  window.addEventListener("mousemove", (event) => {
    document.querySelector(
      ".mini-circle"
    ).style.transform = `translate(${event.clientX}px,${event.clientY}px) scale(${xScale},${yScale})`;
  });
}

miniCircleHandler();
circleaMouseFollower();
firstPageAnimation();

document.querySelectorAll(".elem").forEach((elem) => {
  let rotate = 0;
  let different = 0;

  elem.addEventListener("mouseleave", (event) => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (event) {
    let diff = event.clientY - elem.getBoundingClientRect().top;
    different = event.clientX - rotate;
    rotate = event.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: event.clientX,
      rotate: gsap.utils.clamp(-20, 20, different * 0.5),
    });
  });
});
