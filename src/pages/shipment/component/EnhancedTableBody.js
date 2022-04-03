import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react'

const EnhancedTableBody = ({rows, page, rowsPerPage, emptyRows, isSelected, handleClick}) => {
  return (
    <TableBody>
        {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
            const isItemSelected = isSelected(row.product_num);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
            <TableRow
                hover
                onClick={(event) => handleClick(event, row.product_num)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.product_num}
                selected={isItemSelected}
            >
                <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                    'aria-labelledby': labelId,
                    }}
                />
                </TableCell>
                <TableCell align="center">{row.wear_date}</TableCell>
                <TableCell align="center">{row.product_num}</TableCell>
                <TableCell align="center">{row.product_name}</TableCell>
                <TableCell align="center">{row.weight}</TableCell>
                <TableCell align="center">{row.thickness}</TableCell>
                <TableCell align="center">{row.width}</TableCell>
                <TableCell align="center">{row.length}</TableCell>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell align="center">{row.manager}</TableCell>
            </TableRow>
            );
        })}
        {emptyRows > 0 && (
        <TableRow
            style={{
            height: (53) * emptyRows,
            }}
        >
            <TableCell colSpan={6} />
        </TableRow>
        )}
    </TableBody>
  )
}

export default EnhancedTableBody