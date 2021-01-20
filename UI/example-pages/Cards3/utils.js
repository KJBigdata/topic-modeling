import * as util from './utils';

//
// export var global_docs_per_topic = util.httpGet(
//   'http://3.34.114.152:5002/representative_docs_by_topic?topic=all&top_doc_n=1'
// );
// export const [keywordid, setKeywordid] = React.useState(null);
export function httpGet(theUrl) {
  console.log('theUrl:', theUrl);
  var xmlHttp = new XMLHttpRequest();
  // xmlHttp.open('GET', theUrl, true);

  // xmlHttp.onreadystatechange = function() {
  //   if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
  //     clearTimeout(xmlHttpTimeout);
  //     console.log('Request called');
  //     console.log(JSON.parse(xmlHttp.responseText));
  //     console.log(JSON.parse(xmlHttp.responseText)['Doc_id']);
  //     return JSON.parse(xmlHttp.responseText);
  //     // console.log(xmlHttp.responseText["Doc_id"])
  //   }
  // };
  // // Now that we're ready to handle the response, we can make the request
  // xmlHttp.send('');
  // // Timeout to abort in 5 seconds
  // var xmlHttpTimeout = setTimeout(ajaxTimeout, 2000);
  // function ajaxTimeout() {
  //   xmlHttp.abort();
  //   console.log('Request timed out');
  // }
  xmlHttp.open('GET', theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  //
  return JSON.parse(xmlHttp.responseText);
}

export function sortByValue(unordered) {
  var ordered = [];
  for (var elem in unordered) {
    ordered.push([elem, unordered[elem]]);
  }

  ordered.sort(function(a, b) {
    return b[1] - a[1];
  });
  return ordered;
}

export function highlighting1(text, keywords) {
  if (keywords == undefined || keywords == null) {
    return text;
  }
  try {
    for (var i = 0; i < keywords.length; i++) {
      var regex = new RegExp(keywords[i], 'g');
      text = text.replace(
        regex,
        "<Tooltip title='Keyword' id='Date' className='right'><span class='highlight'>" +
          keywords[i] +
          '</span></Tooltip>'
      );
    }
    return text;
  } catch {
    return text;
  }
}
export function highlighting(text, keywords) {
  if (keywords == undefined || keywords == null) {
    return text;
  }
  try {
    for (var i = 0; i < keywords.length; i++) {
      // var regex = new RegExp(keywords[i], 'g');
      text = text.replaceAll(
        keywords[i],
        "<Tooltip title='Keyword' id='Date' className='right'><span class='highlight'>" +
          keywords[i] +
          '</span></Tooltip>'
      );
    }
    return text;
  } catch {
    return text;
  }
}
// export function highlighting_bg(text, keywords) {
//   if (keywords == undefined) {
//     return text;
//   }
//   try {
//     for (var i = 0; i < keywords.length; i++) {
//       var regex = new RegExp(keywords[i], 'g');
//       text = text.replace(
//         regex,
//         "<Tooltip title='Summary Sentence' id='Date' className='right'><span class='highlight_bg'>" +
//           keywords[i] +
//           '</span></Tooltip>'
//       );
//     }
//     return text;
//   } catch {
//     return text;
//   }
// }

export function highlighting_entity(text, entity) {
  if (entity == undefined || entity == []) {
    return text;
  }
  try {
    for (var i = 0; i < entity.length; i++) {
      // var regex = new RegExp(entity[i]['raw'], 'g');
      // console.log('i: ', i);
      var category = entity[i]['category'];
      var raw = entity[i]['raw'];
      if (category == 'ORG') {
        text = text.replaceAll(
          raw,
          "<Tooltip title='Organization' className='Organization' placement='right'><span class='highlight_org'>" +
            entity[i]['raw'] +
            '</span><Tooltip>'
        );
      } else if (category == 'DAT') {
        text = text.replaceAll(
          raw,
          "<Tooltip title='Date' id='Date' className='right'><span class='highlight_dat'>" +
            entity[i]['raw'] +
            '</span><Tooltip>'
        );
      } else if (category == 'LOC') {
        text = text.replaceAll(
          raw,
          "<Tooltip title='Location' className='Location' placement='right'><span class='highlight_loc'>" +
            entity[i]['raw'] +
            '</span><Tooltip>'
        );
      } else if (category == 'PER') {
        text = text.replaceAll(
          raw,
          "<Tooltip title='Person' className='Person' placement='right'><span class='highlight_per'>" +
            entity[i]['raw'] +
            '</span><Tooltip>'
        );
      } else if (category == 'OTHERS') {
        text = text.replaceAll(
          raw,
          "<Tooltip title='Others' className='Others' placement='right'><span class='highlight_others'>" +
            entity[i]['raw'] +
            '</span><Tooltip>'
        );
      }
    }
    return text;
  } catch {
    return text;
  }
}

export function highlighting_bg_key(text, keywords) {
  // console.log('keywords: ', keywords);
  if (keywords == undefined) {
    // console.log('keyword is undefined.');
    return text;
  }
  try {
    for (var i = 0; i < keywords.length; i++) {
      var regex = new RegExp(keywords[i], 'g');
      text = text.replace(
        regex,
        "<Tooltip title='Key Sentence' id='Date' className='right'><span class='highlight_bg_key'>" +
          keywords[i] +
          '</span></Tooltip>'
      );
    }
    // console.log('regex:', regex);
    // console.log('text:', text);
    return text;
  } catch {
    return text;
  }
}

export function angle_up(topic) {
  document.getElementById('title' + topic).innerHTML = '';
  for (var i = 0; i < 5; i++) {
    var id = 'document' + topic + (i + 1).toString();
    document.getElementById(id).innerHTML = '';
  }
}
//
// export function onClickChart(event) {
//
//   var topic_num = event.dataPoint.label.replace('Topic', '');
//   document.getElementById('keyword_title').innerText =
//     '토픽당 키워드 : Topic ' + topic_num;
//
//   // var topic_relevance = util.httpGet(
//   //   'http://3.34.114.152:5002/topic_relevance?topic=' +
//   //     topic_num +
//   //     '&lambda=' +
//   //     global_lambda_value.toString()
//   // );
//   global_topic_num = topic_num;
//   // setKeywordid(keywordid + 1);
//   // var freq_ordered = util.sortByValue(topic_relevance['Freq']);
//   // var max_total_freq = Math.max(...Object.values(topic_relevance['Total']));
//   //
//   // for (var ii = 0; ii < 10; ii++) {
//   //   var key = freq_ordered[ii][0];
//   //   // document.getElementById("keyword1").value = topic;
//   //   document.getElementById('keyword' + (ii + 1).toString()).innerHTML =
//   //     topic_relevance['Term'][key];
//   //   document.getElementById('button' + (ii + 1).toString()).value =
//   //     topic_relevance['Term'][key];
//   //   document.getElementById('button' + (ii + 1).toString()).id =
//   //     'button' + (ii + 1).toString();
//   //   document.getElementById('freq' + (ii + 1).toString()).style.width =
//   //     ((topic_relevance['Freq'][key] / max_total_freq) * 100).toString() + '%';
//   //   document.getElementById('total-freq' + (ii + 1).toString()).style.width =
//   //     ((topic_relevance['Total'][key] / max_total_freq) * 100).toString() + '%';
// }

// var topic2id = Object.keys(global_docs_per_topic['Topic_Num']).reduce(
//   (obj, key) =>
//     Object.assign({}, obj, {
//       [global_docs_per_topic['Topic_Num'][key]]: key
//     }),
//   {}
// );
// console.log('util.global_topic_num: ', util.global_topic_num);
// console.log(
//   'topic2id[util.global_topic_num]: ',
//   topic2id[util.global_topic_num]
// );
// console.log("global_docs_per_topic['Text'] : ", global_docs_per_topic['Text']);
// var doc = global_docs_per_topic['Text'][topic2id[util.global_topic_num]];
// if (doc == undefined) {
//   document.getElementById('top_topic_document').innerHTML = 'No Document Found';
//   document.getElementById('top_topic_document_title').innerText =
//     '토픽당 대표 문서' + ' : Topic ' + util.global_topic_num;
// } else {
//   var find_keywords =
//     global_docs_per_topic['Keywords'][topic2id[util.global_topic_num]];
//   doc = util.highlighting(doc, find_keywords);
//   document.getElementById('top_topic_document').innerHTML = doc;
//   document.getElementById('top_topic_document_title').innerText =
//     '토픽당 대표 문서' + ' : Topic ' + util.global_topic_num;
//   for (var temp = 0; temp < 10; temp++) {
//     util.angle_up((temp + 1).toString());
//   }
// }
// }

export var options = {
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
      toolTipContent: '<b>{label}</b></br>Keywords: {name}' + '<br>Freq: {z}',
      dataPoints: ''
    }
  ],
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
          // min: -1,
          // max : 1
        },
        display: true,
        gridLines: {
          zeroLineWidth: 3,
          zeroLineColor: 'white'
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          beginAtZero: true
          // min: -0.5,
          // max: 0.5
        },
        display: true,
        gridLines: {
          zeroLineWidth: 3,
          zeroLineColor: 'white'
        }
      }
    ]
  }
};
