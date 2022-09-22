import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import Select from 'react-select'

const sizeOptions = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' }
  ]

const AddProducts = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedSizes, setSelectedSizes] = useState(['M']);
    const [defaultSizesArr, setDefaultSizesArr] = useState(['M']);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState();
    const [description, setDescription] = useState('');

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const changeSizes = (sizes) => {
        let selectedSizes = sizes.map(s => s.value)
        setSelectedSizes(selectedSizes)
    }
    useEffect(async() => {
        if(props?.product_id){
            const response = await fetch(`http://localhost:4000/api/products/${props.product_id}`);
            const data = await response.json();
            setTitle(data.title)
            setDescription(data.description)
            setPrice(data.price)
            setSelectedSizes(data.availableSizes)
            let defSizes =  sizeOptions.filter(s => data?.availableSizes?.indexOf(s.value) > -1 ? true : false )
            setDefaultSizesArr(defSizes)
            setSelectedSizes(defSizes)
        }
    },[])
    return(
        <>
        
        <div className='form-container-ap'>
            <Formik
            initialValues={{ }}
            validate={values => {
            }}
            onSubmit={async(values, { setSubmitting }) => {
                const formData = new FormData();
                formData.append('title', title);
                formData.append('description', description);
                if (price)formData.append('price', price);
                formData.append('image', selectedFile);
                selectedSizes.forEach(size => formData.append('availableSizes[]', size))
                if(props.product_id){
                    const requestOptions = {
                        method: 'PUT',
                        body: formData
                    };
                    const response = await fetch(`http://localhost:4000/api/products/${props.product_id}`, requestOptions);
                    const data = await response.json();

                }else{                
                const requestOptions = {
                    method: 'POST',
                    body: formData
                };
                const response = await fetch('http://localhost:4000/api/products', requestOptions);
                const data = await response.json();
                }
                setSubmitting(false);
                // this.setState({ postId: data.id });
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form style={{padding:"5%"}} onSubmit={handleSubmit} encType='multipart/form-data'>
                    <div>
                    <div className='page-title'>
                        <span>{props.product_id ? "Edit Product" : "Add Product"}</span>
                        </div> 
                    <div className='w-50 mb-15 label'>
                        <label className='block' >Title</label>
                        <input
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            
                            className=' w-99'
                        />
                    </div>
                    <div className='w-50 mb-15 label'>
                        <label className='block ' >Price</label>
                        <input
                            name="price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            className=' w-99'
                        />
                    </div>
                    <div className='w-50 mb-15 label'>
                        <label className='block w-99' >Available Sizes</label>
                        <Select
                            isMulti
                            // defaultValue={defaultSizesArr}
                            name="sizes"
                            options={sizeOptions}
                            className="basic-multi-select w-99 label"
                            classNamePrefix="select"
                            onChange={changeSizes}
                        />
                        
                    </div>
                    {errors.email && touched.email && errors.email}
                    <div className='w-50 mb-15 label'>
                        <label  className='block '>Description </label>
                        <input
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className='w-99'
                        />
                        
                    </div>
                    <div className='w-50 mb-15 label'>
                        <label className='block w-99' >Upload Image</label>
                        <input id="file" 
                        name="file" 
                        type="file" 
                        onChange={onFileChange}
                        onBlur={handleBlur}  
                        value={values.file}  
                        className='w-99'
                        />
                        
                    </div>
                    {errors.password && touched.password && errors.password}
                    <button type="submit" className='submit-button' disabled={isSubmitting}>
                       Submit
                    </button>
                    </div>
                </form>
            )}
            </Formik>
        </div>
        </>
)};

export default AddProducts;