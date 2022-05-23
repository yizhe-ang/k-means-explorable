<script>
  import Icon from "$components/helpers/Icon.svelte";

  export let name;
  export let direction = "n";
  export let width = "1.2rem";
  export let height = "1.2rem";
  export let stroke = "var(--color-fg)";
  export let strokeWidth = 2.5;
  export let onClick;
</script>

<button on:click={onClick}>
  <Icon {name} {direction} {width} {height} {stroke} {strokeWidth} />
</button>

<style>
  button {
    background-color: var(--color-gray-50);
    color: var(--color-fg);
    border: 1px solid var(--color-gray-300);
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;

    transition: box-shadow 250ms, transform 250ms;
  }
  button:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    /* box-shadow: var(--shadow-elevation-medium); */
    transform: translateY(-1px);
  }
  button:active {
    background-color: var(--color-gray-100);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
</style>
