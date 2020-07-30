import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#FC636B',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: "80%",
  },
}));

export default function ReviewCauseTable({causes,image, clicked}) {
 for (const data of causes) {
    console.log('jffjhfhjhf',data);
}
  const rows = [
    causes[0],
    causes[1],
    causes[2],
  ];
  //console.log('dataaaaa...',8)
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Cause Photo</StyledTableCell>
            <StyledTableCell align="right">Cause title</StyledTableCell>
            <StyledTableCell align="right">Amount required</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">View</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(cause=> (
            <StyledTableRow key={cause._id}>
            <StyledTableCell align="right">
                <Avatar src={image} />
              </StyledTableCell>
              <StyledTableCell align="right">{cause.cause_title}</StyledTableCell>
              <StyledTableCell align="right">{cause.amount_required}</StyledTableCell>
              <StyledTableCell align="right">{cause.cause_status}</StyledTableCell>
              <StyledTableCell align="right">{cause.category}</StyledTableCell>
              <StyledTableCell align="right">
              <div style={{textAlign: "center", width: "100%"}} >
              <Button
                  onClick={() => clicked()}
                  variant="contained"
                  color="primary"
                  style={{
                    margin: "30px auto",
                    color: "white",
                    paddingLeft: "30px",
                    paddingRight: "30px"                    
                  }}
                >
                  View Details
              </Button>
            </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
