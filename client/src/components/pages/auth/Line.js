import React, { useEffect, useState } from 'react'
import liff from '@line/liff'
import { loginLine } from '../../../functions/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login } from '../../../store/userSlice'

import { toast } from 'react-toastify';


const Line = () => {
    const navi = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initLiff = async () => {
            try {

                await liff.init({ liffId: '2006450969-0A7M1mB8' })
                if (liff.isLoggedIn) {
                    await handleLogin()
                }
            } catch (err) {
                console.log(err)
            }
        }
        initLiff()
    }, [])

    const handleLogin = async () => {
        try {
            const profile = await liff.getProfile()
            await loginLine(profile)
                .then(res => {
                    console.log(res)
                    toast.success('User ' + res.data.payload.user.
                        displayName + ' Login Success', {
                        position: "top-right",
                        theme: "dark"
                    })
                    setLoading(false)
                    dispatch(login({
                        email: res.data.payload.user.email,
                        role: res.data.payload.user.role,
                        displayName: res.data.payload.user.displayName,
                        ip: res.data.payload.user.ip,
                        _id: res.data.payload.user._id,
                        token: res.data.token
                    }))
                    localStorage.setItem('token', res.data.token)
                    roleRedirects(res.data.payload.user.role)

                }).catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const roleRedirects = (role) => {
        if (role === 'admin') {
            navi('/admin/index')
        } else {
            navi('/')
        }

    }


    return loading ? <h1>Loading...</h1> : null
}

export default Line