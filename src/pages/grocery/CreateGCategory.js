import React from 'react'
import Layout from '../../components/layout/Layout'
import { COLOR } from '../../components/color/Color'
import { withRouter } from 'react-router-dom'
import { IoArrowBackSharp, IoClose } from 'react-icons/io5'
import { GROCERY_CATEGORY_UPLOAD, G_CATEGORY } from '../../config/api'
import { db } from '../../config/firebase'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const CreateGCategory = (props) => {

    const [title_mon,setTitleMon] = React.useState('')
    const [title_mm,setTitleMM] = React.useState('')
    const [image,setImage] = React.useState('')
    const [previewFile,setPreviewFile] = React.useState(null)


    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const handleOnSubmit = e => {
        e.preventDefault()

        const uId = uuidv4() + '-' + image.name

        const dataItems = {
            title_mon,
            title_mm,
            image: uId
        }

        const uploadImg = new FormData()
        uploadImg.append('image', image, uId)

        axios
        .post(GROCERY_CATEGORY_UPLOAD, uploadImg)
        .then(() => {})

        db 
        .ref(G_CATEGORY)
        .push()
        .set(dataItems, () => {
            props.history.push('/g/categories')
        })
    }

    let filePreview
    if(previewFile) {
        filePreview = (
            <div className="position-relative">
                <button
                    className="btn bg-white p-0 rounded-circle border-0 shadow-none text-dark position-absolute"
                    onClick={() => {
                        setImage('')
                        setPreviewFile(null)
                    }}
                    style={{
                        left: '140px',
                        top: '-15px'
                    }}
                >
                    <IoClose size="1.5rem" />
                </button>
                <img 
                    src={previewFile}
                    alt=""
                    width="150"
                />
            </div>
        )
    }

    const formList = (
        <div>
            <div className="row mb-4">
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
                            value={title_mon}
                            onChange={e => setTitleMon(e.target.value)}
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
                            value={title_mm}
                            onChange={e => setTitleMM(e.target.value)}
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
            
            <div className="form-group mb-5">
                <label 
                    htmlFor="image"
                    className="form-label text-light font-normal"
                >
                    Image
                </label>
                {
                    previewFile === null ? (
                        <div className="d-flex align-items-center productFile">
                            <input
                                type="file"
                                name="image"
                                id="image"
                                value={image}
                                onChange={e => {
                                    setImage(e.target.files[0])
                                    setPreviewFile(URL.createObjectURL(e.target.files[0]))
                                }}
                                className="form-control p-0 m-0 border-0"
                                style={{
                                    color: COLOR.T,
                                    fontSize: '0.8rem'
                                }}
                                required
                            />
                            <label
                                className="mb-0 bg-dark font-weight-normal text-light btn-2 rounded border-0 shadow-none py-2 px-4"
                                htmlFor="image"
                                style={{
                                    fontSize: '0.7rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Choose
                            </label>
                            {/* <span className="text-white-50 ms-3" style={{fontSize:'0.8rem'}}>
                                <small>
                                    အရှည် - 1000px ၊ အမြင့် - 1000px
                                </small>
                            </span> */}
                        </div>
                    ) : filePreview
                }
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
                    Save
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
                        onClick={() => props.history.push('/g/categories')}
                        className="btn rounded-0 border-0 shadow-none p-0 me-3"
                    >
                        <IoArrowBackSharp size="1.5rem" color={COLOR.L} />
                    </button>
                    New Category
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

export default withRouter(CreateGCategory)
