const response = await fetch(process.env.AZURE_ML_URL, {
    method: "POST",
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.AZURE_ML_KEY}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "Inputs": {
            "input1": {
                "ColumnNames": columnNames,
                "Values": this.getValues()
            }
        },
        "GlobalParameters": {}
    })
})

const jsonResponse = await response.json()
const values = jsonResponse.Results.output1.value.Values[0]
const mean = values[values.length-2]

Alert.alert("Predicted Price", `$${mean}`)