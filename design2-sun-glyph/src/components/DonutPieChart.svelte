<script>
    import { scaleLog } from "d3-scale";
    import { scaleLinear } from "d3-scale";

    export let datapoint = {};

    const scaleLo = scaleLog().domain([1, 80]).range([20, 70]);
    $: size = scaleLo(datapoint.TotalInboundLeadTime);

    $: dashArray1 = ` ${(100 * (datapoint.ProductionTime + datapoint.InboundTransportationTime)) / datapoint.TotalInboundLeadTime} 100`;
    $: dashArray2 = ` ${(100 * datapoint.ProductionTime) / datapoint.TotalInboundLeadTime} 100`;
    $: dashArray3 = ` 0 ${(100 * (datapoint.ProductionTime + datapoint.InboundTransportationTime)) / datapoint.TotalInboundLeadTime} 100`;

    $: dashArrayDonut = ` ${100 * datapoint.N_PctGoodsReceiptInTime} ${100 * (1 - datapoint.N_PctGoodsReceiptInTime)} `;

    $: xCoord = ` ${80 * (datapoint.VendorKey + 2)} `;
    $: yCoord = ` ${175 * datapoint.PlantKey} `;
</script>

<div class="svg-container" style="--pKey:{xCoord}; --vKey:{yCoord};">
    <svg class="svg" viewBox="0 0 32 32" width={size * 1.5}>
        <circle
            class="donut"
            stroke-dasharray={dashArrayDonut}
            r="16"
            cx="16"
            cy="16"
        >
            <title>
                {100 * datapoint.N_PctGoodsReceiptInTime}% of purchased products received in time
            </title></circle
        >
    </svg>

    <svg viewBox="0 0 32 32" width={size}>
        <circle
            class="transportationSlice"
            r="16"
            cx="16"
            cy="16"
            stroke-dasharray={dashArray1}
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
        >
            <title>Avg. production time: {datapoint.ProductionTime}</title>
        </circle>

        <circle
            class="goodsReceiptSlice"
            r="16"
            cx="16"
            cy="16"
            stroke-dasharray={dashArray3}
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
        background: lightgoldenrodyellow;
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

    circle.transportationSlice {
        stroke: #ffd300;
    }
    circle.productionSlice {
        stroke: #f6af36;
    }
    circle.goodsReceiptSlice {
        stroke: #daa520;
    }
    circle.donut {
        fill: #ffffff;
        stroke: #e9d222;
        stroke-width: 3;
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
