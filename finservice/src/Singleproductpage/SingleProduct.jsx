import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoreDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/stocks/${id}`)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {Array.isArray(data) && data.map((item) => (
        <div key={item.id}>
          <p>{item.revenue}</p>
        </div>
      ))}
    </div>
  );
}

export default MoreDetails;
