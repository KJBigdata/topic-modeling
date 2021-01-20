// import Keywords from '../Keywords/index';
// import List from '@material-ui/core/List';
// import React from 'react';
// import * as util from './utils';
// import {global_filtered_data} from "./nested_menu";
// import global_topic_num from "./index";
//
//
// var global_document = {};
// var global_click_document = {};
// var global_whole_document = {};
// var global_summary_document = {};
// var global_category_document = {};
// var global_keysen_document = {};
//
// var global_keysentence = global_filtered_data['key_sentence'];
// var global_d2c = global_filtered_data['d2c'];
// var global_entity = global_filtered_data['entity'];
//
//
// export default function Keyword() {
//
//
//   function angle_down(e, row, selected_topic) {
//     var total_full = {};
//     document.getElementById('title' + row).innerText = '<Related Documents>';
//     var keyword = e.currentTarget.value;
//     // todo-hj: 키워드와 관련한 문서번호들과 해당되는 확률만 가져오기 (문서번호 - 확률)
//     var url =
//       'http://3.34.114.152:5002/representative_docs_by_topic?topic=' +
//       selected_topic +
//       '&top_doc_n=5&topic_keyword=' +
//       keyword;
//     console.log('url: ', url);
//     var representative_docs = util.httpGet(url);
//
//     // todo-hj : 키워드에 해당하는 문서의 길이가 0일 때
//     if (representative_docs['Doc_Id'].length == 0) {
//       var id = 'document' + row + (1).toString();
//       document.getElementById(id).innerText = 'No Document';
//     }
//     // todo-hj : 키워드에 해당하는 문서의 길이가 0이 아닐 때
//     else {
//       var count = 0;
//
//       var temp = representative_docs['Topic_Perc_Contrib'];
//       temp = util.sortByValue(temp);
//       console.log('temp: ', temp);
//
//       for (var doc of temp) {
//         doc = doc[0];
//         console.log('doc: ', doc);
//         var summary_id = 'document' + row + (count + 1).toString();
//         global_click_document[summary_id] = true;
//
//         var key = representative_docs['Doc_Id'][doc];
//         global_document[summary_id] = key;
//         var keywords = representative_docs['Keywords'][doc];
//
//         var doc_contrib = representative_docs['Topic_Perc_Contrib'][doc];
//
//         var key_sentence = global_keysentence[key];
//         key_sentence = util.highlighting(key_sentence, keywords);
//
//         var content = representative_docs['Text'][doc];
//         content = util.highlighting(content, keywords);
//         content = util.highlighting_bg_key(content, [key_sentence]);
//         count += 1;
//         global_summary_document[summary_id] =
//           '<p><h5><b>Document ID : </b>' +
//           key +
//           '<b> Conribution : </b>' +
//           Math.floor(doc_contrib * 100).toString() +
//           '%</h5><br>' +
//           '<p className=key_sentence">[핵심 문장] : <b>' +
//           key_sentence +
//           '</b></p></p>';
//
//         document.getElementById(summary_id).innerHTML =
//           global_summary_document[summary_id];
//
//         global_whole_document[summary_id] =
//           '<p><h5><b>Document ID : </b>' +
//           key +
//           '<b>    Contribution : </b>' +
//           Math.floor(doc_contrib * 100).toString() +
//           '%</h5><br>' +
//           content +
//           '</p>';
//       }
//     }
//     return total_full;
//   }
//
//   function keyword_click(e) {
//     var keyword = e.currentTarget.value;
//     var url = 'http://3.34.114.152:5002/topic_dist_term?term=' + keyword;
//     var prob = util.httpGet(url)['Freq'];
//     if (prob != undefined && prob != {}) {
//       var keys = Object.keys(prob);
//       for (var i = 0; i < datapoints.length; i++) {
//         var topic_num = datapoints[i]['label'].replace('Topic', '');
//         if (keys.includes(topic_num)) {
//           datapoints[i]['z'] = prob[parseInt(topic_num) - 1];
//         } else {
//           datapoints[i]['z'] = 0.1;
//         }
//       }
//       var initial_options = util.options;
//       initial_options['data']['0']['dataPoints'] = datapoints;
//       setOptions({
//         animationEnabled: true,
//         exportEnabled: true,
//         theme: 'dark2', // "light1", "light2", "dark1", "dark2"
//         title: {
//           text: 'LDA Topic Analysis',
//           fontSize: 26
//         },
//         axisX: {
//           title: 'X axis',
//           logarithmic: false,
//           min: -0.5,
//           max: 0.5
//         },
//         axisY: {
//           title: 'Y axis',
//           logarithmic: false,
//           min: -0.5,
//           max: 0.5
//         },
//         data: [
//           {
//             type: 'bubble',
//             indexLabel: '{label}',
//             toolTipContent: '<b>{label}</b><br>Keywords: {name}<br>Freq: {z}',
//             dataPoints: datapoints,
//             click: onClickChart
//           }
//         ]
//       });
//       // todo:
//       var row = e.currentTarget.id.replace('button', '');
//
//       if (
//         document.getElementById('title' + row).innerText ===
//         '<Related Documents>'
//       ) {
//         util.angle_up(row);
//       } else {
//         if (global_topic_num == 'ALL') {
//           global_topic_num = 'all';
//         }
//         angle_down(e, row, global_topic_num);
//       }
//       // todo:
//       // options = options_update;
//     } else {
//       for (i = 0; i < datapoints.length; i++) {
//         datapoints[i]['z'] = 0;
//       }
//       initial_options = util.options;
//       initial_options['data']['0']['dataPoints'] = datapoints;
//       setOptions(initial_options);
//     }
//   }
//   const handleClickSummary = (i, j) => event => {
//     global_click_document['document' + i + j] = !global_click_document[
//       'document' + i + j
//     ];
//
//     if (global_click_document['document' + i + j]) {
//       document.getElementById('document' + i + j).innerHTML =
//         global_summary_document['document' + i + j];
//     } else {
//       var summary_id = 'document' + i + j;
//       var entity = global_entity[global_document[summary_id]];
//       var category = global_d2c[global_document[summary_id]]['0']['label'];
//       var key_sentence = global_summary_document[summary_id];
//       global_category_document[summary_id] = category;
//       global_keysen_document[summary_id] = key_sentence;
//       var full_content = global_whole_document[summary_id];
//       full_content = util.highlighting_bg_key(full_content, [
//         global_keysen_document['document' + i + j]
//       ]);
//
//       full_content = util.highlighting_entity(full_content, entity);
//
//       document.getElementById('document' + i + j).innerHTML =
//         full_content.replace('</p>', '').replace('</Button>', '') +
//         '<br><b>' +
//         '#CATEGORY : ' +
//         category +
//         '<b>' +
//         '<br><b>' +
//         '#KEY_SENTENCE : ' +
//         global_keysentence[global_document[summary_id]] +
//         '<b>' +
//         '</p></Button>';
//     }
//   };
//
//   return (
//     <List>
//       <div id="keyword">
//         <Keywords
//           id="1"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="2"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="3"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="4"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="5"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="6"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="7"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="8"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="9"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//         <Keywords
//           id="10"
//           onClick={keyword_click}
//           onClick1={handleClickSummary}
//         />
//       </div>
//     </List>
//   );
// }
