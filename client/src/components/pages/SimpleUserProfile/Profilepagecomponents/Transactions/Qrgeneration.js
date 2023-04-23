
import { Box, Button, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import React, { useRef, useState } from "react";
import { AiFillCopy, AiOutlineDownload } from "react-icons/ai";
import QrReader from "react-qr-reader";

export default function Qrgeneration(props) {
    const [url2, seturl2] = useState("");

    const generate = () => {
      seturl2("dinnzahj")
      };
  return (
    <Box  display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={"2rem"} >

      <Typography pt="2rem" >Generate QrCode</Typography>

   
    <Button
        onClick={() => generate()}
      >
        <AiOutlineDownload />
        generate
      </Button>
  { url2 &&  <Box sx={{ border:"thick double #32a1ce;"}} >
      <QRCodeCanvas
        value={url2}
        size={300}
        bgColor={"#ffffff"}
        fgColor={"#32a1ce"}
        level={"H"}
        includeMargin={false}
        imageSettings={{
          src:  props.post.userId.profilePhoto,
          x: undefined,
          y: undefined,
          height: 40,
          width: 40,
          excavate: true,
        }}
      />
    </Box>}
    <Box>
    </Box>
  
  </Box>
  )
}
