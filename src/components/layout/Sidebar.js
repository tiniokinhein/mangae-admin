import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { COLOR } from '../color/Color'
import { IoStorefrontOutline } from 'react-icons/io5'
import { ImGoogle } from 'react-icons/im'
import { CgMenuGridO } from 'react-icons/cg'
import { FaWeightHanging } from 'react-icons/fa'


const Sidebar = (props) => {

    const closeSidebar = () => {
        document.getElementById('sidebar').classList.remove('sidebarOpen')
        document.getElementById('layout').classList.remove('layoutOpen')
        props.history.push({
            state: false
        })
    }

    return (
        <div
            id="sidebar"
            className="position-fixed sidebar shadow"
            style={{
                left: 0,
                top: '60px',
                bottom: 0,
                height: '100vh',
                background: COLOR.F
            }}
        >
            <ul 
                className="list-unstyled m-0 py-3"
                onClick={closeSidebar}
            >
                <li>
                    <NavLink
                        to="/dashboard"
                        className="d-flex align-items-center text-decoration-none text-secondary px-3 py-1 hover-link border-bottom border-dark"
                        activeClassName="sidebar-active"
                    >
                        <span>
                            <IoStorefrontOutline size="1.2rem" />
                        </span>
                        <small className="ms-2">Dashboard</small>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/groceries"
                        className="d-flex align-items-center text-decoration-none text-secondary px-3 py-1 hover-link"
                        activeClassName="sidebar-active"
                    >
                        <span>
                            <ImGoogle size="1.2rem" />
                        </span>
                        <small className="ms-2">Groceries</small>
                    </NavLink>
                    <ul className="list-unstyled m-0">
                        <li>
                            <NavLink
                                to="/g/categories"
                                className="d-flex align-items-center text-decoration-none text-secondary ps-4 pe-3 py-1 hover-link"
                                activeClassName="sidebar-active"
                            >
                                <span>
                                    <CgMenuGridO size="1rem" />
                                </span>
                                <small className="ms-2">Categories</small>
                            </NavLink>
                            <NavLink
                                to="/g/weight"
                                className="d-flex align-items-center text-decoration-none text-secondary ps-4 pe-3 py-1 hover-link border-bottom border-dark"
                                activeClassName="sidebar-active"
                            >
                                <span>
                                    <FaWeightHanging size="1rem" />
                                </span>
                                <small className="ms-2">Weight</small>
                            </NavLink>
                        </li>
                    </ul>
                </li>
                {/* <li>
                    <NavLink
                        to="/dashboard"
                        className="d-flex align-items-center text-decoration-none text-secondary px-3 py-1 hover-link border-bottom border-dark"
                        activeClassName="sidebar-active"
                    >
                        <span>
                            <IoStorefrontOutline size="1.2rem" />
                        </span>
                        <small className="ms-2">Dashboard</small>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard"
                        className="d-flex align-items-center text-decoration-none text-secondary px-3 py-1 hover-link border-bottom border-dark"
                        activeClassName="sidebar-active"
                    >
                        <span>
                            <IoStorefrontOutline size="1.2rem" />
                        </span>
                        <small className="ms-2">Dashboard</small>
                    </NavLink>
                </li> */}
            </ul>
        </div>
    )
}

export default withRouter(Sidebar)
