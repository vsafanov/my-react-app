import TableRowsIcon from '@mui/icons-material/TableRows';
import GridViewIcon from '@mui/icons-material/GridView';
import GridOnIcon from '@mui/icons-material/GridOn';
import { Tab, Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from 'react';


const DealsLayout = ({ layout, onChange, selecteTab, handleChange }) => {

    // const [value, setValue] = useState(1);

    // const handleChange = (e,newValue) => {
    //     console.log(newValue)
    //   setValue(newValue);
    // };

    return (
        <>
            <div className="row justify-content-md-center" style={{ marginLeft:'60px', width:'94%',  alignItems: 'center'}}>
                <div style={{ textAlign: 'left' }} className='col-4'>
                    <Tabs value={selecteTab || 1} onChange={handleChange} >
                        <Tab value={1} label="Latest Deals" style={{textTransform: 'none', fontWeight:600}}/>
                        <Tab value={2} label="Expires Today" style={{textTransform: 'none', fontWeight:600}}/>
                        <Tab value={3} label="Promo Deals" style={{textTransform: 'none', fontWeight:600}}/>
                    </Tabs>
                </div>
                <div style={{ textAlign: 'center',verticalAlign:'' }} className='col-5'>
                    <strong>Save money with our latest deals, exclusive discounts and promo codes posted every day</strong>
                </div>

                <div style={{ textAlign: 'right' }} className='col-3'>
                    <ToggleButtonGroup
                        // variant="outlined" 

                        value={layout}
                        exclusive
                        onChange={onChange}
                        // onClick ={onClick}
                        aria-label="text alignment"
                    >
                        <ToggleButton value='single' title="List View" className='toggleButtonGroup' >
                            <TableRowsIcon size="medium" color='primary' />
                        </ToggleButton >
                        <ToggleButton value='double' title="Two column View" className='toggleButtonGroup' >
                            <GridViewIcon size="medium" color='primary' />
                        </ToggleButton >
                        <ToggleButton value='multiple' title="Grid View" className='toggleButtonGroup' >
                            <GridOnIcon size="medium" color='primary' />
                        </ToggleButton >
                    </ToggleButtonGroup>
                </div>
            </div>
        </>
    )
}

export default DealsLayout 