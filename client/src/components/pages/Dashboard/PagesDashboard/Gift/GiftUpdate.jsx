import React from 'react'
import { useParams } from 'react-router-dom';
import FormGift from './FormGift';

export default function GiftUpdate() {

    const { id } = useParams();
    
  return (
    <div><FormGift date={id}/></div>
  )
}
