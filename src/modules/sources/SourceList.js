import React from "react";
import { Card, Icon, Image, Segment, Dimmer, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";

const key = "b1be7cf818704884a97fb8f73115c4cb";
const sources = "https://newsapi.org/v2/sources?apiKey=" + key;
const dariSemantic = "https://react.semantic-ui.com";
const iconLocator = "https://icon-locator.herokuapp.com/icon?size=70..120..200";

class SourceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios
      .get(sources)
      .then(result => {
        console.log(result, "Ini sukses");
        this.setState({
          data: result.data.sources,
          loading: false
        });
      })

      .catch(error => {
        console.log(error.message, "ini error");
        this.setState({
          error: error.message,
          loading: false
        });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    // true condition
    if (loading) {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
          <Image src={`${dariSemantic}/images/wireframe/short-paragraph.png`} />
        </Segment>
      );
    } else if (error) {
      return <Segment>{error}</Segment>;
    }

    return (
      <Card.Group>
        {data.map(source => {
          return (
            <Card key={source.id}>
              <Card.Content>
                <Image size="small" src={`${iconLocator}&url=${source.url}`} />
                <Card.Description>{source.name}</Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}

export default SourceList;
