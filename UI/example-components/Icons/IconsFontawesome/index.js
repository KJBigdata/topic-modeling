import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card, Tooltip } from '@material-ui/core';
// import HeaderUserbox from "../../../layout-components/HeaderUserbox";
// import MenuOpenRoundedIcon from "@material-ui/icons/MenuOpenRounded";
// import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

export default function LivePreviewExample(props) {
  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const { sidebarToggleMobile, setSidebarToggleMobile } = props;

  return (
    <Fragment>
      <div className="icon-demo-box">
        {/*<Box className="d-flex align-items-center">*/}
        {/*    <HeaderUserbox />*/}

        {/*    <Box className="toggle-sidebar-btn-mobile">*/}
        {/*      <Tooltip title="Toggle Sidebar" placement="right">*/}
        {/*        /!*<IconButton*!/*/}
        {/*        /!*  color="inherit"*!/*/}
        {/*        /!*  onClick={toggleSidebarMobile}*!/*/}
        {/*        /!*  size="medium">*!/*/}
        {/*        /!*  {sidebarToggleMobile ? (*!/*/}
        {/*        /!*    <MenuOpenRoundedIcon />*!/*/}
        {/*        /!*  ) : (*!/*/}
        {/*        /!*    <MenuRoundedIcon />*!/*/}
        {/*        /!*  )}*!/*/}
        {/*        /!*</IconButton>*!/*/}
        {/*        <Card className="p-2 text-primary">*/}
        {/*          <FontAwesomeIcon*/}
        {/*            icon={['far', 'building']}*/}
        {/*            className="font-size-xxl"*/}
        {/*            onClick={toggleSidebarMobile}*/}
        {/*          />Topic 1*/}
        {/*          {sidebarToggleMobile ? (*/}
        {/*            <MenuOpenRoundedIcon />*/}
        {/*          ) : (*/}
        {/*            <MenuRoundedIcon />*/}
        {/*          )}*/}
        {/*        </Card>*/}

        {/*      </Tooltip>*/}
        {/*    </Box>*/}

        {/*  </Box>*/}

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-primary">
            <FontAwesomeIcon
              icon={['far', 'building']}
              className="font-size-xxl"
              onClick={toggleSidebarMobile}
            />
            Topic 1
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-success">
            <FontAwesomeIcon
              icon={['far', 'keyboard']}
              className="font-size-xxl"
            />
            Topic 2
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-warning">
            <FontAwesomeIcon
              icon={['far', 'lightbulb']}
              className="font-size-xxl"
            />
            Topic 3
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-danger">
            <FontAwesomeIcon
              icon={['far', 'comment-dots']}
              className="font-size-xxl"
            />
            Topic 4
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-dark">
            <FontAwesomeIcon
              icon={['far', 'images']}
              className="font-size-xxl"
            />
            Topic 5
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-info">
            <FontAwesomeIcon
              icon={['far', 'object-group']}
              className="font-size-xxl"
            />
            Topic 6
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-first">
            <FontAwesomeIcon icon={['far', 'user']} className="font-size-xxl" />
            Topic 7
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2 text-second">
            <FontAwesomeIcon icon={['far', 'gem']} className="font-size-xxl" />
            Topic 8
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2">
            <FontAwesomeIcon
              icon={['far', 'clock']}
              className="font-size-xxl"
            />
            Topic 9
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2">
            <FontAwesomeIcon
              icon={['far', 'question-circle']}
              className="font-size-xxl"
            />
            Topic 10
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2">
            <FontAwesomeIcon
              icon={['far', 'file-video']}
              className="font-size-xxl"
            />
            Topic 11
          </Card>
        </Tooltip>

        <Tooltip title="Keywords: 키워드" placement="right">
          <Card className="p-2">
            <FontAwesomeIcon
              icon={['far', 'chart-bar']}
              className="font-size-xxl"
            />
            Topic 12
          </Card>
        </Tooltip>
      </div>
    </Fragment>
  );
}
