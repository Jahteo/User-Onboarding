import React, { useState } from 'react'

function Form () {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "true",
        role: ""
    })
    const handleChanges = (event) => {
        const newFormData = {
            ...formState, [event.target.name]: event.target.value
        }
        setFormState(newFormData)
        console.log(formState)
    }
    const formSubmit = () => {

    }


    return(
        <form onSubmit={formSubmit}>
            <label htmlfor="name">
                Name
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChanges}
                />
            </label>
            <label htmlfor="email">
                Email
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={handleChanges}
                />
            </label>
            <label htmlfor="password">
                Password
                <input
                    id="password"
                    type="text"
                    name="password"
                    value={formState.password}
                    onChange={handleChanges}
                />
            </label>
            <label htmlfor="terms">
                Terms of Service
                <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={handleChanges}
                />
            </label>
            <label htmlfor="role">
                Role
                <select
                    id="role"
                    name="role"
                    value={formState.role}
                    onChange={handleChanges}
                >
                    <option value="init">--Please choose wisely--</option>
                    <option value="dev">Developer Extraordinaire</option>
                    <option value="webUI">Web UI Monkey</option>
                    <option value="backend">Backend Guru</option>
                    <option value="manager">Introvert Wrangler</option>
                </select>
            </label>
            <button type="submit" disabled="true">Submit</button>
        </form>
    )

}

export default Form