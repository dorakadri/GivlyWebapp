import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import GiftCard from '../../componentsDashboard/GiftCard'
import PagesHeaders from '../../componentsDashboard/PagesHeaders'
const gifts = [
    {
        id:1,
      name: "Bluetooth Speaker",
      photo: "https://picsum.photos/id/1010/200",
      companyName: "Acme Corporation",
      type: "Electronics",
      gifttype: "low"
    },
    {
        id:2,
      name: "Leather Wallet",
      photo: "https://picsum.photos/id/1011/200",
      companyName: "Globex Industries",
      type: "Accessories",
      gifttype: "valuable"
    },
    {
        id:3,
      name: "Gourmet Chocolate ",
      photo: "https://picsum.photos/id/1012/200",
      companyName: "Foodie Frenzy",
      type: "Food & Drink"
      ,
      gifttype: "normal"
    },
    {
        id:4,
      name: "Wireless Headphones",
      photo: "https://picsum.photos/id/1013/200",
      companyName: "TechnoTech",
      type: "Electronics"
      ,
      gifttype: "normal"
    },
    {
        id:5,
      name: "Customized Journal",
      photo: "https://picsum.photos/id/1014/200",
      companyName: "Creative Co.",
      type: "Stationery"
      ,
      gifttype: "valuable"
    },
    {
        id:6,
      name: "Artisanal Soap Set",
      photo: "https://picsum.photos/id/1015/200",
      companyName: "Bath & Body Boutique",
      type: "Beauty & Personal Care"
      ,
      gifttype: "low"
    },
    {
        id:7,
      name: "Portable Power Bank",
      photo: "https://picsum.photos/id/1016/200",
      companyName: "PowerUp Solutions",
      type: "Electronics"
      ,
      gifttype: "low"
    },
    {
        id:8,
      name: "Succulent Planter",
      photo: "https://picsum.photos/id/1018/200",
      companyName: "Green Thumb Inc.",
      type: "Home & Garden"
      ,
      gifttype: "normal"
    },
    {
        id:9,
      name: "Cocktail Making Kit",
      photo: "https://picsum.photos/id/1019/200",
      companyName: "Mixology Master",
      type: "Food & Drink"
      ,
      gifttype: "normal"
    },
    {
        id:10,
      name: "Luxury Candle Set",
      photo: "https://picsum.photos/id/1020/200",
      companyName: "Scented Serenity",
      type: "Home & Garden"
      ,
      gifttype: "normal"
    }
  ];
export default function GiftList() {
  return (
<Box style={{padding: '20px' ,margin: '20px', boxSizing: 'border-box'}}>
  <PagesHeaders title="GIFT LIST" subtitle="Review and Manage gifts " />
  <Grid container spacing={2}>
      {gifts.map((gift) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={gift.id}>
          <GiftCard gift={gift} />
        </Grid>
      ))}
    </Grid>
</Box>
  )
}
