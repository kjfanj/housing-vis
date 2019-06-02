const inputHolder = document.getElementById('input-holder');
inputHolder.addEventListener("keyup", (e) => {
  // clear data on every input change
  const dataPresentation = document.getElementById('data-presentation');
  dataPresentation.innerHTML = "";
  // only do filter on more input and non space only input
  if (inputHolder.value !== "" && inputHolder.value !== " ") {
    // add matched data onto the data-presentation element
    const matchedData = filterInfo(statesData, inputHolder.value)
    let dataToBeAppended = []
    if (matchedData.length > 0) {

      for (let i = 0; i < matchedData.length; i++) {
        const itemInfoElem = `<div id="item-info-container">
        <p>
          <b>${matchedData[i].FullStateName}</b>
          <span>, ${matchedData[i].RegionName}</span>
          <span>, ${matchedData[i].County}</span>
          <span>, $${numberWithCommas(matchedData[i].Zhvi)}</span>
        <p>
      </div>
      `;
        dataToBeAppended.push(itemInfoElem)
      }
      dataPresentation.innerHTML = dataToBeAppended.join("")
    }
  }

}, false)


// filter out the data based on input, return the matchedData
const filterInfo = (stateInfo, inputLetters) => {
  let matchedData = [];
  let lowerCasedInput = inputLetters.toLowerCase();
  for (let i = 0, n = stateInfo.features.length; i < n; i++) {
    stateInfo.features[i].properties.zillowData.forEach(region => {
      if (region.RegionName.toLowerCase().includes(lowerCasedInput)) {
        matchedData.push(region)
      }
    })

  }
  return matchedData
}

var numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}