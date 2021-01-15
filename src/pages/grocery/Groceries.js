import React from 'react'
import { withRouter } from 'react-router-dom'
import { COLOR } from '../../components/color/Color'
import Layout from '../../components/layout/Layout'
import { SiOneplus } from 'react-icons/si'
import { GROCERY, GROCERY_FETCH } from '../../config/api'
import { db } from '../../config/firebase'
import { HiDotsHorizontal } from 'react-icons/hi'
import Moment from 'react-moment'


const Groceries = (props) => {

    const [items,setItems] = React.useState([])
    const _isMounted = React.useRef(false)

    const getItems = () => {
        db
        .ref(GROCERY)
        .orderByChild('date')
        .on('value', (snapshot) => {
            const lists = []
            snapshot.forEach((snap) => {
                const id = snap.key
                const values = snap.val()
                lists.push({
                    id,
                    ...values
                })
            })

            const data = lists.reverse()

            if(!_isMounted.current) {
                setItems(data)
            }
        })
    }

    React.useEffect(() => {
        getItems()
        window.scrollTo(0,0)

        return () => { _isMounted.current = true }
    }, [])

    const tableList = items.length ? (
        <table className="table table-responsive">
            <thead>
                <tr>
                    <th className="ps-0 text-light border-dark">Date</th>
                    <th className="ps-0 text-light border-dark">Name</th>
                    <th className="ps-0 text-light border-dark">Price</th>
                    <th className="ps-0 text-light border-dark">%</th>
                    <th className="ps-0 text-light border-dark">% Price</th>
                    <th className="ps-0 text-light border-dark">Weight</th>
                    <th className="ps-0 text-light border-dark"></th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map((p) => (
                        <tr key={p.id}>
                            <td className="border-dark ps-0 text-light">
                                <small>
                                    <Moment fromNow>
                                        {p.date}
                                    </Moment>
                                </small>
                            </td>
                            <td className="border-dark ps-0 text-light">
                                <img 
                                    src={GROCERY_FETCH + p.image}
                                    alt=""
                                    width="70"
                                    className="border border-dark rounded"
                                /><br />
                                {p.title_mon} | {p.title_mm}
                            </td>
                            <td className="border-dark ps-0 text-light">
                                {p.originalPrice}
                            </td>
                            <td className="border-dark ps-0 text-light">
                                {p.discountOrPromotion && p.discountOrPromotion}
                            </td>
                            <td className="border-dark ps-0 text-light">
                                {p.discountPrice}
                            </td>
                            <td className="border-dark ps-0 text-light">
                                {p.weight} {p.unit.title_mm}
                            </td>
                            <td className="border-dark px-0 text-light text-end">
                                <button
                                    className="btn bg-transparent rounded-sm border-0 shadow-none p-0"
                                    onClick={() => props.history.push(`/edit-grocery/${p.id}`)}
                                >
                                    <HiDotsHorizontal size="2rem" color={COLOR.T} />
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    ) : (
        <div className="text-center mb-5">
            <p className="mb-4 text-light font-normal">
                No grocery found
            </p>
            <button 
                onClick={() => props.history.push('/add-grocery')}
                className="btn rounded-0 shadow-none border-0 p-0"
            >
                <SiOneplus size="3rem" color={COLOR.T} />
            </button>
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
                    Groceries
                </h4>
                <div 
                    className="p-4 rounded shadow"
                    style={{
                        background: COLOR.F
                    }}
                >
                    <div>
                        <button 
                            onClick={() => props.history.push('/add-grocery')}
                            className="btn rounded-0 shadow-none border-0 p-0"
                        >
                            <SiOneplus size="1.5rem" color={COLOR.T} />
                        </button>
                    </div>
                    <div className="mt-4">
                        {tableList}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Groceries)
