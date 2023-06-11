import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
//Axios.defaults.baseURL = "https://my-ase-node-be-1.azurewebsites.net/";

function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [inputs, setInput] = React.useState({
        username: "",
        password: "",
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
    async function handleLogin(event) {
        event.preventDefault();

        try {
            await login(inputs)
            navigate("/");
        } catch (err) {
            setError({
                error: true,
                message: err.response.data.message
            });
        }


    }

    return (
        <div className='auth'>
            <h1>Login page</h1>
            <form>
                <input
                    onChange={handleChange}
                    required type="text" placeholder='username' name='username' value={inputs.username} />
                <input onChange={handleChange}
                    required type='password' placeholder='password' name='password' value={inputs.password} />
                <button onClick={handleLogin}>Login</button>
                {error.error && <p>{error.message}</p>}
                <span>Don't you have an account? <Link to="/register">Register</Link>
                </span>
            </form>

        </div>
    );

}

export default Login;
