var severity;
var dataString;
var myJSON1;
var final_result;
var confidence;

document.addEventListener('selectstart', () => {
  document.getElementById('selectStat').innerHTML = "<center><p><b>Selecting Text....</b></p></center>";
});

setInterval(() => {
  if (window.getSelection() != dataString) {
    dataString = window.getSelection().toString();
    let body = {
      text: dataString
    }
    console.log(body);
    userAction2(body);
  } else {
    document.getElementById('selectStat').innerHTML = "<center><p><b>Begin selection to check severity of a different string...</b></p></center>";
  }
}, 500)

const userAction2 = async (dataString) => {
  const response = await fetch('http://172.22.29.86:5000/model', {
    method: 'POST',
    body: JSON.stringify(dataString),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const myJson = await response.json();
  myJSON1 = JSON.parse(myJson);
  updateMLValues();
}

function updateMLValues() {
  final_result = document.getElementById('final-result');
  confidence = document.getElementById('confidence-level');

  final_result.innerHTML = "Result: " + myJSON1.label;
  confidence.innerHTML = "Confidence: " + Math.round(myJSON1.confidence * 10000) / 100 + " %";
}
