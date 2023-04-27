import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './counterAPI';

const initialState = {
  items : null,
  categories: null,
  topItems: null,
  productDetails: null,
  cartItems: JSON.parse(localStorage.getItem('cart'))!==null?JSON.parse(localStorage.getItem('cart')).filter((e)=>e!==null):[],
  tcinList: JSON.parse(localStorage.getItem('cart'))!==[null]?JSON.parse(localStorage.getItem('cart')).map((e)=>{return (e!==null?e.tcin:13983742)}):[],
  wishlist: [],
  wishlistTcin: [],
  status: 'idle',
};

export const fetchCategoriesAsync = createAsyncThunk(
  'counter/fetchData',
  async (args) => {
    const {type,category,count=6,tcin} = args;
    if(type==='products'){
      const responsep = await fetchData(`https://target1.p.rapidapi.com/products/v2/list?store_id=911&${category}&count=${count}&offset=0&default_purchasability_filter=true&sort_by=relevance`);
      const datap = await responsep.json();
      return {datap,type};
    }
    else if(type==='categories'){
      const response = await fetchData('https://target1.p.rapidapi.com/categories/list');
      const data = await response.json();
      return {data,type};
    }
    else if(type==='top'){
      const responsep = await fetchData(`https://target1.p.rapidapi.com/products/v2/list?store_id=911&${category}&count=${count}&offset=0&default_purchasability_filter=true&sort_by=relevance`);
      const datap = await responsep.json();
      return {datap,type};
    }
    else if(type==='product-details'){
      const response = await fetchData(`https://target1.p.rapidapi.com/products/v3/get-details?tcin=${tcin}&store_id=911`);
      const data = await response.json();
      return{data,type};

    }
  }
);


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
    removeFomCart: (state,action) => {
      state.cartItems = state.cartItems.filter((i)=>i.tcin!==action.payload);
      localStorage.setItem('cart',JSON.stringify([...state.cartItems]));
      state.tcinList = state.cartItems.map((i)=>i.tcin)
    },
    handleQtyCart: (state,action) => {
      state.cartItems = state.cartItems.map((i)=>{
        if(i.tcin===action.payload.tcin){
          return {...i,qty:action.payload.qty}
        }
        else{
          return i;
        }
      });
      localStorage.setItem('cart',JSON.stringify([...state.cartItems]));
      console.log(state.cartItems)
      
    },
    updatecart: (state, action) => {
      let set = true;
      if(JSON.parse(localStorage.getItem('cart'))!==null){
        JSON.parse(localStorage.getItem('cart')).forEach(element => {
          if(element!==null){

            if(element.tcin===action.payload.tcin){
              set = false;
            }
          }
        });
      }
     if(set){
      state.cartItems = [...state.cartItems,action.payload];
      localStorage.setItem('cart',JSON.stringify([...state.cartItems]));
      state.tcinList = [...state.tcinList,action.payload.tcin]
      state.tcinList = state.tcinList.filter((e)=>e!==null);
    
     }
    },
    addWishList:(state,action)=>{
      state.wishlist = [...state.wishlist,action.payload];
      state.wishlistTcin = [...state.wishlistTcin,action.payload.tcin];
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        if(action.payload.type==='categories'){
          state.categories = action.payload.data;
          state.status = 'idle'
        
        }
        else if(action.payload.type==='products'){
          state.items = action.payload.datap;
          state.status = 'idle'
          
        }
        else if(action.payload.type==='top'){
          state.topItems = action.payload.datap;
          state.status = 'idle'
          
        }
        else if(action.payload.type==='product-details'){
          state.productDetails = action.payload.data.data;
          state.status = 'idle'
        
          
        }
        
      })
     
  },
});

export const { removeFomCart, updatecart ,handleQtyCart,addWishList} = counterSlice.actions;



// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default counterSlice.reducer;
