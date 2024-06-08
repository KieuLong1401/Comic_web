'use client'

import login from '@/services/login'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export default () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const router = useRouter()

    const handleFormValueChange = useCallback(
        (e) => {
            setFormValues({
                ...formValues,
                [e.target.name]: e.target.value,
            })
        },
        [formValues]
    )

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()

            try {
                const res = await login(formValues)
                localStorage.setItem('user', JSON.stringify(res))
                router.replace('/')
            } catch (err: any) {
                setError(err.response.data)
            }
        },
        [formValues, router]
    )

    return (
        <form onSubmit={handleSubmit}>
            {error != '' && <h1>{error}</h1>}
            <label htmlFor='email'>id</label>
            <input
                type='text'
                name='email'
                value={formValues.email}
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
