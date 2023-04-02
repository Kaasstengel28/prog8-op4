const nn = ml5.neuralNetwork({task: 'regression', debug: true})
nn.load('./model/model.json')
const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

//html button stuff
const result = document.getElementById("result")
const predictBtn = document.getElementById("voorspel")

predictBtn.addEventListener("click", () => makePrediction())

//prediction function
async function makePrediction() {
    let resolutionInput = document.getElementById('resoloution').value;
    let storageInput = document.getElementById('storage').value;
    let batteryInput = document.getElementById('battery').value;

    const results = await nn.predict({resoloution:parseInt(resolutionInput), storage:parseInt(storageInput), battery:parseInt(batteryInput)})
    result.innerText = `geschatte prijs: ${fmt.format(results[0].price)}`
    console.log('kankerkind')
}