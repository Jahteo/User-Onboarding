import React, { useState } from 'react'

function Form () {
    const [formState, setFormState] = useState()

    return(
        <form>
            <label htmlfor="name">
                Name
                <input id="name" type="text" name="name" />
            </label>
            <label htmlfor="email">
                Email
                <input id="email" type="text" name="email" />
            </label>
            <label htmlfor="password">
                Password
                <input id="password" type="text" name="password" />
            </label>
            <label htmlfor="terms">
                Terms of Service
                <input id="terms" type="checkbox" name="terms" checked="true" />
            </label>
            <label htmlfor="role">
                Role
                <select id="role" name="role">
                    <option value="dev">Developer Extraordinaire</option>
                    <option value="webUI">Web UI Monkey</option>
                    <option value="backend">Backend Guru</option>
                    <option value="manager">Introvert Wrangler</option>
                </select>
            </label>
            <button type="submit">Submit</button>
        </form>
    )

}

export default Form