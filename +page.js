// Import D3 library
import * as d3 from 'd3';

// Function to fetch and return unique material keys from the dataset
function fetchMaterialKeys() {
    return d3.csv('https://raw.githubusercontent.com/estebantmy/datavis/main/Sales.csv')
        .then(data => {
            // Extract unique material keys using a Set
            return Array.from(new Set(data.map(d => d.MaterialKey)));
        })
        
}

// Function to display status counts by country, with optional filtering by material key
function displayStatusCountsByCountry(materialKey = null) {
    d3.csv('https://raw.githubusercontent.com/estebantmy/datavis/main/Sales.csv').then(function(data) {
        // Apply filter if a material key is specified
        if (materialKey) {
            data = data.filter(d => d.MaterialKey === materialKey);
        }
        const counts = d3.rollup(
            data,
            v => v.length,
            d => d.Country,
            d => d.Status
        );

        const countsArray = Array.from(counts, ([country, statusCounts]) => ({
            country,
            statusCounts: Array.from(statusCounts, ([status, count]) => ({ status, count }))
        }));

        console.log(countsArray);
    })
}

fetchMaterialKeys().then(keys => console.log('Material Keys:', keys));

displayStatusCountsByCountry();
