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

// add zillow city data to each state in statesData
for (let i = 0, n = statesData.features.length; i < n; i++) {
  const stateFeatures = statesData.features[i];

  // init a new property zillowData to push different cities zhvi into same state
  stateFeatures.properties["zillowData"] = []
  // new property zhviList for ease of mean calculation
  stateFeatures.properties["zhviList"] = []
  // new property to hold mean of zhvi
  stateFeatures.properties["meanZhvi"] = 0
  for (let j = 0, m = zillowData.data.length; j < m; j++) {
    const zillowDataFeatures = zillowData.data[j];
    // if found matching between two state name, add it to the statesData
    if (stateFeatures.properties["name"] === zillowDataFeatures["FullStateName"]) {
      stateFeatures.properties["zhviList"].push(zillowDataFeatures["Zhvi"])
      stateFeatures.properties["zillowData"].push(zillowDataFeatures)
    }
  }
}

// // testing it works
// for (let i = 0, n = statesData.features.length; i < n; i++) {
//   console.log(statesData.features[i].properties)
// }

// produce mean and median of each state for overall display on each state
for (let i = 0, n = statesData.features.length; i < n; i++) {
  const zhviCount = statesData.features[i].properties["zhviList"].length;
  const stateFeatures = statesData.features[i];
  stateFeatures.properties["meanZhvi"] = Math.floor(stateFeatures.properties["zhviList"].reduce((acc, zhvi) => acc + zhvi, 0) / zhviCount);

  console.log(statesData.features[i].properties["meanZhvi"])
}
