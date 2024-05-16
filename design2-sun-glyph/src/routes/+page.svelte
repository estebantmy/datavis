<script>
    import SunPieChart from "../components/SunPieChart.svelte";
    import DonutPieChart from "../components/DonutPieChart.svelte";
    import Axes from "../components/Axes.svelte";
    import Legend from "../components/Legend.svelte";

    export let data;
</script>



{#each data.ExtVendorTimes as datapoint_ext}
<SunPieChart datapoint={datapoint_ext} dataMPR={data.MPR} />
{/each}

{#each data.IntVendorTimes as datapoint_int}
<DonutPieChart datapoint={datapoint_int}/>
{/each}

<Axes/>
<Legend/>