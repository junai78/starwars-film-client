//snippet rce
import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';

export class FilmCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { title, year, genre, actors, plot, poster } = this.props.movie;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={poster} alt="Card image cap" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{year}</CardSubtitle>
            <CardText>{plot}</CardText>
            <CardText>
              <b>Actors: </b>
              {actors}
            </CardText>
            <CardText>
              <b>Genre: </b>
              {genre}
            </CardText>

            <Button
              color="primary"
              onClick={() => this.props.removeFilm(title)}
            >
              Delete
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default FilmCard;
