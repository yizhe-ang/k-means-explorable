<script>
  import { Circle3 } from "svelte-loading-spinners";
</script>

<div class="wrapper">
  <Circle3
    ballTopLeft={"hsl(180, 50%, 82%)"}
    ballTopRight={"hsl(51, 90%, 71%)"}
    ballBottomLeft={"hsl(262, 48%, 85%)"}
    ballBottomRight={"hsl(14, 100%, 84%)"}
  />
</div>

<style>
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: grid;
    place-content: center;

    background-color: var(--color-bg);
  }
</style>
