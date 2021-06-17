import React from 'react';
import './productDescription.css'

export default class ProductDescription extends React.Component {
    render(){
    return (
        <div className="productDescription-cont">
            <div className="productDescription">
                <div className="img-cont"></div>
                <div className="desc-cont"></div>
            </div>
        </div>
    )}
}
