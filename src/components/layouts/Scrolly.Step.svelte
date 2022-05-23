<script>
  export let active;
</script>

<div class:active>
  <slot />
</div>

<style>
  div {
    font-size: 1rem;
    /* background: whitesmoke; */
    /* color: #ccc; */
    /* border-radius: 5px; */
    margin-bottom: 16px;
    padding-left: 16px;
    padding-right: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* transition: background 500ms ease; */
    /* box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2); */
    text-align: left;

    width: min(45vw, 600px);
    /* max-width: 60ch; */

    --border-color: var(--hsl-gray-100);
    --border-size: 16px;
    border-left: var(--border-size) solid hsl(var(--border-color), 0);
    transition: border-left 500ms ease;
    margin-left: calc(-1 * var(--border-size));

    border-radius: 1%;
  }

  div.active {
    border-left: var(--border-size) solid hsl(var(--border-color), 1);
  }
</style>
