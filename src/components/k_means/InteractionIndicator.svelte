<script>
  import { getContext } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import Icon from "$components/helpers/Icon.svelte";

  const { scrollyIndex } = getContext("Scrolly");
  const { width, height } = getContext("LayerCake");

  let pos = [0, 0];
  let show = false;

  $: runScrollyEvent($scrollyIndex);
  function runScrollyEvent(index) {
    if (index === 9) {
      show = true;
      pos = [$width * 0.9, $height * 0.05];
    } else if (index === 11) {
      show = true;
      pos = [$width * 0.77, $height * 0.24];
    } else if (index === 22) {
      show = true;
      pos = [$width * 0.9, $height * 1.05];
    } else if (index === 23) {
      show = true;
      pos = [$width * 0.9, $height * 0.05];
    } else {
      show = false;
    }
  }
</script>

{#if show}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <g
    in:fly={{ x: -50, duration: 500, easing: cubicOut }}
    out:fade={{
      duration: 200,
      easing: cubicIn
    }}
    on:mouseover={() => {
      show = false;
    }}
    style:transform={`translate(${pos[0]}px, ${[pos[1]]}px) scale(1.2)`}
  >
    <Icon name={"mouse-pointer"} stroke={"var(--color-gray-900)"} />
  </g>
{/if}

<style>
  g {
    transform-box: fill-box;
    transform-origin: center;

    transition: transform 200ms ease-out;
  }
</style>
