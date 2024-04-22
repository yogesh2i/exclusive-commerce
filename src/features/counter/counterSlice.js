import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './counterAPI';

const initialState = {
  items : null,
  categories: null,
  topItems: null,
  productDetails: null,
  searchQuery: null,
  searchItems: null,
  cartItems: JSON.parse(localStorage.getItem('cart'))!==null?JSON.parse(localStorage.getItem('cart')).filter((e)=>e!==null):[],
  tcinList: JSON.parse(localStorage.getItem('cart'))!==null?JSON.parse(localStorage.getItem('cart')).map((e)=>{return (e!==null?e.tcin:13983742)}):[],
  wishlist: JSON.parse(localStorage.getItem('wishlist'))!==null?JSON.parse(localStorage.getItem('wishlist')).filter((e)=>e!==null):[],
  wishlistTcin: JSON.parse(localStorage.getItem('wishlist'))!==null?JSON.parse(localStorage.getItem('wishlist')).map((e)=>{return (e!==null?e.tcin:13983742)}):[],
  loggedIn: JSON.parse(localStorage.getItem('loggedIn')),
  status: 'idle',
};

export const fetchCategoriesAsync = createAsyncThunk(
  'counter/fetchData',
  async (args) => {
    const {type,category,count=6,tcin,keyword} = args;
    if(type==='products'){
      const responsep = await fetchData(`https://target1.p.rapidapi.com/products/v2/list?store_id=911&${category}&count=${count}&offset=0&default_purchasability_filter=true&sort_by=relevance`);
      const datap = await responsep.json();
      return {datap,type};
    }
    else if(type==='categories'){
      const response = await fetchData('https://target1.p.rapidapi.com/categories/v2/list');
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
    else if (type==='search-item'){
 
      const response = await fetchData(`https://target1.p.rapidapi.com/products/v2/list?store_id=911&category=All&keyword=${keyword}&count=20&offset=0&default_purchasability_filter=true&sort_by=relevance`);
      const data = await response.json();
      return{data,type};
    }
   
  }
);


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addLoggedIn: (state,action)=>{
          state.loggedIn = action.payload;
          localStorage.setItem('loggedIn',JSON.stringify(state.loggedIn))
    },
    removeLoggedIn: (state,action)=>{
          state.loggedIn = action.payload;
          localStorage.setItem('loggedIn',JSON.stringify(state.loggedIn))
    },
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
      let set = true;
      if(JSON.parse(localStorage.getItem('wishlist'))!==null){
        JSON.parse(localStorage.getItem('wishlist')).forEach(element => {
          if(element!==null){
            if(element.tcin===action.payload.tcin){
              set = false;
            }
          }
        });
      }
     if(set){
      state.wishlist = [...state.wishlist,action.payload];
      state.wishlistTcin = [...state.wishlistTcin,action.payload.tcin]
      state.wishlistTcin = state.wishlistTcin.filter((e)=>e!==null);
      localStorage.setItem('wishlist',JSON.stringify([...state.wishlist]));
     }
     
     
    },
    setQuery:(state,action)=>{
      state.searchQuery = action.payload;
     
    },
    removeWishlist:(state,action)=>{
        
        state.wishlist = state.wishlist.filter((i)=>i.tcin!==action.payload);
        localStorage.setItem('wishlist',JSON.stringify([...state.wishlist]));
        state.wishlistTcin = state.wishlist.map((i)=>i.tcin)
      


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
        else if(action.payload.type==='search-item')
            state.searchItems = action.payload.data;
            state.status = 'idle'
        
      })
     
  },
});

export const { removeFomCart, updatecart ,handleQtyCart,addWishList,removeWishlist,setQuery,addLoggedIn,removeLoggedIn} = counterSlice.actions;



// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default counterSlice.reducer;
