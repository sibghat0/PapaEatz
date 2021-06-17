import React from 'react';
import './Extra-Item.css';
import firebase from 'firebase';

export default class ExtraItem extends React.Component{
    
    constructor(props){
		super(props)
		this.state={
            max: 0,
			overlay:false,
			loading : true,
			extra: [],
            selectedItems : [],
            dayCounter: 0
		}
	}

    componentDidMount() {
		firebase.firestore().collection('extra')
		.onSnapshot(snap => {
			snap.docChanges().forEach((change) => {
				var item = change.doc.data();
				this.setState({
                    extra : [...this.state.extra, item]
				})
			})
			console.log(this.state.extra);
		})
	}
     

	handleOverlay=(e)=>{
		this.props.handleOverlay2(e);
		if(this.state.selectedItems.includes(e)){
			var select = [];
			select = this.state.selectedItems.filter(item => 
				item !== e
			)
			this.setState({
				selectedItems: select
			})
		}else{
			this.setState({
				selectedItems: [...this.state.selectedItems,e]
			})
		}
		
    }
    
    render(){
        return(
            <div className='form-additional-item'>
					<div className="weekly-cart-demo" >
						<p>Extra Item </p></div>
						<div className='additional-items'>
							{
								this.state.extra.map((item,index) => (
									<div className="cart-conas">
										<div className="cart-overlay" onClick={()=>this.handleOverlay(item.title)}>
											{
                                                this.state.selectedItems.includes(item.title)
                                                ?
                                                <div className="selected image">
                                                    <img src={item.image}/>
                                                </div>
                                                :
                                                <div className="image">
                                                    <img src={item.image}/>
                                                </div>
                                            }
											<p>{item.title}</p>
										</div>
									</div>
								))
							}
						</div>
					</div>
        )
    }

}