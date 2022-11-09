import React, { Component } from 'react';
import { variables } from '../Data/Variables';

export class Supplier extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suppliers: [],
            modalTitle: "",
            Supplier_Id: 0,
            Supplier_Name:"",
            Supplier_Desc: "",
            Bank_Details: ""
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'supplier')
            .then(response => response.json())
            .then(data => {
                this.setState({ suppliers: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeSupplier_Name = (e) => {
        this.setState({ Supplier_Name: e.target.value });
    }
    changeSupplier_Desc = (e) => {
        this.setState({ Supplier_Desc: e.target.value });
    }
    changeBank_Details = (e) => {
        this.setState({ Bank_Details: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "New Supplier",
            Supplier_Id: 0,
            Supplier_Name: "",
            Supplier_Desc: "",
            Bank_Details: ""
        });
    }

    editClick(Sup) {
        this.setState({
            modalTitle: "Edit Supplier",
            Supplier_Id: Sup.Supplier_Id,
            Supplier_Name: Sup.Supplier_Name,
            Supplier_Desc: Sup.Supplier_Desc,
            Bank_Details: Sup.Bank_Details
        });
    }

    createClick() {
        fetch(variables.API_URL + 'Supplier', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Supplier_Id: this.state.Supplier_Id,
                Supplier_Name: this.state.Supplier_Name,
                Supplier_Desc: this.state.Supplier_Desc,
                Bank_Details: this.state.Bank_Details
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
        fetch(variables.API_URL + 'supplier', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Supplier_Id: this.state.Supplier_Id,
                Supplier_Name: this.state.Supplier_Name,
                Supplier_Desc: this.state.Supplier_Desc,
                Bank_Details: this.state.Bank_Details
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
            fetch(variables.API_URL + 'supplier/' + id, {
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

    render() {
        const {
            suppliers,
            modalTitle,
            Supplier_Id,
            Supplier_Name,
            Supplier_Desc,
            Bank_Details
        } = this.state;
        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    New Supplier
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Supplier Id
                            </th>
                            <th>
                                Supplier Name
                            </th>
                            <th>
                                Supplier Description
                            </th>
                            <th>
                                Bank Details
                            </th>
                             <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(sup =>
                            <tr key={sup.Supplier_Id}>
                                <td>{sup.Supplier_Id}</td>
                                <td>{sup.Supplier_Name}</td>
                                <td>{sup.Supplier_Desc}</td>
                                <td>{sup.Bank_Details}</td>
                                <td>
                                    <button type="button"
                                        className='btn btn-light mr-1'
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(sup)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1'
                                        onClick={() => this.deleteClick(sup.Supplier_Id)}>
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
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-lable="close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="d-flex flex-row bd-highlight mb-3">

                                    <div className="p-2 w-50 bd-highlight">

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Supplier Name</span>
                                            <input type="text" className="form-control"
                                                value={Supplier_Name}
                                                onChange={this.changeSupplier_Name}></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Supplier Description</span>
                                            <input type="text" className="form-control"
                                                value={Supplier_Desc}
                                                onChange={this.changeSupplier_Desc}></input>
                                        </div>
                                        
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Bank Details</span>
                                            <input type="text" className="form-control"
                                                value={Bank_Details}
                                                onChange={this.changeBank_Details}></input>
                                        </div>
                                    </div>
                                </div>
                                {Supplier_Id == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>Create</button> : null}

                                {Supplier_Id != 0 ?
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