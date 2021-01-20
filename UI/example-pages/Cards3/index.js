import React, { Fragment } from 'react';
import { PageTitle } from '../../layout-components';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CanvasJSReact from '../canvasjs-3.2.3/canvasjs.react';
import Keywords from '../Keywords/index';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as util from './utils';

import { SimpleListMenu, global_filtered_data } from './nested_menu.js';
import { httpGet } from './utils';
import DateSelector from './date_selector';
import { Lambda } from './lambda';
import List from '@material-ui/core/List';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;




let outsetKeywordid, outkeywordid;
export var global_topic_num = 'all';
var global_docs_per_topic = util.httpGet(
  'http://3.34.114.152:5002/representative_docs_by_topic?topic=all&top_doc_n=1'
);
export function onClickChart(event) {
  global_topic_num = event.dataPoint.label.replace('Topic', '');
  document.getElementById('keyword_title').innerText =
    '토픽당 키워드 : Topic ' + global_topic_num;
  outsetKeywordid(outkeywordid + 1);

  var topic2id = Object.keys(global_docs_per_topic['Topic_Num']).reduce(
    (obj, key) =>
      Object.assign({}, obj, {
        [global_docs_per_topic['Topic_Num'][key]]: key
      }),
    {}
  );
  var doc = global_docs_per_topic['Text'][topic2id[global_topic_num]];
  if (doc == undefined) {
    document.getElementById('top_topic_document').innerHTML =
      'No Document Found';
    document.getElementById('top_topic_document_title').innerText =
      '토픽당 대표 문서' + ' : Topic ' + global_topic_num;
  } else {
    var find_keywords =
      global_docs_per_topic['Keywords'][topic2id[global_topic_num]];
    doc = util.highlighting(doc, find_keywords);
    document.getElementById('top_topic_document').innerHTML = doc;
    document.getElementById('top_topic_document_title').innerText =
      '토픽당 대표 문서' + ' : Topic ' + global_topic_num;
    for (var contrib = 0; contrib < 10; contrib++) {
      util.angle_up((contrib + 1).toString());
    }
  }
}

export default function Cards() {

  var global_keysentence = global_filtered_data['key_sentence'];
  var global_d2c = global_filtered_data['d2c'];
  var global_entity = global_filtered_data['entity'];



  var global_document = {};
  var global_click_document = {};
  var global_whole_document = {};
  var global_summary_document = {};
  var global_category_document = {};
  var global_keysen_document = {};

  var global_topic_coordinates = util.httpGet(
    'http://3.34.114.152:5002/topic_coordinates'
  );
  var global_topic_keyword = global_topic_coordinates['Keywords'];


  var datapoints = [];
  var global_topic_list = [];
  for (var i = 0; i < Object.keys(global_topic_coordinates['x']).length; i++) {
    var datapoint = {
      label:
        'Topic' + global_topic_coordinates['topics'][i.toString()].toString(),
      x: global_topic_coordinates['x'][i.toString()],
      y: global_topic_coordinates['y'][i.toString()],
      z: global_topic_coordinates['Freq'][i.toString()],
      name: global_topic_keyword[i.toString()]
    };

    datapoints.push(datapoint);
    global_topic_list.push(global_topic_coordinates['topics'][i.toString()]);
  }

  var initial_options = util.options;
  initial_options['data'][0]['dataPoints'] = datapoints;
  initial_options['data'][0]['click'] = onClickChart;

  const [options, setOptions] = React.useState(initial_options);
  const [keywordid, setKeywordid] = React.useState(null);
  outsetKeywordid = setKeywordid;
  outkeywordid = keywordid;
  var style = {};
  var keyword_top = [];

  var global_top_salient_terms = util.httpGet(
    'http://3.34.114.152:5002/top_salient_terms'
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

  function apply_click() {
    datapoints = [];
    global_topic_list = [];
    var global_topic_coordinates = util.httpGet(
      'http://3.34.114.152:5002/topic_coordinates'
    );
    for (
      var i = 0;
      i < Object.keys(global_topic_coordinates['x']).length;
      i++
    ) {
      var datapoint = {
        label:
          'Topic' + global_topic_coordinates['topics'][i.toString()].toString(),
        x: global_topic_coordinates['x'][i.toString()],
        y: global_topic_coordinates['y'][i.toString()],
        z: global_topic_coordinates['Freq'][i.toString()],
        name: global_topic_keyword[i.toString()]
      };

      datapoints.push(datapoint);
      global_topic_list.push(global_topic_coordinates['topics'][i.toString()]);
    }
    for (var contrib = 0; contrib < 10; contrib++) {
      util.angle_up((contrib + 1).toString());
    }

    setOptions(initial_options);

    var start_date_list = document
      .getElementById('start-date-picker')
      .value.split('/');
    var end_date_list = document
      .getElementById('end-date-picker')
      .value.split('/');
    var selected = document.getElementById('selected_menu').innerText;

    if (selected.includes(':')) {
      selected = selected.split(':');
    }
    var base_url = '';
    var url = '';
    if (selected[0] == 'category1') {
      base_url =
        'http://3.34.114.152:5002/filtered_data?category2=all&category3=all&start_date=';
      url =
        base_url +
        start_date_list[0].replaceAll('-', '') +
        '&end_date=' +
        end_date_list[0].replaceAll('-', '') +
        '&' +
        selected[0] +
        '=' +
        selected[1];
    } else if (selected[0] == 'category2') {
      base_url = 'http://3.34.114.152:5002/filtered_data?category1=all&category3=all&start_date=';
      url =
        base_url +
        start_date_list[0].replaceAll('-', '') +
        '&end_date=' +
        end_date_list[0].replaceAll('-', '') +
        '&' +
        selected[0] +
        '=' +
        selected[1];
    } else if (selected[0] == 'category3') {
      base_url = 'http://3.34.114.152:5002/filtered_data?category1=all&category2=all&start_date=';
      url =
        base_url +
        start_date_list[0].replaceAll('-', '') +
        '&end_date=' +
        end_date_list[0].replaceAll('-','') +
        '&' +
        selected[0] +
        '=' +
        selected[1];
    } else {
      base_url =
        'http://3.34.114.152:5002/filtered_data?category1=all&category2=all&category3=all&start_date=';
      url =
        base_url +
        start_date_list[0].replaceAll('-', '') +
        '&end_date=' +
        end_date_list[0].replaceAll('-', '');
    }

    httpGet(url);

    global_docs_per_topic = util.httpGet(
      'http://3.34.114.152:5002/representative_docs_by_topic?topic=all&top_doc_n=1'
    );

    var topic2id = Object.keys(global_docs_per_topic['Topic_Num']).reduce(
      (obj, key) =>
        Object.assign({}, obj, {
          [global_docs_per_topic['Topic_Num'][key]]: key
        }),
      {}
    );
    var doc = global_docs_per_topic['Text'][topic2id[global_topic_num]];
    if (doc == undefined) {
      document.getElementById('top_topic_document').innerHTML =
        'No Document Found';
      document.getElementById('top_topic_document_title').innerText =
        '토픽당 대표 문서' + ' : Topic ' + global_topic_num;
    } else {
      var find_keywords =
        global_docs_per_topic['Keywords'][topic2id[global_topic_num]];
      doc = util.highlighting(doc, find_keywords);
      document.getElementById('top_topic_document').innerHTML = doc;
      document.getElementById('top_topic_document_title').innerText =
        '토픽당 대표 문서' + ' : Topic ' + global_topic_num;
      for (contrib = 0; contrib < 10; contrib++) {
        util.angle_up((contrib + 1).toString());
      }
    }
    setKeywordid(keywordid + 1);
  }

  const handleClickSummary = (i, j) => event => {
    global_click_document['document' + i + j] = !global_click_document[
      'document' + i + j
    ];

    if (global_click_document['document' + i + j]) {
      document.getElementById('document' + i + j).innerHTML =
        global_summary_document['document' + i + j];
    } else {
      var summary_id = 'document' + i + j;
      var entity = global_entity[global_document[summary_id]];
      var category = global_d2c[global_document[summary_id]]['0']['label'];
      var key_sentence = global_summary_document[summary_id];
      global_category_document[summary_id] = category;
      global_keysen_document[summary_id] = key_sentence;
      var full_content = global_whole_document[summary_id];
      full_content = util.highlighting_bg_key(full_content, [
        global_keysen_document['document' + i + j]
      ]);

      full_content = util.highlighting_entity(full_content, entity);

      document.getElementById('document' + i + j).innerHTML =
        full_content.replace('</p>', '').replace('</Button>', '') +
        '<br><b>' +
        '#CATEGORY : ' +
        category +
        '<b>' +
        '<br><b>' +
        '#KEY_SENTENCE : ' +
        global_keysentence[global_document[summary_id]] +
        '<b>' +
        '</p></Button>';
    }
  };

  let keyword_list = [];

  function angle_down(e, row, selected_topic) {
    var total_full = {};
    document.getElementById('title' + row).innerText = '<Related Documents>';
    var keyword = e.currentTarget.value;
    var url =
      'http://3.34.114.152:5002/representative_docs_by_topic?topic=' +
      selected_topic +
      '&top_doc_n=5&topic_keyword=' +
      keyword;
    var representative_docs = util.httpGet(url);

    if (representative_docs['Doc_Id'].length == 0) {
      var id = 'document' + row + (1).toString();
      document.getElementById(id).innerText = 'No Document';
    }
    else {
      var count = 0;

      var contrib = representative_docs['Topic_Perc_Contrib'];
      contrib = util.sortByValue(contrib);

      for (var doc of contrib) {
        doc = doc[0];

        var summary_id = 'document' + row + (count + 1).toString();
        global_click_document[summary_id] = true;

        var key = representative_docs['Doc_Id'][doc];
        global_document[summary_id] = key;
        var keywords = representative_docs['Keywords'][doc];
        var topic_num = representative_docs['Topic_Num'][doc];

        var doc_contrib = representative_docs['Topic_Perc_Contrib'][doc];
        console.log('doc_contrib: ', doc_contrib);
        console.log('doc: ', doc);

        var key_sentence = global_keysentence[key];
        key_sentence = util.highlighting(key_sentence, keywords);

        var content = representative_docs['Text'][doc];
        content = util.highlighting(content, keywords);
        content = util.highlighting_bg_key(content, [key_sentence]);
        count += 1;
        global_summary_document[summary_id] =
          '<p><h5><b> Document Conribution : </b>' +
          Math.floor(doc_contrib * 100).toString() +
          '% (topic number :' + topic_num + ')</h5><br>' +
          '<p className=key_sentence">[핵심 문장] : <b>' +
          key_sentence +
          '</b></p></p>';

        document.getElementById(summary_id).innerHTML =
          global_summary_document[summary_id];

        global_whole_document[summary_id] =
          '<p><h5><b>   Document Contribution : </b>' +
          Math.floor(doc_contrib * 100).toString() +
          '% (topic number :' + topic_num + ')</h5><br>' +
          content +
          '</p>';
      }
    }
    return total_full;
  }
  // function angle_up(topic) {
  //   document.getElementById('title' + topic).innerHTML = '';
  //   for (var i = 0; i < 5; i++) {
  //     var id = 'document' + topic + (i + 1).toString();
  //     document.getElementById(id).innerHTML = '';
  //   }
  // }

  function keyword_click(e) {
    var keyword = e.currentTarget.value;
    var url = 'http://3.34.114.152:5002/topic_dist_term?term=' + keyword;
    var prob = util.httpGet(url)['Freq'];
    if (prob != undefined && prob != {}) {
      var keys = Object.keys(prob);
      for (var i = 0; i < datapoints.length; i++) {
        var topic_num = datapoints[i]['label'].replace('Topic', '');
        if (keys.includes(topic_num)) {
          datapoints[i]['z'] = prob[parseInt(topic_num) - 1];
        } else {
          datapoints[i]['z'] = 0.1;
        }
      }
      initial_options = util.options;
      initial_options['data']['0']['dataPoints'] = datapoints;
      setOptions({
        animationEnabled: true,
        exportEnabled: true,
        theme: 'dark2', // "light1", "light2", "dark1", "dark2"
        title: {
          text: 'LDA Topic Analysis',
          fontSize: 26
        },
        axisX: {
          title: 'X axis',
          logarithmic: false,
          min: -0.5,
          max: 0.5
        },
        axisY: {
          title: 'Y axis',
          logarithmic: false,
          min: -0.5,
          max: 0.5
        },
        data: [
          {
            type: 'bubble',
            indexLabel: '{label}',
            toolTipContent: '<b>{label}</b><br>Keywords: {name}<br>Freq: {z}',
            dataPoints: datapoints,
            click: onClickChart
          }
        ]
      });
      var row = e.currentTarget.id.replace('button', '');

      if (
        document.getElementById('title' + row).innerText ===
        '<Related Documents>'
      ) {
        util.angle_up(row);
      } else {
        angle_down(e, row, global_topic_num);
      }
    } else {
      for (i = 0; i < datapoints.length; i++) {
        datapoints[i]['z'] = 0;
      }
      initial_options = util.options;
      initial_options['data']['0']['dataPoints'] = datapoints;
      setOptions(initial_options);
    }
  }

  return (
    <Fragment>
      <PageTitle
        titleHeading="LDA Analysis"
        titleDescription="LDA를 활용해 토픽을 분석한 결과 화면"
      />

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={12}>
          <Grid item xs={12} sm={2}>
            <DateSelector id="start-date-picker" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <DateSelector id="end-date-picker" />
          </Grid>
          <Grid item xs>
            <SimpleListMenu />
          </Grid>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={3}>
            <Lambda />
          </Grid>
          <Grid item xs>
            <Button
              id="apply_button"
              variant="contained"
              color="secondary"
              onClick={apply_click}
              value="APPLY">
              APPLY
            </Button>
          </Grid>
          {/*</Grid>*/}
        </Grid>
      </MuiPickersUtilsProvider>

      <Grid container spacing={12}>
        <Grid item xs={12} lg={6}>
          <div id="outside_chart_div">
            <div>
              <CanvasJSChart options={options} />
            </div>

            <Card className="card-box mb-4">
              <div className="card-header">
                <div className="card-header--title">
                  <h5>
                    <b
                      id="top_topic_document_title"
                      className="top_topic_document_title"></b>
                  </h5>
                </div>
              </div>
              <p id="top_topic_document"></p>
            </Card>
          </div>
        </Grid>

        <Grid item xs={12} lg={6}>
          {/*<ExampleWrapperSeamless>*/}
          <Card className="card-box mb-4">
            <div className="card-header">
              <div className="card-header--title">
                <small className="d-block text-uppercase mt-1">Keywords</small>
                <b id="keyword_title">토픽당 키워드 : Topic ALL</b>
              </div>
              <div className="card-header--actions">
                <div className="badge badge-warning">Top 10</div>
              </div>
            </div>
            <List>
              <div id="keyword">
                <Keywords
                  id="1"
                  onClick={keyword_click}
                  onClick1={handleClickSummary}
                />
              </div>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}