const handler = {};

handler.notFoundHandler = (requestProperties, callback) =>{
    console.log(requestProperties);

    callback(404, {
        massage : 'Page not found',
    })
}
module.exports = handler;