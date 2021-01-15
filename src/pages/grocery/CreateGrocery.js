import React from 'react'
import Layout from '../../components/layout/Layout'
import { COLOR } from '../../components/color/Color'
import { withRouter } from 'react-router-dom'
import { IoArrowBackSharp, IoClose } from 'react-icons/io5'
import { db } from '../../config/firebase'
import { GROCERY, GROCERY_UPLOAD, G_CATEGORY, G_WEIGHT } from '../../config/api'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const CreateGrocery = (props) => {

    const [title_mon,setTitleMon] = React.useState('')
    const [title_mm,setTitleMM] = React.useState('')
    const [image,setImage] = React.useState('')
    const [description_mon,setDescriptionMon] = React.useState('')
    const [description_mm,setDescriptionMM] = React.useState('')
    const [originalPrice,setOriginalPrice] = React.useState('')
    const [discountOrPromotion,setDiscountOrPromotion] = React.useState('')
    const [weight,setWeight] = React.useState('')
    const [unit,setUnit] = React.useState({})
    const [categories,setCategories] = React.useState([])
    const [categoryItems,setCategoryItems] = React.useState([])
    const [weightItems,setWeightItems] = React.useState([])
    const [previewFile,setPreviewFile] = React.useState(null)
    const _isMounted = React.useRef(false)

    const getCategoryAndUnit = () => {
        db 
        .ref(G_CATEGORY)
        .orderByChild('title')
        .on('value', (snapshot) => {
            const data = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const values = snap.val()
                data.push({
                    id,
                    ...values
                })
            })
            
            const lists = data.reverse()
            
            if(!_isMounted.current) {
                setCategoryItems(lists)
            }
        })

        db 
        .ref(G_WEIGHT)
        .orderByChild('title')
        .on('value', (snapshot) => {
            const data = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const values = snap.val()
                data.push({
                    id,
                    ...values
                })
            })
            
            const lists = data.reverse()
            
            if(!_isMounted.current) {
                setWeightItems(lists)
            }
        })
    }
    
    React.useEffect(() => {
        getCategoryAndUnit()
        window.scrollTo(0,0)

        return () => { _isMounted.current = true }
    }, [])
    
    const createOnSubmit = e => {
        e.preventDefault()

        const listCategories = JSON.parse("[" + categories + "]")
        const listWeight = JSON.parse(unit)

        const calculatePrice = originalPrice / 100 * discountOrPromotion
        const outstandingPrice = discountOrPromotion ? (originalPrice - calculatePrice) : originalPrice
        const discountPrice = discountOrPromotion ? calculatePrice : originalPrice

        const uId = uuidv4() + '-' + image.name

        const createData = {
            date: Date(new Date()),
            title_mon,
            title_mm,
            image: uId,
            description_mon,
            description_mm,
            originalPrice: originalPrice,
            price: outstandingPrice,
            discountPrice: discountPrice,
            discountOrPromotion: discountOrPromotion ? discountOrPromotion : null,
            weight,
            unit: listWeight,
            categories: listCategories
        }

        const uploadImage = new FormData()
        uploadImage.append('image', image, uId)

        axios
        .post(GROCERY_UPLOAD, uploadImage)
        .then(() => {})

        db 
        .ref(GROCERY)
        .push()
        .set(createData, () => {
            setTitleMon('')
            setTitleMM('')
            setImage('')
            setDescriptionMon('')
            setDescriptionMM('')
            setOriginalPrice('')
            setDiscountOrPromotion('')
            setWeight('')
            setUnit({})
            setCategories([])
            setPreviewFile(null)
            props.history.push('/groceries')
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
        <div className="row">
            <div className="col-12 col-md-6 mb-4">
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
            <div className="col-12 col-md-6 mb-4">
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
            <div className="col-12 col-md-6 mb-4">
                <div className="form-group">
                    <label 
                        htmlFor="originalPrice"
                        className="form-label text-light font-normal"
                    >
                        Price
                    </label>
                    <input 
                        type="number"
                        name="originalPrice"
                        id="originalPrice"
                        value={originalPrice}
                        onChange={e => setOriginalPrice(e.target.value)}
                        className="form-control bg-transparent rounded shadow-none px-3"
                        style={{
                            color: COLOR.T,
                            borderColor: COLOR.T,
                            height: '50px'
                        }}
                        required
                    />
                </div>
            </div>
            <div className="col-12 col-md-6 mb-4">
                <div className="form-group">
                    <label 
                        htmlFor="discountOrPromotion"
                        className="form-label text-light font-normal"
                    >
                        Discount / Promotion (1% - 99%)
                    </label>
                    <input 
                        type="number"
                        max="99"
                        name="discountOrPromotion"
                        id="discountOrPromotion"
                        value={discountOrPromotion}
                        onChange={e => setDiscountOrPromotion(e.target.value)}
                        className="form-control bg-transparent rounded shadow-none px-3"
                        style={{
                            color: COLOR.T,
                            borderColor: COLOR.T,
                            height: '50px'
                        }}
                    />
                </div>
            </div>
            <div className="col-12 col-md-6 mb-4">
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label 
                                htmlFor="weight"
                                className="form-label text-light font-normal"
                            >
                                Weight
                            </label>
                            <input 
                                type="number"
                                name="weight"
                                id="weight"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                className="form-control bg-transparent rounded shadow-none px-3"
                                style={{
                                    color: COLOR.T,
                                    borderColor: COLOR.T,
                                    height: '50px'
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label 
                                htmlFor="unit"
                                className="form-label text-light font-normal"
                            >
                                Unit
                            </label>
                            <select
                                name="unit"
                                id="unit"
                                value={unit}
                                onChange={e => setUnit(e.target.value)}
                                className="form-select bg-transparent rounded shadow-none px-3"
                                style={{
                                    color: COLOR.T,
                                    borderColor: COLOR.T,
                                    height: '50px'
                                }}
                                required
                            >
                                <option value="">Choose</option>
                                {
                                    weightItems.map((w) => (
                                        <option key={w.id} value={JSON.stringify(w)}>{w.title_mon}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-6 mb-4">
                <div className="form-group">
                    <label 
                        htmlFor="categories"
                        className="form-label text-light font-normal"
                    >
                        Categories
                    </label>
                    <select
                        name="categories"
                        id="categories"
                        value={categories}
                        onChange={e => setCategories(
                            Array.from(e.target.selectedOptions, (item) => item.value)
                        )}
                        className="form-select multiple-selected bg-transparent rounded shadow-none px-3"
                        style={{
                            color: COLOR.T,
                            borderColor: COLOR.T,
                            height: '50px'
                        }}
                        required
                        multiple
                    >
                        {
                            categoryItems.map((w) => (
                                <option key={w.id} value={JSON.stringify(w)}>{w.title_mon}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="col-12 mb-4">
                <div className="form-group">
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
            </div>
            <div className="col-12 col-md-6 mb-5">
                <div className="form-group">
                    <label 
                        htmlFor="description_mon"
                        className="form-label text-light font-normal"
                    >
                        Description (Mon)
                    </label>
                    <textarea 
                        rows="10"
                        name="description_mon"
                        id="description_mon"
                        value={description_mon}
                        onChange={e => setDescriptionMon(e.target.value)}
                        className="form-control bg-transparent rounded shadow-none px-3 font-mon"
                        style={{
                            color: COLOR.T,
                            borderColor: COLOR.T
                        }}
                    />
                </div>
            </div>
            <div className="col-12 col-md-6 mb-5">
                <div className="form-group">
                    <label 
                        htmlFor="description_mm"
                        className="form-label text-light font-normal"
                    >
                        Description (Myanmar)
                    </label>
                    <textarea 
                        rows="10"
                        name="description_mm"
                        id="description_mm"
                        value={description_mm}
                        onChange={e => setDescriptionMM(e.target.value)}
                        className="form-control bg-transparent rounded shadow-none px-3 font-mm"
                        style={{
                            color: COLOR.T,
                            borderColor: COLOR.T
                        }}
                    />
                </div>
            </div>
            <div className="col-12">
                <div className="form-group">
                    <button 
                        type="submit"
                        className="btn rounded shadow-none px-5 py-2 text-light"
                        style={{
                            background: COLOR.T
                        }}
                        onClick={createOnSubmit}
                    >
                        Save
                    </button>
                </div>
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
                        onClick={() => props.history.push('/groceries')}
                        className="btn rounded-0 border-0 shadow-none p-0 me-3"
                    >
                        <IoArrowBackSharp size="1.5rem" color={COLOR.L} />
                    </button>
                    New Grocery
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

export default withRouter(CreateGrocery)
