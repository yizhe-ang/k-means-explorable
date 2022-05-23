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
