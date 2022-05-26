import axios from "axios";
import { Buffer } from 'buffer';
import React, { useEffect, useState } from "react"
import CustomModal from "../common/CustomModal";
import Deal from "./Deal"
import DealsLayout from "./DealsLayout";
import CardFooter from "./CardFooter";
import { Typography } from "@mui/material";
import HomeLayout from "./HomeLayout";

function DealsList({ items }) {

    const [cardWidth, SetCardWidth] = useState("23%");
    const [layout, setLayout] = useState('multiple');
    const [modalShow, setModalShow] = useState(false);
    const [showModalEmail, setShowModalEmail] = useState(false);
    const [deal, setDeal] = useState({});
    const [tab, setTab] = useState(1);
    const [dealsList, setDealsList] = useState(items);


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

    const handleTabChange = (e, selectedTab) => {
        console.log(selectedTab)
        switch (selectedTab) {
            case 2:
                setDealsList(items.filter(item => item.Status === 'Expires Today'))
                break;
            case 3:
                setDealsList(items.filter(item => item.Status === 'Active'))
                break;
            default:
                setDealsList(items)
                break;
        }

        setTab(selectedTab)
    };

    const { color, Icon, convertDate } = CardFooter(deal)

    return (
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
                    <b style={{ textAlign: 'right', color: 'black', paddingLeft: '30%' }}>Posted on {convertDate(deal.PostedDate)}</b>
                </Typography>}
            >
                <div dangerouslySetInnerHTML={{ __html: deal?.Details }} ></div>
            </CustomModal>
            <CustomModal
                size="lg"
                show={showModalEmail}
                label='Send Email To Friend'
                onHide={() => setShowModalEmail(false)}

            >
                {<Typography variant="h3" fontSize='small' >
                    {deal.Title}
                </Typography>}
                {/* <div dangerouslySetInnerHTML={{ __html: deal?.Details }} ></div> */}
            </CustomModal>
        </>
    )
}

export default DealsList