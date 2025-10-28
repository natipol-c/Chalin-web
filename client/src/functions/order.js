import axios from 'axios'

export const listOrder = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + '/order', {
        headers: {
            authtoken
        }
    })

export const listOrderStatus = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + '/order-status', {
        headers: {
            authtoken: authtoken || '',
        }
    });


export const changeStatus = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + '/change-status', { data }, {
        headers: {
            authtoken
        }
    })

export const changeStatusUser = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + '/change-status-user', { data }, {
        headers: {
            authtoken
        }
    });
