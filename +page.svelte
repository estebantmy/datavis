<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { json, csv, geoNaturalEarth1, geoPath } from 'd3';
  
    let width = []; 
    let height = []; 
    let selectedMaterialKey = ''; 
    let materialKeys = []; 
    let counties = []; 

    const geojsonPath = 'https://raw.githubusercontent.com/estebantmy/datavis/main/Europegjson.json';
    const dataPath = 'https://raw.githubusercontent.com/estebantmy/datavis/main/Sales.csv';
    let geojson; 

    onMount(async () => {
        const responses = await Promise.all([
            d3.json(geojsonPath),
            d3.csv(dataPath)
        ]);
        geojson = responses[0];
        const csvData = responses[1];

        materialKeys = Array.from(new Set(csvData.map(d => d.MaterialKey))).sort();
        processStatusCounts(csvData); 
    });

    function processStatusCounts(csvData) {

        if (selectedMaterialKey) {
            csvData = csvData.filter(d => d.MaterialKey === selectedMaterialKey);
        }
        const filteredData = csvData.filter(d => ['Ahead', 'Late', 'On-Time'].includes(d.Status));

        const statusCounts = d3.rollup(
            filteredData,
            v => v.length,
            d => d.Country,
            d => d.Status
        );

        geojson.features.forEach(feature => {
            const counts = statusCounts.get(feature.properties.name);
            feature.properties.statusCounts = counts ? Array.from(counts, ([status, count]) => ({ status, count })) : [];
        });

        updateMap();
    }

    function updateMap() {
        const projection = d3.geoNaturalEarth1().fitSize([width, height], geojson);
        const pathGenerator = geoPath(projection);
        counties = geojson.features.map(feature => ({
            id: feature.id,
            path: pathGenerator(feature),
            fill: getColor(feature.properties.statusCounts),
            properties: feature.properties
        }));
    }

    function getColor(statusCounts) {
        if (!statusCounts) return '#ccc';
        let maxCount = 0, dominantStatus = '';
        statusCounts.forEach(({ status, count }) => {
            if (count > maxCount) {
                maxCount = count;
                dominantStatus = status;
            }
        });
        switch (dominantStatus) {
            case 'Late': return 'red';
            case 'Ahead': return 'blue';
            case 'On-Time': return 'green';
            default: return 'grey';
        }
    }

    let hoveredCountyId = null;

    $: if (selectedMaterialKey !== undefined) {
        d3.csv(dataPath).then(processStatusCounts);
    }
</script>

<main bind:clientWidth={width} bind:clientHeight={height}>
    <h1 class="title">Sales Distribution per Country</h1>
    <select bind:value={selectedMaterialKey}>
        <option value="">All Materials</option>
        {#each materialKeys as key}
            <option value={key}>{key}</option>
        {/each}
    </select>
    <svg width={width} height={height}>
        {#each counties as {id, path, fill, properties}}
            <path d={path}
                  fill={fill}
                  class:active={hoveredCountyId === id}
                  on:mouseover={() => hoveredCountyId = id}
                  on:mouseout={() => hoveredCountyId = null}>
                <title>{properties.name}
                    {#if properties.statusCounts}
                        {#each properties.statusCounts as {status, count}}
                            ;  {status}: {count}
                        {/each}
                    {/if}
                </title>
            </path>
        {/each}
    </svg>
</main>

<style>
    main {
        width: 100vw;
        height: 100vh;
    }
    .title {
        text-align: center;
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    path.active {
        opacity: 1.0;
        transition-duration: 0s;
        transition-delay: 0s;
    }
    path {
        stroke: #fff;
        stroke-width: 1px;
        opacity: 0.5;
        transition: opacity 0.4s ease-in-out, fill 0.4s;
        transition-delay: 0.8s;
    }
</style>
