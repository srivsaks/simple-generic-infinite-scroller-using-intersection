import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { useOnScreen } from "../src/useOnScreen";

export const InfiniteScroller = ({
  onChange,
  loading,
  data,
  render,
  onScrollToEnd
}) => {
  const [val, setVal] = useState("");
  const lastRef = useRef(null);
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const onChangeInput = useCallback(
    (e) => {
      setVal(e.target.value);
      onChange(e.target.value, page);
    },
    [page]
  );

  const lastEleWrapperRef = useCallback(
    (node) => {
      if (loading) return;
      if (lastRef.current) lastRef.current.disconnect();
      lastRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage(page + 1);
          onScrollToEnd(val, page + 1);
        }
      });
      if (node) lastRef.current.observe(node);
    },
    [val, loading]
  );

  /*useEffect(() => {
    console.log(lastItemRef);
  }, [lastItemRef]);*/

  return (
    <div>
      <input value={val} onChange={onChangeInput} />
      <div>
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => {
            if (index === listData.length - 1)
              return (
                <div key={item.title + "" + index}>
                  {render(item, lastEleWrapperRef)}
                </div>
              );
            else return <div key={item.title + "" + index}>{render(item)}</div>;
          })}
        {loading && <div>Loading data...</div>}
      </div>
    </div>
  );
};
