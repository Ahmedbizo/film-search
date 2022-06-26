
import { useState, useEffect } from "react";


function ListEpisode() {
  const [data, setData] = useState([]);
  const [freezData, setFreezData] = useState([]);
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = `https://swapi.dev/api/films`;
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


  return (
    <div></div>
  )
}

export default ListEpisode;