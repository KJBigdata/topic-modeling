import React, { Fragment } from 'react';

import { PageTitle } from '../../layout-components';
// import { Grid } from '@material-ui/core';
//
// import { ExampleWrapperSimple } from '../../layout-components';
//
// import ButtonsBasic from '../../example-components/Buttons/ButtonsBasic';
// import ButtonsGroups from '../../example-components/Buttons/ButtonsGroups';
// import ButtonsGroupsSizing from '../../example-components/Buttons/ButtonsGroupsSizing';
// import ButtonsColors from '../../example-components/Buttons/ButtonsColors';
// import ButtonsLinks from '../../example-components/Buttons/ButtonsLinks';
// import ButtonsOutline from '../../example-components/Buttons/ButtonsOutline';
// import ButtonsSizing from '../../example-components/Buttons/ButtonsSizing';

  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
  }
export default function Buttons() {
  return (

    <Fragment>

      <PageTitle
        titleHeading="LDA analysis"
        titleDescription="Visualizing by pyLDAvis."
      />

        {/*<iframe id='iframe2' src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/875ac953-bf8c-41bc-9838-8bca0c16102f/pyLDAvis.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T065352Z&X-Amz-Expires=86400&X-Amz-Signature=ad851d9b30ff1015f2288d2191106419494b02cbf8eaa88adcd1892720c9ce71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pyLDAvis.html%22" frameBorder="0"*/}
        {/*        styles="overflow: hidden; height: 100%;*/}
        {/*width: 100%; position: absolute;"></iframe>*/}
      {/*<iframe src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/875ac953-bf8c-41bc-9838-8bca0c16102f/pyLDAvis.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T065352Z&X-Amz-Expires=86400&X-Amz-Signature=ad851d9b30ff1015f2288d2191106419494b02cbf8eaa88adcd1892720c9ce71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pyLDAvis.html%22" frameBorder="0" scrolling="no" onLoad="resizeIframe(this)"/>*/}


      {/*<iframe src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/875ac953-bf8c-41bc-9838-8bca0c16102f/pyLDAvis.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T065352Z&X-Amz-Expires=86400&X-Amz-Signature=ad851d9b30ff1015f2288d2191106419494b02cbf8eaa88adcd1892720c9ce71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pyLDAvis.html%22" frameBorder="0" scrolling="no" onLoad="resizeIframe(this)"/>*/}

      <iframe src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/875ac953-bf8c-41bc-9838-8bca0c16102f/pyLDAvis.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T065352Z&X-Amz-Expires=86400&X-Amz-Signature=ad851d9b30ff1015f2288d2191106419494b02cbf8eaa88adcd1892720c9ce71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pyLDAvis.html%22"
  title="description" width='100%' height='1000'/>
      {/*<Grid container spacing={4}>*/}
      {/*<Grid item xs={24} lg={12}>*/}
      {/*<iframe src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/875ac953-bf8c-41bc-9838-8bca0c16102f/pyLDAvis.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T065352Z&X-Amz-Expires=86400&X-Amz-Signature=ad851d9b30ff1015f2288d2191106419494b02cbf8eaa88adcd1892720c9ce71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pyLDAvis.html%22" title="description"></iframe>*/}
      {/*</Grid>*/}
      {/*</Grid>*/}

      {/*<Grid container spacing={4}>*/}
      {/*  <Grid item xs={12} lg={6}>*/}
      {/*    <ExampleWrapperSimple sectionHeading="Basic">*/}
      {/*      <ButtonsBasic />*/}
      {/*      <div className="divider my-2" />*/}
      {/*      <ButtonsSizing />*/}
      {/*    </ExampleWrapperSimple>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12} lg={6}>*/}
      {/*    <ExampleWrapperSimple sectionHeading="Button groups">*/}
      {/*      <div className="text-center">*/}
      {/*        <ButtonsGroups />*/}
      {/*        <div className="divider my-2" />*/}
      {/*        <ButtonsGroupsSizing />*/}
      {/*      </div>*/}
      {/*    </ExampleWrapperSimple>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={12}>*/}
      {/*    <ExampleWrapperSimple sectionHeading="Colors">*/}
      {/*      <ButtonsColors />*/}
      {/*    </ExampleWrapperSimple>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      {/*<ExampleWrapperSimple sectionHeading="Links">*/}
        {/*<ButtonsLinks />*/}
      {/*<iframe src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/875ac953-bf8c-41bc-9838-8bca0c16102f/pyLDAvis.html?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201103%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201103T065352Z&X-Amz-Expires=86400&X-Amz-Signature=ad851d9b30ff1015f2288d2191106419494b02cbf8eaa88adcd1892720c9ce71&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pyLDAvis.html%22" title="description" width="100%" height="100vh"></iframe>*/}
      {/*</Grid>*/}

      {/*</ExampleWrapperSimple>*/}

      {/*<ExampleWrapperSimple sectionHeading="Outline">*/}
      {/*  <ButtonsOutline />*/}
      {/*</ExampleWrapperSimple>*/}
            <script>
self.resizeTo(document.body.scrollWidth , document.body.scrollHeight + 10);
</script>


    </Fragment>
  );

}
