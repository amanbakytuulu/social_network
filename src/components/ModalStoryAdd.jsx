import React, { useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ModalStoryAdd({ setShow, show }) {

    const [file, setFile] = useState([]);
    const [preview, setPreview] = useState([]);

    const onHandleAddStory = (files) => {
        for (let j = 0, f; f = files[j]; j++) {
            const FReader = new FileReader();

            FReader.onload = (function (theFile) {
                return function (e) {
                    setPreview((prev) => [...prev, e.target.result.split(' ')]);
                };
            })(f);
            FReader.readAsDataURL(f);

        }
        setFile(files);

    }

    const onHandleCancel = () => {
        if (file.length !== 0) {
            const isCancel = window.confirm('Отменить изменения?');
            if (isCancel) {
                setPreview([]);
                setFile([]);
                setShow(false);
            }
        } else {
            setShow(false);
        }

    }

    const onSend = () => {
        
    }

    return (
        <div className={`modal ${show ? 'is-active' : ''}`} style={{ zIndex: 100 }}>
            <style>{`
                .image-gallery-content .image-gallery-slide .image-gallery-image {
                    max-height: calc(100vh - 450px);
                }
            `}</style>
            <div className="modal-background"></div>
            <div className="modal-content">
                <ImageGallery items={preview.map((item) => ({ original: item, thumbnail: item }))} showNav={false} showIndex={true} stopPropagation={true} showThumbnails={false} />
            </div>
            <div className="modal-card">
                <section className="modal-card-body" style={{ backgroundColor: 'var(--container-color)' }}>
                    <input type="file" id="pickAStory" accept='image/*, video/*'
                        style={{ display: 'none' }}
                        onChange={(e) => onHandleAddStory(e.target.files)} multiple />
                    <label htmlFor="pickAStory"><p className="button is-link">Открыть галерею</p></label>
                </section>
                <footer className="modal-card-foot" style={{ backgroundColor: 'var(--container-color)' }}>
                    <button className="button is-success"
                        disabled={file.length === 0 ? true : false}
                        onClick={onSend}>
                        Сохранить
                    </button>
                    <button className="button" onClick={onHandleCancel}>Отмена</button>
                </footer>
            </div>
        </div>
    )
}

export default ModalStoryAdd