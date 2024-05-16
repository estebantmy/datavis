<script>
  import { scaleLog } from "d3-scale";
  import { scaleLinear } from "d3-scale";

  export let datapoint = {},
    dataMPR = {};

  /*   function dynamicLogScale(value, rangeMax) {
  const scale = scaleLog()
    .domain([1, 70]) 
    .range([5, rangeMax]);    

  console.log(value)
  console.log(scale(value))
  return scale(value);
} */

  const scaleLo = scaleLog().domain([1, 71]).range([10, 70]);
  const scaleLi = scaleLinear().domain([10, 70]).range([30, 125]);
  const scaleLo2 = scaleLog().domain([1, 71]).range([8, 16]);
  const scaleLo3 = scaleLog().domain([1, 43]).range([10, 14]);

  $: size = scaleLo(datapoint.TotalInboundLeadTime);
  $: size2 = scaleLi(size);

  $: dashArray1 = ` ${(100 * (datapoint.ProductionTime + datapoint.InboundTransportationTime)) / datapoint.TotalInboundLeadTime} 100`;
  $: dashArray2 = ` ${(100 * datapoint.ProductionTime) / datapoint.TotalInboundLeadTime} 100`;
  $: dashArray3 = ` 0 ${(100 * (datapoint.ProductionTime + datapoint.InboundTransportationTime)) / datapoint.TotalInboundLeadTime} 100`;

  $: xCoord = ` ${100 * (datapoint.VendorKey - 3)} `;
  $: yCoord = ` ${175 * datapoint.PlantKey} `;

  let showMaterialTotalLeadTimes = true;
  let showMaterialProductionTimes = false;
  let showMaterialTransportationTimes = false;
  let showMaterialGoodsReceiptTimes = false;

  function handleClick(circleId) {
    if (circleId === "production") {
      console.log("Production slice clicked");
      showMaterialProductionTimes = true;
      showMaterialTransportationTimes = false;
      showMaterialGoodsReceiptTimes = false;
      showMaterialTotalLeadTimes = false;
    } else if (circleId === "transportation") {
      console.log("Transportation slice clicked");
      showMaterialProductionTimes = false;
      showMaterialTransportationTimes = true;
      showMaterialGoodsReceiptTimes = false;
      showMaterialTotalLeadTimes = false;
    } else if (circleId === "goodsReceipt") {
      console.log("Goods receipt slice clicked");
      showMaterialProductionTimes = false;
      showMaterialTransportationTimes = false;
      showMaterialGoodsReceiptTimes = true;
      showMaterialTotalLeadTimes = false;
    }
  }
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  }
</script>

<div class="svg-container" style="--pKey:{xCoord}; --vKey:{yCoord};">
  <svg class="svg" viewBox="0 0 32 32" width={size2}>
    {#if showMaterialTotalLeadTimes}
      {#each dataMPR as datapoint_MPR}
        {#if (datapoint_MPR.VendorKey === datapoint.VendorKey) & (datapoint_MPR.PlantKey === datapoint.PlantKey)}
          <path
            class="totalLeadBeams"
            style="transform: translate(50%, 50%) rotate({11.6 *
              (datapoint_MPR.MaterialKey - 3)}deg)"
            d="M 0,0  L {scaleLo2(datapoint_MPR.TotalInboundLeadTime)},0"
            ><title
              >{datapoint_MPR.MaterialDescription} &#013;Total inbound lead time: {datapoint_MPR.TotalInboundLeadTime}
            </title></path
          >
        {/if}
      {/each}
    {/if}
    {#if showMaterialProductionTimes}
      {#each dataMPR as datapoint_MPR}
        {#if (datapoint_MPR.VendorKey === datapoint.VendorKey) & (datapoint_MPR.PlantKey === datapoint.PlantKey)}
          <path
            class="productionBeams"
            style="transform: translate(50%, 50%) rotate({11.6 *
              (datapoint_MPR.MaterialKey - 3)}deg)"
            d="M 0,0  L {scaleLo3(datapoint_MPR.ProductionTime)},0"
            ><title
              >{datapoint_MPR.MaterialDescription} &#013;Production time: {datapoint_MPR.ProductionTime}
            </title></path
          >
        {/if}
      {/each}
    {/if}
    {#if showMaterialTransportationTimes}
      {#each dataMPR as datapoint_MPR}
        {#if (datapoint_MPR.VendorKey === datapoint.VendorKey) & (datapoint_MPR.PlantKey === datapoint.PlantKey)}
          <path
            class="transportationBeams"
            style="transform: translate(50%, 50%) rotate({11.6 *
              (datapoint_MPR.MaterialKey - 3)}deg)"
            d="M 0,0  L {scaleLo3(datapoint_MPR.InboundTransportationTime)},0"
            ><title
              >{datapoint_MPR.MaterialDescription} &#013;Transportation time: {datapoint_MPR.InboundTransportationTime}
            </title></path
          >
        {/if}
      {/each}
    {/if}
    {#if showMaterialGoodsReceiptTimes}
      {#each dataMPR as datapoint_MPR}
        {#if (datapoint_MPR.VendorKey === datapoint.VendorKey) & (datapoint_MPR.PlantKey === datapoint.PlantKey)}
          <path
            class="goodsReceiptBeams"
            style="transform: translate(50%, 50%) rotate({11.6 *
              (datapoint_MPR.MaterialKey - 3)}deg)"
            d="M 0,0  L {scaleLo3(datapoint_MPR.GoodReceiptProcessingTime)},0"
            ><title 
              >{datapoint_MPR.MaterialDescription} &#013;Goods receipt processing time: {datapoint_MPR.GoodReceiptProcessingTime}
            </title></path
          >
        {/if}
      {/each}
    {/if}
  </svg>

  <svg class="svg" viewBox="0 0 32 32" width={size * 1.1}>
    <circle class="whiteBorder" r="16" cx="16" cy="16"></circle>
  </svg>

  <svg viewBox="0 0 32 32" width={size}>
    <circle
      class="transportationSlice"
      r="16"
      cx="16"
      cy="16"
      stroke-dasharray={dashArray1}
      role="button"
      tabindex="0"
      on:click={() => handleClick("transportation")}
      on:keydown={(e) => e.key === "Enter" && handleClick("transportation")}
    >
      <title
        >Avg. transportation time: {datapoint.InboundTransportationTime}</title
      >
    </circle>

    <circle
      class="productionSlice"
      r="16"
      cx="16"
      cy="16"
      stroke-dasharray={dashArray2}
      role="button"
      tabindex="0"
      on:click={() => handleClick("production")}
      on:keydown={(e) => e.key === "Enter" && handleClick("production")}
    >
      <title>Avg. production time: {datapoint.ProductionTime}</title>
    </circle>

    <circle
      class="goodsReceiptSlice"
      r="16"
      cx="16"
      cy="16"
      stroke-dasharray={dashArray3}
      role="button"
      tabindex="0"
      on:click={() => handleClick("goodsReceipt")}
      on:keydown={(e) => e.key === "Enter" && handleClick("goodsReceipt")}
    >
      <title
        >Avg. goods receipt processing time: {datapoint.GoodReceiptProcessingTime}</title
      >
    </circle></svg
  >
</div>

<style>
  svg {
    border-radius: 50%;
    background: none;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%) rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: 32;
  }

  path {
    fill: none;
    stroke-width: 0.6px;
  }

  circle.transportationSlice {
    stroke: #ffd300;
    cursor: pointer;
  }
  path.transportationBeams {
    stroke: #ffd300;
  }

  circle.productionSlice {
    stroke: #f6af36;
    cursor: pointer;
  }
  path.productionBeams {
    stroke: #f6af36;
  }
  circle.goodsReceiptSlice {
    stroke: #daa520;
    cursor: pointer;
  }
  path.goodsReceiptBeams {
    stroke: #daa520;
  }

  circle.whiteBorder {
    fill: #ffffff;
    stroke: #ffffff;
  }
  path.totalLeadBeams {
    stroke: #f0ed36;
  }

  .svg-container {
    position: relative;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    transform: translate(calc(var(--pKey) * 1px), calc(var(--vKey) * 1px));
  }
</style>
