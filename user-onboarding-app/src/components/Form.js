import React, { useState } from 'react'
import * as yup from 'yup'

function Form () {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        terms: true,
        role: ''
    })
    const handleChanges = (event) => {
        const newFormData = {
            ...formState, [event.target.name]: event.target.value
        }
        // validateChange(event)
        setFormState(newFormData)
        console.log(formState)
    }
    const formSubmit = () => {}
    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string().email("Real email addresses only please").required("Must take the risk & include email address. We probably won't spam you."),
        password: yup.string().min(6, "Standard drill: 6 characters password minimum.").required("Nice try. Password required."),
        terms: yup.boolean().oneOf([true], "Please agree to terms of use & sign your life away."),
        role: yup.string().oneOf(["dev", "webUI", "backend", "manager"])
    })


    return(
        <form onSubmit={formSubmit}>
            <label htmlFor='name'>
                Name
                <input
                    id='name'
                    type='text'
                    name='name'
                    value={formState.name}
                    onChange={handleChanges}
                />
            </label>
            <label htmlFor='email'>
                Email
                <input
                    id='email'
                    type='text'
                    name='email'
                    value={formState.email}
                    onChange={handleChanges}
                />
            </label>
            <label htmlFor='password'>
                Password
                <input
                    id='password'
                    type='text'
                    name='password'
                    value={formState.password}
                    onChange={handleChanges}
                />
            </label>
            <label htmlFor='terms'>
                Terms of Service
                <input
                    id='terms'
                    type='checkbox'
                    name='terms'
                    checked={formState.terms}
                    onChange={handleChanges}
                />
            </label>
            <label htmlFor='role'>
                Role
                <select
                    id='role'
                    name='role'
                    value={formState.role}
                    onChange={handleChanges}
                >
                    <option value='init'>--Please choose wisely--</option>
                    <option value='dev'>Developer Extraordinaire</option>
                    <option value='webUI'>Web UI Monkey</option>
                    <option value='backend'>Backend Guru</option>
                    <option value='manager'>Introvert Wrangler</option>
                </select>
            </label>
            <button type='submit' disabled={true}>Submit</button>
        </form>
    )

}

export default Form