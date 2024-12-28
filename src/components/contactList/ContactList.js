import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./contact-list.css";
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import axios from "axios";
import { isTokenValid } from "../AuthenticationUtils/authUtils";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
// import '../../../node_modules/ag-grid/dist/styles/ag-grid.css';


const ContactList = () => {

  const [contacts, setContacts] = useState([]);
  const location = useLocation();

  //Try 1: Fetch in Use Effect and then set the Row data in onGrid Ready
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!isTokenValid(token)){
      localStorage.removeItem('token')
      navigate("/")
    }
    fetch("http://localhost:5273/api/Contact/GetContactDetails", {
      headers : {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then((data) => setContacts(data))
  }, [location.pathname])


  //New code following ag-grid docs
  const gridRef = useRef();
  const navigate = useNavigate();
  const containerStyle = useMemo(() => ({ width: "100%", height: "500px" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {field: "id", minWidth: 20},
    {field: "name", minWidth: 100, filter: true},
    {field: "phone", minWidth: 100, filter: true},
    {field: "address", minWidth: 100, filter: true},
    {field: "designation", minWidth: 100, filter: true},
    {field: "priority", minWidth: 100, filter: true},
    // {field: "isAim", minWidth: 100, filter: true},
    // {field: "relatedToWho", minWidth: 100, filter: true},
    {field: "relation", minWidth: 100, filter: true},
    {field: "contactAddedBy", minWidth: 100, filter: true},
    {field: "contactOwnership", minWidth: 100, filter: true},
    {field: "status", minWidth: 100, filter: true},
  ]);

  


  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
    };
  }, []);

  const onGridReady = useCallback(() => {
    console.log("onGridReady called");
    console.log(gridRef.current)
    setRowData(contacts);
  },[]);
  // const onGridReady = useCallback((params) => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((resp) => resp.json())
  //     .then((data) => setRowData(data));
  // }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      "quickFilterText",
      document.getElementById("filter-text-box").value,
    );
  }, []);

  const onGridRowClick = (event) => {
    console.log(event)
    console.log(event.data)
    navigate("/contact/" + event.data.id)
  }

  const addContact = () => {
    navigate("/add-contact");
  }

  const addAddHocInteraction = (contactsFromState) => {
    const temp = {};
    navigate("/add-interaction", {state: {temp, contactsFromState}});
  }


  return (
    <div style={containerStyle} >
      <div className="example-wrapper">
        <div className="example-header">
          <div className="left-side">
          <label className="contact-list-label">Quick Filter:</label>
          <input
            className="contact-list-input"
            type="text"
            id="filter-text-box"
            placeholder="Filter..."
            onInput={onFilterTextBoxChanged}
          />
          </div>
          <div className="right-side">
          <button className = "contact-add-button first-page-button" onClick={addContact}>Add new Contact</button>
          <button className="interaction-add-button first-page-button"  onClick={() => addAddHocInteraction(contacts)}>Add-hoc interaction</button>
          </div>
          
          
        </div>

        {/* <div>{JSON.stringify(contacts)}</div>
        <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>{contact.name}</Link>
          </li>
        ))}
      </ul> */}

        <div
          style={gridStyle}
          className={
            "ag-theme-quartz-dark"
          }
        >
          <AgGridReact
          className="contactGrid"
            ref={gridRef}
            rowData={contacts}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoSizeStrategy={{type: 'fitCellContents'}}
            onRowClicked={(e) => onGridRowClick(e)}
            // onRowDoubleClicked={(e) => myFunction(e)}
            // rowSelection="single"
            // onRowSelected={(e) => myFunction(e)}
            
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );




  
};

export default ContactList;
