import React from 'react'
import { COLOR } from '../color/Color'
import { RiLogoutBoxRLine, RiMenu2Line } from 'react-icons/ri'
import { withRouter } from 'react-router-dom'
import { FaRegBell } from 'react-icons/fa'
import { SIGNOUT } from '../../config/auth'


const TopBar = (props) => {

    const { state } = props.location

    const openSidebar = () => {
        document.getElementById('sidebar').classList.add('sidebarOpen')
        document.getElementById('layout').classList.add('layoutOpen')
        props.history.push({
            state: true
        })
    }

    const closeSidebar = () => {
        document.getElementById('sidebar').classList.remove('sidebarOpen')
        document.getElementById('layout').classList.remove('layoutOpen')
        props.history.push({
            state: false
        })
    }

    const handleSignOut = () => {
        setTimeout(async () => {
            await SIGNOUT()
        }, 500)
    }

    return (
        <div
            className="shadow py-3 sticky-top"
            style={{
                background: COLOR.F
            }}
        >
            <div className="container-fluid">
                <div className="d-flex">
                    <button 
                        className="btn rounded-0 border-0 shadow-none p-0"
                        onClick={!state ? openSidebar : closeSidebar}
                    >
                        <RiMenu2Line size="1.5rem" color="#fff" />
                    </button>
                    <button 
                        className="btn rounded-0 border-0 shadow-none p-0 text-light font-bold ms-3 ms-md-4"
                        onClick={() => props.history.push('/dashboard')}
                        style={{
                            fontSize: '1.2rem'
                        }}
                    >
                        Ma-Ngae Admin
                    </button>
                    <div 
                        className="ms-auto"
                    >
                        <button 
                            className="btn p-0 rounded-0 border-0 bg-transparent shadow-none text-light"
                        >
                            <FaRegBell size="1.5rem" />
                        </button>
                        <button 
                            className="btn p-0 rounded-0 border-0 bg-transparent shadow-none ms-4 text-light"
                            onClick={handleSignOut}
                        >
                            <RiLogoutBoxRLine size="1.5rem" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(TopBar)
