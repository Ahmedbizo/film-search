
import { useState, useEffect } from "react";


function ListEpisode() {
  const [data, setData] = useState([]);
  const [freezData, setFreezData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://swapi.dev/api/films`;
    const data = await fetch(url);
    const resp = await data.json();
    setData(resp.results);
    setFreezData(resp.results);
    console.log(resp)
  };



  return (
    <div></div>
  )
}

export default ListEpisode;