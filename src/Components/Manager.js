import React, { Component } from 'react';
import { variables } from '../Data/Variables';

export class Manager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departments:[],
            managers:[],
            modalTitle: "",
            Manager_Id: 0,
            Firstname: "",
            Lastname: "",
            Department: "",
            Manager_Signature: ""
        }
    }

    refreshList() {

        fetch(variables.API_URL + 'manager')
            .then(response => response.json())
            .then(data => {
                this.setState({ managers: data });
            });

            fetch(variables.API_URL+'department')
            .then(response=>response.json())
            .then(data=>{
                this.setState({departments:data});
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
    changeManager_Signature = (e) => {
        this.setState({ Manager_Signature: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "New Manager",
            Manager_Id: 0,
            Firstname: "",
            Lastname: "",
            Department: "",
            Manager_Signature: ""
        });
    }

    editClick(man) {
        this.setState({
            modalTitle: "Edit Manager",
            Manager_Id: man.Manager_Id,
            Firstname: man.Firstname,
            Lastname: man.Lastname,
            Department: man.Department,
            Manager_Signature: man.Manager_Signature
        });
    }

    createClick() {
        fetch(variables.API_URL + 'manager', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Manager_Id: this.state.Manager_Id,
                Firstname: this.state.Firstname,
                Lastname: this.state.Lastname,
                Department: this.state.Department,
                Manager_Signature: this.state.Manager_Signature
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
        fetch(variables.API_URL + 'manager', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Manager_Id: this.state.Manager_Id,
                Firstname: this.state.Firstname,
                Lastname: this.state.Lastname,
                Department: this.state.Department,
                Manager_Signature: this.state.Manager_Signature
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
            fetch(variables.API_URL + 'manager/' + id, {
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
            departments,
            managers,
            modalTitle,
            Manager_Id,
            Firstname,
            Lastname,
            Department,
            Manager_Signature
        } = this.state;
        return (
            <div>

                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    New Manager
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                Manager Id
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
                                Manager_Signature
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map(man =>
                            <tr key={man.Manager_Id}>
                                <td>{man.Manager_Id}</td>
                                <td>{man.Firstname}</td>
                                <td>{man.Lastname}</td>
                                <td>{man.Department}</td>
                                <td>{man.Manager_Signature}</td>
                                <td>
                                    <button type="button"
                                        className='btn btn-light mr-1'
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(man)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button type="button" className='btn btn-light mr-1'
                                        onClick={() => this.deleteClick(man.Manager_Id)}>
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
                                            <span className="input-group-text">Firstname</span>
                                            <input type="text" className="form-control"
                                                value={Firstname}
                                                onChange={this.changeFirstname}></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Lastname</span>
                                            <input type="text" className="form-control"
                                                value={Lastname}
                                                onChange={this.changeLastname}></input>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Department</span>
                                            <select className="form-select"
                                                onChange={this.changeDepartment}
                                                value={Department}>
                                                {departments.map(dep=><option key={dep.Department_Id}>
                                                    {dep.Department_Name}
                                                </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Manager Signature</span>
                                            <input type="text" className="form-control"
                                                value={Manager_Signature}
                                                onChange={this.changeManager_Signature} />
                                        </div>

                                    </div>
                                </div>
                                {Manager_Id == 0 ?
                                    <button type="button"
                                        className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>Create</button> : null}

                                {Manager_Id != 0 ?
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