
// let data = []

// fetch("http://ec2-54-84-4-117.compute-1.amazonaws.com:3000", {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.length)
//     console.log(data)
//     for (let i = 0, n = data.length; i < n; i++) {
//       console.log(data[i])
//     }
//   })


for (let i = 0, n = statesData.features.length; i < n; i++) {
  for (let j = 0, m = statesZhvi.items.length; j < m; j++) {
    // if found matching between two sources, add it to the statesData
    if (statesData.features[i].properties["name"] === statesZhvi.items[j]["RegionName"]) {
      statesData.features[i].properties["zhvi"] = statesZhvi.items[j]["Zhvi"]
      break;
    }
  }
}

for (let i = 0, n = statesData.features.length; i < n; i++) {
  console.log(statesData.features[i])

}




