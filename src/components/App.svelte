<script>
  import Hero from "$components/k_means/Hero.svelte";
  import KMeansScrolly from "$lib/components/k_means/KMeans.Scrolly.svelte";
  import Conclusion from "$lib/components/k_means/Conclusion.svelte";
  import Footer from "$lib/components/k_means/Footer.svelte";
  import scrollY from "$stores/scrollY.js";
  import Header from "$components/k_means/Header.svelte";
  import Notification from "$components/k_means/Notification.svelte";
  import Loading from "$components/k_means/Loading.svelte";
  import mq from "$stores/mq.js";
  import { onMount } from "svelte";

  let mounted = false;

  onMount(() => {
    mounted = true;
  });
</script>

{#if $scrollY === 0 && $mq["50rem"]}
  <Hero />
{/if}

{#if $mq["50rem"]}
  <section id="scrolly">
    <KMeansScrolly />
  </section>

  <Conclusion />
{:else}
  <div class="header-wrapper">
    <Header />
  </div>
  <Notification />
{/if}

<Footer />

{#if !mounted}
  <Loading />
{/if}

<style>
  .header-wrapper {
    display: grid;
    place-content: center;
    padding: 48px 32px;
  }
</style>
