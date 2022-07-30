import React from "react";
import "./bootstrap-table.scss";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const BootstrapTableComp = ({
  bootstrapCustomClasses = "",
  tableBordered = true,
  keyField = "_id",
  headerColumns = [],
  tableData = [],
  tableEditAction = () => {},
}) => {
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing
      <span className="react-bootstrap-table-pagination-total-numbers">
        {" "}
        {from}{" "}
      </span>
      to
      <span className="react-bootstrap-table-pagination-total-numbers">
        {" "}
        {to}{" "}
      </span>
      of
      <span className="react-bootstrap-table-pagination-total-numbers">
        {" "}
        {size}{" "}
      </span>
      Results
    </span>
  );

  const options = {
    paginationSize: 5,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "15",
        value: 15,
      },
      {
        text: "20",
        value: 20,
      },
      // {
      //   text: "All",
      //   value: tableData.length,
      // },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };

  return (
    <div className={`budget-app-bootstrap-table ${bootstrapCustomClasses}`}>
      <BootstrapTable
        bordered={tableBordered}
        keyField={keyField}
        columns={headerColumns}
        data={tableData}
        noDataIndication="There is no data to display here..."
        pagination={paginationFactory(options)}
      />
    </div>
  );
};

export default BootstrapTableComp;
