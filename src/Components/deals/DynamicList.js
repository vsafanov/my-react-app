
import React from "react"


const DynamicList = ({
    items,
    resourceName,
    itemComponent: ItemComponent }) => {


    return (
        <div className="row justify-content-md-center" style={{'--bs-gutter-x':'0px'}} >
            {
                items.map((item, id) => (
                    <ItemComponent key={id} {...{ [resourceName]: item }} />
                ))}
        </div>
    )
}

export default DynamicList