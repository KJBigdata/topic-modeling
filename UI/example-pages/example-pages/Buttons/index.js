import React, { Fragment, Component } from 'react';
// import Dropzone from 'react-dropzone'
import PageTitle from './pagetitle';
import { Container, Button, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Link } from 'react-router-dom';
import example from '../../assets/images/example.png'
import { ExampleWrapperSimple } from '../../layout-components';
import ButtonsColors from '../../example-components/Buttons/ButtonsColors';
import ButtonsOutline from '../../example-components/Buttons/ButtonsOutline';
import DropzoneArea from '../../example-components/Buttons/DropzoneArea';
import DropzoneDialog from '../../example-components/Buttons/DropzoneDialog';

import Dropzone from '../../example-components/Buttons/Dropzone';
import {
  Row, Col
} from "reactstrap";

import Upload from './UploadForm'
import Visualzie from './visualize'
import ModelingButton from './ModelingButton'

// const { createProxyMiddleware } = require('http-proxy-middleware');

export default function Buttons() {

  return (
    <Fragment>
      <PageTitle
        titleHeading="Data Upload"
        titleDescription="분석을 위한 데이터를 업로드 하는 페이지 입니다."
      />

      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <ExampleWrapperSimple sectionHeading="Input Data Format">
            <div><h6><Button className="m-2" variant="contained" color="secondary"><h6>확장자 </h6> </Button> <Button variant="outlined" color="secondary" className="m-2"><h6> .tsv</h6></Button></h6></div>
            <div><h6><Button className="m-2" variant="contained" color="secondary"><h6>날짜 형식</h6> </Button> <Button variant="outlined" color="secondary" className="m-2"><h6> yyyy-mm-dd</h6></Button></h6></div>
            <div><h6><Button className="m-2" variant="contained" color="secondary"><h6>데이터 타입</h6> </Button> <Button variant="outlined" color="secondary" className="m-2"><h6> 하나의 칼럼당 하나의 데이터 타입</h6></Button></h6></div>
            <div><h6><Button className="m-2" variant="contained" color="secondary"><h6>문서의 개수</h6> </Button> <Button variant="outlined" color="secondary" className="m-2"><h6> >=100</h6></Button></h6></div>


          </ExampleWrapperSimple>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ExampleWrapperSimple sectionHeading="Data Example ">
            <div className="text-center">
              <img
                // className="app-sidebar-logo"
                alt="example"
                src={example}
                width="100%"
                height="100%"
              />

              {/*<ButtonsGroups />*/}
              {/*<div className="divider my-2" />*/}
              {/*<ButtonsGroupsSizing />*/}
            </div>
          </ExampleWrapperSimple>
        </Grid>
        <Grid item xs={12}>
          <ExampleWrapperSimple sectionHeading="File Upload">
            {/* <Grid container spacing={6}> */}
            {/* <Grid item xs={3}> */}
            <Upload />
            {/* <Profile /> */}

            {/* <input type="file" name="File Upload" id="txtFileUpload" accept=".tsv" /></Grid> */}
            {/* <input type="file" id="input-file-now" className="file-upload" /> */}
            {/* </Grid> */}
            {/* <Grid item xs={3}> */}
            {/* <input type="submit" value="업로드" /> */}
            {/* </Grid> */}
            {/* </Grid> */}
            {/*<ButtonsColors />*/}

          </ExampleWrapperSimple>
        </Grid>
      </Grid>

      {/*<ExampleWrapperSimple sectionHeading="Links">*/}
      {/*<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>*/}
      {/*  {({getRootProps, getInputProps}) => (*/}
      {/*    <section>*/}
      {/*      <div {...getRootProps()}>*/}
      {/*        <input {...getInputProps()} />*/}
      {/*        <p>Drag 'n' drop some files here, or click to select files</p>*/}
      {/*      </div>*/}
      {/*    </section>*/}
      {/*  )}*/}
      {/*</Dropzone>*/}


      {/*<ImageAudioVideo/>*/}
      {/*<ButtonsLinks />*/}
      {/*</ExampleWrapperSimple>*/}
      <Grid item xs={12}>
        <ExampleWrapperSimple sectionHeading="Wordcloud for all documents">
          <Visualzie filename='wordcloud' />

          {/* <DropzoneArea /> */}
          {/* <DropzoneDialog /> */}
          {/*<ButtonsOutline />*/}
          {/*<ButtonsColors />*/}
          {/*<Dropzone />*/}
        </ExampleWrapperSimple>
        <Row className="justify-content-center">
          <ModelingButton/>
          {/* <Button
            to="/Cards3"
            component={Link}
            size="large"
            color="primary"
            variant="contained"
            className="m-2 py-3 px-5">
            <span className="btn-wrapper--label">Live Demo</span>
            <span className="btn-wrapper--icon">
              <FontAwesomeIcon icon={['fas', 'arrow-right']} />
            </span>
          </Button> */}
        </Row>
      </Grid>
    </Fragment>
  );
}
