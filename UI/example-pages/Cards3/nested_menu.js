import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { Menu, Typography } from '@material-ui/core';
import NestedMenuItem from 'material-ui-nested-menu-item';
import * as util from "./utils";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper
    }
  })
);
export var global_filtered_data = util.httpGet('http://3.34.114.152:5002/filtered_data?category1=all&category2=all');

// var url = 'http://3.34.114.152:5002/filtered_data?press=all&category=all';
// const data = util.httpGet(url);


var unselect_option1 = ['date', 'title', 'content', 'tokens', 'd2c', 'key_sentence', 'entity', 'max_date', 'min_date'];
var select_option1 = Object.keys(global_filtered_data);
var options_key = [];
var options = {};
// console.log('unselect_option1', unselect_option1);
// console.log('select_option1', select_option1);
for (var i = 0; i < select_option1.length; i++) {
  // console.log(select_option1[i]);
  if (!unselect_option1.includes(select_option1[i])) {
    options_key.push(select_option1[i]);
    // console.log('COL:', select_option1[i]);
    var option = Array.from(new Set(Object.values(global_filtered_data[select_option1[i]])));
    // console.log('option: ', option);
    options[select_option1[i]] = option;
  }
}

export function SimpleListMenu() {
  // console.log('options:', options);

  var row1 = '';
  var row2 = '';
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuPosition, setMenuPosition] = React.useState(null);
  const [selectedIndex1, setSelectedIndex1] = React.useState(1);
  const [selectedIndex2, setSelectedIndex2] = React.useState(1);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    // console.log('current : ', event.currentTarget);
  };

  const handleMenuItemClick1 = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    // if (menuPosition) {
    //   return;
    // }
    event.preventDefault();
    setMenuPosition({
      top: event.pageY,
      left: event.pageX
    });
    setSelectedIndex1(index);
    setAnchorEl(null);
    // console.log('1: ', index);
    row1 = index;
    // console.log('row1_: ', row1);
  };

  const handleMenuItemClick2 = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    // if (menuPosition) {
    //   return;
    // }
    // event.preventDefault();
    // setMenuPosition({
    //   top: event.pageY,
    //   left: event.pageX
    // });
    setSelectedIndex2(index);
    setAnchorEl(null);
    row2 = index;
    // console.log('row2_: ', row2);
    // console.log('2: ', index);
    // console.log('nested_menu:', document.getElementById('nested_menu'));
    // console.log(
    //   'nested_menu:',
    //   document.getElementById('nested_menu').innerText
    // );
    row1 = selectedIndex1;
    // console.log('row1:', selectedIndex);
    // console.log('row1:', row1);
    // console.log('row1:', options2[row1]);
    // console.log('row1:', options1[options2[row1]]);
    // console.log('row2:', row2);
    // console.log('row2:', options1[options2[row1]][row2]);
    document.getElementById('selected_menu').innerText =
      options_key[row1] + ':' + options[options_key[row1]][row2];
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuPosition(null);
  };

  return (
    <div className={classes.root}>
      <List id="select_box" component="nav" aria-label="Device settings">
        <ListItem
          button
          className='select_box'
          id="select_box"
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Data Filtering"
          onClick={handleClickListItem}>
          <ListItemText className="nested_select" id="select_box" primary="Column Select" />
          <Typography id="selected_menu"> ALL </Typography>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorPosition={menuPosition}>
        {options_key.map((option, index) => (
          <NestedMenuItem
            label={option}
            // key={option}
            // disabled={index === 0}
            selected={index === selectedIndex1}
            parentMenuOpen={!!menuPosition}
            onClick={event => handleMenuItemClick1(event, index)}>
            {options[option].map((option, index_sub) => (
              <MenuItem
                key={option}
                onClick={event => handleMenuItemClick2(event, index_sub)}
                selected={index_sub === selectedIndex2}
                // disabled={index === 0}
                // label = {option}
              >
                {option}
              </MenuItem>
            ))}
          </NestedMenuItem>
        ))}
      </Menu>
    </div>
  );
}
