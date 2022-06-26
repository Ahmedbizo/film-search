
import { useState, useEffect } from "react";


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
    <div></div>
  )
}

export default ListEpisode;