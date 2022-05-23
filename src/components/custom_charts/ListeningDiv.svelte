<script>
  import { createEventDispatcher, getContext } from "svelte";

  const { data } = getContext("LayerCake");
</script>

<!--
@component
`div` that spans the entirety of its parent container, listening for events.
-->
<div
  on:click={(e) => {
  }}
/>

<style>
  div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    background-color: lightpink;
  }
</style>
