// Core Imports
import React, { useState, useEffect, useRef, Fragment } from "react";

// Custom Component Imports
import Alert from '../../common/Alert';

// Rich Text Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// Function Imports
import { isAuthenticated } from "../../auth/functions";

// API Imports
import { createProduct, getCategories, updateProduct } from "../../APICalls";

// Misc Imports
import Config from '../../config';

// TODO: Explanation
const ProductForm = ({
    selectedProduct,
    onDataTableSuccess,
    onReloadProducts,
    onSetModalOpen,
    modalOpen
}) => {



    // Initial State
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [local, setLocal] = useState('');
    const [emailPaypal, setEmailPaypal] = useState('');
    const [password, setPassword] = useState('');
    const [price, setPrice] = useState('');
    const [weight, setWeight] = useState('');
    const [qty, setQty] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState('');
    const [colorList, setColorList] = useState({});
    const [sizeList, setSizeList] = useState({});
    const [formData, setFormData] = useState('');
    const [modalTitle, setModalTitle] = useState('New Product');
    const [btnName, setBtnName] = useState('Add');
    const [error, setError] = useState(false);
    const imgInputRef = useRef(null);
    const colors = Config.COLORS;
    const sizes = Config.SIZES;


    const { token } = isAuthenticated();

    // React Effects -------------------------------------------------------------------------------

    useEffect(() => {

        setFormData(new FormData());

        getCategories().then(categoryData => {

            if (categoryData.error) {
                setError(categoryData.error);
            }
            else {
                setCategories(categoryData);
            }
        });

        setColorList(Config.COLORS_INIT);
        setSizeList(Config.SIZES_INIT);

    }, []);

    useEffect(() => {
        setError(false);

    }, [name, descr, price, qty, category, weight]);

    useEffect(() => {

        if (selectedProduct) {
            setName(selectedProduct.name);
            setEmail(selectedProduct.email);
            setPhoneNumber(selectedProduct.phoneNumber);
            setRole(selectedProduct.role);
            setLocal(selectedProduct.local);
            setEmailPaypal(selectedProduct.emailPaypal);
            setPassword(selectedProduct.password);
            setDescr(selectedProduct.descr);
            setPrice(selectedProduct.price);
            setWeight(selectedProduct.weight);
            setQty(selectedProduct.qty);
            setCategory(selectedProduct.category._id);
            setColorList(selectedProduct.colorList || Config.COLORS_INIT);
            setSizeList(selectedProduct.sizeList || Config.SIZES_INIT);
            setModalTitle("Edit Worker");
            setBtnName("Save");
            formData.set('colorList', JSON.stringify(selectedProduct.colorList));
            formData.set('sizeList', JSON.stringify(selectedProduct.sizeList));
        }
        else {
            setName('');
            setEmail('');
            setPhoneNumber('');
            setRole('');
            setLocal('');
            setEmailPaypal('');
            setPassword('');
            setDescr('');
            setPrice('');
            setWeight('');
            setQty('');
            setCategory(0);
            setColorList(Config.COLORS_INIT);
            setSizeList(Config.SIZES_INIT);
            setModalTitle("Add New Worker");
            setBtnName("Add");
        }

    }, [selectedProduct]);

    // END React Effects ---------------------------------------------------------------------------

    // Events --------------------------------------------------------------------------------------

    const handleChangeDescr = (e, editor) => {
        const data = editor.getData();
        formData.set('descr', data);
    }

    const clickSubmit = e => {

        e.preventDefault();
        setError(false);

        if (selectedProduct) {
            updateProduct(selectedProduct._id, token, formData).then(data => {

                if (data.error) {
                    setError(data.error.description);
                    onDataTableSuccess(false);
                }
                else {
                    setName('');
                    imgInputRef.current.value = null;
                    setEmail('');
                    setPhoneNumber('');
                    setRole('');
                    setLocal('');
                    setEmailPaypal('');
                    setDescr('');
                    setPassword('');
                    setPrice('');
                    setWeight('');
                    setCategory(0);
                    setColorList(Config.COLORS_INIT);
                    setSizeList(Config.SIZES_INIT);
                    setQty('');
                    setFormData(new FormData());
                    onDataTableSuccess("Product Updated");
                    onReloadProducts();
                    onSetModalOpen(false);
                }
            });
        }
        else {
            createProduct(token, formData).then(data => {

                if (data.error) {
                    setError(data.error.description);
                    onDataTableSuccess(false);
                }
                else {
                    setName('');
                    imgInputRef.current.value = null;
                    setEmail('');
                    setPhoneNumber('');
                    setRole('');
                    setLocal('');
                    setEmailPaypal('');
                    setPassword('');
                    setDescr('');
                    setPrice('');
                    setWeight('');
                    setCategory(0);
                    setColorList(Config.COLORS_INIT);
                    setSizeList(Config.SIZES_INIT);
                    setQty('');
                    setFormData(new FormData());
                    onDataTableSuccess("User/Worker Created");
                    onReloadProducts();
                    onSetModalOpen(false);
                }
            });
        }
    };

    const setProductCategory = e => {

        setCategory(e.target.value);

        for (const i in categories) {
            if (categories[i]._id === e.target.value) {
                formData.set('printingType', categories[i].printingType._id);
            }
        }

        formData.set('category', e.target.value);
        formData.set('qty', 1);
        formData.set('price', 1);
        formData.set('weight', 1);
    }

    const onChangeColorSelected = (hexCode) => {

        let selectedColors = colorList;
        selectedColors[hexCode] = !selectedColors[hexCode];
        setColorList((prevState) => ({ ...prevState, selectedColors }));
        formData.set('colorList', JSON.stringify(colorList));
    }

    const onChangeSizeSelected = (code) => {

        let selectedSizes = sizeList;
        selectedSizes[code] = !selectedSizes[code];
        setSizeList((prevState) => ({ ...prevState, selectedSizes }));
        formData.set('sizeList', JSON.stringify(sizeList));
    }

    const renderColorSelector = () => {

        if (colors && colors.length > 0) {
            return (
                <div className="select__color">
                    <ul className="color__list" style={{ marginLeft: '0px' }}>
                        {colors.map((color) => {

                            return (
                                <li key={color.hexCode} className="">
                                    <div
                                        title={color.name}
                                        style={
                                            {
                                                background: `#${color.hexCode} none repeat scroll 0 0`,
                                                border: colorList[color.hexCode] ? 'solid red 2px' : 'solid #DDD 2px'
                                            }
                                        }
                                        onClick={() => onChangeColorSelected(color.hexCode)}
                                    >
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )
        }
        else return null;
    }

    const renderSizesSelector = () => {

        if (sizes && sizes.length > 0) {
            return (
                <div className="select__size" style={{ margin: 0 }}>
                    <ul className="color__list" style={{ marginLeft: '0px' }}>
                        {
                            sizes.map((size) => {

                                return (
                                    <li key={size.code} className="">
                                        <div
                                            title={size.name}
                                            style={
                                                {
                                                    border: sizeList[size.code] ? 'solid red 2px' : 'solid #DDD 2px'
                                                }
                                            }
                                            onClick={() => onChangeSizeSelected(size.code)}
                                        >
                                            {size.code}
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }
        else return null;
    }

    // END Events ----------------------------------------------------------------------------------

    // Main Render
    return (
        <Fragment>
            <div class="modal-backdrop fade in" style={{ display: modalOpen ? '' : 'none' }}></div>
            <div className={`modal fade in`} id="categoryModal" role="dialog" aria-labelledby="myModalLabel" style={{ display: modalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    onSetModalOpen(false);
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="myModalLabel">{modalTitle}</h4>
                        </div>
                        <div className="modal-body" style={{ padding: '30px', minHeight: '550px', 'overflow-y': 'auto', maxHeight: '600px' }}>
                            <div className="row">
                                <Alert
                                    error={error}
                                    onError={(value) => { setError(value) }}
                                />
                            </div>
                            <div className="form-row row">
                                <div className={`form-group col-xs-12 col-sm-6 col-lg-6`}>
                                    <label htmlFor="name" className="normal-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        id="name"
                                        placeholder="Enter name"
                                        onChange={e => {
                                            setName(e.target.value);
                                            formData.set('name', e.target.value);
                                        }}
                                        value={name}
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="image" className="normal-label">Worker Image</label>
                                    <input
                                        type="file"
                                        className="form-control input-file"
                                        id="image"
                                        accept="image/*"
                                        placeholder="Enter worker image"
                                        ref={imgInputRef}
                                        onChange={e => {
                                            formData.set('image', e.target.files[0]);
                                        }}
                                    />
                                </div>

                            </div>

                            <div className="form-row row">

                                <div className="form-group col-xs-12 col-sm-3 col-lg-6">
                                    <label htmlFor="email" className="normal-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control "
                                        id="email"
                                        placeholder="Email*"
                                        onChange={e => {
                                            setEmail(e.target.value);
                                            formData.set('email', e.target.value);
                                        }}
                                        value={email}
                                        autoFocus
                                        required
                                    />
                                </div>




                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="phone_number" className="normal-label">Phone Number</label>
                                    <input
                                        type="text"
                                        className="form-control "
                                        id="phone_number"
                                        placeholder="Enter your phone number"
                                        onChange={e => {
                                            setPhoneNumber(e.target.value);
                                            formData.set('phoneNumber', e.target.value);
                                        }}
                                        value={phoneNumber}
                                    />
                                </div>




                            </div>

                            <div className="form-row row">

                                <div className="form-group col-xs-12 col-sm-3 col-lg-6">
                                    <label htmlFor="category" className="normal-label"> Category</label>
                                    <div className="select-option">
                                        <select
                                            id="category"
                                            className="form-control"
                                            onChange={setProductCategory}
                                            value={category}
                                        >
                                            <option value={0} >Select Category</option>
                                            {categories && categories.map((category, i) => (
                                                <option key={i} value={category._id}>
                                                    {`${category.name}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="image" className="normal-label">Local</label>
                                    <div className="select-option">
                                        <select
                                            id="local"
                                            className="form-control"
                                            onChange={e => {
                                                setLocal(e.target.value);
                                                formData.set('local', e.target.value);
                                            }}
                                            value={local}
                                        >
                                            <option value="">Select Local</option>
                                            <option key="downtowndisney" value="downtowndisney">Downtown Disney Rest.</option>
                                            <option key="magickingdom" value="magickingdom">Magic Kingdom Rest.</option>
                                            <option key="magickingdom" value="magickingdom">Universal Resort</option>
                                            <option key="marriottrenaissance" value="marriottrenaissance">Marriott Renaissance</option>
                                        </select>
                                    </div>
                                </div>
                            </div>




                            <div className="form-row row">

                                <div className="form-group col-xs-12 col-sm-3 col-lg-6">
                                    <label htmlFor="emailPaypal" className="normal-label">Paypal Account</label>
                                    <input
                                        type="email"
                                        className="form-control "
                                        id="emailPaypal"
                                        placeholder="Email for Paypal*"
                                        onChange={e => {
                                            setEmailPaypal(e.target.value);
                                            formData.set('emailPaypal', e.target.value);
                                        }}
                                        value={emailPaypal}
                                        autoFocus
                                        required
                                    />

                                </div>


                                <div className="form-group col-xs-12 col-sm-6 col-lg-6">
                                    <label htmlFor="image" className="normal-label">Role</label>
                                    <div className="select-option">
                                        <select
                                            id="role"
                                            className="form-control"
                                            onChange={e => {
                                                setRole(e.target.value);
                                                formData.set('role', e.target.value);
                                            }}
                                            value={role}
                                        >
                                            <option value="">Select Role</option>
                                            <option key="admin" value="admin">Admin</option>
                                            <option key="worker" value="worker">Worker</option>
                                        </select>
                                    </div>
                                </div>

                            </div>

                            <div className="form-row row">

                                <div className="form-group col-xs-12 col-sm-3 col-lg-3">
                                    <label htmlFor="password" className="normal-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control "
                                        id="password"
                                        onChange={e => {
                                            setPassword(e.target.value);
                                            formData.set('password', e.target.value);
                                        }}
                                        value={password}
                                        autoFocus
                                        required
                                    />
                                </div>

                            </div>


                            <div className="form-row row">
                                <div className="form-group col-xs-12 col-sm-12 col-lg-12">
                                    <label htmlFor="descr" className="normal-label">Description</label>
                                    <div className="ck-editor" data-example-id="textarea-form-control">
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                toolbar: [
                                                    'heading',
                                                    'bold',
                                                    'italic',
                                                    'blockQuote',
                                                    'bulletedList',
                                                    'numberedList',
                                                    '|',
                                                    'undo',
                                                    'redo'
                                                ]
                                            }}
                                            data={descr}
                                            onChange={handleChangeDescr}
                                        />
                                    </div>
                                </div>
                            </div>






                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default"
                                onClick={() => {
                                    onSetModalOpen(false);
                                }}
                            >Cancel</button>
                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={clickSubmit}
                            >{btnName}</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductForm;