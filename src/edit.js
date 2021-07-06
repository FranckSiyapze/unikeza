import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from './Firebase';
import FirebaseService from './FirebaseService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Edit extends React.Component{
    emptyCustomer = {
        id: '',
        firstname: '',
        lastname: '',
        email: ""
      };
    constructor(props) {
        super(props);
        this.state = {
          id: '',
          firstname: '',
          lastname: '',
          email: '',
          item: this.emptyCustomer
        };
      }

      componentDidMount() {
        let id = this.props.match.params.id
        if (id !== 'new') {
          FirebaseService.get(id).on("value", this.onDataChange);
        }
      }

      /* onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({board:state});
      } */

      onDataChange = (item) => {
        let data = item.val();
        let customer = {
          id: item.id,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email
        };
    
        this.setState({
          item: customer,
        });
      }

      handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
      };

      
      handleSubmit = (e) => {
        e.preventDefault();
        const {item} = this.state;
        let id = this.props.match.params.id
        console.log(id);
        if (id !== 'new') {
          FirebaseService.update(id, item);
        } else {
          FirebaseService.addCustomer(item);
        }
    
        this.props.history.push('/');
      };

      onSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.match.params.id);
        const { firstname, lastname, email } = this.state.item;
    
        const updateRef = firebase.firestore().collection('personlist').doc(this.props.match.params.id);
        console.log(updateRef);
        console.log(firstname);
        updateRef.set({
          firstname,
          lastname,
          email
        }).then((docRef) => {
          this.setState({
            id: '',
            firstname: '',
            lastname: '',
            email: ''
          });
          this.props.history.push("/")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }


      handleUpdate = (e) =>{
        e.preventDefault();
        console.log(this.props.match.params.id);
        const itemsRef = firebase.database().ref('personlist/' +this.props.match.params.id);
        console.log(itemsRef);
        const item = {
          email: this.state.item.email,
          firstname: this.state.item.firstname,
          lastname: this.state.item.lastname
        }
        console.log(item);
        //itemsRef.update(this.props.match.params.id, item);
        itemsRef.update(item)
        .then((docRef) => {
          this.setState({
            id: '',
            firstname: '',
            lastname: '',
            email: ''
          });
          this.props.history.push("/")
        });
        //FirebaseService.update(this.props.match.params.id, item);
        /* this.setState({
          firstname: '',
          email: '',
          lastname: ''
        }); */
    } 
      
    render () {
        const {item} = this.state;
        return(
            <div className="Edit">
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
                <Container className="justify-content-center mt-5">
                <Row>
                  <Col></Col>
                  <Col xs={7}>
                  <Link to={'/'}>
                    <Button size="sm" className="mb-3" variant="outline-success" onClick={this.showModal}><FontAwesomeIcon icon={faArrowAltCircleLeft} /> Back</Button>{' '}
                  </Link>
                    <Form onSubmit={this.handleUpdate}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control size="sm" name="firstname"  onChange={this.handleChange} value={item.firstname || this.state.firstname} type="text" placeholder="First Name" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control size="sm" name="lastname"  onChange={this.handleChange} value={item.lastname || this.state.lastname} type="text" placeholder="Last Name" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Email</Form.Label>
                          <Form.Control size="sm" name="email"  onChange={this.handleChange} value={item.email || this.state.email} type="email" placeholder="Email" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                  </Form>
                  </Col>
                  <Col></Col>
                </Row>
                
            </Container>
            </div>
        );
    }
}

export default Edit;