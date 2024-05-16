<script>
	//import { almostEquals } from "chart.js/helpers";
    let tooltip = null;
    let tooltipContent = '';
	

    export let data;
    let forecast =  data.forecast
    let sales = data.sales
    let MPK = ""; // replace with your search string
    let year = "";

    


	const monthNames = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec'
    };



    // Filter the forecast data
	$: filteredforecast = forecast.filter(item => item.MaterialPlantKey === MPK && item.RequestedDeliveryMonth.slice(0, 4) === year);
	$: filteredforecast_i = filteredforecast.map(item => ({...item, Quantity: parseInt(item.Quantity)}));
    
	// Filter the sales data
	$: filteredsales = sales.filter(item => item.MaterialPlantKey === MPK && item.SalesOrderCreationDate.slice(0,4) === year);
	$: filteredsales_i = filteredsales.map(item => ({...item,OrderQuantity: parseInt(item.OrderQuantity)}));
	
	
	// Group the sales data by month and sum the OrderQuantity values
    $: salesbymonth = filteredsales_i.reduce((acc, item) => {
        const month = item.SalesOrderCreationDate.slice(5, 7); // Get the month
        acc[month] = (acc[month] || 0) + item.OrderQuantity; // Add the OrderQuantity to the total for the month
        return acc;
    }, {});
	
    // Find the total regular and express sales for each month
    $: salesByMonthAndType = filteredsales_i.reduce((acc, item) => {
    const month = item.SalesOrderCreationDate.slice(5, 7); // Get the month
    const type = item.SalesDocType; // Get the SalesDocType

    // Initialize the month object if it doesn't exist
    if (!acc[month]) {
        acc[month] = { Regular: 0, Express: 0 };
    }

    // Add the OrderQuantity to the appropriate type
    if (type === 'Regular' || type === 'Express') {
        acc[month][type] += item.OrderQuantity;
    }

    return acc;
}, {});

	// Find maximumQuantity for forecast/sales to normalize
	$: maxQuantityF = Math.max(...filteredforecast_i.map(item => item.Quantity));
	$: maxQuantityS = Math.max(...Object.values(salesbymonth));
	$: maxQuantity = Math.max(maxQuantityF, maxQuantityS);

	// Generate points for polyline
    $: pointsf = filteredforecast_i.map((item, index) => `${index * 100 + 50},${item.Quantity / maxQuantity * 500}`).join(' ');
	$: pointss = Object.keys(salesbymonth).sort().map((month, index) => {
        const x = index * 100 + 100;
        const y = salesbymonth[month] / maxQuantity * 500;
        return `${x},${y}`;
    }).join(' ');


	// Generate colour
	let getColor = (index, month) => {
        let yf = filteredforecast_i[index] ? filteredforecast_i[index].Quantity : 0;
        let ys = salesbymonth[month];
        let diff = ys - yf;

        if (Math.abs(diff) < 500) {
            return 'rgba(0, 255, 0, 0.5)'; // green
        } else if (diff > 500) {
            return 'rgba(0, 0, 255, 0.5)'; // blue
        } else if (diff < -500) {
            return 'rgba(255, 0, 0, 0.5)'; // red
        }
        //return ys > yf ? 'rgba(0, 0, 255, 0.5)' : ys === yf ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)';
    };

</script>
  
<h2 style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">Monthly Sales and Forecast of SunCharge batteries</h2>

<div style="display: flex; align-items: center; margin-bottom: 20px;">
    <label for="mpk-input" style="margin-right: 10px;">Material Plant Key</label>
    <input id="mpk-input" type="text" bind:value={MPK} placeholder="Enter Material Plant Key" style="margin-right: 20px; width: 150px;">

    <label for="year-input" style="margin-right: 10px;">Year</label>
    <input id="year-input" type="text" bind:value={year} placeholder="Enter the year" style="width: 150px;">
</div>



<!--<p>Max Quantity F: {maxQuantityF}</p>
<p>Max Quantity S: {maxQuantityS}</p>
<p>Max Quantity: {maxQuantity}</p>-->

<div style="display: flex;">
    <div style="padding-right: 20px;">
        <h3>Legend:</h3>
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <svg height="20" width="20">
                <line x1="0" y1="10" x2="20" y2="10" style="stroke:black;stroke-width:2;stroke-dasharray:4" />
            </svg>
            <div style="margin-left: 10px;">Forecast</div>  
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 20px; height: 20px; background-color: rgba(0, 255, 0, 0.5); margin-right: 10px;"></div>
            <div>Sales ~ Forecast</div>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 20px; height: 20px; background-color: rgba(0, 0, 255, 0.5); margin-right: 10px;"></div>
            <div>Sales &gt; Forecast</div>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <div style="width: 20px; height: 20px; background-color: rgba(255, 0, 0, 0.5); margin-right: 10px;"></div>
            <div>Sales &lt; Forecast</div>
        </div>
    </div>
<div style="display: flex;">
    <div style="height: 500px; display: flex; flex-direction: column-reverse; justify-content: space-between; align-items: flex-end; padding-right: 10px;">
        {#each [0, 0.25, 0.5, 0.75, 1] as fraction}
            <div>{Math.round(fraction * maxQuantity)}</div>
        {/each}
    </div>
    <div style="width: 1200px; height: 500px; border: 1px solid black;">
        <svg height="500px" width="1200px" style="transform: scaleY(-1);">
            <polyline points={pointsf} style="fill:none;stroke:green;stroke-width:2;stroke-dasharray:4" />
            {#each Object.keys(salesByMonthAndType).sort() as month, index}
                <rect x={index * 100 + 10} y="0" width="80" height={(salesByMonthAndType[month].Regular + salesByMonthAndType[month].Express) / maxQuantity * 500} style="fill:{getColor(index, month)};">
                    <title>
                        Total Sales = {salesByMonthAndType[month].Regular + salesByMonthAndType[month].Express} units
                        Regular Sales = {salesByMonthAndType[month].Regular} units
                        Express Sales = {salesByMonthAndType[month].Express} units
                    </title>
                </rect>
                <text x={index * 100 + 50} y="-20" text-anchor="middle" style="font-size: 14px; transform: scaleY(-1);">{monthNames[month]}</text>
            {/each}
            {#each filteredforecast_i as item, index (item.Quantity)}
                <circle cx={index * 100 + 50} cy={item.Quantity / maxQuantity * 500} r="5" style="fill:black;">
                    <title>Sales forecast = {item.Quantity} units</title>
                </circle>  
            {/each}
        </svg>
    </div>
</div>
</div>



