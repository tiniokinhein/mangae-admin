import React from 'react'
import Layout from '../../components/layout/Layout'
import { COLOR } from '../../components/color/Color'
import { withRouter } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import { G_WEIGHT } from '../../config/api'
import { db } from '../../config/firebase'

const EditGWeight = (props) => {
    
    const [state,setState] = React.useState({
        title_mon: '',
        title_mm: ''
    })
    const _isMounted = React.useRef(false)

    const { id } = props.match.params

    const getItem = React.useCallback(() => {
        db 
        .ref(G_WEIGHT + '/' + id)
        .on('value', (snap) => {
            const values = snap.val()
            
            if(!_isMounted.current) {
                setState({
                    title_mon: values ? values.title_mon : '',
                    title_mm: values ? values.title_mm: ''
                })
            }
        })
    }, [id])

    React.useEffect(() => {
        getItem()
        window.scrollTo(0,0)

        return () => { _isMounted.current = true }
    }, [getItem])

    const handleOnChange = e => {
        setState((values) => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = e => {
        e.preventDefault()

        const dataItems = {
            title_mon: state.title_mon,
            title_mm: state.title_mm
        }

        db 
        .ref(G_WEIGHT + '/' + id)
        .update(dataItems, () => {
            props.history.push('/g/weight')
        })
    }

    const handleOnDelete = e => {
        e.preventDefault()

        db 
        .ref(G_WEIGHT + '/' + id)
        .remove(() => {
            props.history.push('/g/weight')
        })
    }

    const formList = (
        <div>
            <div className="row mb-5">
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <div className="form-group">
                        <label 
                            htmlFor="title_mon"
                            className="form-label text-light font-normal"
                        >
                            Title (Mon)
                        </label>
                        <input 
                            type="text"
                            name="title_mon"
                            id="title_mon"
                            value={state.title_mon}
                            onChange={handleOnChange}
                            className="form-control bg-transparent rounded shadow-none px-3 font-mon"
                            style={{
                                color: COLOR.T,
                                borderColor: COLOR.T,
                                height: '50px'
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="form-group">
                        <label 
                            htmlFor="title_mm"
                            className="form-label text-light font-normal"
                        >
                            Title (Myanmar)
                        </label>
                        <input 
                            type="text"
                            name="title_mm"
                            id="title_mm"
                            value={state.title_mm}
                            onChange={handleOnChange}
                            className="form-control bg-transparent rounded shadow-none px-3 font-mm"
                            style={{
                                color: COLOR.T,
                                borderColor: COLOR.T,
                                height: '50px'
                            }}
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="form-group">
                <button
                    type="submit" 
                    className="btn rounded shadow-none px-5 py-2 text-light"
                    style={{
                        background: COLOR.T
                    }}
                    onClick={handleOnSubmit}
                >
                    Update
                </button>
                <button 
                    className="btn bg-dark rounded shadow-none px-5 py-2 text-light ms-3"
                    onClick={handleOnDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    )

    return (
        <Layout>
            <div className="py-5">
                <h4
                    className="mb-4 font-normal text-light"
                    style={{
                        fontSize: '1.2rem'
                    }}
                >
                    <button 
                        onClick={() => props.history.push('/g/weight')}
                        className="btn rounded-0 border-0 shadow-none p-0 me-3"
                    >
                        <IoArrowBackSharp size="1.5rem" color={COLOR.L} />
                    </button>
                    Edit Weight
                </h4>
                <div 
                    className="p-4 rounded shadow"
                    style={{
                        background: COLOR.F
                    }}
                >
                    {formList}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(EditGWeight)
