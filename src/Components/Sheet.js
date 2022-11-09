import React, { Component } from 'react';
import { variables } from '../Data/Variables';
import ReactToPrint from 'react-to-print';
import Moment from 'moment';

export class Sheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            invoices: [],
            suppliers: [],
            sheets: [],
            modalTitle: "",
            Sheet_Id: 0,
            Firstname: "",
            Lastname: "",
            Department: "",
            Invoice_Date:"",
            Payment_Date: "",
            Supplier: "",
            Bank_Details: "",
            Invoice_Desc: "",
            Supplier_Invoice: "",
            Proof_of_Payment: "anonymous.pdf",
            PaymentFileName: variables.PAYMENT_URL
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'sheet')
            .then(response => response.json())
            .then(data => {
                this.setState({ sheets: data });
            });

        fetch(variables.API_URL + 'invoice')
            .then(response => response.json())
            .then(data => {
                this.setState({ invoices: data });
            });

        fetch(variables.API_URL + 'department')
            .then(response => response.json())
            .then(data => {
                this.setState({ departments: data });
            });

        fetch(variables.API_URL + 'supplier')
            .then(response => response.json())
            .then(data => {
                this.setState({ suppliers: data });
            });

}

componentDidMount() {
    this.refreshList();
}

changeFirstname = (e) => {
    this.setState({ Firstname: e.target.value });
}
changeLastname = (e) => {
    this.setState({ Lastname: e.target.value });
}
changeDepartment = (e) => {
    this.setState({ Department: e.target.value });
}
changeInvoice_Date = (e) => {
    this.setState({ Invoice_Date: e.target.value });
}
changePayment_Date = (e) => {
    this.setState({ Payment_Date: e.target.value });
}
changeSupplier = (e) => {
    this.setState({ Supplier: e.target.value });
}
changeBank_Details = (e) => {
    this.setState({ Bank_Details: e.target.value });
}
changeInvoice_Desc = (e) => {
    this.setState({ Invoice_Desc: e.target.value });
}

changeSupplier_Invoice = (e) => {
    this.setState({ Supplier_Invoice: e.target.value });
}
changeProof_of_Payment = (e) => {
    this.setState({ Proof_of_Payment: e.target.value });
}
addClick() {
    this.setState({
        modalTitle: "New Platinum Life Sheet",
        Sheet_Id: 0,
        Firstname: "",
        Lastname: "",
        Department: "",
        Invoice_Date:"",
        Payment_Date: "",
        Supplier: "",
        Bank_Details: "",
        Invoice_Desc: "",
        Supplier_Invoice: "",
        Proof_of_Payment: "",
    });
}

editClick(st) {
    this.setState({
        modalTitle: "Edit Platinum Life Sheet",
        Sheet_Id: st.Sheet_Id,
        Firstname: st.Firstname,
        Lastname: st.Lastname,
        Department: st.Department,
        Invoice_Date: st.Invoice_Date,
        Payment_Date: st.Payment_Date,
        Supplier: st.Supplier,
        Bank_Details: this.state.Bank_Details,
        Invoice_Desc: st.Invoice_Desc,
        Supplier_Invoice: st.Supplier_Invoice,
        Proof_of_Payment: st.Proof_of_Payment
    });
}

createClick() {
    fetch(variables.API_URL + 'sheet', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Sheet_Id: this.state.Sheet_Id,
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Department: this.state.Department,
            Invoice_Date: this.state.Invoice_Date,
            Payment_Date: this.state.Payment_Date,
            Supplier: this.state.Supplier,
            Bank_Details: this.state.Bank_Details,
            Invoice_Desc: this.state.Invoice_Desc,
            Supplier_Invoice: this.state.Supplier_Invoice,
            Proof_of_Payment: this.state.Proof_of_Payment
        })
    })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
}

updateClick() {
    fetch(variables.API_URL + 'sheet', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Sheet_Id: this.state.Sheet_Id,
            Firstname: this.state.Firstname,
            Lastname: this.state.Lastname,
            Department: this.state.Department,
            Invoice_Date: this.state.Invoice_Date,
            Payment_Date: this.state.Payment_Date,
            Supplier: this.state.Supplier,
            Bank_Details: this.state.Bank_Details,
            Invoice_Desc: this.state.Invoice_Desc,
            Supplier_Invoice: this.state.Supplier_Invoice,
            Proof_of_Payment: this.state.Proof_of_Payment
        })
    })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Failed');
        })
}

deleteClick(id) {
    if (window.confirm('Are you sure?')) {
        fetch(variables.API_URL + 'sheet/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }
}

fileUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + 'invoice/savefile', {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            this.setState({ Proof_of_Payment: data });
        })
}

render() {
    const {
        departments,
        invoices,
        suppliers,
        sheets,
        modalTitle,
        Sheet_Id,
        Firstname,
        Lastname,
        Department,
        Invoice_Date,
        Payment_Date,
        Supplier,
        Bank_Details,
        Invoice_Desc,
        Supplier_Invoice,
        Proof_of_Payment,
        RecieptFile
    } = this.state;
    return (
        <div>

            <button type="button"
                className="btn btn-primary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => this.addClick()}>
                New Sheet
            </button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>
                            Sheet Id
                        </th>
                        <th>
                            Firstname
                        </th>
                        <th>
                            Lastname
                        </th>
                        <th>
                            Department
                        </th>
                        <th>
                           Invoice Date
                        </th>
                        <th>
                            Payment Date
                        </th>
                        <th>
                            Supplier
                        </th>
                        <th>
                            Bank Details
                        </th>
                        <th>
                            Payment Description
                        </th>
                        <th>
                            Supplier Invoice
                        </th>
                        <th>
                            Proof of Payment
                        </th>
                        <th>
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sheets.map(st =>
                        <tr key={st.Sheet_Id}>
                            <td>{st.Sheet_Id}</td>
                            <td>{st.Firstname}</td>
                            <td>{st.Lastname}</td>
                            <td>{st.Department}</td>
                            <td>{Moment(st.Invoice_Date).format('YYYY-DD-MM')}</td>
                            <td>{Moment(st.Payment_Date).format('YYYY-DD-MM')}</td>
                            <td>{st.Supplier}</td>
                            <td>{st.Bank_Details}</td>
                            <td>{st.Invoice_Desc}</td>
                            <td>{st.Supplier_Invoice}</td>
                            <td>{st.Proof_of_Payment}</td>
                            <td>
                                <button type="button"
                                    className='btn btn-light mr-1'
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={() => this.editClick(st)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-lable="close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">

                                <div className="p-2 w-50 bd-highlight">

                                    <div className="input-group mb-3" >
                                        <span className="input-group-text">Firstname</span>
                                        <input type="text" className="form-control"
                                            value={Firstname}
                                            onChange={this.changeFirstname}
                                            placeholder="Enter Firstname" required ></input>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Lastname</span>
                                        <input type="text" className="form-control"
                                            value={Lastname}
                                            onChange={this.changeLastname}
                                            placeholder="Enter Lastname" required></input>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Department</span>
                                        <select className="form-select"
                                            onChange={this.changeDepartment}
                                            value={Department}>
                                            {departments.map(dep => <option  key={dep.Department_Id}>
                                                {dep.Department_Name}
                                            </option>)}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                            <span className="input-group-text">Invoice Date</span>
                                            <select className="form-select"
                                                onChange={this.changeInvoice_Date}
                                                value={Invoice_Date}>
                                                {invoices.map(inv => <option key={inv.Invoice_Id}>
                                                    {inv.Invoice_Date}
                                                </option>)}
                                            </select>
                                        </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Payment Date</span>
                                        <input type="date" className="form-control"
                                         value={Moment(Payment_Date).format('YYYY-MM-DD')}
                                         onChange={this.changePayment_Date}></input>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Supplier</span>
                                        <select className="form-select"
                                            onChange={this.changeSupplier}
                                            value={Supplier}>
                                            {suppliers.map(sup => <option key={sup.Supplier_Id}>
                                                {sup.Supplier_Name}
                                            </option>)}
                                        </select>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Bank Details</span>
                                        <select className="form-select"
                                            onChange={this.changeBank_Details}
                                            value={Bank_Details}>
                                            {suppliers.map(sup => <option key={sup.Supplier_Id}>
                                                {sup.Bank_Details}
                                            </option>)}
                                        </select>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Payment Description</span>
                                        <select className="form-select"
                                            onChange={this.changeInvoice_Desc}
                                            value={Invoice_Desc}>
                                            {invoices.map(inv => <option key={inv.Invoice_Id}>
                                                {inv.Invoice_Desc}
                                            </option>)}
                                        </select>
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Supplier Invoice</span>
                                        <select className="form-select"
                                            onChange={this.changeSupplier_Invoice}
                                            value={Supplier_Invoice}>
                                            {invoices.map(inv => <option key={inv.Invoice_Id}>
                                                {inv.Supplier_Invoice}
                                            </option>)}
                                        </select>
                                    </div>

                                    <div className="input-group mb-3">
                                        <div src={Proof_of_Payment + RecieptFile} />
                                        <input className="form-control" type="file" onChange={this.fileUpload} />
                                    </div>
                                </div>
                            </div>
                            {Sheet_Id == 0 ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.createClick()}>Create Sheet</button> : null}

                            {Sheet_Id != 0 ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={() => this.updateClick()}>Update Sheet</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}