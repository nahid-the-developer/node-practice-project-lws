const handler = {};

handler.sampleHandler = (requestProperties, callback) =>{
    console.log(requestProperties);

    callback(200, {
        massage : 'This is sample page.',
    })
}

module.exports = handler;