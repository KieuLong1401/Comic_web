'use client'

import login from '@/services/login'
import { useState } from 'react'

export default function LoginForm() {
    const [formValues, setFormValues] = useState({
        user_id: '',
        password: '',
    })

    const [succeeded, setSucceeded] = useState(null)

    function handleFormValueChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const token = await login(formValues)
            localStorage.setItem('token', token)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='user_id'>id</label>
            <input
                type='text'
                name='user_id'
                value={formValues.user_id}
                onChange={handleFormValueChange}
            />

            <label htmlFor='password'>password</label>
            <input
                type='password'
                name='password'
                value={formValues.password}
                onChange={handleFormValueChange}
            />

            <input type='submit' />
        </form>
    )
}
