import { unwrapResult } from "@reduxjs/toolkit";
import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import { toast } from "react-toastify";

// convert name color to hexan code
export function colourNameToHex(colour) {
  var colours = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    "indianred ": "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgrey: "#d3d3d3",
    lightgreen: "#90ee90",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370d8",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#d87093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32",
  };

  if (typeof colours[colour.toLowerCase()] != "undefined")
    return colours[colour.toLowerCase()];

  return false;
}

export function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// get age

export function getAge(birthday) {
  // birthday is a date
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// convert image url to file object

export const toDataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// handle total price order

export const getTotal = (order) =>
  order.products.reduce(
    (sum, product) =>
      sum +
      product.salePrice *
        product.selectedQuantity *
        (1 - product.promotionPercent / 100),
    0
  );

// handle total order every month

export const monthlyIncome = (orders, year) => {
  let [
    januaryRevenue,
    februaryRevenue,
    marchRevenue,
    aprilRevenue,
    mayRevenue,
    juneRevenue,
    julyRevenue,
    augustRevenue,
    septemberRevenue,
    octoberRevenue,
    novemberRevenue,
    decemberRevenue,
  ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  let [
    januaryCost,
    februaryCost,
    marchCost,
    aprilCost,
    mayCost,
    juneCost,
    julyCost,
    augustCost,
    septemberCost,
    octoberCost,
    novemberCost,
    decemberCost,
  ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  orders
    .filter((order) => new Date(order.createdAt).getFullYear() === year)
    .forEach((order, year) => {
      if (order.state === "delivered") {
        const date = new Date(order.createdAt);
        switch (date.getMonth()) {
          case 0:
            januaryRevenue += order.total - order.transportFee;
            januaryCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 1:
            februaryRevenue += order.total - order.transportFee;
            februaryCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 2:
            marchRevenue += order.total - order.transportFee;
            marchCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 3:
            aprilRevenue += order.total - order.transportFee;
            aprilCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 4:
            mayRevenue += order.total - order.transportFee;
            mayCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 5:
            juneRevenue += order.total - order.transportFee;
            juneCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 6:
            julyRevenue += order.total - order.transportFee;
            julyCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 7:
            augustRevenue += order.total - order.transportFee;
            augustCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 8:
            septemberRevenue += order.total - order.transportFee;
            septemberCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 9:
            octoberRevenue += order.total - order.transportFee;
            octoberCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case 10:
            novemberRevenue += order.total - order.transportFee;
            novemberCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          default:
            decemberRevenue += order.total - order.transportFee;
            decemberCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
        }
      }
    });

  return [
    [
      januaryRevenue.toFixed(2),
      februaryRevenue.toFixed(2),
      marchRevenue.toFixed(2),
      aprilRevenue.toFixed(2),
      mayRevenue.toFixed(2),
      juneRevenue.toFixed(2),
      julyRevenue.toFixed(2),
      augustRevenue.toFixed(2),
      septemberRevenue.toFixed(2),
      octoberRevenue.toFixed(2),
      novemberRevenue.toFixed(2),
      decemberRevenue.toFixed(2),
    ],
    [
      (januaryRevenue - januaryCost).toFixed(2),
      (februaryRevenue - februaryCost).toFixed(2),
      (marchRevenue - marchCost).toFixed(2),
      (aprilRevenue - aprilCost).toFixed(2),
      (mayRevenue - mayCost).toFixed(2),
      (juneRevenue - juneCost).toFixed(2),
      (julyRevenue - julyCost).toFixed(2),
      (augustRevenue - augustCost).toFixed(2),
      (septemberRevenue - septemberCost).toFixed(2),
      (octoberRevenue - octoberCost).toFixed(2),
      (novemberRevenue - novemberCost).toFixed(2),
      (decemberRevenue - decemberCost).toFixed(2),
    ],
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  ];
};

// handle total order every quarter

export const quarterlyIncome = (orders, year) => {
  let [
    quarterOneRevenue,
    quarterTwoRevenue,
    quarterThreeRevenue,
    quarterFourRevenue,
  ] = [0, 0, 0, 0];

  let [quarterOneCost, quarterTwoCost, quarterThreeCost, quarterFourCost] = [
    0, 0, 0, 0,
  ];

  orders
    .filter((order) => new Date(order.createdAt).getFullYear() === year)
    .forEach((order) => {
      if (order.state === "delivered") {
        const date = new Date(order.createdAt);
        const month = date.getMonth() + 1;
        switch (date.getMonth()) {
          case month <= 3:
            quarterOneRevenue += order.total - order.transportFee;
            quarterOneCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case month <= 6:
            quarterTwoRevenue += order.total - order.transportFee;
            quarterTwoCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          case month <= 9:
            quarterThreeRevenue += order.total - order.transportFee;
            quarterThreeCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
          default:
            quarterFourRevenue += order.total - order.transportFee;
            quarterFourCost += order.products.reduce(
              (sum, order) =>
                (sum += order.currentOriginalPrice * order.selectedQuantity),
              0
            );
            break;
        }
      }
    });

  return [
    [
      quarterOneRevenue.toFixed(2),
      quarterTwoRevenue.toFixed(2),
      quarterThreeRevenue.toFixed(2),
      quarterFourRevenue.toFixed(2),
    ],
    [
      (quarterOneRevenue - quarterOneCost).toFixed(2),
      (quarterTwoRevenue - quarterTwoCost).toFixed(2),
      (quarterThreeRevenue - quarterThreeCost).toFixed(2),
      (quarterFourRevenue - quarterFourCost).toFixed(2),
    ],
    ["Quarter One", "Quarter Two", "Quarter Three", "Quarter Four"],
  ];
};

// Show Toast Success

export const showToastSuccess = async (asyncAction) => {
  const result = await asyncAction;
  if (!unwrapResult(result)) return;
  toast(result.payload.message, {
    ...PRODUCT_TOAST_OPTIONS,
  });
};

// Show Toast Error

export const showToastError = (error) => {
  toast(error.message, {
    ...PRODUCT_TOAST_OPTIONS,
  });
};

export const screenMode = {
  view: "view",
  addEdit: "add",
};

// =================================================================
let getImageBlob = function (url) {
  return new Promise(async (resolve) => {
    let resposne = await fetch(url);
    let blob = resposne.blob();
    resolve(blob);
  });
};

// convert a blob to base64
let blobToBase64 = function (blob) {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.onload = function () {
      let dataUrl = reader.result;
      resolve(dataUrl);
    };
    reader.readAsDataURL(blob);
  });
};

// combine the previous two functions to return a base64 encode image from url
let getBase64Image = async function (url) {
  let blob = await getImageBlob(url);
  let base64 = await blobToBase64(blob);
  return base64;
};

export const getImageUrlToFile = async (images) => {
  let imageUrlToArray = null;
  let fileName = [];
  imageUrlToArray = await Promise.all(
    images.map((item, index) => {
      fileName[index] = item
        .split("/")
        [item.split("/").length - 1].split(".")[0];
      return getBase64Image(item);
    })
  );
  imageUrlToArray = await Promise.all(
    imageUrlToArray.map((item, index) => dataURLtoFile(item, fileName[index]))
  );

  return imageUrlToArray;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = `0${date.getDay()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = `${date.getFullYear()}`;
  const hour = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const seconds = `0${date.getSeconds()}`.slice(-2);
  return `${day}/${month}/${year} - ${hour}:${minutes}:${seconds}`;
};

export const getColorByState = (state) => {
  if (state === "pending") return "bg-info";
  if (state === "confirmed") return "bg-dark";
  if (state === "shipping") return "bg-warning";
  if (state === "delivered") return "bg-success";
  if (state === "cancelled") return "bg-danger";
};
