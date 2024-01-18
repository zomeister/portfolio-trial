import { useState, useContext } from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as yup from 'yup';
import UserContext from '../contexts/UserContext'
function Register () {
    const { user, setUser } = useContext(UserContext)
    const [error, setError] = useState(null)

    return (<>
        <div>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName:'',
                    email: '',
                    // phoneNumber: null,
                    password: '',
                    // birthday: '1900-01-01',
                }}
                validationSchema={yup.object().shape({
                    firstName: yup.string()
                        .min(3, 'Min of 3')
                        .max(30, 'Max of 30')
                        .required('first_name required'),
                    lastName: yup.string()
                        .min(3, 'Min of 3')
                        .max(30, 'Max of 30')
                        .required('last_name required'),
                    email: yup.string()
                        .min(3, 'Min of 3')
                        .max(30, 'Max of 30')
                        .required('email required'),
                    // phoneNumber: yup.string()
                    //     .notRequired(),
                    password: yup.string()
                        .required('password required'),
                    // birthday: yup.date()
                    //     .notRequired(),
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
                        console.log(userData)
                    })
                    .catch(err => console.error(err))
                }}
            >
                <Form>
                    <div className='form-group'>
                        <label htmlFor='firstName'>First Name*</label>
                        <Field type='text' name='firstName' id='firstName' className='input input-bordered w-full max-w-xs' />
                        <ErrorMessage name='firstName' component='div' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='lastName'>Last Name*</label>
                        <Field type='text' name='lastName' id='lastName' className='input input-bordered w-full max-w-xs' />
                        <ErrorMessage name='lastName' component='div' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email*</label>
                        <Field type='email' name='email' id='email' className='input input-bordered w-full max-w-xs' />
                        <ErrorMessage name='email' component='div' />
                    </div>
                    {/* <div className='form-group'>
                        <label htmlFor='phone-number'>Phone Number</label>
                        <Field type='number' name='phone-number' id='phone-number' className='input input-bordered font-mono w-full max-w-xs' />
                        <ErrorMessage name='phone-number' component='div' />
                    </div> */}
                    {/* <div className='form-group'>
                        <label htmlFor='birthday'>Birthday</label>
                        <Field type='date' name='birthday' id='birthday' className='input input-bordered font-mono w-full max-w-xs' />
                        <ErrorMessage name='birthday' component='div' />
                    </div> */}
                    <div className='form-group'>
                        <label htmlFor='password'>Password*</label>
                        <Field type='password' name='password' id='password' className='input input-bordered w-full max-w-xs' />
                        <ErrorMessage name='password' component='div' />
                    </div>
                    <button type='submit' className='btn btn-primary block w-1/3 rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Submit</button>
                </Form>
            </Formik>
        </div>
        </>
    )
}

export default Register