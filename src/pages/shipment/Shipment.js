import React, { useState } from "react";
import * as XLSX from "xlsx";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import EnhancedTableToolbar from './component/EnhancedTableToolbar';
import EnhancedTableHead from './component/EnhancedTableHead';
import EnhancedTableBody from './component/EnhancedTableBody';
import DateRangePick from './component/DateRangePick';
import ModalInput from './component/ModalInput';
import RegisterMaterial from './component/RegisterMaterial';
import { Button, Grid, InputLabel } from "@mui/material";

export const Shipment = () => {
  // excel
  const [tables, setTables] = useState([]);
  // table
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // excel
  const handleFile = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workbook = XLSX.read(bufferArray, { type: "buffer" });
        const worksheetname = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetname];
        const data = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setTables(d);
    });
  };

  const handleOnExport = () => {
    var workbook = XLSX.utils.book_new(),
      worksheet = XLSX.utils.json_to_sheet(tables);

    XLSX.utils.book_append_sheet(workbook, worksheet, "test");
    XLSX.writeFile(workbook, "test.xlsx");
    console.log(tables);
  };

  // table
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tables.map((n) => n.product_num);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // 0, 1, 2
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tables.length) : 0;
  
  return (
    <Container maxWidth="xl">
        <div >
          <h1>1.구입재료 입고 처리</h1>
          <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <DateRangePick />
            <Grid container>
              <Grid item xs={1}>
                <ModalInput>
                  <RegisterMaterial />
                </ModalInput>
              </Grid>
              <Grid item xs={1}>
                <Button variant="contained">수정</Button>
              </Grid>
              <Grid item xs={1}>
                <Button 
                  variant="contained"
                  onClick={handleOnExport}
                  >
                    Export
                  </Button>
              </Grid>
              <Grid item xs={1}>
                <InputLabel 
                  style={{
                    "margin" : "0 0 0 20px",     
                    "border" : "1px solid #1976d2",
                    "borderRadius" : "3px",
                    "height" : "34.5px",
                    "fontSize" : "0.875rem",
                    "textAlign" : "center",
                    "display" : "flex",
                    "justifyContent" : "center",
                    "alignItems" : "center",
                    "color" : "#fff",
                    "backgroundColor" : "#1976d2",
                    "boxShadow": "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)"
                  }}
                  htmlFor="excel_import"
                  >
                    엑셀 등록</InputLabel>
                <input
                  id="excel_import"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    handleFile(file);
                  }}
                  style={{     
                    "display" : "none"
                  }}
                />
              </Grid>
          </Grid>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={tables.length}
                />
                <EnhancedTableBody
                  rows={tables}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  emptyRows={emptyRows}
                  isSelected={isSelected}
                  handleClick={handleClick}
                />
              </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tables.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
            </Paper>
            </Box>
        </div>
    </Container>
  );
};

export default Shipment;



  

