import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-3 fixed top-0 inset-x-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="text-xl text-white font-bold" to="/">BISLERIUM BLOG</Link>
                <div className="flex items-center space-x-4">
                    <Link className="text-gray-300 hover:text-white transition duration-150" to="/">All Blogs</Link>
                    <Link className="text-gray-300 hover:text-white transition duration-150" to="/surfers">Surfers</Link>
                    {isLoggedIn && (
                        <>
                            <Link className="text-gray-300 hover:text-white transition duration-150" to="/profile">Profile</Link>
                            <Link className="text-gray-300 hover:text-white transition duration-150" to="/addblogs">Add Blog</Link>
                            <Link className="text-gray-300 hover:text-white transition duration-150" to="/bloglist">Blog List</Link>
                            <Link className="text-gray-300 hover:text-white transition duration-150" to="/bloghistory">Blog History</Link>
                        </>
                    )}
                </div>
                <div className="flex items-center">
                    {!isLoggedIn ? (
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                    ) : (
                        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
