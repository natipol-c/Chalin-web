import axios from 'axios'
import { updateOrderCount } from '../store/userSlice';

export const list = async (authtoken) =>
    await axios.get(process.env.REACT_APP_API + '/user', {
        headers: {
            authtoken
        }
    })

export const changeRole = async (authtoken, data) =>
    await axios.post(process.env.REACT_APP_API + '/change-role', { data }, {
        headers: {
            authtoken
        }
    })

    export const handleConfirmRedeem = async (userId, dispatch) => {
        try {
            await axios.post(`${process.env.REACT_APP_API}/user/reset-order-count`, { userId });
            dispatch(updateOrderCount(0));
        } catch (error) {
            console.error('Error resetting order count:', error);
        }
    };

