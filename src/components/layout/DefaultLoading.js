import React from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import { COLOR } from '../color/Color'

const DefaultLoading = () => {

    const cssName = {
        layout: {
            margin: '0 auto',
            width: '30px',
            display: 'block'
        }
    }

    return (
        <div
            className="position-fixed"
            style={{
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 999999,
                background: COLOR.F
            }}
        >
            <div className="d-table w-100 h-100 position-relative">
                <div className="d-table-cell align-middle">
                    <PuffLoader
                        css={cssName.layout}
                        color={COLOR.T}
                        size={30}
                    />
                </div>
            </div>
        </div>
    )
}

export default DefaultLoading
