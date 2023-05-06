import React, { Component, useState } from 'react';





import ImageLinkForm from './ImageLinkForm';
import KitchenSink from './Recipe';
import { Grid, Typography } from '@mui/material';


const Ingred = () => {
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(true)

    const setVisibility = (value) => {
        setVisible(value)
    }
    const onFileChange = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]))
        setImageFile(e.target.files[0])
    }

    const onChangeEvent = (e) => {
        setInput(e.target.value);
    }

    const onSubmit = () => {
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = () => {
                setImageUrl(reader.result)
                fetch('https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        inputs: [{
                            data: {
                                image: {
                                    base64: reader.result.split(',')[1]
                                }
                            }
                        }]
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data && data.outputs && data.outputs[0].data && data.outputs[0].data.concepts) {
                        setFoods(data.outputs[0].data.concepts);
                    }
                })
                .catch(err => {
                    setError('Sorry! Please upload a valid image');
                });
            }
        } else {
            fetch('https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs', {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${process.env.REACT_APP_CLARIFAI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: [{
                        data: {
                            image: {
                                url: input
                            }
                        }
                    }]
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.outputs && data.outputs[0].data && data.outputs[0].data.concepts) {
                    setFoods(data.outputs[0].data.concepts);
                }
            })
            .catch(err => {
                setError('Sorry! Please enter a valid url');
            });
            setInput('');
        }
    };
    
    return (
        <>

            <div style={{
                backgroundImage: "url('https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                opacity: 0.9
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginTop: '30px' }}>
                        {visible &&
                            <>
                                <Typography variant="h5" style={{ marginBottom: '100px' }}>
                                    Select ingredients
                                </Typography>
                                <ImageLinkForm
                                    onFileChange={onFileChange}
                                    onChangeEvent={onChangeEvent}
                                    onSubmit={onSubmit}
                                    input={input}
                                /> 
                            </>
                        }

                     <KitchenSink foods={foods} setVisibility={setVisibility} />
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
export default Ingred;



