for (let i = 0, n = statesData.features.length; i < n; i++) {
  for (let j = 0, m = statesZhvi.items.length; j < m; j++) {
    // if found matching between two sources, add it to the statesData
    if (statesData.features[i].properties["name"] === statesZhvi.items[j]["RegionName"]) {
      statesData.features[i].properties["zhvi"] = statesZhvi.items[j]["Zhvi"]
      statesData.features[i].properties["date"] = statesZhvi.items[j]["Date"]
      break;
    }
  }
}




