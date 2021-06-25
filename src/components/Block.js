import React from "react"
import PropTypes from "prop-types";
import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    padding: "8px",
    margin: "4px 0"
  },
  header: {
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(10),
    lineHeight: "16px",
    letterSpacing: "1.5px",
    color: "#304FFE",
  },
  body: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: theme.typography.pxToRem(14),
    lineHeight: "20px",
    letterSpacing: "0.25px",
    color: "#263238"
  }
}));

const Block = props => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle1" className={classes.header}>
        { String(props.id).padStart(3, '0') }
      </Typography>
      <Typography variant="body1" className={classes.body}>{ props.data }</Typography>
    </Box>
  );
};

Block.propTypes = {
  id: PropTypes.number,
  data: PropTypes.string
}

export default Block;
