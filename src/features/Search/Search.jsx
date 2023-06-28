import React, { useEffect, useRef, useState } from 'react';
import './search.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAsync } from '../counter/counterSlice';
import { useNavigate } from 'react-router';

function Search(props) {
  const {visibility} = props;
  const [searchList,setSearchList] = useState(null);
  const query = useSelector((state)=>state.counter.searchQuery);
  const ref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(()=>{
    const funcSearch = setTimeout(async ()=>{
      try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '0e10804dadmsha1f47556d9a38cfp1039b6jsn2ff5da63924b',
            'X-RapidAPI-Host': 'target1.p.rapidapi.com'
          }
        };
        let text = query.trim()
        if(text!==null||text!==''){

          let response = await fetch(`https://target1.p.rapidapi.com/auto-complete?q=${text}`,options);
          let data = await response.json();
          setSearchList(data.suggestions)
        }
         
        
      } catch(error){
        console.log(error)
      }

    },800);
    return ()=>clearTimeout(funcSearch);
  },[query]);

  function handleSearch(e){
    e.stopPropagation()
    dispatch(fetchCategoriesAsync({type:'search-item',keyword:`${e.target.innerText}`}));
    navigate(`/${e.target.innerText}`);
    visibility(false)

  }
  return (
    <div className='search-container'>
       {searchList && searchList.map((item,index)=>{
        return  <p key={index} ref={ref} value={item.label} style={{cursor:'pointer',textDecoration:'none',display:'block',color:'rgb(104, 104, 104'}} 
        onClick={(e)=>{handleSearch(e)}}
        >{item.label}</p>
       })}
    </div>
  )
}

export default Search
