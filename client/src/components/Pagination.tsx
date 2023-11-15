import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cls } from "../libs/util";

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

const Pagination = ({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage,
}: Props) => {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;
  return (
    <div>
      <ul className="list-none">
        <li className={`${noPrev}`}>
          {/* <li className={cls(`${noPrev&& }`)}> */}
          <Link to={`?page=${start - 1}`}>이전</Link>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          <>
            {start + i <= totalPages && (
              <li key={i}>
                {/* <Link className={`${currentPage === start + i && styles.active}`} */}
                <Link
                  className={`${currentPage === start + i}`}
                  to={`?page=${start + i}`}
                >
                  {start + i}
                </Link>
              </li>
            )}
          </>
        ))}
        <li className={`${noNext}`}>
          {/* <li className={`${noNext && styles.visible}`}> */}
          <Link to={`?page=${start + pageCount}`}>다음</Link>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
