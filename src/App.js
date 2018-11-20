import React, { Component } from 'react';
import './App.css';
import FilmCard from './FilmCard';
import axios from 'axios';

import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
  // FormText
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
      title: '',
      films: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  //for popup
  onDismiss() {
    this.setState({ alertVisible: false });
  }

  getAllFilms = () => {
    axios
      .get('https://boiling-sands-34953.herokuapp.com/getallfilms')
      .then(result => {
        this.setState({ films: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getAllFilms();
  }

  //for form
  onSubmit = e => {
    e.preventDefault();
    this.setState({ alertVisible: false });

    const query = `https://boiling-sands-34953.herokuapp.com/getfilm?title=${
      this.state.title
    }`;

    console.log(query);

    axios
      .get(query)
      .then(result => {
        console.log(result.data);
        if (result.data === 'Not found') {
          this.setState({ alertVisible: true });
        }
        this.getAllFilms();
      })
      .catch(error => {
        alert('Not found!\nError: ', error);
      });
  };

  // for form field
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  removeFilm(title) {
    this.setState({
      films: this.state.films.filter(film => {
        if (film.title !== title) return film;
      })
    });
    const query = `https://boiling-sands-34953.herokuapp.com/deletefilm?title=${title}`;
    axios
      .get(query)
      .then(result => {
        this.getAllFilms();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  render() {
    let filmCards = this.state.films.map(film => {
      return (
        <Col sm="4" key={film.title}>
          <FilmCard removeFilm={this.removeFilm.bind(this)} film={film} />
        </Col>
      );
    });
    return (
      <div className="App">
        <Container>
          <Jumbotron id="jumboheader">
            <h1 className="display-4">Film Search</h1>
            <p className="lead">Search for films</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
                Film not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">
                    Enter film title to insert to MongoDB
                  </Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter film title..."
                    onChange={this.onChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
              </Form>
            </Col>
          </Row>
          <p />
          <Row>{filmCards}</Row>
        </Container>
      </div>
    );
  }
}

export default App;
