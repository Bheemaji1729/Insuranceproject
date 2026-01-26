import React, {useState, useEffect} from 'react'
import {useNavigate, useParams } from 'react-router-dom';
import { updateEmployee, createEmployee, getEmployeeById} from '../EmployeeService';

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});
    const [initialData, setInitialData] = useState({});

    const navigate = useNavigate();
    const {id} = useParams();

     // Regex to allow only Alphanumeric characters and spaces
    const specialCharRegex = /^[a-zA-Z0-9 ]*$/;

     const validateForm = () => {
        let valid = true;
        let errorsCopy = {};

        // 1. Validate Policy Name (firstName)
        if (!firstName.trim()) { 
            errorsCopy.firstName = "Name is required"; 
            valid = false; 
        } else if (!specialCharRegex.test(firstName)) { 
            errorsCopy.firstName = "Special characters not allowed"; 
            valid = false; 
        }

        // 2. Validate Insurance Type (lastName)
        if (!lastName.trim()) { 
            errorsCopy.lastName = "Type is required"; 
            valid = false; 
        } else if (!specialCharRegex.test(lastName)) { 
            errorsCopy.lastName = "Special characters not allowed"; 
            valid = false; 
        }

        // 3. Validate Coverage (email)
        if (!email.trim()) { 
            errorsCopy.email = "Coverage is required"; 
            valid = false; 
        } else if (!specialCharRegex.test(email)) { 
            errorsCopy.email = "Special characters not allowed"; 
            valid = false; 
        }

        // 4. Change detection: "No changes detected to update"
        if (id && valid) {
            if (firstName === initialData.firstName && 
                lastName === initialData.lastName && 
                email === initialData.email) {
                alert("No changes detected to update");
                return false;
            }
        }

        setErrors(errorsCopy);
        return valid;
    };

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if (validateForm()) {

        const employee = {firstName, lastName, email}

        console.log(employee);
        if(id){
            updateEmployee(id, employee).then((response) => {
                 alert("Insurance details updated successfully"); // Success message requirement
                navigate('/employees')
            }).catch(error => {
                console.log(error)
            })

        }else{
            createEmployee(employee).then((response) =>{

                console.log(response.data)
    
                navigate('/employees');
    
            }).catch(error => {
                console.log(error)
            })
        }

    }
        
    }

    useEffect(() => {

        if(id){
            getEmployeeById(id).then((response) =>{
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error => {
                console.log(error)
            })
        }

    }, [id])

    const pageTitle = () => {

        if(id){
            return <h2 className = "text-center">Update Insurance</h2>
        }else{
            return <h2 className = "text-center">Add Insurance</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           pageTitle()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Insurance Policy Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Insurance policy name"
                                        name = "firstName"
                                        className = {`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        value = {firstName}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Insurance Type :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter insurance type"
                                        name = "lastName"
                                        className = {`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        value = {lastName}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                     {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Insurance Coverage (self/family) :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter Insurance Coverage"
                                        name = "email"
                                        className = {`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        value = {email}
                                        onChange = {(e) => setEmail(e.target.value)}
                                    >
                                    </input>
                                     {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateEmployee(e)} >Save </button>
                                {/* <Link to="/employees" className="btn btn-danger"> Cancel </Link> */}
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default EmployeeComponent
