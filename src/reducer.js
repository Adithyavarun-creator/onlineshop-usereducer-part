import CartItem from "./CartItem"


const reducer = (state,action) =>{
    if(action.type === 'CLEARCART'){
        return {
            ...state,
            cart:[]
        }
    }

    if(action.type === 'REMOVEITEM'){
        return{
            ...state,
            cart:state.cart.filter((item)=>item.id !== action.payload)
        }
    }


    if(action.type === 'INCREASEITEM'){
        let tempcart = state.cart.map((items)=>{
            if(items.id === action.payload){
                return {
                     ...items,
                    amount: items.amount + 1             
                  }
            }
            return items
        })
        return{
            ...state,
            cart:tempcart
        }
    }


    if(action.type === 'DECREASEITEM'){
        let tempcart = state.cart.map((items)=>{
            if(items.id === action.payload){
                return {
                     ...items,
                    amount: items.amount - 1             
                  }
            }
            return items
        }).filter((cartitem)=>cartitem.amount !== 0)
        return{
            ...state,
            cart:tempcart
        }
    }

    if(action.type === 'GETTOTALS'){
        let {total,amount} = state.cart.reduce((carttotal,cartitem)=>{
            console.log(carttotal) 
            console.log(cartitem)
            const {price,amount} = cartitem;
            //console.log(price,amount)
            const itemtotal = price * amount;
            carttotal.total  += itemtotal
            carttotal.amount += amount
            return carttotal
        },{
            total:0,
            amount:0
            
        })
        total = parseFloat(total.toFixed(2))

        return{
            ...state,
            total,
            amount
        }
    }


    if(action.type === 'LOADING'){
        return{
            ...state,
        loading:true
    }
    }

    if(action.type === 'DISPLAYITEMS'){
        return {
            ...state,
            loading:false,
            cart:action.payload
        }
    }

    return state
}

export d