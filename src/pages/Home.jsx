import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useLocation } from 'react-router-dom';
import Axios from 'axios';

function Home() {
    const cat = useLocation().search

    const [posts, setPosts] = React.useState([]);
    const [error, setError] = React.useState({
        error: false,
        message: ""
    });


    useEffect(() => {
        Axios.get('api/posts/' + cat).then((res) => {
            setPosts(res.data);
        }).catch((err) => {
            setError({
                error: true,
                message: err

            })
        })
    }, [cat]);

    // const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    //     {
    //         id: 4,
    //         title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //         desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //         img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     },
    // ];

    function getText(html) {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }

    return <div><Header />
        <div className="home">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={'https://my-ase-node-be-1.azurewebsites.net/uploads/' + post.img} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={'/post/' + post.id} >
                                <h1>{post.title} </h1>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <button>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>;

}

export default Home;
