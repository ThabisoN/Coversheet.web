import React, { Component } from 'react';
import { variables } from '../Data/Variables';
import Moment from 'moment';

export class Invoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments: [],
            invoices: [],
            suppliers:[],
            modalTitle: "",
            Invoice_Id: 0,
            Invoice_Date: "",
            Invoice_Desc: "",
            Department: "",
            Supplier: "",
            Total_Balance: "",
            Supplier_Invoice: "anonymous.pdf",
            PDFFileName: variables.INVOICE_URL
        }
    }

    refreshList() {

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

    changeInvoice_Date = (e) => {
        this.setState({ Invoice_Date: e.target.value });
    }
    changeInvoice_Desc = (e) => {
        this.setState({ Invoice_Desc: e.target.value });
    }
    changeDepartment = (e) => {
        this.setState({ Department: e.target.value });
    }
    changeSupplier = (e) => {
        this.setState({ Supplier: e.target.value });
    }
    changeTotal_Balance = (e) => {
        this.setState({ Total_Balance: e.target.value });
    }
    changeSupplier_Invoice = (e) => {
        this.setState({ Supplier_Invoice: e.target.value });
    }
    addClick() {
        this.setState({
            modalTitle: "New Invoice",
            Invoice_Id: 0,
            Invoice_Date: "",
            Invoice_Desc: "",
            Department: "",
            Supplier: "",
            Total_Balance: "",
            Supplier_Invoice: "anonymous.pdf"
        });
    }
    editClick(inv) {
        this.setState({
            modalTitle: "Edit Invoice",
            Invoice_Id: inv.Invoice_Id,
            Invoice_Date: inv.Invoice_Date,
            Invoice_Desc: inv.Invoice_Desc,
            Department: inv.Department,
            Supplier: inv.Supplier,
            Total_Balance: inv.Total_Balance,
            Supplier_Invoice: inv.Supplier_Invoice
        });
    }

    createClick() {
        fetch(variables.API_URL + 'invoice', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Invoice_Date: this.state.Invoice_Date,
                Invoice_Desc: this.state.Invoice_Desc,
                Department: this.state.Department,
                Supplier: this.state.Supplier,
                Total_Balance: this.state.Total_Balance,
                Supplier_Invoice: this.state.Supplier_Invoice
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
        fetch(variables.API_URL + 'invoice', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Invoice_Id: this.state.Invoice_Id,
                Invoice_Date: this.state.Invoice_Date,
                Invoice_Desc: this.state.Invoice_Desc,
                Department: this.state.Department,
                Supplier: this.state.Supplier,
                Total_Balance: this.state.Total_Balance,
                Supplier_Invoice: this.state.Supplier_Invoice
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
            fetch(variables.API_URL + 'invoice/' + id, {
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
                this.setState({ Supplier_Invoice: data });
            })
    }

    render() {
        const {
            departments,
            invoices,
            suppliers,
            modalTitle,
            Invoice_Id,
            Invoice_Date,
            Invoice_Desc,
            Department,
            Supplier,
            Total_Balance,
            Supplier_Invoice,
            PDFFileName
        } = this.state;

        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    New Invoice
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Invoice Id
                            </th>
                            <th>
                                Invoice Date
                            </th>
                            <th>
                                Invoice Description
                            </th>
                            <th>
                                Department
                            </th>
                            <th>
                                Supplier
                            </th>
                            <th>
                                Total Balance
                            </th>
                            <th>
                                Supplier Invoice
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map(inv =>
                            <tr key={inv.Invoice_Id}>
                                <td>{inv.Invoice_Id}</td>
                                <td>{Moment(inv.Invoice_Date).format('YYYY-DD-MM')}</td>
                                <td>{inv.Invoice_Desc}</td>
                                <td>{inv.Department}</td>
                                <td>{inv.Supplier}</td>
                                <td>{inv.Total_Balance}</td>
                                <td>{inv.Supplier_Invoice}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(inv)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(inv.Invoice_Id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
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
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Invoice Date</span>
                                            <input type="date" className="form-control"
                                                value={Moment(Invoice_Date).format('YYYY-MM-DD')}
                                                onChange={this.changeInvoice_Date}></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Invoice Description</span>
                                            <input type="text" className="form-control"
                                                value={Invoice_Desc}
                                                onChange={this.changeInvoice_Desc}></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Department</span>
                                            <select className="form-select"
                                                onChange={this.changeDepartment}
                                                value={Department}>
                                                {departments.map(dep => <option key={dep.Department_Id}>
                                                    {dep.Department_Name}
                                                </option>)}
                                            </select>
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
                                            <span className="input-group-text">Total Balance</span>
                                            <input type="text" className="form-control"
                                                value={Total_Balance}
                                                onChange={this.changeTotal_Balance}></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <div src={PDFFileName + Supplier_Invoice} />
                                            <input className="form-control" type="file" onChange={this.fileUpload} />
                                        </div>

                                    </div>
                                </div>
                                {Invoice_Id == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>Create</button> : null}

                                {Invoice_Id != 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>Update</button> : null}
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )

    }
}