import Papa from 'papaparse'

export const load = async ({ fetch }) => {

// Get data from csv with Material Plant Relation data (incl. custom material labels)

  const fileMPR = await fetch('https://raw.githubusercontent.com/CarolienVD/Aggregated-data/master/MaterialPlantRelation_MaterialLabel.csv', {
    headers: {
      'Content-Type': 'text/csv'
    }
  })
  let csvMPR = await fileMPR.text()
  let parsedCsvMPR = Papa.parse(csvMPR, { header: true, dynamicTyping: true, skipEmptyLines: true })

// Get data from csv with average times for each external vendor x production plant combination

  const fileExtVendorTimes = await fetch('https://raw.githubusercontent.com/CarolienVD/Aggregated-data/master/VendorTimesAggregated.csv', {
    headers: {
      'Content-Type': 'text/csv'
    }
  })
  let csvExtVendorTimes = await fileExtVendorTimes.text()
  let parsedCsvExtVendorTimes = Papa.parse(csvExtVendorTimes, { header: true, dynamicTyping: true, skipEmptyLines: true })

// Get data from csv with average times for each production plant x distribution plant combination

  const fileIntVendorTimes = await fetch('https://raw.githubusercontent.com/CarolienVD/Aggregated-data/master/InternalTimesAggregated.csv', {
    headers: {
      'Content-Type': 'text/csv'
    }
  })
  let csvIntVendorTimes = await fileIntVendorTimes.text()
  let parsedCsvIntVendorTimes = Papa.parse(csvIntVendorTimes, { header: true, dynamicTyping: true, skipEmptyLines: true })

  // $ : console.log(parsedCsvMPR_internal_agg.data)


  return {
    MPR: parsedCsvMPR.data,
    ExtVendorTimes: parsedCsvExtVendorTimes.data,
    IntVendorTimes: parsedCsvIntVendorTimes.data
  }
}
