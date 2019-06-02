//  process all data here

// add full state name to zillow dataSet
for (let i = 0, n = zillowData.data.length; i < n; i++) {
  // assign it to new property of zillowData.data
  zillowData.data[i]["FullStateName"] = stateAbvMapping[zillowData.data[i]["State"]]
}

// // testing it works
// for (let i = 0, n = zillowData.data.length; i < n; i++) {
//   console.log(zillowData.data[i])
// }

// add zillow city zhvi data to each state in statesData
for (let i = 0, n = statesData.features.length; i < n; i++) {
  const stateFeatures = statesData.features[i];

  // init a new property zillowData to push different cities zhvi into same state
  stateFeatures.properties["zillowData"] = []
  stateFeatures.properties["zillowZhvi"] = 0
  for (let j = 0, m = zillowData.data.length; j < m; j++) {
    const zillowDataFeatures = zillowData.data[j];
    // if found matching between two state name, add it to the statesData
    if (stateFeatures.properties["name"] === zillowDataFeatures["FullStateName"]) {
      stateFeatures.properties["zillowData"].push(zillowDataFeatures)
    }
  }
}

// add zillow state zhvi data
for (let i = 0, n = statesData.features.length; i < n; i++) {
  const stateFeatures = statesData.features[i];
  for (let j = 0, m = zillowStateZhvi.data.length; j < m; j++) {
    if (stateFeatures.properties["name"] === zillowStateZhvi.data[j]["RegionName"]) {
      stateFeatures.properties["zillowZhvi"] = zillowStateZhvi.data[j]["Zhvi"]
      break;
    }

  }
}



// // testing it works
// for (let i = 0, n = statesData.features.length; i < n; i++) {
//   console.log(statesData.features[i].properties.zillowData)
// }


