import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react'

const EnhancedTableBody = ({rows, page, rowsPerPage, emptyRows, isSelected, handleClick}) => {
  return (
    <TableBody>
        {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
            const isItemSelected = isSelected(row.name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
            <TableRow
                hover
                onClick={(event) => handleClick(event, row.name)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
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
                <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
                >
                {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
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