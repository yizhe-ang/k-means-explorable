<script>
  export let value;
  export let name;
  export let label;
  export let min;
  export let max;
  export let step = 1;
</script>

<div>
  <label for={name}>{label}</label>
  <input onkeydown="return false" bind:value type="number" id={name} {name} {min} {max} {step} />
</div>

<style>
  label {
    font-weight: 600;
    color: var(--color-gray-400);
    margin-right: 4px;
  }

  input {
    /* height: 37px; */
    padding: 8px;

    font-size: 1rem;
    font-weight: 700;
    color: var(--color-fg);
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-300);
    border-radius: var(--border-radius);

    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;

    transition: box-shadow 250ms, transform 250ms;
  }
  input:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    transform: translateY(-1px);
  }
  input:active {
    /* background-color: var(--color-gray-100); */
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(-1px);
    /* transform: translateY(0); */
  }
</style>
