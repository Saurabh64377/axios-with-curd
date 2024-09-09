import axios from 'axios'

const api = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
})

//getmmethod
export const getPost = ()=>{
    return api.get('/posts')
}

//delet method

export const deletePost = (id)=>{
    return api.delete(`/posts/${id}`)
}


//posts method

export const postMethod = (post)=>{
    return api.post('/posts' , post)
}

//update method

export const updateMethod = (id,post)=>{
     return api.put(`/posts/${id}` , post)
}