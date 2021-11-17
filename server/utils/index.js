import Index from '../config'

const uri = () => `${ Index.server.protocol_http }://${ Index.server.host }:${ Index.server.port }`
const client_uri = () => `${ Index.client.protocol_http }://${ Index.client.host }:${ Index.client.port }`

export default { uri, client_uri }