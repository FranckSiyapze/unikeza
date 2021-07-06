//import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import firebase from './Firebase';
import Modal from './Modal.js';
import { Link } from 'react-router-dom';

class Test extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items : [],
            show: false,
            id:'',
            firstname: '',
            lastname: '',
            email: ''
        }
          this.showModal = this.showModal.bind(this);
          this.hideModal = this.hideModal.bind(this);
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.onChangeFirstName = this.onChangeFirstName.bind(this);
    }

    onChangeFirstName(e){
        this.setState({
          firstname: e.target.value
        })
        }
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('personlist');
        const item = {
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname
        }
        itemsRef.push(item);
        this.setState({
            firstname: '',
            email: '',
            lastname: '',
            show:false
          });
      }

/*       handleUpdate(e){
          e.preventDefault();
          const itemsRef = firebase.database().ref('personlist/' +id);
          const item = {
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname
          }
          itemsRef.update(id, item);
          this.setState({
            firstname: '',
            email: '',
            lastname: ''
          });
      } */

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };
      handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      removeItem(personId) {
        const itemRef = firebase.database().ref(`/personlist/${personId}`);
        itemRef.remove();
      }
    
    componentDidMount(){
        const itemsRef = firebase.database().ref('personlist');
            itemsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                newState.push({
                    id: item,
                    firstname: items[item].firstname,
                    lastname: items[item].lastname,
                    email: items[item].email,
                });
                }
                this.setState({
                items: newState,
                firstname: items.firstname,
                email: items.email,
                lastname: items.lastname
                });
        });

    }

    render () {
        return (
            <div className="Test">
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Navbar.Brand href="#home">UNIKEZA</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Navbar.Text>
                      Work by: <a href="https://github.com/FranckSiyapze">the_huck</a>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Container>
            </Navbar>
              <Modal show={this.state.show} handleClose={this.hideModal}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control size="sm" name="firstname" onChange={this.handleChange} value={this.state.firstname} type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control size="sm" name="lastname" onChange={this.handleChange} value={this.state.lastname} type="text" placeholder="Last Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control size="sm" name="email" onChange={this.handleChange} value={this.state.email} type="email" placeholder="Email" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
              </Modal>
              <Container className="mt-5">
              <Button className="mb-3" variant="outline-success" onClick={this.showModal}>Ajouter</Button>{' '}
                  <Table striped bordered hover className="table-dark table-responsive-md" size="sm" responsive="sm">
                      <thead>
                          <tr >
                          <th className="text-center">First Name</th>
                          <th className="text-center">Last Name</th>
                          <th className="text-center">Email</th>
                          <th className="text-center">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                        {this.state.items.map((item) => {
                                return (
                                <tr key={item.id}>   
                                <td className="text-center">{item.firstname}</td>
                                <td className="text-center">{item.lastname}</td>
                                <td className="text-center">{item.email}</td>
                                <td className="text-center">
                                <Link to={'/edit/'+item.id}><Button variant="outline-primary" size="sm">Modifier</Button>{' '}</Link>
                                    <Button variant="danger" size="sm" onClick={() => this.removeItem(item.id)}>Delete</Button>{' '}
                                    </td>
                                </tr>
                                )
                            })}
                        
                      </tbody>
                    </Table>
              </Container>
            </div>
          );
    }
}

  
export default Test;