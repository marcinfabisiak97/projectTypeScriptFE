import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";
const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  paginate1,
  paginate2,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const dispatch = useDispatch();
  const { show } = bindActionCreators(actionCreators, dispatch);
  useEffect(() => {
    show(pageNumbers.length);
  }, [pageNumbers]);
  return (
    <nav className="pagination">
      <div className="pagination__el">
        <a onClick={() => paginate2(currentPage)} href="!#">
          previous
        </a>
        {pageNumbers.map((el, index) => {
          return (
            <div key={index}>
              <a onClick={() => paginate(el)} href="!#">
                {el}
              </a>
            </div>
          );
        })}
        <a onClick={() => paginate1(currentPage)} href="!#">
          next
        </a>
      </div>
    </nav>
  );
};

export default Pagination;
