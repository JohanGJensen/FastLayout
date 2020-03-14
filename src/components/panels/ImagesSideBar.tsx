import React, { useContext } from 'react';
// import Konva from "konva";

import { konvaStore, imageObject } from '../../mobx/Store';

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

        store.setDraggedImage(image);
    }

    const getImages = () => {
        return images.map(image => {
            return (
                <img
                    onDrag={e => onDrag(e, image)}
                    key={image.id}
                    className={'image-sidebar-image'}
                    src={image.src}
                    alt={image.alt} />
            )
        });
    }

    return (
        <>
            {getImages()}
            <div key={2} className={'upload-btn-wrapper'}>
                <button key={3} className={'btn'}>Upload a file</button>
                <input key={4} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpload(e)} type="file" name="myfile" multiple />
            </div>
        </>
    );
};

export default ImagesSideBar;