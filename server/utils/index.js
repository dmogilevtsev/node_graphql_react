const { server, client } = require('../config/index')

const uri = () => `${ server.protocol_http }://${ server.host }:${ server.port }`
const client_uri = () => `${ client.protocol_http }://${ client.host }:${ client.port }`

module.exports = { uri, client_uri }