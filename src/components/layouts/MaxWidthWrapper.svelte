<script>
  export let maxWidth = "50ch";
  export let padding = "32px"; // Amount of left / right padding
</script>

<div style:max-width={maxWidth} style:padding-left={padding} style:padding-right={padding}>
  <slot />
</div>

<style>
  div {
    margin-left: auto;
    margin-right: auto;
  }
</style>
