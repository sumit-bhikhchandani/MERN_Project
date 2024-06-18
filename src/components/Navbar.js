import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'; // Import Badge from react-bootstrap
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

    const [cartView,setCartView] = useState(false)
    const navigate = useNavigate();
    let data = useCart();
    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My orders</Link>
                                </li>
                                : ""}
                        </ul>

                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <Link style={{ backgroundColor: 'white', color: 'green' }} className="btn btn-light mx-1" to="/login">Login</Link>
                                <Link style={{ backgroundColor: 'white', color: 'green' }} className="btn btn-light mx-1" to="/createuser">Signup</Link>
                            </div>
                            :
                            <div>
                                <div style={{ backgroundColor: 'white', color: 'green', position: 'relative' }} className="btn btn-light mx-2" onClick={() => {setCartView(true)}}>
                                    My Cart
                                    <Badge pill style={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'red' }}>{data.length}</Badge>
                                </div>

                                {cartView? <Modal onClose={() =>setCartView(false)}><Cart /></Modal>:null}

                                <div style={{ backgroundColor: 'white', color: 'green' }} className="btn btn-light mx-2 text-danger" onClick={handleLogOut}>
                                    LogOut
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}
