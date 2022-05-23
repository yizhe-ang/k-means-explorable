<div>
  <slot />
</div>

<style>
  div {
    /* Zoom out to simulate larger / taller screens */
    /* Default height of 80vh */
    /* Has no explicit max-height; can grow to accommodate excess child content */
    /* Height is clamped at 500px (in particular on larger / taller screens) */
    min-height: min(80vh, 500px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
    text-shadow: 0px 0.3em 1em hsl(295deg 100% 10%);

    /* background: url(''); */
    background-size: cover;
    background-position: bottom center;
  }
</style>
