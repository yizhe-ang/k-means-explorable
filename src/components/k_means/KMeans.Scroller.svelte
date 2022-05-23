<script>
  import Scroller from "$components/layouts/Scroller.svelte";
  import KMeans from "$components/k_means/KMeans.svelte";

  // Scroller parameters
  let count;
  let index;
  let offset;
  let progress;
</script>

<Scroller
  top={0}
  bottom={0.8}
  threshold={0.5}
  query={".step"}
  bind:count
  bind:index
  bind:offset
  bind:progress
>
  <div slot="background">
    <KMeans />
  </div>

  <div slot="foreground">
    <div class="spacer" />

    {#each [...Array(10).keys()] as text, i}
      <!-- TODO: Can modularize this -->
      <div class="step" class:active={index === i}>
        <div class="step-content">
          <p>This is step {text}</p>
        </div>
      </div>
    {/each}

    <div class="spacer" />
  </div>
</Scroller>

<style>
  .spacer {
    height: 75vh;
  }

  [slot="background"] {
  }

  [slot="foreground"] {
  }

  .step {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    /* padding: 1em;
    margin: 0 0 2em 0; */

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .step-content {
  }
</style>
