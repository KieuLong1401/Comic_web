'use client'

import styles from './CommentForm.module.css'

import { useEffect, useRef, useState } from "react"
import postComment from '@/services/postComment'



export default function CommentForm() {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const [formValues, setFormValues] = useState({
        comment: ''
    })

    useEffect(() => {
        if(!textAreaRef.current?.scrollHeight) return
        textAreaRef.current.style.height = '70px'
        textAreaRef.current.style.height = `${textAreaRef.current?.scrollHeight}px`
    }, [textAreaRef, formValues.comment])

    function handleFormValueChange(e) {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const res = await postComment(formValues)
        } catch(err) {
            console.error(err)
        }
    }

    return <form className={styles.commentForm} onSubmit={handleSubmit}>
        <textarea ref={textAreaRef} value={formValues.comment} onChange={handleFormValueChange} placeholder='Write Comment here' name='comment'></textarea>
        <button type='submit'>Send</button>
    </form>
}