
import { Checkbox, FormControlLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'

const DealHeader = ({ isCheckedAll, onCheckAll, children }) => {

    const header = [
        { col: 1, name: 'Posted' }, { col: 1, name: 'Status' }, { col: 1, name: 'Expires' }, { col: 2, name: 'Category' }, { col: 2, name: 'Title' }, { col: 4, name: 'Details' }]

    return (
        <div className='row flex align-items-center '>
            <div className='col-1' style={{ border: '0px solid black' }}>
                <FormControlLabel label={<span style={{ fontSize: 13 }}>Check All</span>} control={<Checkbox size='small' checked={isCheckedAll} onChange={onCheckAll} />} />
            </div>
            {
                header.map(item =>
                    <div key={item.name} className={`col-${item.col} `} style={{ border: '0px solid black'}}>{item.name}</div>
                    
                )
            }
            {children}

        </div>
    )
}

export default DealHeader
