import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';



Axios.defaults.baseURL = "https://my-ase-node-be-1.azurewebsites.net/";

function Register() {

    const [inputs, setInput] = React.useState({
        username: "",
        password: "",
        email: ""
    });

    const [error, setError] = React.useState({
        error: false,
        message: ""
    });



    function handleChange(event) {
        const { name, value } = event.target;
        setInput((prev) => {
            return { ...prev, [name]: value };
        });
    }
    function handleSubmit(event) {
        event.preventDefault();

        Axios.post("/api/auth/register", inputs).then((res) => {
            console.log(res);

        }).catch((err) => {

            console.log("There is an error!");
            setError({
                error: true,
                message: err.response.data.message
            });
        });

    }
    return (
        <div className='auth'>
            <h1>Register page</h1>
            <form>
                <input onChange={handleChange} required
                    type="text" placeholder='username' value={inputs.username} name='username' />
                <input onChange={handleChange}
                    required type='email' placeholder='email' value={inputs.email} name='email' />
                <input onChange={handleChange}
                    required type='password' placeholder='password' value={inputs.password} name='password' />
                <button onClick={handleSubmit}>Register</button>
                {error.error && <p>{error.message}</p>}
                <span>Do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>

        </div>
    );

}

export default Register;