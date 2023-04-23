import { Button, Card, CardContent, Container, Divider, Grid } from "@mui/material";

import React, { useRef, useState } from "react";

import QrReader from "react-qr-reader";


export default function Scanqrcode() {

  const [scanResultWebCam, setScanResultWebCam] =  useState('');

  const [scanResultFile, setScanResultFile] = useState('');
  const qrRef = useRef(null);
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }

  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }

  return (
    <Container  sx={{mt:"2rem" }}  >
    <Card  >
       
        <CardContent>
            <Grid container spacing={2}>
        
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                  <Button       mt= "2rem"

      mb="2rem" variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                  <QrReader
                    ref={qrRef}
                    delay={300}
                    style={{width: '100%'}}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
                  />
                  <h3>Scanned Code: {scanResultFile}</h3>
                </Grid>
             
                <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{mt:"2rem" }} >
                   <QrReader
                   delay={300}
                   style={{width: '100%'}}
                   onError={handleErrorWebCam}
                   onScan={handleScanWebCam}
                   />
                   <h3>Scanned  Code: {scanResultWebCam}</h3>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
</Container>
  );
}


