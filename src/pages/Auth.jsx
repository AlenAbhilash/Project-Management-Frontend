import React from 'react'
import { useState, useContext } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, regsiterApi } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthContext } from '../Context Api/TokenAuth'


function Auth({ register }) {
    const isRegisterForm = register ? true : false
    const nav = useNavigate()
    const [userData, setUserData] = useState({
        username: "", email: "", password: ""
    })
    console.log(userData);
    const { isAuthorized, setIsAuthorized } = useContext(TokenAuthContext)

    const handleRegsiter = async (e) => {
        e.preventDefault()
        console.log(userData);
        const { username, email, password } = userData
        if (!username || !email || !password) {
            toast.info("please fill the missing field");
        } else {
            try {
                const result = await regsiterApi(userData)
                console.log(result);
                if (result.status === 200) {
                    toast.success(result.data.username, "Succefully regsiter");
                    toast.success(`${result.data.username} has successfully registered`);
                    nav('/login');
                    setUserData({ username: "", email: "", password: "" })
                } else {
                    toast.warning(result.response.data);
                }
            } catch (err) {
                console.log(err);

            }
        }

    }
    const handleLogin = async (e) => {
        e.preventDefault(); 
        const { email, password } = userData;

        if (!email || !password) {
            toast.info("Please fill in the form");
        } else {
            try {
                const result = await loginApi({ email, password });
                console.log(result);
                if (result.status === 200) {
                    sessionStorage.setItem('username', result.data.existingUser.username);
                    sessionStorage.setItem('existingUser', JSON.stringify(result.data.existingUser));
                    sessionStorage.setItem('token', result.data.token);
                    nav('/');
                    setIsAuthorized(true)
                    setUserData({ email: "", password: "" });
                } else {
                    toast.warning(result.response ? result.response.data : "Login failed");
                }
            } catch (err) {
                console.error(err);
            } c
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="conatiner w-75">
                    <Link to={'/'} style={{ textDecoration: "none" }} className='fw-bolder'>
                        <i className='fa-solid fa-arrow-left m-2'></i>
                        Back to Home
                    </Link>
                    <div className="card shadow bg-info p-5 m-3">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <img src="https://static.vecteezy.com/system/resources/previews/002/142/240/original/login-form-authentication-icon-vector.jpg" alt="" className='w-100 rounded-5' />
                            </div>
                            <div className="col-lg-6">
                                <h1 className='fw-bolder text-light'>Project Fair<i className='fa-solid fa-list-check me-2'></i></h1>
                                <h5>
                                    {isRegisterForm ? "Sign up to your account" : "Sign in your account"}
                                </h5>
                                <Form>
                                    {isRegisterForm &&
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Control type="text" placeholder="Enter your UserName"
                                                onChange={e => setUserData({ ...userData, username: e.target.value })}
                                                value={userData.username} />
                                        </Form.Group>
                                    }
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="email" placeholder="Enter your Email"
                                            onChange={e => setUserData({ ...userData, email: e.target.value })}
                                            value={userData.email} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control type="password" placeholder="Enter your Password"
                                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                                            value={userData.password} />
                                    </Form.Group>
                                </Form>
                                {isRegisterForm ?
                                    <div>
                                        <Button variant='dark' onClick={handleRegsiter}>
                                            Register
                                        </Button>
                                        <p className='m-2'>Already have an Account? Click Here....
                                            <Link to={'/login'} style={{ textDecoration: "none", color: 'green' }} >Login</Link>
                                        </p>
                                    </div> :
                                    <div>
                                        <Button variant='dark' onClick={handleLogin}>Login</Button>
                                        <p className='m-2'>New User? Click Here...
                                            <Link to={'/register'} style={{ textDecoration: "none", color: 'red' }}>Register</Link>
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth
