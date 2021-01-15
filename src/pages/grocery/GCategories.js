import React from 'react'
import { SiOneplus } from 'react-icons/si'
import { withRouter } from 'react-router-dom'
import { COLOR } from '../../components/color/Color'
import Layout from '../../components/layout/Layout'
import { G_CATEGORY } from '../../config/api'
import { db } from '../../config/firebase'
import { HiDotsHorizontal } from 'react-icons/hi'

const GCategories = (props) => {

    const [items,setItems] = React.useState([])
    const _isMounted = React.useRef(false)

    const getItems = () => {
        db
        .ref(G_CATEGORY)
        .orderByChild('title')
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

            const data = lists 

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
            <tbody>
                {
                    items.map((p) => (
                        <tr key={p.id}>
                            <td className="border-dark px-0 text-light align-middle">{p.title_mon} | {p.title_mm}</td>
                            <td className="border-dark px-0 text-light text-end">
                                <button
                                    className="btn bg-transparent rounded-sm border-0 shadow-none p-0"
                                    onClick={() => props.history.push(`/g/edit-category/${p.id}`)}
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
                No category found
            </p>
            <button 
                onClick={() => props.history.push('/g/add-category')}
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
                    Categories
                </h4>
                <div 
                    className="p-4 rounded shadow"
                    style={{
                        background: COLOR.F
                    }}
                >
                    <div>
                        <button 
                            onClick={() => props.history.push('/g/add-category')}
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

export default withRouter(GCategories)
