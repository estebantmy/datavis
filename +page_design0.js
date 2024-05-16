import Papa from 'papaparse'

export const load = async ({ fetch }) => {
     const responseForecast = await fetch('https://raw.githubusercontent.com/JannesPeeters/suncharge/main/data/Forecast.csv', {
      headers: {
        'Content-Type': 'text/csv'
    }})
    let csvForecast = await responseForecast.text()
    let parsedCsvForecast = Papa.parse(csvForecast, {header: true})

    const responseSales = await fetch('https://raw.githubusercontent.com/JannesPeeters/suncharge/main/data/Sales.csv', {
      headers: {
        'Content-Type': 'text/csv'
    }})
    let csvSales = await responseSales.text()
    let parsedCsvSales = Papa.parse(csvSales, {header: true})

    return {
      forecast: parsedCsvForecast.data,
      sales: parsedCsvSales.data,
    }
}