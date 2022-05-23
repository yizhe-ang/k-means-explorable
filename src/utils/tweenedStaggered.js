// From: https://svelte.recipes/components/tweened-staggered/
import { assign, loop, now } from "svelte/internal";

import { interpolate } from "d3-interpolate";
import { linear } from "svelte/easing";
import { scaleLinear } from "d3-scale";
import { writable } from "svelte/store";

function get_interpolator(a, b, iDelay = 0, length = 0, delay = 0) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi, iDelay, b.length, i * iDelay);
    });
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) throw new Error("Object cannot be null");
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key], iDelay, length, delay);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (["string", "number"].includes(type)) {
    const allDelays = iDelay * length;
    const iDuration = 1 - allDelays;
    const scale = scaleLinear()
      .domain([delay, delay + iDuration])
      .range([0, 1])
      .clamp(true);
    const interpolationFunction = interpolate(a, b);
    // console.log()
    return (t) => {
      return interpolationFunction(scale(t));

      // a + Math.max(0, t * maxT - delay) * delta;
    };
  }
  throw new Error(`Cannot interpolate ${type} values`);
}

export function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set((value = new_value));
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      iDelay = 10,
      easing = linear,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set((value = target_value));
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now) => {
      if (now < start) return true;
      if (!started) {
        fn = interpolate(value, new_value, iDelay / duration);
        if (typeof duration === "function") duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now - start;
      if (elapsed > duration) {
        store.set((value = new_value));
        return false;
      }

      store.set((value = fn(easing(elapsed / duration))));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
