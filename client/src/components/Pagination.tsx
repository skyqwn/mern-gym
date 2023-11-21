import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
}

const Pagination = ({ totalPage, currentPage }: PaginationProps) => {
  const CONTAINER_SIZE = 5;
  const CONTAINER_LENGTH = Math.ceil(totalPage / CONTAINER_SIZE);
  const CURRENT_CONTAINER = Math.ceil(currentPage / CONTAINER_SIZE);

  const { pathname } = useLocation();
  return (
    <div className="flex gap-1 items-center justify-center pt-6 mt-auto">
      {CURRENT_CONTAINER > 1 && (
        <Link
          to={`${pathname}?page=${(CURRENT_CONTAINER - 1) * CONTAINER_SIZE}`}
        >
          <AiOutlineLeft />
        </Link>
      )}
      {Array.from(Array(totalPage), (e, i) => (
        <span key={i}>
          {Math.ceil((i + 1) / CONTAINER_SIZE) === CURRENT_CONTAINER && (
            <Link
              to={`${pathname}?page=${i + 1}`}
              className={` px-3 text-center rounded ${
                currentPage
                  ? String(currentPage) === String(i + 1) && "bg-accent"
                  : i + 1 === 1 && "bg-accent text-white"
              }`}
            >
              {i + 1}
            </Link>
          )}
        </span>
      ))}
      {CONTAINER_SIZE < totalPage && CONTAINER_LENGTH > CURRENT_CONTAINER && (
        <Link to={`${pathname}?page=${CURRENT_CONTAINER * CONTAINER_SIZE + 1}`}>
          <AiOutlineRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
