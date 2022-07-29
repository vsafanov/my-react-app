import axios from "axios";
import { Buffer } from 'buffer';
import React, { useEffect, useState } from "react"
import CustomModal from "../common/CustomModal";
import Deal from "./Deal"
import DealsLayout from "./DealsLayout";
import CardFooter from "./CardFooter";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import HomeLayout from "./HomeLayout";
import {ClientApi} from "../../ClientApi";
import configData from "../../config.json";

function DealsList({ items }) {

    const [cardWidth, SetCardWidth] = useState("23%");
    const [layout, setLayout] = useState('multiple');
    const [modalShow, setModalShow] = useState(false);
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [deal, setDeal] = useState({});
    const [tab, setTab] = useState(1);
    const [dealsList, setDealsList] = useState(items);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    const UpdateCardWidth = (e, val) => {
        setLayout(val)
        let width = "23%"
        switch (val) {
            case 'single':
                width = "98%"
                break;
            case 'double':
                width = "49%"
                break;
            default:
                break;
        }
        SetCardWidth(width)
    }

    const showDetails = (deal) => {

        // console.log(deal)
        setDeal(deal)
        setModalShow(true)
    }

    const showEmail = (deal) => {
        // console.log(deal)
        setDeal(deal)
        setShowModalEmail(true)
    }


    const handleTabChange = async (e, selectedTab) => {
        console.log(selectedTab)
        setLoading(true)
        let url = `${configData.SERVER_URL}/dealsbystatus?numberOfDeals=120`

        switch (selectedTab) {
            case 2:
                url = url + '&status=8'
                break;
            case 3:
                url = url + '&status=2'
                break;
            default:
                setLoading(false)
                return
            // break;
        }
        const [{ result, error }] = await ClientApi(url)
        setError(error)
        setDealsList(result)

        // fetch(url)
        // .then(data => {
        //   return data.json();
        // })
        // .then(data => {
        //     setDealsList(data);
        //   setLoading(false)
        //   console.log('useEffect:', setDealsList)
        // })

        setTab(selectedTab)
        setLoading(false)
    };

    const { color, Icon, convertDate } = CardFooter(deal)

    return (
        <>
            {
                error && <h5 style={{color:'red'}}>Error Occured: {error}</h5>
            }

            {
                loading && (
                    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>)
            }

            {
                !loading && !error &&
                <>
                    <DealsLayout onChange={UpdateCardWidth} layout={layout} handleChange={handleTabChange} selecteTab={tab} />
                    <div className="row justify-content-md-center" style={{ '--bs-gutter-x': '0px' }} >
                        {
                            dealsList.map((item, id) => (
                                <Deal key={id} deal={item} cardWidth={cardWidth} showDetails={showDetails} showEmail={showEmail} />
                            ))}
                    </div>

                    <CustomModal
                        size="lg"
                        show={modalShow}
                        label='Details'
                        onHide={() => setModalShow(false)}
                        footercomponent={<Typography color={color} fontSize='small' >
                            {Icon}
                            <b style={{ textAlign: 'right', color: 'black', paddingLeft: '30%' }}>Posted on {convertDate(deal.postedDate)}</b>
                        </Typography>}
                    >
                        <div dangerouslySetInnerHTML={{ __html: deal?.details }} ></div>
                    </CustomModal>
                    <CustomModal
                        size="lg"
                        show={showModalEmail}
                        label='Send Email To Friend'
                        onHide={() => setShowModalEmail(false)}

                    >
                        {<Typography variant="h3" fontSize='small' >
                            {deal.title}
                        </Typography>}
                        {/* <div dangerouslySetInnerHTML={{ __html: deal?.Details }} ></div> */}
                    </CustomModal>
                </>}
        </>
    )
}

export default DealsList