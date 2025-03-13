import {
  AlignEndVertical,
  AlignStartVertical,
  AlignCenterVertical,
} from "lucide-react";

const getArrow = (direction) => {
  let angle = 0;
  let viewBox = "";
  switch (direction) {
    case "topleft":
      angle = 270;
      viewBox = "0.0 -100.0 90.0 110.0";
      break;
    case "topright":
      viewBox = "-5.0 -10.0 90.0 110.0";
      break;
    case "bottomleft":
      angle = 180;
      viewBox = "-90.0 -100.0 90.0 110.0";
      break;
    case "bottomright":
      angle = 90;
      viewBox = "-103.0 -10.0 90.0 110.0";
      break;
    default:
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox={viewBox}>
      <path
        transform={`rotate(${angle})`}
        d="m19.246 9.3672c-0.12109 0-0.21875 0.097656-0.21875 0.21875v7.7344c0 0.12109 0.097656 0.21875 0.21875 0.21875h63.215v63.211c0 0.12109 0.097656 0.21875 0.21875 0.21875h7.7344c0.12109 0 0.21875-0.097656 0.21875-0.21875v-71.164c0-0.12109-0.097656-0.21875-0.21875-0.21875zm-9.6016 43.934 59.055-22.281 0.27734 0.27734-22.277 59.055-0.39453 0.03125-9.3633-17.367-17.555 17.551c-0.085938 0.085938-0.22266 0.085938-0.30859 0l-9.6484-9.6484c-0.085938-0.085938-0.085938-0.22266 0-0.30859l17.555-17.555-17.363-9.3633z"
      />
    </svg>
  );
};

export const AlignEndVertically = <AlignEndVertical />;
export const AlignStartVertically = <AlignStartVertical />;
export const AlignCenterVerticallyTop = <AlignCenterVertical />;
export const AlignCenterVerticallyEnd = (
  <AlignCenterVertical className="rotate-180" />
);

export const ArrowTopLeft = getArrow("topleft");
export const ArrowTopRight = getArrow("topright");
export const ArrowBottomLeft = getArrow("bottomleft");
export const ArrowBottomRight = getArrow("bottomright");
export const ArrowCenter = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 64 64"
  >
    <path d="M39,32a7,7,0,1,0-7,7A7.00818,7.00818,0,0,0,39,32Zm-7,2a2,2,0,1,1,2-2A2.00229,2.00229,0,0,1,32,34Z" />
    <circle cx="6" cy="6" r="4" />
    <circle cx="58" cy="6" r="4" />
    <circle cx="58" cy="58" r="4" />
    <circle cx="6" cy="58" r="4" />
    <rect
      x="15.52354"
      y="15.44354"
      width="1.99979"
      height="2.00013"
      transform="translate(-6.78779 16.49603) rotate(-44.99011)"
    />
    <rect
      x="18.35167"
      y="18.27208"
      width="1.99979"
      height="1.99979"
      transform="translate(-7.9594 19.32825) rotate(-45)"
    />
    <rect
      x="9.86632"
      y="9.7868"
      width="1.99979"
      height="2.00013"
      transform="translate(-4.44484 10.84033) rotate(-44.99011)"
    />
    <rect
      x="12.69542"
      y="12.61534"
      width="1.99979"
      height="1.99979"
      transform="translate(-5.61616 13.67186) rotate(-45)"
    />
    <rect
      x="21.17994"
      y="21.10035"
      width="2.00048"
      height="2.00048"
      transform="translate(-9.13103 22.16767) rotate(-45.01978)"
    />
    <rect
      x="24.0089"
      y="23.92889"
      width="1.99979"
      height="2.00013"
      transform="translate(-10.30254 24.97931) rotate(-44.99011)"
    />
    <rect x="31" y="13" width="2" height="2" />
    <path d="M31,9.858V11h2V9.858a4,4,0,1,0-2,0Z" />
    <rect x="31" y="17" width="2" height="2" />
    <rect x="31" y="21" width="2" height="2" />
    <rect
      x="43.80772"
      y="18.27208"
      width="1.99979"
      height="1.99979"
      transform="translate(-0.5035 37.3284) rotate(-45)"
    />
    <rect
      x="46.63568"
      y="15.44371"
      width="2.00013"
      height="1.99979"
      transform="translate(2.3248 38.49978) rotate(-45)"
    />
    <rect
      x="49.46495"
      y="12.61534"
      width="1.99979"
      height="1.99979"
      transform="translate(5.15339 39.67184) rotate(-45)"
    />
    <rect
      x="52.2929"
      y="9.78697"
      width="2.00013"
      height="1.99979"
      transform="translate(7.98168 40.84322) rotate(-45)"
    />
    <rect
      x="40.9796"
      y="21.10069"
      width="1.99979"
      height="1.99979"
      transform="translate(-3.33197 36.1571) rotate(-45)"
    />
    <rect
      x="38.15032"
      y="23.92906"
      width="2.00013"
      height="1.99979"
      transform="translate(-6.15881 34.99285) rotate(-45.00989)"
    />
    <rect x="41" y="31" width="2" height="2" />
    <rect x="45" y="31" width="2" height="2" />
    <rect x="49" y="31" width="2" height="2" />
    <path d="M58,28a3.99577,3.99577,0,0,0-3.858,3H53v2h1.142A3.99345,3.99345,0,1,0,58,28Z" />
    <path d="M6,36a3.99577,3.99577,0,0,0,3.858-3H11V31H9.858A3.99345,3.99345,0,1,0,6,36Z" />
    <rect x="13" y="31" width="2" height="2" />
    <rect x="17" y="31" width="2" height="2" />
    <rect x="21" y="31" width="2" height="2" />
    <rect x="31" y="41" width="2" height="2" />
    <rect x="31" y="45" width="2" height="2" />
    <rect x="31" y="49" width="2" height="2" />
    <path d="M31,54.142a4,4,0,1,0,2,0V53H31Z" />
    <rect
      x="38.1505"
      y="38.07098"
      width="1.99979"
      height="2.00013"
      transform="translate(-16.16053 39.1176) rotate(-44.99011)"
    />
    <rect
      x="40.9796"
      y="40.89952"
      width="1.99979"
      height="1.99979"
      transform="translate(-17.33185 41.95604) rotate(-45)"
    />
    <rect
      x="43.80772"
      y="43.72813"
      width="1.99979"
      height="1.99979"
      transform="translate(-18.50364 44.78431) rotate(-45)"
    />
    <rect
      x="46.63585"
      y="46.55633"
      width="1.99979"
      height="2.00013"
      transform="translate(-19.67527 47.60088) rotate(-44.99011)"
    />
    <rect
      x="49.46495"
      y="49.38487"
      width="1.99979"
      height="1.99979"
      transform="translate(-20.8466 50.44139) rotate(-45)"
    />
    <rect
      x="52.29308"
      y="52.21307"
      width="1.99979"
      height="2.00013"
      transform="translate(-22.01823 53.25659) rotate(-44.99011)"
    />
    <rect
      x="24.00872"
      y="38.07115"
      width="2.00013"
      height="1.99979"
      transform="translate(-20.3025 29.12753) rotate(-45)"
    />
    <rect
      x="21.17994"
      y="40.89918"
      width="2.00048"
      height="2.00048"
      transform="translate(-23.12612 27.94017) rotate(-44.98022)"
    />
    <rect
      x="18.35167"
      y="43.72813"
      width="1.99979"
      height="1.99979"
      transform="translate(-25.95955 26.78416) rotate(-45)"
    />
    <rect
      x="15.52337"
      y="46.5565"
      width="2.00013"
      height="1.99979"
      transform="translate(-28.79163 25.6206) rotate(-45.00989)"
    />
    <rect
      x="12.69542"
      y="49.38487"
      width="1.99979"
      height="1.99979"
      transform="translate(-31.61615 24.4414) rotate(-45)"
    />
    <rect
      x="9.86615"
      y="52.21324"
      width="2.00013"
      height="1.99979"
      transform="translate(-34.44473 23.26934) rotate(-45)"
    />
  </svg>
);
