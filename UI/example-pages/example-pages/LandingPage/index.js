import React, { Fragment } from 'react';

import { Grid, Container, Button, Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import hero9 from '../../assets/images/hero-bg/hero-11.jpeg';

const LandingPage = () => {
  return (
    <Fragment>


      <div className="hero-wrapper bg-composed-wrapper bg-premium-dark min-vh-100">
        <div className="flex-grow-1 w-100 d-flex align-items-center ">
          <div
            className="bg-composed-wrapper--image"
            style={{ backgroundImage: 'url(' + hero9 + ')' }}
          >
          {/*<div className="bg-composed-wrapper--bg bg-second opacity-10" />*/}
          {/*<div className="bg-composed-wrapper--bg bg-red-lights opacity-5" />*/}
          <div className="bg-composed-wrapper--content pt-5 pb-2 py-lg-5">
            <Container maxWidth="md" className="pb-5">
              <Grid container spacing={12}>

                <Grid
                  item
                  lg={10}
                  className="px-0 mx-auto d-flex align-items-center">
                  <div className="text-center">
                    <Tooltip arrow placement="top" title="Version: 1.0.0">
                      <span className="badge badge-success px-4 text-uppercase h-auto py-1">
                        developed by AI-tech team
                      </span>
                    </Tooltip>
                    <div className="px-4 px-sm-0 text-white mt-4">

                      <h1 className="display-2 mb-5 font-weight-bold">
                        <br></br>
                        <p></p>
                        Web for Extracting Hot Topic
                      </h1>

                      {/*<p className="font-size-xl text-white-50 mb-3">*/}
                      {/*  This is just a demo page.*/}
                      {/*</p>*/}
                      <p className="text-white font-size-xxl">
                        1. Upload data to be analyzed
                      </p>
                      <p className="text-white font-size-xxl">
                        2. Show result of modeling
                        <p></p>
                        <p className="font-size-lg text-white-50 mb-3">
                        - Topic modeling by using LDA
                      </p>
                        <p className="font-size-lg text-white-50 mb-3">
                        - Top Keywords with related documents
                      </p>
                        <p className="font-size-lg text-white-50 mb-3">
                        - Stasitics information about analysis
                      </p>
                        <p className="font-size-lg text-white-50 mb-3">
                        - Applying module of KBSTA
                      </p>

                      </p>

                      <div className="divider border-2 border-light my-5 border-light mx-auto rounded-circle w-50" />
                      <div>
                        <Button
                          to="/Buttons"
                          component={Link}
                          size="large"
                          color="primary"
                          variant="contained"
                          className="m-2 py-3 px-5"
                          title="View Carolina React Admin Dashboard with Material-UI Free Live Preview">
                          <span className="btn-wrapper--label">Live Demo</span>
                          <span className="btn-wrapper--icon">
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                          </span>
                        </Button>
                        {/*<Button*/}
                        {/*  size="large"*/}
                        {/*  color="secondary"*/}
                        {/*  variant="contained"*/}
                        {/*  href="https://uifort.com/template/carolina-react-admin-dashboard-material-ui-free"*/}
                        {/*  className="m-2 py-3 px-5"*/}
                        {/*  target="_blank"*/}
                        {/*  title="Download Carolina React Admin Dashboard with Material-UI Free">*/}
                        {/*  /!*<span className="btn-wrapper--icon">*!/*/}
                        {/*  /!*  <FontAwesomeIcon icon={['fas', 'download']} />*!/*/}
                        {/*  /!*</span>*!/*/}
                        {/*  /!*<span className="btn-wrapper--label">*!/*/}
                        {/*  /!*  Download now*!/*/}
                        {/*  /!*</span>*!/*/}
                        {/*</Button>*/}
                        {/*<Button*/}
                        {/*  href="https://uifort.com/template/carolina-react-admin-dashboard-material-ui-pro"*/}
                        {/*  target="_blank"*/}
                        {/*  size="large"*/}
                        {/*  className="m-2 py-3 px-5"*/}
                        {/*  color="default"*/}
                        {/*  variant="contained"*/}
                        {/*  title="Learn more about Carolina React Admin Dashboard with Material-UI Free version">*/}
                        {/*  <span className="btn-wrapper--icon">*/}
                        {/*    <FontAwesomeIcon*/}
                        {/*      icon={['fas', 'external-link-alt']}*/}
                        {/*    />*/}
                        {/*  </span>*/}
                        {/*  <span className="btn-wrapper--label">*/}
                        {/*    PRO Version*/}
                        {/*  </span>*/}
                        {/*</Button>*/}
                      </div>
                      <small className="d-block pt-4">
                         2020-11
                      </small>

                    </div>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </div>
         </div>
          </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
