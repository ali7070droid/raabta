import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddEditContact = ({contact}) => {
    const [formData, setFormData] = useState(contact);
    const {id} = useParams();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(id) {
            console.log(formData);
        }
        else {
            console.log(formData);
            //navigate somewhere
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <h2>{id ? 'Edit Contact' : 'Add Contact'}</h2>

            <form onSubmit={handleSubmit}>
            <div>
                <label>Name: </label>
                <input
                    type = "text"
                    name = "name"
                    value = {formData?.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Phone Number: </label>
                <input
                    type = "tel"
                    name = "phoneNumber"
                    value = {formData?.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Address: </label>
                <textarea
                    name="address"
                    value={formData?.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Designation: </label>
                <select
                name="designation"
                onChange={handleChange}
                defaultValue={formData?.designation}
                required
                >
                    <option value="maulana">Maulana</option>
                    <option value="doctor">Doctor</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label>Priority: </label>
                <select
                name="priority"
                onChange={handleChange}
                defaultValue={formData?.priority}
                required
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <div>
                <label>Related To AIM: </label>
                <input
                    type="checkbox"
                    defaultChecked={formData?.relatedToAim}
                    onChange={handleChange}
                    name="relatedToAim"
                    required
                />
            </div>
            {formData?.relatedToAim && (
                <div>
                    <label>Related To: </label>
                    <input
                    type = "text"
                    name = "relatedTo"
                    value = {formData?.relatedTo}
                    onChange={handleChange}
                    required
                />
                </div>
            ) }
            {formData?.relatedToAim && (
                <div>
                    <label>Relation: </label>
                    <input
                    type = "text"
                    name = "relation"
                    value = {formData?.relation}
                    onChange={handleChange}
                    required
                />
                </div>
            ) }
            <div>
                    <label>Contacted By: </label>
                    <input
                    type = "text"
                    name = "contactedBy"
                    value = {formData?.contactedBy}
                    onChange={handleChange}
                    required
                />
                </div>
                <div>
                    <label>Contact Ownership: </label>
                    <select
                        name="contactOwnership"
                        onChange={handleChange}
                        defaultValue={formData?.contactOwnership}
                        required
                        >
                            <option value="z1">Z1</option>
                            <option value="z2">Z2</option>
                            <option value="z3">Z3</option>
                            <option value="z4">Z4</option>
                            <option value="obc">OBC</option>
                            <option value="tac">TAC</option>
                    </select>
                </div>
                <div>
                    <label>State: </label>
                    <select
                        name="state"
                        onChange={handleChange}
                        defaultValue={formData?.state}
                        required
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            
                    </select>
                    <button type="submit">{id ? 'Update' :'Add'}</button>
                </div>



            </form>


        </div>
    )
}
export default AddEditContact;
