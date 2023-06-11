import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { authHeader } from '../services/auth-service';
const Write = () => {


    const navigate = useNavigate();
    const state = useLocation().state;

    const [title, setTitle] = React.useState(state?.title || "");
    const [value, setValue] = React.useState(state?.desc || "");
    const [file, setFile] = React.useState(null);
    const [cat, setCat] = React.useState(state?.cat || "");

    async function upload() {
        try {

            var formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('/api/upload', formData);
            console.log(res.data);
            return res.data.imgUrl;
        } catch (err) {
            console.log(err);
        }
    }
    async function handleClick(event) {
        event.preventDefault();

        const imgUrl = await upload();


        const postData = state ? {
            title: title,
            desc: value,
            cat: cat,
            img: file ? imgUrl : state.img,
        }
            : {
                title: title,
                desc: value,
                cat: cat,
                img: file ? imgUrl : '',
            }

        try {

            const postResponse = state ?
                await axios.put('/api/posts/' + state.id, postData, { headers: authHeader() }) :
                await axios.post('/api/posts/', postData, { headers: authHeader() });
            postResponse.data.postId ?
                navigate('/post/' + postResponse.data.postId) :
                navigate('/')

        } catch (err) {
            console.log(err);
        }
    }
    return <div>
        <Header />
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input
                        type="file"
                        id="file"
                        name=""
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setFile(e.target.files[0]);
                        }}

                    />
                    <label className="file" htmlFor="file">
                        Upload Image
                    </label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "art"}
                            name="cat"
                            value="art"
                            id="art"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "science"}
                            name="cat"
                            value="science"
                            id="science"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "technology"}
                            name="cat"
                            value="technology"
                            id="technology"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "cinema"}
                            name="cat"
                            value="cinema"
                            id="cinema"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "design"}
                            name="cat"
                            value="design"
                            id="design"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            checked={cat === "food"}
                            name="cat"
                            value="food"
                            id="food"
                            onChange={(e) => setCat(e.target.value)}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>;
};

export default Write;