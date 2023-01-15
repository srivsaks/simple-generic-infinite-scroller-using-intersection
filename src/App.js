import { InfiniteScroller } from "./InfiniteScroller";
import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [value, setValue] = useState("");

  const fetchData = async (val, page) => {
    //setValue(val);
    setloading(true);
    console.log(val, page);
    fetch(`https://openlibrary.org/search.json?q=${val}&page=${page}`)
      .then(async (res) => {
        const response = await res.json();
        console.log(response.docs);
        setData((prev) => [...prev.concat(response.docs)]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <div>
      <InfiniteScroller
        onChange={fetchData}
        loading={loading}
        data={data}
        onScrollToEnd={fetchData}
        render={(item, lastRef) => {
          if (lastRef) return <li ref={lastRef}>{item.title}</li>;
          else return <li>{item.title}</li>;
        }}
      />
    </div>
  );
}
