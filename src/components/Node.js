import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  makeStyles,
  Box,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import Block from "./Block";

const Node = ({ node, expanded, toggleNodeExpanded }) => {
  const classes = useStyles();

  const blocksView = (node) => {
    if (node.loadingBlocks) {
      return 'loading';
    }
    if (node.blocks === false) {
      return 'error';
    }
    if (node.blocks?.length === 0) {
      return 'Empty blocks';
    }
    return node.blocks?.map(block => {
      return <Block id={block.id} data={block?.attributes?.data} />
    });
  };

  return (
    <Accordion
      elevation={3}
      className={classes.root}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummary
        className={classes.summary}
        classes={{
          expandIcon: classes.icon,
          content: classes.content,
          expanded: classes.expanded,
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Box className={classes.summaryContent}>
          <Box>
            <Typography variant="h5" className={classes.heading}>
              {node.name || "Unknown"}
            </Typography>
            <Typography
              variant="subtitle1"
              className={classes.secondaryHeading}
            >
              {node.url}
            </Typography>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.body}>
        <Box className={classes.bodyContent}>{blocksView(node)}</Box>
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "16px 0",
    boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",
    "&:before": {
      backgroundColor: "unset",
    },
  },
  summary: {
    padding: "0 24px",
  },
  summaryContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20,
  },
  icon: {
    color: colors.faded,
  },
  content: {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  expanded: {
    "& $icon": {
      // paddingLeft: 0,
      // paddingRight: 12,
      // top: -10,
      // marginRight: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    display: "block",
    color: colors.text,
    lineHeight: 1.5,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: colors.faded,
    lineHeight: 2,
  },
  body: {
    padding: "0 24px",
  },
  bodyContent: {
    width: '100%'
  }
}));

Node.propTypes = {
  node: PropTypes.shape({
    url: PropTypes.string,
    online: PropTypes.bool,
    name: PropTypes.string,
    loading: PropTypes.bool,
    blocks: PropTypes.array | PropTypes.bool,
    loadingBlocks: PropTypes.bool
  }).isRequired,
  expanded: PropTypes.bool,
  toggleNodeExpanded: PropTypes.func.isRequired,
};

export default Node;
