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
  return (
    <nav className="pagination">
      <div className="pagination__el">
        <a onClick={() => paginate2(currentPage)} href="!#">
          previous
        </a>
        {pageNumbers.map((el) => {
          return (
            <div>
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
