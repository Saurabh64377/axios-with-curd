import React, { useEffect, useState } from 'react'
import { postMethod, updateMethod } from '../api'

const Formm = ({ data, setData, updateData, isEditMode, setIsEditMode }) => {

    const [inputData, inputSetData] = useState({ title: '', body: '' })

    useEffect(() => {
        inputSetData({
            title: updateData.title || '',
            body: updateData.body || ''
        })

    }, [updateData])


    const handleChange = (e) => {
        inputSetData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const handleCancel = ()=>{
        setIsEditMode(false)
        inputSetData({ title: '', body: '' })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                
                const res = await updateMethod(updateData.id , inputData);
                if(res.status===200){
                    const newdata = [...data]
                    const newUpdateData=  newdata.map((item)=>{
                        if(item.id===res.data.id) return res.data;
                        return item
                    })
                    setData(newUpdateData)
                }
                
                alert("Updated successfully")
                inputSetData({ title: '', body: '' })
                setIsEditMode(false)

            }
            else {
                const postData = await postMethod(inputData)
                if (postData.status === 201) {
                    setData([...data, postData.data])
                    alert("Posted successfully")
                    inputSetData({ title: '', body: '' })
                }

            }

        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div className='rounded-circle bg-danger-subtle p-4 d-flex align-items-center justify-content-center flex-column gap-2 '>
            <form onSubmit={handleSubmit}>
                <div className='d-flex align-items-center justify-content-center flex-column'>
                    <div>
                        <label htmlFor='title'></label>
                        <input
                            type='text'
                            autoComplete='off'
                            id='title'
                            name='title'
                            required
                            onChange={handleChange}
                            placeholder='title-here'
                            value={inputData.title}
                        />
                    </div>
                    <div className='my-2 '>
                        <label htmlFor='body'></label>
                        <input
                            type='text'
                            autoComplete='off'
                            id='body'
                            name='body'
                            required
                            onChange={handleChange}
                            placeholder='body-here'
                            value={inputData.body}
                        />
                    </div>
                    <div>
                    {
                        isEditMode
                            ?
                            <button className='btn btn-success btn-sm '  >Update-Data</button>
                            :
                            <button className='btn btn-success btn-sm '>Add-data</button>
                    }
                     
                    </div>


                </div>
            </form>
            <button className='btn btn-danger btn-sm' onClick={handleCancel}>Cancel</button>

        </div>
    )
}

export default Formm
