import { useState, useContext } from 'react'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import UserContext from '../contexts/UserContext'
function Register () {
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState(null)

    return (<>
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: ""
                }}
                validationSchema={yup.object().shape({
                    username: yup.string().required("username required"),
                    email: yup.string().required("email is required"),
                    password: yup.string().required("password required")
                })}
                onSubmit={(values, actions) => {
                    console.log(values)
                    fetch('/api/register', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ ...values, })
                    })
                    .then(res => res.json())
                    .then(userData => {
                        setUser(userData)
                        console.log(user)
                    })
                    .catch(err => console.error(err))
                }}
            >
                <Form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Field type="username" name="username" id="username" className="form-control" />
                        <ErrorMessage name="username" component="div" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field type="email" name="email" id="email" className="form-control" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field type="password" name="password" id="password" className="form-control" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit" className="btn btn-primary block w-1/3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Submit</button>
                </Form>
            </Formik>
        </div>
        </>
    )
}

export default Register