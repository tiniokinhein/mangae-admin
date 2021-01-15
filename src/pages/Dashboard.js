import React from 'react'
import Layout from '../components/layout/Layout'

const Dashboard = () => {
    return (
        <Layout>
            <div className="py-5">
                <h4
                    className="mb-4 font-normal text-light"
                    style={{
                        fontSize: '1.2rem'
                    }}
                >
                    Dashboard 
                </h4>
            </div>
        </Layout>
    )
}

export default Dashboard
