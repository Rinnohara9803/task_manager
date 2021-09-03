const workCallBack = (callback) => {
    setTimeout(() => {
        callback( undefined, 'Success')
    }, 2000)
}

workCallBack((error, result) => {
    if (error) {
        return console.log(error)
    }

    console.log(result)
})