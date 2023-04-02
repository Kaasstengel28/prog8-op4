import { createChart, updateChart } from "./scatterplot.js"
const nn = ml5.neuralNetwork({task: 'regression', debug: true})
const fmt = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

let trainData;
let testData;

const result = document.getElementById("result")
const predictBtn = document.getElementById("voorspel")
const saveBtn = document.getElementById("save")

predictBtn.addEventListener("click", () => makePrediction())
saveBtn.addEventListener("click", () => save())

function loadData(){
        Papa.parse("./data/mobilephones.csv", {
                download:true,
                header:true,
                dynamicTyping:true,
                complete: results => checkData(results.data)
        })
}

loadData()

function checkData(data) {
        // data voorbereiden
        data.sort(() => (Math.random() - 0.5))
        let trainData = data.slice(0, Math.floor(data.length * 0.8))
        let testData = data.slice(Math.floor(data.length * 0.8) + 1)

        // data toevoegen aan neural network
        for (let phone of trainData) {
                nn.addData({resoloution: phone.resoloution, battery: phone.battery, storage: phone.storage}, {price: phone.price})
        }

        nn.normalizeData()

        const chartdata = data.map(phone => ({
                x: phone.resoloution,
                y: phone.price,
        }))

        createChart(chartdata, "Resolution", "Price")

        nn.train({ epochs: 100 }, () => finishedTraining())
}

async function finishedTraining() {
        console.log("klaar")
}

async function makePrediction() {
        let resolutionInput = document.getElementById('resoloution').value;
        let storageInput = document.getElementById('storage').value;
        let batteryInput = document.getElementById('battery').value;

        const results = await nn.predict({resoloution:parseInt(resolutionInput), storage:parseInt(storageInput), battery:parseInt(batteryInput)})
        result.innerText = `geschatte prijs: ${fmt.format(results[0].price)}`
        console.log('kankerkind')
}

function save() {
        nn.save()
}