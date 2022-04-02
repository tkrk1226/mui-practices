import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as XLSX from "xlsx";
import Container from "@mui/material/Container";

function createData(wear_date, product_num, product_name,
    weight, thickness, width, length,
    company, manager) {
    return { wear_date, product_num, product_name, weight, thickness, width, length, company, manager};
  }

export const Shipment = () => {
  const [tables, setTables] = useState([]);

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
    // worksheet = XLSX.utils.json_to_sheet(array);
    // worksheet = XLSX.utils.aoa_to_sheet(tables);

    XLSX.utils.book_append_sheet(workbook, worksheet, "test");
    XLSX.writeFile(workbook, "test.xlsx");
    console.log(tables);
  };

  return (
    <Container maxWidth="xl">
     

        <div >
          <h1>Excel Practice</h1>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              handleFile(file);
            }}
          />
          <button onClick={handleOnExport}>Export</button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>wear_date</TableCell>
                    <TableCell align="right">product_num</TableCell>
                    <TableCell align="right">product_name</TableCell>
                    <TableCell align="right">weight</TableCell>
                    <TableCell align="right">thickness</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {tables.map((row) => (
                    <TableRow
                    key={row.product_num}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.wear_date}
                    </TableCell>
                    <TableCell align="right">{row.product_num}</TableCell>
                    <TableCell align="right">{row.product_name}</TableCell>
                    <TableCell align="right">{row.weight}</TableCell>
                    <TableCell align="right">{row.thickness}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    </Container>
  );
};

export default Shipment;
