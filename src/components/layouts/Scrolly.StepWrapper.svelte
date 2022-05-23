<script>
  export let height = "80vh";
</script>

<div class="step" style:height>
  <slot />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
</style>
