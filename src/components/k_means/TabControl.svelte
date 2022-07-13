<script>
  // HACK: Tab back to default tab whenever scrolly step changes
  import { getContext } from "svelte";
  import { useTabsContext } from "@rgossiaux/svelte-headlessui";

  export let selectedIndex;

  const { scrollyIndex } = getContext("Scrolly");
  const api = useTabsContext();

  $: runScrollyEvents($scrollyIndex);
  function runScrollyEvents(idx) {
    if (selectedIndex === 1) $api.setSelectedIndex(0);
  }
</script>
