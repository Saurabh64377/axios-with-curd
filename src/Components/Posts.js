import React, { useEffect, useState } from 'react';
import { deletePost, getPost } from '../api';
import Formm from './Formm';

const Posts = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateData,setUpdateData] = useState({});
    const [isEditMode, setIsEditMode]= useState(false)

    // Fetch data from the API
    const getPostData = async () => {
        try {
            const res = await getPost();
            setData(res.data);
        } catch (error) {
            setError('Failed to fetch posts.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPostData();
    }, []);

    // Handle the deletion of a post
    const handleDelete = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status === 200) {
                window.confirm('Do you want to delete this post')
                setData((prevData) => prevData.filter(item => item.id !== id));
            }
        } catch (error) {
            setError('Failed to delete post.');
            console.error(error);
        }
    };

    const handleUpdatePost = (update)=>{
        setUpdateData(update)
        setIsEditMode(true)
    }

    // Render component
    if (loading) {
        return (
            <div className='d-flex align-items-center justify-content-center'>
                <div className='fw-bold'>loading..<span class="spinner-border" role="status">

                </span></div>
            </div>
        )
    }

    if (error) return <div>{error}</div>;

    return (
       
        <div className="container">
             <Formm data={data} setData={setData} updateData={updateData} isEditMode={isEditMode} setIsEditMode= {setIsEditMode}/>
            <div className="fw-bold fs-1 text-center text-secondary">Axios-Data</div>
            <div className="row">
                {data.map((item, index) => {
                    const { id, title, body } = item;
                    return (
                        <div
                            className="p-2 col-sm-4 bg-warning-subtle border border-4 border-secondary"
                            key={id}
                        >
                            <p className="fw-bold">{index + 1}.</p>
                            <p className="fw-bold">Title: {title}</p>
                            <p><b>Body: </b>{body}</p>
                            <button className="btn btn-success" onClick={()=>handleUpdatePost(item)}>Edit</button>
                            <button
                                onClick={() => handleDelete(id)}
                                className="btn btn-danger mx-3"
                            >
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Posts;
