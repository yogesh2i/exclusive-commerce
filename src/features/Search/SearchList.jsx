import React from 'react'
import { useSelector } from 'react-redux'
import ProductList from '../ProductList/ProductList'
import { useParams } from 'react-router'

export default function SearchList() {
    const {keyword} = useParams();
    const data = useSelector((state)=>state.counter.searchItems)
    return (
        <div>
      {data && <ProductList rating={true} category={keyword} data={data} id={'911'}/>}
    </div>
  )
}
