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
    let {
      title,
      episode_id,
      opening_crawl,
      director,
      producer,
      release_date
    } = this.props.film;
    return (
      <div>
        <Card>
          <CardImg top width="100%" src={poster} alt="Card image cap" />
          <CardBody>
            <CardTitle>{title}</CardTitle>
            <CardSubtitle>{episode_id}</CardSubtitle>
            <CardText>{opening_crawl}</CardText>
            <CardText>
              <b>Director: </b>
              {director}
            </CardText>
            <CardText>
              <b>Producer: </b>
              {producer}
            </CardText>
            <CardText>
              <b>Release Data: </b>
              {release_date}
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
