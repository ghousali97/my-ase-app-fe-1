import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Edit from "../images/edit.png";
import Delete from "../images/delete.png";
import moment from "moment";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import { authHeader } from '../services/auth-service';
import { AuthContext } from '../context/authContext';

function Single() {

    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const [post, setPost] = React.useState([]);

    const [error, setError] = React.useState({
        error: false,
        message: ""
    });

    const navigate = useNavigate();


    React.useEffect(() => {

        Axios.get('api/posts/' + id).then((res) => {
            setPost(res.data);
        }).catch((err) => {
            setError({
                error: true,
                message: err
            })
        })
    }, [id]);

    function handleDelete() {
        Axios.delete('api/posts/' + id, { headers: authHeader() }).then((res) => {
            console.log(res.status);
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });
    }
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return <div><Header />
        <div className="single">
            {
                error.error ? <h1>{error.message}</h1> : <div className="content">
                    <img src={'https://my-ase-node-be-1.azurewebsites.net/uploads/' + post.img} alt="" />
                    <div className="user">
                        {post.userImg && <img
                            src={'https://my-ase-node-be-1.azurewebsites.net/uploads/' + post.img}
                            alt=""
                        />}
                        <div className="info">
                            <span>{post.username}</span>
                            <p>Posted {moment(post.date).fromNow()}</p>
                        </div>
                        {currentUser?.username === post.username && (
                            <div className="edit">
                                <Link to={"/write"} state={post}>
                                    <img src={Edit} alt="" />
                                </Link>
                                <img onClick={handleDelete} src={Delete} alt="" />
                            </div>
                        )}
                    </div>
                    <h1>{post.title}</h1>
                    <p>
                        {getText(post.desc)}
                    </p>
                </div>
            }


        </div>
        <Footer />
    </div>;

}

export default Single;