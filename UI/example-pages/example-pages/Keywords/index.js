import React from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItem from '@material-ui/core/ListItem';
import * as util from '../Cards3/utils';
import List from '@material-ui/core/List';
import { global_lambda_value } from '../Cards3/lambda';
import { global_topic_num } from '../Cards3/index';

// todo: for top 30 keyword
var style = {};
var keyword_top = [];

var global_top_salient_terms = util.httpGet(
  'http://3.34.114.152:5006/top_salient_terms'
);

var top_freq = util.sortByValue(global_top_salient_terms['Freq']);
var max_total_freq = Math.max(
  ...Object.values(global_top_salient_terms['Total'])
);
var top_total_freq = global_top_salient_terms['Total'];
var top_term = global_top_salient_terms['Term'];
var term_list = Object.keys(top_term);
var num_term = term_list.length;
for (var ii = 0; ii < num_term; ii++) {
  var key = top_freq[ii][0];
  style['freq' + (ii + 1).toString()] = {
    width: ((top_freq[ii][1] / max_total_freq) * 100).toString() + '%',
    background: 'red',
    opacity: 0.8
  };
  style['total' + (ii + 1).toString()] = {
    width: ((top_total_freq[key] / max_total_freq) * 100).toString() + '%',
    background: 'blue',
    opacity: 0.2
  };
  keyword_top.push(top_term[key]);
}

export default class Keywords extends React.Component {
  constructor(props) {
    console.log('KEYWORD');
    super(props);
    this.num = props.id;
    // i = parseInt(i.toString);

    this.keyword_click = props.onClick2;
    this.handleClickSummary = props.onClick1;
    this.style = style;
    this.keyword_top = keyword_top;
    this.num_list = [];
    if (this.num == '10') {
      for (var i = 0; i < 10; i++) {
        if ((i + 1).toString().length == 2) {
          this.num_list.push((i + 1).toString());
        } else {
          this.num_list.push('0' + (i + 1).toString());
        }
      }
    } else if (this.num == '20') {
      for (i = 0; i < 20; i++) {
        if ((i + 1).toString().length == 2) {
          this.num_list.push((i + 1).toString());
        } else {
          this.num_list.push('0' + (i + 1).toString());
        }
      }
    } else if (this.num == '30') {
      for (i = 0; i < 30; i++) {
        if ((i + 1).toString().length == 2) {
          this.num_list.push((i + 1).toString());
        } else {
          this.num_list.push('0' + (i + 1).toString());
        }
      }
    }
    console.log('num_list:', this.num_list);
    this.style = {};
    this.keyword_top = [];
    var global_top_salient_terms,
      top_freq,
      max_total_freq,
      top_total_freq,
      top_term,
      term_list,
      num_term;

    // todo: for top 30 keyword
    if (global_topic_num == 'all') {
      this.style = {};
      this.keyword_top = [];
      console.log('componentDidUpdate keyword_all');
      global_top_salient_terms = util.httpGet(
        'http://3.34.114.152:5006/top_salient_terms'
      );

      top_freq = util.sortByValue(global_top_salient_terms['Freq']);
      max_total_freq = Math.max(
        ...Object.values(global_top_salient_terms['Total'])
      );
      top_total_freq = global_top_salient_terms['Total'];
      top_term = global_top_salient_terms['Term'];

      term_list = Object.keys(top_term);
      num_term = term_list.length;
      for (var ii = 0; ii < num_term; ii++) {
        var key = top_freq[ii][0];
        this.style['freq' + (ii + 1).toString()] = {
          width: ((top_freq[ii][1] / max_total_freq) * 100).toString() + '%',
          background: 'red',
          opacity: 0.8
        };
        this.style['total' + (ii + 1).toString()] = {
          width:
            ((top_total_freq[key] / max_total_freq) * 100).toString() + '%',
          background: 'blue',
          opacity: 0.2
        };
        this.keyword_top.push(top_term[key]);
      }
    } else {
      this.style = {};
      this.keyword_top = [];
      console.log('componentDidUpdate keyword_' + global_topic_num);
      global_top_salient_terms = util.httpGet(
        'http://3.34.114.152:5006/topic_relevance?topic=' +
          global_topic_num +
          '&lambda=' +
          global_lambda_value.toString()
      );
      top_freq = util.sortByValue(global_top_salient_terms['Freq']);
      max_total_freq = Math.max(
        ...Object.values(global_top_salient_terms['Total'])
      );
      top_total_freq = global_top_salient_terms['Total'];
      top_term = global_top_salient_terms['Term'];
      term_list = Object.keys(top_term);
      // console.log('top_term:', top_term);
      num_term = term_list.length;
      for (ii = 0; ii < num_term; ii++) {
        key = top_freq[ii][0];
        this.style['freq' + (ii + 1).toString()] = {
          width: ((top_freq[ii][1] / max_total_freq) * 100).toString() + '%',
          background: 'red',
          opacity: 0.8
        };
        this.style['total' + (ii + 1).toString()] = {
          width:
            ((top_total_freq[key] / max_total_freq) * 100).toString() + '%',
          background: 'blue',
          opacity: 0.2
        };
        this.keyword_top.push(top_term[key]);
      }
    }
  }
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
    // this.constructor(nextProps);
    console.log('componentWillReceiveProps');
    this.num = this.props.id;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidUpdate() {
    console.log('componentDidUpdate_keyword');
    console.log(this.props);
    console.log(this.props.id);
    //Update Chart Options & Render
    this.num = this.props.id;
    this.num_list = [];
    if (this.num == '10') {
      for (var i = 0; i < 10; i++) {
        if ((i + 1).toString().length == 2) {
          this.num_list.push((i + 1).toString());
        } else {
          this.num_list.push('0' + (i + 1).toString());
        }
      }
    } else if (this.num == '20') {
      for (i = 0; i < 20; i++) {
        if ((i + 1).toString().length == 2) {
          this.num_list.push((i + 1).toString());
        } else {
          this.num_list.push('0' + (i + 1).toString());
        }
      }
    } else if (this.num == '30') {
      for (i = 0; i < 30; i++) {
        if ((i + 1).toString().length == 2) {
          this.num_list.push((i + 1).toString());
        } else {
          this.num_list.push('0' + (i + 1).toString());
        }
      }
    }
    this.render();
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate() {
    console.log('componentDidUpdate keyword');
    this.render();
  }
  render() {
    const mapToComponent = data => {
      return data.map((j, i) => {
        return (
          <ListItem className="d-block">
            <div className="align-box-row">
              <div className="line-height-sm text-center ml-4">
                {/*<small className="text-black-50 d-block text-uppercase">*/}
                {/*  Keywords*/}
                {/*</small>*/}
                <b className="font-size-lg text-warning">
                  <small className="text-black-50 pr-1">{j}.</small>
                  <Button
                    id={'button' + (i + 1).toString()}
                    variant="contained"
                    color="secondary"
                    onClick={this.keyword_click}
                    value={this.keyword_top[i]}>
                    <b id={'keyword' + (i + 1).toString()}>
                      {this.keyword_top[i]}{' '}
                    </b>
                    {/*<span className="mr-3 badge badge-second">New</span>*/}
                    <span>
                      <FontAwesomeIcon icon={'angle-down'} />
                    </span>
                  </Button>
                </b>
              </div>
              <div className="flex-grow-1">
                <div className="miniBar">
                  <div
                    className="miniBarProgress"
                    id={'total-freq' + (i + 1).toString()}
                    style={this.style['total' + (i + 1).toString()]}></div>
                  <div
                    className="miniBarProgress"
                    id={'freq' + (i + 1).toString()}
                    style={this.style['freq' + (i + 1).toString()]}></div>
                </div>
              </div>
            </div>
            <h3 className="title">
              <p className="title_card" id={'title' + (i + 1).toString()}></p>
            </h3>
            <div
              className="p-4-4-4"
              id={'document' + (i + 1).toString() + '1'}
              onClick={(e) => this.handleClickSummary(e, (i + 1).toString(), '1')}></div>
            <div
              className="p-4-4-4"
              id={'document' + (i + 1).toString() + '2'}
              onClick={(e) => this.handleClickSummary(e, (i + 1).toString(), '2')}></div>
            <div
              className="p-4-4-4"
              id={'document' + (i + 1).toString() + '3'}
              onClick={(e) => this.handleClickSummary(e, (i + 1).toString(), '3')}></div>
            <div
              className="p-4-4-4"
              id={'document' + (i + 1).toString() + '4'}
              onClick={(e) => this.handleClickSummary(e, (i + 1).toString(), '4')}></div>
            <div
              className="p-4-4-4"
              id={'document' + (i + 1).toString() + '5'}
              onClick={(e) => this.handleClickSummary(e, (i + 1).toString(), '5')}></div>
          </ListItem>
        );
      });
    };

    return (
      <List>
        <div id="keyword" key={this.props.id}>
          {mapToComponent(this.num_list)}
        </div>
      </List>
    );
  }
}
