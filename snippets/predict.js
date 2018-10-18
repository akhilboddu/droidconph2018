const response = await recognizeFaces({variables: {
    base64
}})

const { names } = response.data.recognizeFaces

Alert.alert("Predicted Faces", names.join(', '))