//
// export var global_docs_per_topic = util.httpGet(
//   'http://3.34.114.152:5002/representative_docs_by_topic?topic=all&top_doc_n=1'
// );
// export const [keywordid, setKeywordid] = React.useState(null);
export function httpGet(theUrl) {
  console.log('theUrl:', theUrl);
  var xmlHttp = new XMLHttpRequest();
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

export function new_line(text) {
  text = text.replaceAll('[N]', '<br>');
  // var return_text = text;
  if (text.includes('[C]') || text.includes('[F]')) {
    var now = '';
    var prev = '';
    for (var i = 0; i < text.length; i++) {
      var temp = text.slice(i, i + 3);
      if (temp == '[C]' || temp == '[F]') {
        now = temp;
        if (now == prev) {
          // text.slice(i, i + 3) = '|||';
          text = text.slice(0, i) + '|||' + text.slice(i + 3, text.length + 1);
        }
        // else if(temp == '[C]'){
        //   return_text = return_text.slice(0, i) + '\n' + text.slice(i + 3, text.length + 1);
        // }
        // else if(temp == '[F]'){
        //   return_text = return_text.slice(0, i) + '\n#' + text.slice(i + 3, text.length + 1);
        // }
        prev = temp;
      }
    }
  }
  return text.replaceAll('|||', '\n');
}
export function tagging(text) {

  try {
    // var regex = new RegExp('[F]', 'g');
    text = text.replaceAll(
      '[F]',
      "<br><span class='highlight_box'>" +
        '<span style="color:darkred; font-weight=bold;">' +
        '상담원&nbsp;' +
        '</span>' +
        '</span>'
    );
    // regex = new RegExp('[C]', 'g');
    text = text.replaceAll(
      '[C]',
      "<br><span class='highlight_box'>" +
        '<span style="color:black; font-weight=bold;">' +
        '고객&nbsp;' +
        '</span>' +
        '</span>'
    );
    // regex = new RegExp('[N]', 'g');
    text = text.replaceAll(
      '[N]',
      "<br>" +
        '-&nbsp;'
    );

    return text;
  } catch {
    return text;
  }
}
export function highlighting(text, keywords, keyword = null, key_sen = null) {
  if (keywords == undefined || keywords == null) {
    return text;
  }
  try {
    // var regex = new RegExp(keywords[i], 'g');
    // if (key_sen.includes(keywords[i])){
    //   continue;
    // } else
    if (keyword != null) {
      text = text.replaceAll(
        keyword,

        '<b>' +
          "<span class='highlight_click'>" +
          '<span style="background-color:red; color:white;">' +
          // 'Topic Keyword' +
          '</span>' +
          keyword +
          '</span>' +
          '</b>'
      );
    } else {
      for (var i = 0; i < keywords.length; i++) {
        text = text.replace(
          keywords[i],

          '<b>' +
            "<span class='highlight'>" +
            '<span style="background-color:red; color:white;">' +
            // 'Topic Keyword' +
            '</span>' +
            keywords[i] +
            '</span>' +
            '</b>'
        );
      }
    }
    return text;
  } catch {
    return text;
  }
}

export function highlighting_entity(text, entity, keywords = []) {
  if (entity == undefined || entity == []) {
    return text;
  }
  console.log('highlighting_entity');
  console.log(keywords);
  var entity_list = keywords;
  for (var i = 0; i < entity.length; i++) {
    // try {
    var category = entity[i]['category'];
    var raw = entity[i]['raw'];
    if (entity_list.includes(raw)) {
      continue;
    } else {
      var check_substring = false;
      for (var ii = 0; ii < entity_list.length; ii++) {
        if (entity_list[ii].includes(raw)) {
          check_substring = true;
        }
      }
      console.log('**************');
      console.log(entity_list);
      console.log(raw);
      entity_list.push(raw);
      if (check_substring == false) {
        if (category == 'ORG') {
          text = text.replaceAll(
            raw,
            "<span class='highlight_org'>" +
              entity[i]['raw'] +
              '<span style="background-color:green; color:white; font-weight=bold;">' +
              'Org' +
              '</span>' +
              '</span>'
          );
        } else if (category == 'DAT') {
          text = text.replaceAll(
            raw,
            "<span class='highlight_dat'>" +
              entity[i]['raw'] +
              '<span style="background-color:blue; color:white; font-weight=bold;">' +
              'Date' +
              '</span>' +
              '</span>'
          );
        } else if (category == 'LOC') {
          text = text.replaceAll(
            raw,
            "<span class='highlight_loc'>" +
              entity[i]['raw'] +
              '<span style="background-color:#222222; color:white; font-weight=bold;">' +
              'Location' +
              '</span>' +
              '</span>'
          );
        } else if (category == 'PER') {
          text = text.replaceAll(
            raw,
            "<span class='highlight_per'>" +
              entity[i]['raw'] +
              '<span style="background-color:dimgray; color:white; font-weight=bold;">' +
              'Person' +
              '</span>' +
              '</span>'
          );
        } else if (category == 'OTHERS') {
          text = text.replaceAll(
            raw,
            "<span class='highlight_others'>" +
              entity[i]['raw'] +
              '<span style="background-color:purple; color:white; font-weight=bold;">' +
              'Others' +
              '</span>' +
              '</span>'
          );
        }
      }
    }
    // } catch {
    //   console.log('error');
    //   continue;
    // }
  }
  return text;
}

export function highlighting_kpe(text, entity) {
  if (entity == undefined || entity == []) {
    return text;
  }

  var entity_list = [];
  for (var i = 0; i < entity.length; i++) {
    console.log('i.length:', entity.length);
    console.log('i:', i);
    // try {
    // var category = entity[i]['category'];
    var raw = entity[i]['keyword'];
    var category = entity[i]['category'];
    console.log('raw:', raw);
    // var check = entity_list.includes(raw);
    if (entity_list.includes(raw)) {
      console.log('in------------');
      continue;
    } else {
      entity_list.push(raw);
      if (category == 'ORG') {
        text = text.replaceAll(
          raw,
          "<span class='highlight_org'>" +
            entity[i]['keyword'] +
            '<span style="background-color:green; color:white; font-weight=bold;">' +
            'Org' +
            '</span>' +
            '</span>'
        );
      } else if (category == 'DAT') {
        text = text.replaceAll(
          raw,
          "<span class='highlight_dat'>" +
            entity[i]['keyword'] +
            '<span style="background-color:blue; color:white; font-weight=bold;">' +
            'Date' +
            '</span>' +
            '</span>'
        );
      } else if (category == 'LOC') {
        text = text.replaceAll(
          raw,
          "<span class='highlight_loc'>" +
            entity[i]['keyword'] +
            '<span style="background-color:#222222; color:white; font-weight=bold;">' +
            'Location' +
            '</span>' +
            '</span>'
        );
      } else if (category == 'PER') {
        text = text.replaceAll(
          raw,
          "<span class='highlight_per'>" +
            entity[i]['keyword'] +
            '<span style="background-color:dimgray; color:white; font-weight=bold;">' +
            'Person' +
            '</span>' +
            '</span>'
        );
      } else if (category == 'OTHERS') {
        text = text.replaceAll(
          raw,
          "<span class='highlight_others'>" +
            entity[i]['keyword'] +
            '<span style="background-color:purple; color:white; font-weight=bold;">' +
            'Others' +
            '</span>' +
            '</span>'
        );
      }
    }
    // } catch {
    //   console.log('catch');
    //   continue;
    // }
  }
  return text;
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
        "<span class='highlight_bg_key'>" +
          keywords[i] +
          '<span style="background-color:darkorange; color:white; font-weight=bold;">' +
          'Key Sentence' +
          '</span>' +
          '</span>'
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
