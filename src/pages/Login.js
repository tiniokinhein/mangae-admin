import React from 'react'
import { SIGNIN } from '../config/auth'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { COLOR } from '../components/color/Color'
import LOGO from '../assets/images/logo.png'

const Login = () => {

    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [error,setError] = React.useState(null)
    const [loading,setLoading] = React.useState(false)
    const _isMounted = React.useRef(false)

    const loginSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)
        setError('')

        try {
            await SIGNIN(email,password)
            if(!_isMounted.current) {
                setLoading(false)
            }
        } catch (err) {
            if(!_isMounted.current) {
                setLoading(false)
                setError(JSON.parse(err.message))
            }
        }
        
    }

    React.useEffect(() => {
        return () => { _isMounted.current = true }
    }, [])

    const cssName = {
        loading: {
          margin: '0 auto',
          display: 'block',
          width: '100px'
        }
    }

    return loading ? (
        <div
            className="position-fixed"
            style={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                background: 'rgba(0,0,0,0.41)'
            }}
        >
            <div className="d-table w-100 h-100">
                <div className="d-table-cell align-middle">
                    <PropagateLoader 
                        css={cssName.loading}
                        width={100}
                        height={5}
                        color={COLOR.T}
                    />
                </div>
            </div>
        </div>
    ) : (
        <div 
            className="d-table w-100 h-100 px-3"
            style={{
                background: COLOR.F
            }}
        >
            <div 
                className="d-table-cell align-middle" 
                style={{
                    height:'100vh',
                    minHeight:'600px'
                }}
            >
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mx-auto py-5">
                    <form autoComplete="off" onSubmit={loginSubmit}>
                        <div className="mb-4 text-center">
                            <img 
                                src={LOGO}
                                alt=""
                                width="200"
                            />
                            <p 
                                className="mb-0 text-secondary font-normal"
                                style={{
                                    fontSize: '1.2rem'
                                }}
                            >Admin Login</p>
                        </div>

                        <div className="field-group mb-3">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="form-control px-4 bg-transparent rounded shadow-none font-normal"
                                style={{
                                    height: '50px',
                                    lineHeight: '1.5',
                                    color: COLOR.T,
                                    border: `1px solid ${COLOR.T}`
                                }}
                                required
                            />
                        </div>
                        <div className="field-group mb-4">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="form-control px-4 bg-transparent rounded shadow-none font-normal"
                                style={{
                                    height: '50px',
                                    lineHeight: '1.5',
                                    color: COLOR.T,
                                    border: `1px solid ${COLOR.T}`
                                }}
                                required
                            />
                        </div>
                        <div className="field-group">
                            {
                                error &&
                                error.error &&
                                error.error.errors &&
                                error.error.errors[0].reason &&
                                error.error.errors[0].reason === "invalid" ? 
                                <p style={{color: COLOR.L}}>Email and Password are not match!</p> : null
                            }
                            <button
                                className="btn border-0 rounded shadow-none w-100 px-4 font-normal"
                                style={{
                                    height: '50px',
                                    background: COLOR.T,
                                    color: '#fff'
                                }}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
