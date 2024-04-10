'use client'
import styles from './SignUpForm.module.css'

import signUp from '@/services/signUp'
import { useState } from 'react'

export default () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [succeeded, setSucceeded] = useState(false)

    function handleFormValueChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await signUp(formValues)
            setSucceeded(true)
        } catch (err: any) {
            setError(err?.response.data)
        }
    }

    return succeeded ? (
        <div>
            <h1>created user</h1>
            <a href='/login'>login</a>
        </div>
    ) : (
        <form onSubmit={handleSubmit}>
            {error != '' && <h1 className={styles.errMes}>{error}</h1>}

            <label htmlFor='name'>name</label>
            <input
                type='text'
                name='name'
                value={formValues.name}
                onChange={handleFormValueChange}
            />

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
