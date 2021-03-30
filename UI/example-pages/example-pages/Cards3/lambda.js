import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

export let global_lambda_value = 0.5;
export function Lambda() {
  const useStyles1 = makeStyles(theme => ({
    root: {
      width: 300
    },
    margin: {
      height: theme.spacing(3)
    }
  }));

  const marks = [
    {
      value: 0.0,
      label: '0 λ'
    },
    {
      value: 0.2,
      label: '0.2 λ'
    },
    {
      value: 0.4,
      label: '0.4 λ'
    },
    {
      value: 0.6,
      label: '0.6 λ'
    },
    {
      value: 0.8,
      label: '0.8 λ'
    },
    {
      value: 1.0,
      label: '1.0 λ'
    }
  ];
  const [value, setValue] = React.useState(global_lambda_value);

  const classes1 = useStyles1();

  function valuetext1(value) {
    return `${value} λ`;
  }
  const handleChangeLambda = (event, newValue) => {
    setValue(newValue);
    global_lambda_value = newValue;
  };

  return (
    <Fragment>
      <div className={classes1.root}>
        <Typography id="discrete-slider-always" gutterBottom>
          Lambda λ (0-1)
        </Typography>
        <Slider
          id="lambda-slider"
          defaultValue={0.7}
          getAriaValueText={valuetext1}
          onChange={handleChangeLambda}
          aria-labelledby="discrete-slider-always"
          step={0.1}
          marks={marks}
          valueLabelDisplay="on"
          max={1}
          value={value}
        />
      </div>
    </Fragment>
  );
}
