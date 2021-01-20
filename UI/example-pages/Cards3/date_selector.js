import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

import { global_filtered_data } from './nested_menu.js';

var max_date = Object.values(global_filtered_data['max_date'])[0];
// console.log('max_date:', max_date);
max_date = max_date.toString();
max_date = max_date.substring(0,4) + '-' + max_date.substring(4,6) + '-' + max_date.substring(6,8)
// console.log('max_date:', max_date);
var min_date = Object.values(global_filtered_data['min_date'])[0];
min_date = min_date.toString();
min_date = min_date.substring(0,4) + '-' + min_date.substring(4,6) + '-' + min_date.substring(6,8)
// console.log('min_date:', min_date);

class DateSelector extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.id.includes('start')) {
      this.state = {
        dateselcected: new Date(min_date),
        id: this.props.id
      };
      // console.log(min_date);
    } else {
      this.state = {
        dateselcected: new Date(max_date),
        id: this.props.id
      };
      // console.log(max_date);
    }
  }

  handleDateChange = (event, date) => {
    // console.log(this.state.dateselcected);
    // console.log('date: ',date);
    this.setState({ dateselcected: date });
    // console.log('after' + this.state.dateselcected);
  };

  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        {/*<Grid container justify="space-around">*/}

        <KeyboardDatePicker
          autoOk
          variant="inline"
          format="yyyy-MM-dd"
          margin="normal"
          id={this.state.id}
          label={this.state.id}
          value={this.state.dateselcected}
          onChange={this.handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          minDate={min_date}
          maxDate={max_date}
        />
        {/*</Grid>*/}
      </MuiPickersUtilsProvider>
    );
  }
}

export default DateSelector;
