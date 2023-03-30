import React, { useEffect, useRef, useState } from 'react'
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Chip } from '@mui/material';


export default function Objectdetection() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([])
    const [history, setHistory] = useState([])

    const imageRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load()
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }

    const uploadImage = (e) => {
        const { files } = e.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImageURL(url)
        } else {
            setImageURL(null)
        }
    }

    const identify = async () => {
        textInputRef.current.value = ''
        const results = await model.classify(imageRef.current)

        const classNames = results.map(result => result.className.split(','));
const flattenedClassNames = [].concat.apply([], classNames);
console.log(flattenedClassNames);
        setResults(flattenedClassNames)
    }

    const handleOnChange = (e) => {
        setImageURL(e.target.value)
        setResults([])
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        loadModel()
    }, [])


    if (isModelLoading) {
        return <h2>Model Loading...</h2>
    }
  return (
    <div>
         <div >
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
                <button className='uploadImage' onClick={triggerUpload}>Upload Image</button>
               
            </div>
            <div >
                <div >
                    <div >
                        {imageURL && <img src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                    </div>
                    {results.length > 0 && <div >
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={index}>
                                   
                                    <Chip label={result} clickable/>
                                    
                                </div>
                            )
                        })}
                    </div>}
                </div>
                {imageURL && <button className='button' onClick={identify}>Identify Image</button>}
            </div>
    </div>
  )
}
