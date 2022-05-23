import { randomLcg, schemePastel1, shuffler } from "d3";

import anisoBlobs from "$data/datasets/aniso_blobs.json";
import blobs from "$lib/data/datasets/blobs_alt.json";
import circles from "$data/datasets/circles.json";
import moons from "$data/datasets/moons.json";
import noStructure from "$data/datasets/no_structure.json";
import unevenBlobs from "$data/datasets/uneven_blobs.json";
import variedBlobs from "$data/datasets/varied_blobs.json";
import { writable } from "svelte/store";

// export const clusterColors = schemePastel1;
export const clusterColors = [
  "hsl(180, 50%, 82%)", // green
  "hsl(51, 90%, 71%)", // yellow
  "hsl(262, 48%, 85%)", // purple
  "hsl(14, 100%, 84%)", // orange
  "hsl(359, 100%, 89%)", // pink
];
// export const clusterColors = [
//   "hsl(40, 72%, 81%)",
//   "hsl(52, 100%, 93%)",
//   "hsl(82, 29%, 87%)",
//   "hsl(127, 21%, 78%)",
//   "hsl(165, 61%, 89%)",
//   // "hsl(25, 80%, 62%)",
// ];

const shuffle = shuffler(randomLcg(45));

// FIXME: Where to perform preprocessing?
// FIXME: Set this as readable only?
const processedDatasets = Object.entries({ blobs, anisoBlobs, unevenBlobs, variedBlobs, circles, moons, noStructure }).map(
  (d) => ({
    name: d[0],
    data: shuffle(d[1]).map((arr) => ({ x: arr[0], y: arr[1] }))
  })
);
export const datasets = writable(processedDatasets);
export const selectedDataset = writable(processedDatasets[0]);
export const numSamples = writable(100);

export const numClusters = writable(3);
export const totalIterations = writable(undefined);
export const algoStep = writable(-1);
export const stepView = writable(false);

// Flag for rerunning k-means
export const toggleKMeans = writable(true);
