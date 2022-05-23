<script>
  import { setContext } from "svelte";
  import { shuffler, randomLcg } from "d3";
  import { browser } from "$app/env";
  import Meta from "$components/Meta.svelte";
  import App from "$components/App.svelte";
  import copy from "$data/doc.json";
  if (browser) console.log("svelte-starter version", __VERSION__);
  // FIXME: What is the best practice for loading datasets?
  import blobs from "$lib/data/datasets/blobs_alt.json";
  import anisoBlobs from "$data/datasets/aniso_blobs.json";
  import unevenBlobs from "$data/datasets/uneven_blobs.json";
  import variedBlobs from "$data/datasets/varied_blobs.json";

  // const shuffle = shuffler(randomLcg(45));

  // // FIXME: Just set this as a global store?
  // setContext(
  //   "Datasets",
  //   // FIXME: Where to perform preprocessing?
  //   Object.entries({ blobs, anisoBlobs, unevenBlobs, variedBlobs }).map((d) => ({
  //     name: d[0],
  //     data: shuffle(d[1]).map((arr) => ({ x: arr[0], y: arr[1] }))
  //   }))
  // );

  const preloadFont = [
    // "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Regular.woff2",
    // "https://pudding.cool/assets/fonts/tiempos/TiemposTextWeb-Bold.woff2",
    // "https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2",
    // "https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2"
  ];

  const { title, description, url, keywords } = copy;
  setContext("copy", copy);
</script>

<Meta {title} {description} {url} {preloadFont} {keywords} />
<App />
