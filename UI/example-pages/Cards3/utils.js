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

export function highlighting1(text, keywords) {
  if (keywords == undefined || keywords == null) {
    return text;
  }
  try {
    for (var i = 0; i < keywords.length; i++) {
      var regex = new RegExp(keywords[i], 'g');
      text = text.replace(
        regex,
        '<span style="background-color:red; color:white; font-weight=bold;">' +
        'Topic Keyword' +
        '</span>' + '<b>' +
        "<span class='highlight'>" +
          keywords[i] +
          '</span>' + '</b>'
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
        '<span style="background-color:red; color:white; font-weight=bold;">' +
        'Topic Keyword' +
        '</span>' + '<b>' +
        "<span class='highlight'>" +
          keywords[i] +
          '</span>' + '</b>'
      );
    }
    return text;
  } catch {
    return text;
  }
}

export function highlighting_entity(text, entity) {
  if (entity == undefined || entity == []) {
    return text;
  }
  try {
    var entity_list = [];
    for (var i = 0; i < entity.length; i++) {
      var category = entity[i]['category'];
      var raw = entity[i]['raw'];
      if (raw in entity_list) {
        continue;
      } else {
        entity_list = entity_list.push(raw);

        if (category == 'ORG') {
          text = text.replaceAll(
            raw,
            '<span style="background-color:green; color:white; font-weight=bold;">' +
            'Org' +
            '</span>' + '<b>' +
            "<span class='highlight_org'>" +
              entity[i]['raw'] +
              '</span>' + '</b>'
          );
        } else if (category == 'DAT') {
          text = text.replaceAll(
            raw,
            '<span style="background-color:blue; color:white; font-weight=bold;">' +
            'Date' +
            '</span>' + '<b>' + 
            "<span class='highlight_dat'>" +
              entity[i]['raw'] +
              '</span>' + '</b>'
          );
        } else if (category == 'LOC') {
          text = text.replaceAll(
            raw,
            '<span style="background-color:#222222; color:white; font-weight=bold;">' +
            'Location' +
            '</span>' + '<b>' +
            "<span class='highlight_loc'>" +
              entity[i]['raw'] +
              '</span>' + '</b>'
          );
        } else if (category == 'PER') {
          text = text.replaceAll(
            raw,
            '<span style="background-color:dimgray; color:white; font-weight=bold;">' +
            'Person' +
            '</span>' + '<b>' + 
            "<span class='highlight_per'>" +
              entity[i]['raw'] +

              '</span>' + '</b>'
          );
        } else if (category == 'OTHERS') {
          text = text.replaceAll(
            raw,'<span style="background-color:purple; color:white; font-weight=bold;">' +
            'Others' +
            '</span>' + '<b>' +
            "<span class='highlight_others'>" +
              entity[i]['raw'] + '</span>' +'</b>' 
              
          );
        }
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
        '<span style="background-color:darkorange; color:white; font-weight=bold;">' +
        'Key Sentence' +
        '</span>' + '<b>' +
        "<span style='color:darkorange; font-weight=bold;'>" +
          keywords[i] + 
          '</span>' + '</b>'
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