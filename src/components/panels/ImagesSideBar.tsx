import React, { useContext } from 'react';
// import Konva from "konva";

import { konvaStore, imageObject } from '../../store/Store';

function ImagesSideBar() {
    const store = useContext(konvaStore);

    const images = [
        {
            id: 1,
            src: "https://placekitten.com/165/85",
            alt: "kitten",
            width: 165,
            height: 85,
        },
        {
            id: 2,
            src: "https://picsum.photos/165/85",
            alt: "random",
            width: 165,
            height: 85,
        },
        {
            id: 3,
            src: "https://picsum.photos/165/85",
            alt: "random",
            width: 165,
            height: 85,
        },
    ]

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        const files = Array.from(e.target.files);
        const formData = new FormData()

        files.forEach((file, i) => {
            formData.append(i.toString(), file);
        });

        const API_URL = "https://res.cloudinary.com/duaanuhwc";

        fetch(`${API_URL}/image-upload`, {
            method: 'POST',
            body: formData,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        // .then(res => res.json())
        // .then(images => {
        //     console.log(images);
        // })
    }

    const onDrag = (e: { preventDefault: () => void; }, image: imageObject) => {
        e.preventDefault();

        store.setImageObject(image);
    }

    const onClick = (image: imageObject) => {
        let stage = store.stage;
        let layer = store.layer;

        if (!stage || !layer) return;

        const konvaImage = store.getImageNode();
        const imageObj = new Image();

        imageObj.onload = function () {
            konvaImage.image(imageObj);
            layer.draw();
        };
        imageObj.src = image.src;

        layer.add(konvaImage);

        store.setImageObject({
            id: null,
            src: '',
            alt: '',
            width: 0,
            height: 0,
        });
    }

    const getImages = () => {
        return images.map(image => {
            return (
                <img
                    onDrag={e => onDrag(e, image)}
                    onClick={() => onClick(image)}
                    key={image.id}
                    className={'image-sidebar-image'}
                    src={image.src}
                    alt={image.alt}
                />
            )
        });
    }

    return (
        <>
            <div key={'image-wrapper'} className={'image-sidebar-wrapper'}>
                {getImages()}
            </div>
            <div key={'image-upload-btn-wrapper'} className={'upload-btn-wrapper'}>
                <button key={'image-upload-btn'} className={'btn'}>Upload a file</button>
                <input key={'image-upload-input'} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpload(e)} type="file" name="myfile" multiple />
            </div>
        </>
    );
};

export default ImagesSideBar;