import { leastIndex } from "d3";

export function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export function copyShallowObjs(arr) {
  return arr.map((a) => ({ ...a }));
}

export function startsWithCapital(str) {
  return str[0].toUpperCase() === str[0];
}

export function closest(d, arr) {
  const i = leastIndex(arr, (a) => Math.hypot(a.x - d.x, a.y - d.y));

  return i;
}

export function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// export function brushResizePath(d, height) {
//   var e = +(d.type == "e"),
//     x = e ? 1 : -1,
//     y = height / 2;
//   return (
//     "M" +
//     0.5 * x +
//     "," +
//     y +
//     "A6,6 0 0 " +
//     e +
//     " " +
//     6.5 * x +
//     "," +
//     (y + 6) +
//     "V" +
//     (2 * y - 6) +
//     "A6,6 0 0 " +
//     e +
//     " " +
//     0.5 * x +
//     "," +
//     2 * y +
//     "Z" +
//     "M" +
//     2.5 * x +
//     "," +
//     (y + 8) +
//     "V" +
//     (2 * y - 8) +
//     "M" +
//     4.5 * x +
//     "," +
//     (y + 8) +
//     "V" +
//     (2 * y - 8)
//   );
// }
