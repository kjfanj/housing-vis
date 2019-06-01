//  process all data here

// add full state name to zillow dataSet
for (let i = 0, n = zillowData.data.length; i < n; i++) {
  // assign it to new property of zillowData.data
  zillowData.data[i]["FullStateName"] = stateAbvMapping[zillowData.data[i]["State"]]
}

// testing it works
// for (let i = 0, n = zillowData.data.length; i < n; i++) {
//   console.log(zillowData.data[i])
// }

// add zillow city data to each state in statesData
for (let i = 0, n = statesData.features.length; i < n; i++) {
  // init a new property zillowData to push different cities zhvi into same state
  statesData.features[i].properties["zillowData"] = []
  for (let j = 0, m = zillowData.data.length; j < m; j++) {
    // if found matching between two state name, add it to the statesData
    if (statesData.features[i].properties["name"] === zillowData.data[j]["FullStateName"]) {
      statesData.features[i].properties["zillowData"].push(zillowData.data[j])
    }
  }
}

// testing it works
for (let i = 0, n = statesData.features.length; i < n; i++) {
  console.log(statesData.features[i].properties.zillowData)
}
