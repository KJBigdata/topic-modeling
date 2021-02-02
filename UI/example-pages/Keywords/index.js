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
  'http://3.34.114.152:5003/top_salient_terms'
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
    super(props);
    console.log('&&&&&&&&&&&&&&&&&&');
    console.log('keyword constructed');
    this.num = props.id;
    // i = parseInt(i.toString);

    this.keyword_click = props.onClick;
    this.handleClickSummary = props.onClick1;
    this.style = style;
    this.keyword_top = keyword_top;
    this.num_list = [];
    if (this.num == '10') {
      for (var i = 0; i < 10; i++) {
        this.num_list.push((i + 1).toString());
      }
    } else if (this.num == '20') {
      for (i = 0; i < 20; i++) {
        this.num_list.push((i + 1).toString());
      }
    } else if (this.num == '30') {
      for (i = 0; i < 30; i++) {
        this.num_list.push((i + 1).toString());
      }
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any) {
    // this.constructor(nextProps);
    console.log('componentWillReceiveProps');
    this.num = this.props.id;
        this.num_list = [];
    if (this.num == '10') {
      for (var i = 0; i < 10; i++) {
        this.num_list.push((i + 1).toString());
      }
    } else if (this.num == '20') {
      for (i = 0; i < 20; i++) {
        this.num_list.push((i + 1).toString());
      }
    } else if (this.num == '30') {
      for (i = 0; i < 30; i++) {
        this.num_list.push((i + 1).toString());
      }
    }
    this.render();
    this.forceUpdate();
    console.log(nextProps);
    this.setState(nextProps);
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
        this.num_list.push((i + 1).toString());
      }
    } else if (this.num == '20') {
      for (i = 0; i < 20; i++) {
        this.num_list.push((i + 1).toString());
      }
    } else if (this.num == '30') {
      for (i = 0; i < 30; i++) {
        this.num_list.push((i + 1).toString());
      }
    }
    this.render();
    // this.forceUpdate();
  }
  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate() {
    // this.num = props.id;
    // this.num_list = [];
    // if (this.num == '10') {
    //   for (var i = 0; i < 10; i++) {
    //     this.num_list.push((i + 1).toString());
    //   }
    // } else if (this.num == '20') {
    //   for (i = 0; i < 20; i++) {
    //     this.num_list.push((i + 1).toString());
    //   }
    // } else if (this.num == '30') {
    //   for (i = 0; i < 30; i++) {
    //     this.num_list.push((i + 1).toString());
    //   }
    // }
    console.log('componentDidUpdate keyword');
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
        'http://3.34.114.152:5003/top_salient_terms'
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
        'http://3.34.114.152:5003/topic_relevance?topic=' +
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
      // console.log('keyword_top: ', this.keyword_top);
      // console.log('style: ', this.style);
    }

    this.render();
    // this.forceUpdate()
  }
  render() {
    const mapToComponent = data => {
      return data.map(i => {
        return (
          <ListItem className="d-block">
            <div className="align-box-row">
              <div className="line-height-sm text-center ml-4">
                {/*<small className="text-black-50 d-block text-uppercase">*/}
                {/*  Keywords*/}
                {/*</small>*/}
                <b className="font-size-lg text-warning">
                  <small className="text-black-50 pr-1">0{i}.</small>
                  <Button
                    id={'button' + i.toString()}
                    variant="contained"
                    color="secondary"
                    onClick={this.keyword_click}
                    value={this.keyword_top[i - 1]}>
                    <b id={'keyword' + i.toString()}>
                      {this.keyword_top[i - 1]}{' '}
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
                    id={'total-freq' + i.toString()}
                    style={this.style['total' + i.toString()]}></div>
                  <div
                    className="miniBarProgress"
                    id={'freq' + i.toString()}
                    style={this.style['freq' + i.toString()]}></div>
                </div>
              </div>
            </div>
            <h3 className="title">
              <p className="title_card" id={'title' + i.toString()}></p>
            </h3>
            <div
              className="p-4-4-4"
              id={'document' + i.toString() + '1'}
              onClick={this.handleClickSummary(i.toString(), '1')}></div>
            <div
              className="p-4-4-4"
              id={'document' + i.toString() + '2'}
              onClick={this.handleClickSummary(i.toString(), '2')}></div>
            <div
              className="p-4-4-4"
              id={'document' + i.toString() + '3'}
              onClick={this.handleClickSummary(i.toString(), '3')}></div>
            <div
              className="p-4-4-4"
              id={'document' + i.toString() + '4'}
              onClick={this.handleClickSummary(i.toString(), '4')}></div>
            <div
              className="p-4-4-4"
              id={'document' + i.toString() + '5'}
              onClick={this.handleClickSummary(i.toString(), '5')}></div>
          </ListItem>
        );
      });
    };

    return (
      <List>
        <div id="keyword" key={this.props.id}>{mapToComponent(this.num_list)}</div>
      </List>
    );
    // return (
    //   <List>
    //     <div id="keyword">
    //
    //       {/*<ListItem className="d-block">*/}
    //       {/*  <div className="align-box-row">*/}
    //       {/*    <div className="line-height-sm text-center ml-4">*/}
    //       {/*      /!*<small className="text-black-50 d-block text-uppercase">*!/*/}
    //       {/*      /!*  Keywords*!/*/}
    //       {/*      /!*</small>*!/*/}
    //       {/*      <b className="font-size-lg text-warning">*/}
    //       {/*        <small className="text-black-50 pr-1">01.</small>*/}
    //       {/*        <Button*/}
    //       {/*          id={'button' + '1'}*/}
    //       {/*          variant="contained"*/}
    //       {/*          color="secondary"*/}
    //       {/*          onClick={this.keyword_click}*/}
    //       {/*          value={this.keyword_top[0]}>*/}
    //       {/*          <b id={'keyword' + '1'}>*/}
    //       {/*            {this.keyword_top[0]}{' '}*/}
    //       {/*          </b>*/}
    //       {/*          /!*<span className="mr-3 badge badge-second">New</span>*!/*/}
    //       {/*          <span>*/}
    //       {/*            <FontAwesomeIcon icon={'angle-down'} />*/}
    //       {/*          </span>*/}
    //       {/*        </Button>*/}
    //       {/*      </b>*/}
    //       {/*    </div>*/}
    //       {/*    <div className="flex-grow-1">*/}
    //       {/*      <div className="miniBar">*/}
    //       {/*        <div*/}
    //       {/*          className="miniBarProgress"*/}
    //       {/*          id={'total-freq' + '1'}*/}
    //       {/*          style={this.style['total' + '1']}></div>*/}
    //       {/*        <div*/}
    //       {/*          className="miniBarProgress"*/}
    //       {/*          id={'freq1'}*/}
    //       {/*          style={this.style['freq' + '1']}></div>*/}
    //       {/*      </div>*/}
    //       {/*    </div>*/}
    //       {/*  </div>*/}
    //       {/*  <h3 className="title">*/}
    //       {/*    <p className="title_card" id={'title' + '1'}></p>*/}
    //       {/*  </h3>*/}
    //       {/*  <div*/}
    //       {/*    className="p-4-4-4"*/}
    //       {/*    id={'document' + '1' + '1'}*/}
    //       {/*    onClick={this.handleClickSummary('1', '1')}></div>*/}
    //       {/*  <div*/}
    //       {/*    className="p-4-4-4"*/}
    //       {/*    id={'document' + '1' + '2'}*/}
    //       {/*    onClick={this.handleClickSummary('1', '2')}></div>*/}
    //       {/*  <div*/}
    //       {/*    className="p-4-4-4"*/}
    //       {/*    id={'document' + '1' + '3'}*/}
    //       {/*    onClick={this.handleClickSummary('1', '3')}></div>*/}
    //       {/*  <div*/}
    //       {/*    className="p-4-4-4"*/}
    //       {/*    id={'document' + '1' + '4'}*/}
    //       {/*    onClick={this.handleClickSummary('1', '4')}></div>*/}
    //       {/*  <div*/}
    //       {/*    className="p-4-4-4"*/}
    //       {/*    id={'document' + '1' + '5'}*/}
    //       {/*    onClick={this.handleClickSummary('1', '5')}></div>*/}
    //       {/*</ListItem>*/}
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">02.</small>
    //               <Button
    //                 id="button2"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[1]}>
    //                 <b id={'keyword2'}>{this.keyword_top[1]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq2'}
    //                 style={this.style['total2']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq2'}
    //                 style={this.style['freq2']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title2'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document21'}
    //           onClick={this.handleClickSummary('2', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document22'}
    //           onClick={this.handleClickSummary('2', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document23'}
    //           onClick={this.handleClickSummary('2', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document24'}
    //           onClick={this.handleClickSummary('2', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document25'}
    //           onClick={this.handleClickSummary('2', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">03.</small>
    //               <Button
    //                 id="button3"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[2]}>
    //                 <b id={'keyword3'}>{this.keyword_top[2]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq3'}
    //                 style={this.style['total3']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq3'}
    //                 style={this.style['freq3']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title3'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document31'}
    //           onClick={this.handleClickSummary('3', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document32'}
    //           onClick={this.handleClickSummary('3', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document33'}
    //           onClick={this.handleClickSummary('3', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document34'}
    //           onClick={this.handleClickSummary('3', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document35'}
    //           onClick={this.handleClickSummary('3', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">04.</small>
    //               <Button
    //                 id="button4"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[3]}>
    //                 <b id={'keyword4'}>{this.keyword_top[3]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq4'}
    //                 style={this.style['total4']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq4'}
    //                 style={this.style['freq4']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title4'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document41'}
    //           onClick={this.handleClickSummary('4', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document42'}
    //           onClick={this.handleClickSummary('4', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document43'}
    //           onClick={this.handleClickSummary('4', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document44'}
    //           onClick={this.handleClickSummary('4', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document45'}
    //           onClick={this.handleClickSummary('4', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">05.</small>
    //               <Button
    //                 id="button5"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[4]}>
    //                 <b id={'keyword5'}>{this.keyword_top[4]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq5'}
    //                 style={this.style['total5']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq5'}
    //                 style={this.style['freq5']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title5'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document51'}
    //           onClick={this.handleClickSummary('5', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document52'}
    //           onClick={this.handleClickSummary('5', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document53'}
    //           onClick={this.handleClickSummary('5', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document54'}
    //           onClick={this.handleClickSummary('5', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document55'}
    //           onClick={this.handleClickSummary('5', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">06.</small>
    //               <Button
    //                 id="button6"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[5]}>
    //                 <b id={'keyword6'}>{this.keyword_top[5]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq6'}
    //                 style={this.style['total6']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq6'}
    //                 style={this.style['freq6']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title6'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document61'}
    //           onClick={this.handleClickSummary('6', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document62'}
    //           onClick={this.handleClickSummary('6', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document63'}
    //           onClick={this.handleClickSummary('6', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document64'}
    //           onClick={this.handleClickSummary('6', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document65'}
    //           onClick={this.handleClickSummary('6', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">07.</small>
    //               <Button
    //                 id="button7"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[6]}>
    //                 <b id={'keyword7'}>{this.keyword_top[6]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq7'}
    //                 style={this.style['total7']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq7'}
    //                 style={this.style['freq7']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title7'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document71'}
    //           onClick={this.handleClickSummary('7', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document72'}
    //           onClick={this.handleClickSummary('7', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document73'}
    //           onClick={this.handleClickSummary('7', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document74'}
    //           onClick={this.handleClickSummary('7', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document75'}
    //           onClick={this.handleClickSummary('7', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">08.</small>
    //               <Button
    //                 id="button8"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[7]}>
    //                 <b id={'keyword8'}>{this.keyword_top[7]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq8'}
    //                 style={this.style['total8']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq8'}
    //                 style={this.style['freq8']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title8'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document81'}
    //           onClick={this.handleClickSummary('8', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document82'}
    //           onClick={this.handleClickSummary('8', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document83'}
    //           onClick={this.handleClickSummary('8', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document84'}
    //           onClick={this.handleClickSummary('8', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document85'}
    //           onClick={this.handleClickSummary('8', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">09.</small>
    //               <Button
    //                 id="button9"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[8]}>
    //                 <b id={'keyword9'}>{this.keyword_top[8]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq9'}
    //                 style={this.style['total9']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq9'}
    //                 style={this.style['freq9']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title9'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document91'}
    //           onClick={this.handleClickSummary('9', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document92'}
    //           onClick={this.handleClickSummary('9', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document93'}
    //           onClick={this.handleClickSummary('9', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document94'}
    //           onClick={this.handleClickSummary('9', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document95'}
    //           onClick={this.handleClickSummary('9', '5')}></div>
    //       </ListItem>
    //       <ListItem className="d-block">
    //         <div className="align-box-row">
    //           <div className="line-height-sm text-center ml-4">
    //             {/*<small className="text-black-50 d-block text-uppercase">*/}
    //             {/*  Keywords*/}
    //             {/*</small>*/}
    //             <b className="font-size-lg text-warning">
    //               <small className="text-black-50 pr-1">10.</small>
    //               <Button
    //                 id="button10"
    //                 variant="contained"
    //                 color="secondary"
    //                 onClick={this.keyword_click}
    //                 value={this.keyword_top[9]}>
    //                 <b id={'keyword10'}>{this.keyword_top[9]} </b>
    //                 {/*<span className="mr-3 badge badge-second">New</span>*/}
    //                 <span>
    //                   <FontAwesomeIcon icon={'angle-down'} />
    //                 </span>
    //               </Button>
    //             </b>
    //           </div>
    //           <div className="flex-grow-1">
    //             <div className="miniBar">
    //               <div
    //                 className="miniBarProgress"
    //                 id={'total-freq10'}
    //                 style={this.style['total10']}></div>
    //               <div
    //                 className="miniBarProgress"
    //                 id={'freq10'}
    //                 style={this.style['freq10']}></div>
    //             </div>
    //           </div>
    //         </div>
    //         <h3 className="title">
    //           <p className="title_card" id={'title10'}></p>
    //         </h3>
    //         <div
    //           className="p-4-4-4"
    //           id={'document101'}
    //           onClick={this.handleClickSummary('10', '1')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document102'}
    //           onClick={this.handleClickSummary('10', '2')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document103'}
    //           onClick={this.handleClickSummary('10', '3')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document104'}
    //           onClick={this.handleClickSummary('10', '4')}></div>
    //         <div
    //           className="p-4-4-4"
    //           id={'document105'}
    //           onClick={this.handleClickSummary('10', '5')}></div>
    //       </ListItem>
    //     </div>
    //   </List>
    // );
  }
}
