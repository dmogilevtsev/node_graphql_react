import { configuration } from '../config'

const { server, client } = configuration

const uri = () => `${ server.protocol_http }://${ server.host }:${ server.port }`
const client_uri = () => `${ client.protocol_http }://${ client.host }:${ client.port }`

export default { uri, client_uri }