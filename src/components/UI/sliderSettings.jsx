import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const sliderSettings = {
  className: "owl-theme",
  items: 4,
  loop: true,
  margin: 10,
  dots: false,
  nav: true,
  responsive: {
    0: {
      items: 1, // 1 item shown on mobile screens (0px and up)
    },
    600: {
      items: 2, // 2 items shown on tablets (600px and up)
    },
    1000: {
      items: 4, // 4 items shown on desktops (1000px and up)
    },
  },
};

export default sliderSettings;
