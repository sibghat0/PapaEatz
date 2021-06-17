import React from "react";
import Card from "../card/card";
import "./meal-plan.css";
import biryani from './assets/biryani.jpg';
import chicken from './assets/chicken-tikka.jpg';
import chow from './assets/download.jpg';
import gulab from './assets/gulab jamun.jpg';
import idli from './assets/rashogulla.jpg';
import momos from './assets/momos.jpg';
import tandoori from './assets/tandoori.jpg';

import ProductDescription from "../productDescription/productDescription";

import Lottie from "lottie-react-web";
import loading from './assets/loading.json';

import firebase, {auth} from 'firebase';

export default class MealPlan extends React.Component{
    constructor(props){
        super(props);
        
        this.state={
            max: 0,
            price : 0,
            selected:0,
            loading : false,
            showGoToCart : false,
            package : [],
            items:[
                {
                    title:"Chicken Biryani",
                    images:[biryani],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                }, 
                {
                    title:"Chicken Tikka",
                    images:[chicken],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                
                }, 
                {
                    title:"Pizza",
                    images:[chow],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                
                }, 
                {
                    title:"Gulab Jamun",
                    images:[gulab],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                
                }, 
                {
                    title:"Tandoori",
                    images:[tandoori],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                
                }, 
                {
                    title:"Roshogulla",
                    images:[idli],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                
                }, 
                {
                    title:"Momos",
                    images:[momos],
                    price: '9.99',
                    quantity : 0,
                    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                
                }
            ]
        }
    }

    componentDidMount() {
        if (this.props.name === 'Small') {
            this.setState({
                max : 5
            })
        }
        if (this.props.name === 'Medium') {
            this.setState({
                max : 7
            })
        }
        if (this.props.name === 'Large') {
            this.setState({
                max : 9
            })
        }
    }

    handleSelectAdd = (e) => {

        if(this.state.max > this.state.selected)
        {
            var items = this.state.items;
            items.map((food) => {
                if (food.title === e) {
                    food.quantity += 1;
                }
            })
            this.setState({
                selected : this.state.selected + 1,
                items : items
            })
        }
    }

    handleSelectsub = (e) => {

        if(this.state.selected > 0)
        {
            var items = this.state.items;
            items.map((food) => {
                if (food.title === e) {
                    food.quantity -= 1;
                }
            })
            this.setState({
                selected : this.state.selected - 1,
                items : items
            })
        }
    }

    handleAddToCart = () => {
        if (this.props.name === 'Small') {
            this.setState({
                price : '50'
            })
        }
        if (this.props.name === 'Medium') {
            this.setState({
                price : '66'
            })
        }
        if (this.props.name === 'Large') {
            this.setState({
                price : '80'
            })
        }
        this.setState({
            loading: true
        })
        var x = [];
        this.state.items.map((food) => {
            if (food.quantity !== 0) {
                x.push(food);
            }
        })
        firebase.firestore().collection('users').where('email','==', auth().currentUser.email).get()
        .then((querySnapshot) => {
            var product = {};
            querySnapshot.forEach((docSnapshot) => {
                var newCart = docSnapshot.data().cart;
                product.type = "subscription";
                product.price = this.state.price;
                product.pack = this.props.name;
                product.items = x;
                newCart.push(product);
                firebase.firestore().collection('users').doc(docSnapshot.id).update({
                    cart : newCart
                })
                .then(() => {
                    var items = this.state.items;
                    items.map((food) => {
                        food.quantity = 0;
                    })
                    this.setState({
                        loading: false,
                        showGoToCart : true,
                        items : items
                    })
                })
            })
        })
    }

    render(){
        return(
            <div className="meal-plan">
                <div className="meal-plan-name">
                    <div className="top"><h2>{this.props.name} Tiffin {this.state.max} Meal plan - Weekly Subscription</h2>
                        <div className="cart2">
                            <p>{this.state.max - this.state.selected} selection remaining</p>
                            {
                                this.state.selected === this.state.max
                                ?
                                <>
                                    {
                                        this.state.showGoToCart
                                        ?
                                        <button className="buy" onClick = {() => window.location.href = "/checkout"}>Go to cart</button>
                                        :
                                        <>
                                            {
                                                this.state.loading
                                                ?
                                                <button className="buy">
                                                    <Lottie
                                                        options={{ animationData: loading }}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </button>
                                                :
                                                <button className="buy" onClick = {this.handleAddToCart}>Add to cart</button>
                                            }
                                        </>
                                    }
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
                    <p>You save 10% per week compared to a {this.props.name} non-subscription plan.</p>
                </div>
                <div className="items">
                {
                    this.state.items.map(item=>{
                        return(
                            <Card item={item} selected={this.state.selected} max={this.state.max} handleSelectAdd={(e)=>this.handleSelectAdd(e)}  handleSelectsub={(e)=>this.handleSelectsub(e)}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}