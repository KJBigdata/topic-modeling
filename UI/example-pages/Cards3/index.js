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
  'http://3.34.114.152:5006/representative_docs_by_topic?topic=all&top_doc_n=1'
);
export function onClickChart(event) {
  var kpe = global_filtered_data['kpe'];
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
    var doc_id = global_docs_per_topic['Doc_Id'][topic2id[global_topic_num]];
    var entity = kpe[doc_id];
    doc = util.highlighting_kpe(doc, entity);
    doc = util.tagging(doc);
    document.getElementById('top_topic_document').innerHTML = doc;
    document.getElementById('top_topic_document_title').innerText =
      '토픽당 대표 문서' + ' : Topic ' + global_topic_num;
    for (var contrib = 0; contrib < 10; contrib++) {
      util.angle_up((contrib + 1).toString());
    }
  }
}
var col1 = {};
var col2 = {};
var col3 = {};

for (var i = 0; i < 30; i++) {
  col1[i] = Math.floor(Math.random() * 156) + 100;
  col2[i] = Math.floor(Math.random() * 156) + 100;
  col3[i] = Math.floor(Math.random() * 156) + 100;
}
var datapoints = [];

var global_topic_coordinates = util.httpGet(
  'http://3.34.114.152:5006/topic_coordinates'
);
var global_topic_keyword = global_topic_coordinates['Keywords'];

datapoints = [];
var global_topic_list = [];

for (i = 0; i < Object.keys(global_topic_coordinates['x']).length; i++) {
  var datapoint = {
    label:
      'Topic' + global_topic_coordinates['topics'][i.toString()].toString(),
    x: global_topic_coordinates['x'][i.toString()],
    y: global_topic_coordinates['y'][i.toString()],
    z: global_topic_coordinates['Freq'][i.toString()],
    name: global_topic_keyword[i.toString()],
    color:
      'rgba(' +
      col1[i].toString() +
      ',' +
      col2[i].toString() +
      ',' +
      col3[i].toString() +
      ',1)'
  };

  datapoints.push(datapoint);
  global_topic_list.push(global_topic_coordinates['topics'][i.toString()]);
}

var initial_options = util.options;
initial_options['data'][0]['dataPoints'] = datapoints;
initial_options['data'][0]['click'] = onClickChart;

var global_num_of_keyword = 10;
var global_keyword = {};
export default function Cards() {
  var global_keysentence = global_filtered_data['key_sentence'];
  var category = {};
  var kpe = global_filtered_data['kpe'];
  var global_entity = global_filtered_data['entity'];
  var global_filter = util.httpGet(
    'http://3.34.114.152:5006/filtered_data?category1=all&category2=all'
  );
  var global_category = [];
  var category_list = ['category1', 'category2', 'category3'];
  console.log('global_filter: ', Object.keys(global_filter));
  for (var i = 0; i < 3; i++) {
    if (Object.keys(global_filter).includes(category_list[i])) {
      global_category.push(category_list[i]);
      category[i + 1] = global_filtered_data[category_list[i]];
    }
  }
  console.log('global_category: ', global_category);

  var global_document = {};
  var global_click_document = {};
  var global_click_keyword = {};
  var global_whole_document = {};
  var global_summary_document = {};
  var global_summary_document_raw = {};
  var global_category_document = {};
  var global_keysen_document = {};

  //todo: for summary to be content

  // todo: for topic cluster chart

  const [options, setOptions] = React.useState(initial_options);
  const [keywordid, setKeywordid] = React.useState(null);
  const [keywordNum, setKeywordNum] = React.useState(global_num_of_keyword);
  outsetKeywordid = setKeywordid;
  outkeywordid = keywordid;
  var style = {};
  var keyword_top = [];

  // todo: for top 30 keyword
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

  function apply_click() {
    datapoints = [];
    global_topic_list = [];
    var global_topic_coordinates = util.httpGet(
      'http://3.34.114.152:5006/topic_coordinates'
    );
    for (
      var i = 0;
      i < Object.keys(global_topic_coordinates['x']).length;
      i++
    ) {
      var col1 = Math.floor(Math.random() * 256);
      var col2 = Math.floor(Math.random() * 256);
      var col3 = Math.floor(Math.random() * 256);
      var datapoint = {
        label:
          'Topic' + global_topic_coordinates['topics'][i.toString()].toString(),
        x: global_topic_coordinates['x'][i.toString()],
        y: global_topic_coordinates['y'][i.toString()],
        z: global_topic_coordinates['Freq'][i.toString()],
        name: global_topic_keyword[i.toString()],
        color:
          'rgba(' +
          col1.toString() +
          ',' +
          col2.toString() +
          ',' +
          col3.toString() +
          ',1)'
      };

      datapoints.push(datapoint);
      global_topic_list.push(global_topic_coordinates['topics'][i.toString()]);
    }
    for (var contrib = 0; contrib < 10; contrib++) {
      util.angle_up((contrib + 1).toString());
    }
    // console.log('apply_click: ', datapoints);

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
        'http://3.34.114.152:5006/filtered_data?category2=all&category3=all&start_date=';
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
      base_url =
        'http://3.34.114.152:5006/filtered_data?category1=all&category3=all&start_date=';
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
      base_url =
        'http://3.34.114.152:5006/filtered_data?category1=all&category2=all&start_date=';
      url =
        base_url +
        start_date_list[0].replaceAll('-', '') +
        '&end_date=' +
        end_date_list[0].replaceAll('-', '') +
        '&' +
        selected[0] +
        '=' +
        selected[1];
    } else {
      base_url =
        'http://3.34.114.152:5006/filtered_data?category1=all&category2=all&category3=all&start_date=';
      url =
        base_url +
        start_date_list[0].replaceAll('-', '') +
        '&end_date=' +
        end_date_list[0].replaceAll('-', '');
    }

    httpGet(url);

    global_docs_per_topic = util.httpGet(
      'http://3.34.114.152:5006/representative_docs_by_topic?topic=all&top_doc_n=1'
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

      var entity =
        global_entity[
          global_docs_per_topic['Doc_Id'][topic2id[global_topic_num]]
        ];
      doc = util.highlighting_entity(doc, entity, find_keywords);
      doc = util.tagging(doc);
      document.getElementById('top_topic_document').innerHTML = doc;
      document.getElementById('top_topic_document_title').innerText =
        '토픽당 대표 문서' + ' : Topic ' + global_topic_num;
      for (contrib = 0; contrib < 10; contrib++) {
        util.angle_up((contrib + 1).toString());
      }
    }
    setKeywordid(keywordid + 1);
  }

  // const handleClickSummary = (i, j) => event => {

  // };

  // let keyword_list = [];
  function keyword_num_click(e) {
    var text = document.getElementById('num_of_keywords').innerText;
    console.log('키워드 클릭시 숫자 변동 : ', text);
    if (text == 'TOP 10') {
      text = 'TOP 20';
      global_num_of_keyword = 20;
      setKeywordNum(global_num_of_keyword);
    } else if (text == 'TOP 20') {
      text = 'TOP 30';
      global_num_of_keyword = 30;
      setKeywordNum(global_num_of_keyword);
    } else if (text == 'TOP 30') {
      text = 'TOP 10';
      global_num_of_keyword = 10;
      setKeywordNum(global_num_of_keyword);
    }
    document.getElementById('num_of_keywords').innerText = text;
    // console.log('키워드 클릭시 숫자 변동 : ', e.keys());
    // console.log('키워드 클릭시 숫자 변동 : ', e.value);
  }

  function angle_down(e, row, selected_topic) {
    var total_full = {};
    document.getElementById('title' + row).style.fontSize = 'x-large';
    // document.getElementById('title' + row).innerText = '<Related Documents>';
    var keyword = e.currentTarget.value;

    // todo-hj: 키워드와 관련한 문서번호들과 해당되는 확률만 가져오기 (문서번호 - 확률)
    var url =
      'http://3.34.114.152:5006/representative_docs_by_topic?topic=' +
      selected_topic +
      '&top_doc_n=5&topic_keyword=' +
      keyword;
    console.log('url: ', url);
    var representative_docs = util.httpGet(url);
    console.log('representative_docs:', representative_docs);

    // todo-hj : 키워드에 해당하는 문서의 길이가 0일 때
    if (representative_docs['Doc_Id'].length == 0) {
      var id = 'document' + row + (1).toString();
      document.getElementById(id).innerText = 'No Document';
    }
    // todo-hj : 키워드에 해당하는 문서의 길이가 0이 아닐 때
    else {
      var count = 0;

      var temp = representative_docs['Topic_Perc_Contrib'];
      temp = util.sortByValue(temp);
      // console.log('temp: ', temp);

      for (var doc of temp) {
        doc = doc[0];
        // console.log('doc: ', doc);
        var summary_id = 'document' + row + (count + 1).toString();
        global_click_document[summary_id] = true;

        var key = representative_docs['Doc_Id'][doc];
        global_document[summary_id] = key;
        var keywords = representative_docs['Keywords'][doc];
        global_keyword[summary_id] = keywords;
        console.log('angle_down : ', summary_id, ' - ', global_keyword);

        var doc_contrib = representative_docs['Topic_Perc_Contrib'][doc];

        var topic_num = representative_docs['Topic_Num'][doc];
        var key_sentence = global_keysentence[key];
        // key_sentence = util.highlighting(key_sentence, keywords, keyword);

        var content = representative_docs['Text'][doc];
        content = util.highlighting(content, [keyword], keyword);
        content = util.highlighting_bg_key(content, [key_sentence]);
        content = util.tagging(content);
        // content = util.new_line(content);
        count += 1;
        var category_str = '';
        for (var j = 0; j < global_category.length; j++) {
          console.log(
            'CATEGORY_STR: ',
            global_filter[global_category[j]][global_document[summary_id]]
          );
          category_str +=
            global_filter[global_category[j]][global_document[summary_id]] +
            '-';
        }
        global_summary_document_raw[summary_id] = key_sentence;
        global_summary_document[summary_id] =
          '<p><h4 style="color:#00ABF0;"><b>Document Distribution : </b>' +
          Math.floor(doc_contrib * 100).toString() +
          '% (topic number: ' +
          topic_num +
          ')</h4><br>' +
          '<b><span>[Category] : ' +
          category_str +
          '</span>' +
          '</b>' +
          '</br>' +
          '</br>' +
          '<b><span>[Key Phrases] : ' +
          kpe[key]
            .sort(function(x, y) {
              return y.score - x.score;
            })
            .slice(0, 5)
            .map(x => x['keyword']) +
          '</span>' +
          '</b>' +
          '</br>' +
          '</br>' +
          '<b><span style="color:darkorange; font-weight=bold;">[Key Sentence] : ' +
          key_sentence +
          '</b></span>' +
          '</p>';

        document.getElementById(summary_id).innerHTML =
          global_summary_document[summary_id];

        global_whole_document[summary_id] =
          '<p><h4 style="color:#00ABF0;"><b>Document Distribution : </b>' +
          Math.floor(doc_contrib * 100).toString() +
          '% (topic number: ' +
          topic_num +
          ')</h4><br>' +
          content +
          '</p>';
        console.log('angle_down : ', summary_id, ' - ', global_whole_document);
      }
    }
    return total_full;
  }

  function keyword_click(e) {
    var keyword = e.currentTarget.value;
    var url = 'http://3.34.114.152:5006/topic_dist_term?term=' + keyword;
    var prob = util.httpGet(url)['Freq'];
    var topic_term = httpGet(url)['Topic'];
    // var datapoints_new = [];
    console.log('prob:', prob);
    if (prob != undefined && prob != {}) {
      var keys = Object.values(topic_term);
      for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < datapoints.length; j++) {
          var topic_num = parseInt(datapoints[j]['label'].replace('Topic', ''));
          if (keys.includes(topic_num)) {
            // datapoints[j]['z'] = Object.values(prob)[keys.indexOf(topic_num)];
            // console.log(datapoints[j]['z']);
            // datapoints[j]['z'] = Object.values(prob)[i];
            // datapoints_new.push(datapoints[j]);
            datapoints[j]['color'] = datapoints[j]['color'].replace(
              ',0.2)',
              ',1)'
            );
          } else {
            // datapoints[j]['z'] =
            //   (1 - Object.values(prob)[i]) / datapoints.length;
            // datapoints_new.push(datapoints[j]);
            datapoints[j]['color'] = datapoints[j]['color'].replace(
              ',1)',
              ',0.2)'
            );
          }
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
      // todo:
      console.log('keyword_click: ', datapoints);
      var row = e.currentTarget.id.replace('button', '');

      if (global_click_keyword['title' + row]) {
        global_click_keyword['title' + row] = false;
        util.angle_up(row);
      } else {
        global_click_keyword['title' + row] = true;
        angle_down(e, row, global_topic_num);
      }
      // todo:
      // options = options_update;
    }
    // else {
    //   for (i = 0; i < datapoints.length; i++) {
    //     datapoints[i]['z'] = 0;
    // }
    // initial_options = util.options;
    // initial_options['data']['0']['dataPoints'] = datapoints;
    // setOptions(initial_options);
    // }
  }
  function handleClickSummary(e, i, j) {
    console.log('handleClickSummary:', i);
    console.log('handleClickSummary:', j);
    console.log(
      'global_click_document[summary_id]:',
      global_click_document[summary_id]
    );

    // var i = '1';
    // var j = '1';
    var summary_id = 'document' + i + j;
    global_click_document[summary_id] = !global_click_document[summary_id];
    console.log('global_keyword:', global_keyword);
    if (global_click_document[summary_id]) {
      // global_click_document[summary_id] = !global_click_document[summary_id];
      console.log(summary_id);
      document.getElementById(summary_id).innerHTML =
        global_summary_document[summary_id];
      // angle_up(global_topic_num);
    } else {
      if (global_keyword[summary_id] === undefined) {
        console.log('PASS');
      } else {
        console.log('CLICKED');
        // global_click_document[summary_id] = !global_click_document[summary_id];
        // var summary_id = 'document' + i + j;
        var entity = global_entity[global_document[summary_id]];
        // var category = global_d2c[global_document[summary_id]]['0']['label'];
        var category_str = '';
        for (var jj = 0; jj < global_category.length; jj++) {
          category_str +=
            global_filter[global_category[jj]][global_document[summary_id]] +
            '-';
        }

        var key_sentence = global_summary_document[summary_id];
        global_category_document[summary_id] = category_str;
        global_keysen_document[summary_id] = key_sentence;
        console.log('global_whole_document:', global_whole_document);
        var full_content = global_whole_document[summary_id];
        console.log('full_content:', global_whole_document);
        full_content = util.highlighting_bg_key(full_content, [
          global_keysen_document[summary_id]
        ]);
        var key = global_document[summary_id];

        full_content = util.highlighting_entity(
          full_content,
          entity,
          global_keyword[summary_id].concat([
            global_summary_document_raw[summary_id]
          ])
        );
        // full_content = util.new_line(full_content);
        console.log('full_content:', full_content);
        full_content = util.tagging(full_content);
        // console.log('kpe: ', kpe[global_document[summary_id]]);

        document.getElementById('document' + i + j).innerHTML =
          full_content.replace('</p>', '').replace('</Button>', '') +
          '<br><b>' +
          '<br><b>' +
          '#CATEGORY : ' +
          category_str +
          // category3[key] +
          '</b></br>' +
          '#KEY PHRASES : ' +
          kpe[key]
            .sort(function(x, y) {
              return y.score - x.score;
            })
            .slice(0, 5)
            .map(x => x['keyword']) +
          '</b></br>' +
          // '#CATEGORY : ' +
          // category +
          // '<b>' +
          // '<br><b>' +
          // '#KEY_Phrases : ' +
          // global_keysentence[global_document[summary_id]] +
          // '<b>' +
          '</p></Button>';
        // global_click_document['document' + i + j] = !global_click_document[
        //   'document' + i + j
        // ];
      }
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
          {/*// todo: 데이트 설렉트 박스 수정 - 날짜가 어디어디 분포해있는지 표시*/}
          <Grid item xs={12} sm={2}>
            <DateSelector id="start-date-picker" />
          </Grid>
          <Grid item xs={12} sm={2}>
            <DateSelector id="end-date-picker" />
          </Grid>
          <Grid item xs>
            {/*// todo: 상자박스 디자인 수정*/}
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
                <div
                  id="num_of_keywords"
                  className="badge badge-warning"
                  onClick={keyword_num_click}
                  value="Top 10">
                  Top 10
                </div>
              </div>
            </div>
            <List>
              <div id="keyword">
                <Keywords
                  key={keywordNum + outkeywordid}
                  id={keywordNum}
                  onClick2={keyword_click}
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
