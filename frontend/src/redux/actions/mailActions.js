import axios from 'axios'
import API from '../../helpers/api'
const mailActions = {
    mailOrderConfirmed: (person, resumen, destinatario, asunto, total) => {
        console.log({person, resumen, destinatario, asunto, total})
        return (dispatch, getState) => {
            try {   
                const response = axios.post(API + '/orderconfirmed', {person, resumen, destinatario, asunto, total})
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        }
    } 
}
export default mailActions
