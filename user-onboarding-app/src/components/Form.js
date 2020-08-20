import React, { useState, useEffect } from "react"
import axios from "axios"
import * as yup from "yup"

function Form () {
    const [formState, setFormState] = useState({ name: "", email: "", password: "", terms: "", role: ""})
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [errors, setErrors] = useState({name: "", email: "", password: "", terms: "", role: ""})
    const [users, setUsers] = useState([]);
    console.log("users", users)
    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.name === "terms" ? event.target.checked : event.target.value)
            .then(valid => {
                setErrors({...errors, [event.target.name]: ""})
            })
            .catch(err => {
                setErrors({...errors, [event.target.name]: err.errors[0]})
            })
    }

    const handleChanges = (event) => {
        event.persist();
        const newFormData = {
            ...formState, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        }
        validateChange(event)
        setFormState(newFormData)
        // console.log(formState)
        // console.log("ERRORS", errors)
    }

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup.string().email("Real email addresses only please").required("Must take the risk & include email address. We probably won't spam you."),
        password: yup.string().min(6, "Standard drill: 6 characters password minimum.").required("Nice try. Password required."),
        terms: yup.boolean().oneOf([true], "Please agree to terms of use & sign your life away.").required("Check here, purdy please"),
        role: yup.string().oneOf(["dev", "webUI", "backend", "manager"]).required("We need to know who you are")
    })

    useEffect(() => {
        // console.log("form state change")
        formSchema.isValid(formState).then(valid => {
            // console.log("valid?", valid)
            setButtonDisabled(!valid);
        });
    }, [formState])

    const formSubmit = event => {
        event.preventDefault();
        setButtonDisabled(true)//immediately disables button to prevent multiple posts from fast clicking. Similar principle for keeping the user from adding work or text *during the post&* that will be lost once the post finishes.
        axios.post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log("res.data:", res.data);
                setFormState({ name: "", email: "", password: "", terms: "", role: ""});
                setUsers((users) => [...users, res.data]);//using `users` in the argument here forces it to use the slice of state existing here, instead of the old one that hasnt' been updated w/o a re-render yet. (without using the () => {}, we pull the value of users before this function has run (line 50) which is why it didn't console log the new/current value, but the old value.)
                //& bc each setter is only aware of it's own value, trying to throw the previous (pointless) post state into setUsers wouldn't work.
            })
            .catch((err) => {console.log(err.response)});
    };


    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChanges}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label><br />
            <label htmlFor="email">
                Email
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formState.email}
                    onChange={handleChanges}
                />
                 {errors.email.length > 0 ? (<p className="error">{errors.email} </p>) : null}
            </label><br />
            <label htmlFor="password">
                Password
                <input
                    id="password"
                    type="text"
                    name="password"
                    value={formState.password}
                    onChange={handleChanges}
                />
                 {errors.password.length > 0 ? (<p className="error">{errors.password}</p>) : null}
            </label><br />
            <label htmlFor="terms">
                Terms of Service
                <input
                    id="terms"
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={handleChanges}
                />
                {errors.terms.length > 0 ? (<p className="error">{errors.terms}</p>) : null}
            </label><br />
            <label htmlFor="role">
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
                {errors.role.length > 0 ? (<p className="error">{errors.role}</p>) : null}
            </label><br />
            <button type="submit" disabled={buttonDisabled}data-cy="submit">Submit</button>
        </form>
    )

}

export default Form