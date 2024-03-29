<script>
  import {
    select,
    brushX,
    histogram,
    scaleLinear,
    extent,
    area,
    curveBasis
  } from "d3";
  import { getContext } from "svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import viewport from "$stores/viewport";

  const { width, height, xScale } = getContext("LayerCake");

  export let data = [0, 0];
  export let type = "x";
  export let inset;
  export let pointerEvents = "auto";

  let isBrushing = false;
  let brushNode;

  const accessor = type === "x" ? (d) => d.x : type === "y" ? (d) => d.y : null;
  $: histogramXScale = $xScale;

  $: histogramHeight = Math.min(70, $viewport.width * 0.05);
  const thresholds = 15;

  $: dataExtent = extent(data, accessor);
  $: dataExtentScaled = dataExtent.map(histogramXScale);

  // Draw histogram
  $: histogramGenerator = histogram()
    .domain(histogramXScale.domain())
    .value(accessor)
    .thresholds(thresholds);

  $: histogramBins = histogramGenerator(data);

  $: histogramYScale = scaleLinear()
    .domain(extent(histogramBins, (d) => d.length))
    .range([histogramHeight, 0]);

  $: lineGenerator = area()
    .x((d) => histogramXScale((d.x0 + d.x1) / 2))
    .y0(histogramHeight)
    .y1((d) => histogramYScale(d.length))
    .curve(curveBasis);

  $: d = lineGenerator(histogramBins);

  $: transform =
    type === "x"
      ? `translate(${0}px, ${$height - histogramHeight - 4}px) scale(1, -1)`
      : type === "y"
      ? `translate(${-$width + 1}px, ${
          -histogramHeight - 7
        }px) rotate(-90deg) scale(1, 1)`
      : null;

  $: transformOrigin =
    type === "x" ? "bottom" : type === "y" ? "bottom right" : null;

  // Init brush
  $: brush = brushX()
    .extent([
      [0, 0],
      [$height, histogramHeight]
    ])
    .on("start brush", ({ sourceEvent, selection }) => {
      // If brush.move called programmatically, don't update
      if (!sourceEvent) {
        return;
      } else {
        brushed({ selection });
      }
    })
    .on("end", () => {
      isBrushing = false;
    });

  // Disable / enable pointer events
  $: if (brushNode) {
    brushNode.select(".selection").attr("pointer-events", pointerEvents);
    brushNode.selectAll(".handle").attr("pointer-events", pointerEvents);
  }

  function brushed({ selection }) {
    isBrushing = true;

    const extents = selection.map($xScale.invert);
    extents[0] += inset;
    extents[1] -= inset;

    // Normalize dataset on brushed
    const [min, max] = dataExtent;

    data.map((d) => {
      const [a, b] = extents;

      d[type] = (b - a) * ((d[type] - min) / (max - min)) + a;
    });

    data = data;
  }

  function brushable(node, move) {
    brushNode = select(node).call(brush).call(brush.move, move);

    // Adjust pointer-events and cursors
    brushNode.select(".overlay").attr("pointer-events", "none");
    if (type === "y") {
      brushNode.selectAll(".handle").attr("cursor", "ns-resize");
    }

    // Cosmetic adjustments
    brushNode
      .select(".selection")
      .attr("fill-opacity", 0)
      .attr("stroke", "none");
    brushNode
      .selectAll(".handle")
      .attr("fill", "var(--color-gray-400)")
      .attr("rx", 100);

    return {
      update: (move) => {
        if (!isBrushing) brushNode.call(brush.move, move);
      }
    };
  }

  function scaleY(node, { duration = 200, easing }) {
    return {
      duration,
      css: (t) => {
        const eased = easing(t);

        return type === "x"
          ? `transform: translate(${0}px, ${
              $height - histogramHeight - 4
            }px) scale(1, ${-eased})`
          : type === "y"
          ? `transform: translate(${-$width + 1}px, ${
              -histogramHeight - 7
            }px) rotate(-90deg) scale(1, ${eased})`
          : null;
      }
    };
  }
</script>

<g
  class="wrapper"
  style:transform
  in:scaleY={{ easing: cubicOut, duration: 500 }}
  out:scaleY={{ easing: cubicIn }}
  transform-origin={transformOrigin}
>
  <path {d} />
  <g use:brushable={dataExtentScaled} class="brush" />
</g>

<style>
  .wrapper {
    transform-box: fill-box;

    transition: transform 200ms;
  }

  path {
    transition: d 200ms;
    fill: var(--color-gray-200);
  }
</style>
