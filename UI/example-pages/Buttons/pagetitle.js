import React, { Fragment } from 'react';

import { Paper } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import fileDownload from 'file-saver';


const actions = [
  { icon: <SaveIcon />, name: 'Save' }
];

function PageTitle(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const sampleDownload = async (file_name, file_path) => {
     const res = await fetch('http://3.34.114.152:5005/sample_download?filename=sample_1000_news.tsv', {
       responseType: 'blob',
       method: 'GET'
     });
 
     fileDownload(await (await new Response(res.body)).blob(), 'sample_1000_news.tsv');
 
   }

  return (
    <Fragment>
      <Paper square elevation={2} className="app-page-title">
        <div>
          <div className="app-page-title--first">
            <div className="app-page-title--heading">
              <h1>{props.titleHeading}</h1>
              <div className="app-page-title--description">
                {props.titleDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="speedial-wrapper">
            <SpeedDial
              ariaLabel="SpeedDial menu"
              icon={<SpeedDialIcon openIcon={<EditIcon />} />}
              onClose={handleClose}
              onOpen={handleOpen}
              direction="left"
              open={open}>
              {actions.map(action => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={sampleDownload}
                />
              ))}
            </SpeedDial>
          </div>
        </div>
      </Paper>
    </Fragment>
  );
}

export default PageTitle;
