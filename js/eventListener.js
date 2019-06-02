const inputHolder = document.getElementById('input-holder');
inputHolder.addEventListener("keyup", (e) => {
  // clear data on every key change
  const dataPresentation = document.getElementById('data-presentation');
  removeChild(dataPresentation)
  if (inputHolder.value !== "" && inputHolder.value !== " ") {
    // add matched data onto the data-presentation element
    const matchedData = filterInfo(statesData, inputHolder.value)
    let dataToBeAppended = []
    if (matchedData.length > 0) {

      for (let i = 0; i < matchedData.length; i++) {
        const itemInfoElem = `<div id="item-info-container">
      <h3 id=f"state-name">${matchedData[i].FullStateName}</h3>
      <p id="city-name">${matchedData[i].RegionName}</p>
      <p id="city-name">${matchedData[i].County}</p>
      <p id="zhvi-value">$ ${matchedData[i].Zhvi}</p>
      </div>
      `;
        dataToBeAppended.push(itemInfoElem)
      }
      dataPresentation.innerHTML = dataToBeAppended.join()
    }
    console.log(matchedData)
    console.log(matchedData.length)
  }

}, false)

const removeChild = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

const filterInfo = (stateInfo, inputLetters) => {
  let matchData = [];
  let lowerCasedInput = inputLetters.toLowerCase();
  for (let i = 0, n = stateInfo.features.length; i < n; i++) {
    stateInfo.features[i].properties.zillowData.forEach(region => {
      if (region.RegionName.toLowerCase().includes(lowerCasedInput)) {
        matchData.push(region)
      }
    })

  }
  return matchData
}