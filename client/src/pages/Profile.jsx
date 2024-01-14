import { useState, useEffect, useContext} from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import UserContext from '../contexts/UserContext'


export default function Profile () {
    const { user, setUser } = useContext(UserContext)
    const {email, first_name, last_name} = user

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        fetch('api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then(console.log)
    }, [])

    return(
        <div>
            heyo
            <h2><b>{first_name} {last_name}</b>: <em>{email}</em></h2>
        </div>
    )
}