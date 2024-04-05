'use client'

import signUp from "@/services/signUp"
import { useState } from "react"

export default () => {
    const [formValues, setFormValues] = useState({
        name: '',
        user_id: '',
        password: ''
    })

    const [succeeded, setSucceeded] = useState(null)
    
    function handleFormValueChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await signUp(JSON.stringify(formValues))
            console.log(res)
        } catch(err) {
            console.error(err)
        }
    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" value={formValues.name} onChange={handleFormValueChange}/>

        <label htmlFor="user_id">id</label>
        <input type="text" name="user_id" value={formValues.user_id} onChange={handleFormValueChange}/>

        <label htmlFor="password">password</label>
        <input type="password" name="password" value={formValues.password} onChange={handleFormValueChange}/>

        <input type="submit" />
    </form>
}