import React, { Fragment } from 'react';
import Popover from '@material-ui/core/Popover';
import { Card } from '@material-ui/core';
import popup from '../IconsPe7/popup'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));
export default function LivePreviewExample() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <Fragment>
      <div className="icon-demo-box">
        <Card className="p-2 text-primary opacity-5">

          <a id="popover" data-trigger="hover">Popover
          <span className="pe-7s-rocket font-size-xxl"></span></a>
        </Card>
        <Card className="p-2 text-success">
          <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
          ><span className="pe-7s-hourglass font-size-xxl"></span></Typography>
          <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>
          <div>keyword1 : 키워드</div>
          <div>keyword2 : 키워드</div>
          <div>keyword3 : 키워드</div>
          <div>keyword4 : 키워드</div>
        </Typography>
      </Popover>





        </Card>
        <Card className="p-2 text-warning">
          <span className="pe-7s-settings font-size-xxl"></span>
        </Card>
        <Card className="p-2 text-danger">
          <span className="pe-7s-leaf font-size-xxl"></span>
        </Card>
        <Card className="p-2 text-dark">
          <span className="pe-7s-piggy font-size-xxl"></span>
        </Card>
        <Card className="p-2 text-info">
          <span className="pe-7s-id font-size-xxl"></span>
        </Card>
        <Card className="p-2 text-first">
          <span className="pe-7s-world font-size-xxl"></span>
        </Card>
        <Card className="p-2 text-second">
          <span className="pe-7s-cloud-download font-size-xxl"></span>
        </Card>
        <Card className="p-2">
          <span className="pe-7s-umbrella font-size-xxl"></span>
        </Card>
        <Card className="p-2">
          <span className="pe-7s-shield font-size-xxl"></span>
        </Card>
        <Card className="p-2">
          <span className="pe-7s-radio font-size-xxl"></span>
        </Card>
        {/*<Card className="p-2">*/}
          {/*<span className="pe-7s-medal font-size-xxl"></span>*/}
        {/*</Card>*/}
      </div>
      <popup />
    {/*  <Popover*/}
    {/*    id="popover-basic"*/}
    {/*    placement="right"*/}
    {/*    positionLeft={200}*/}
    {/*    positionTop={50}*/}
    {/*    title="Popover right"*/}
    {/*    length = {120}>*/}
    {/*    And here's some <strong>amazing</strong> content. It's very engaging. right?*/}
    {/*</Popover>*/}
  </Fragment>
  );
}
