import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();

        const loginDetails = {
            Email: email, 
            Password: password 
        };

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
            credentials: 'include', // To include cookies with the request if needed
        });

        console.log("login response:", res.status);
        const data = await res.json();

        if (res.ok) {
            // Check if the user is an admin or regular user
            if (data.role === 'admin') {
                toast.success(`Logged in as: ${data.role}`);
                navigate('/admin-home');  // Redirect to admin home
            } else  {
                toast.success(`Logged in as: ${data.role}`);
                navigate('/user-home');  // Redirect to user home
            }
        } else {
            toast.error('Invalid credentials. Please check your email and password.');
        }
    };

    return (
        <div className="bg-cover bg-center bg-no-repeat flex h-screen items-center justify-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full max-w-md md:max-w-lg p-8 rounded-2xl shadow-lg border border-white/20 text-white">
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={loginSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="text-lg">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className="h-12 rounded-lg px-4 mt-1 text-gray-800"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="text-lg">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="h-12 rounded-lg px-4 mt-1 text-gray-800"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="rememberMe" className="mr-2" />
                        <label htmlFor="rememberMe" className="text-lg">Remember Me</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg transition duration-200 hover:bg-sky-700"
                    >
                        Login
                    </button>

                    <p className="text-center mt-4">
                        Forgot your password? <a href="#" className="text-teal-300 underline hover:text-teal-400">Click here</a>
                    </p>

                    <p className="text-center mt-2">
                        Don't have an account? {' '} <Link to="/signup" className="text-teal-300 underline hover:text-teal-400">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
