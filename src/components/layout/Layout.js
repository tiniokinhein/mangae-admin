import React from 'react'
import { COLOR } from '../color/Color'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const Layout = (props) => {
    return (
        <>
            <TopBar />

            <Sidebar />

            <div
                id="layout"
                className="layout"
                style={{
                    background: COLOR.S,
                    minHeight: '100vh'
                }}
            >
                <div className="container-fluid px-4">
                    {props.children}
                </div>
            </div>
            
        </>
    )
}

export default Layout
