import { Container, Card, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
function ListEpisode() {
  const [data, setData] = useState([]);
  const [freezData, setFreezData] = useState([]);
  const [episode, setEpisode] = useState(null);
  const [sort, setSort] = useState("date");
  const [searchName, setSearchName] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://swapi.dev/api/films/?format=json`;
    const data = await fetch(url);
    const resp = await data.json();
    setData(resp.results);
    setFreezData(resp.results);
  };

  const fetchOneEpisode = async (item) => {
    setIsSelected(true);
    setEpisode(item);
  };

  const handleNameChange = (e) => {
    if (searchName === "") {
      setData(freezData);
    } else {
      const newData = freezData.filter((item) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase())
          ? item
          : null;
      });
      setData(newData);
    }
  };

  const handleSort = (e) => {
    let newData;
    if (e.target.value === "ep_id") {
      newData = freezData.sort((a, b) => a.episode_id - b.episode_id);
    } else {
      newData = freezData.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    }
    setData(newData);
  };

  return (
    <Container fluid>
      <Row style={{ marginTop: "100px", marginBottom: "40px" }}>
        <Col xl={2} sm={2}>
          <Form.Select
            aria-label="Default select example"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value)
              handleSort(e);
              setIsSelected(false);
            }}
          >
            <option value="date">Date</option>
            <option value="ep_id">Episode Id</option>
          </Form.Select>
        </Col>
        <Col xl={4} sm={6}>
          <Form.Control
            type="text"
            placeholder="Type To Search..."
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              handleNameChange(e);
              setIsSelected(false);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>episode id</th>
                <th>title</th>
                <th>release date</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? data.map((item) => {
                return (
                  <tr
                    key={item.episode_id}
                    onClick={() => fetchOneEpisode(item)}
                  >
                    <td>EPISODE{item.episode_id}</td>
                    <td>{item.title}</td>
                    <td>{item.release_date}</td>
                  </tr>
                );
              }) : (<tr><td colSpan={3} align={'center'}>No Matches Result</td></tr>)}
            </tbody>
          </Table>
        </Col>
        <Col>
          {isSelected && episode ? (
            <Card
              bg={"light"}
              text={"dark"}
              style={{ width: "full" }}
              className="mb-2"
            >
              <Card.Header>{episode?.title}</Card.Header>
              <Card.Body>
                <Card.Text>{episode?.opening_crawl}</Card.Text>
              </Card.Body>
            </Card>
          ) : (
            <Card
              bg={"light"}
              text={"dark"}
              style={{ width: "full" }}
              className="mb-2"
            >
              <Card.Header>Movie Details</Card.Header>
              <Card.Body>
                <Card.Text>No Matches Selected</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ListEpisode;