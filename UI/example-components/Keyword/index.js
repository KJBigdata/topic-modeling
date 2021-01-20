import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Box, Button, List, ListItem, Popover} from "@material-ui/core";
import React, {Fragment} from "react";

export default function Keyword_layout(num1, num2){
  var num1_str = num1.toString()
  var num2_str = num2.toString()
  const button = 'button'+num1_str;
  const freq = 'button'+num1_str;
  const document1 = 'document'+num1_str+'1'
  const document2 = 'document'+num1_str+'2'
  const document3 = 'document'+num1_str+'3'
  const document4 = 'document'+num1_str+'4'
  const document5 = 'document'+num1_str+'5'
  const title1 = 'title' + num1_str
	  const [anchorEl5, setAnchorEl5] = React.useState(null);
  function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function highlighting(text, keywords){
    if (keywords == undefined){
      return text
    }
  }
const handleClickPopover5 = (i,j) => (event) => {
    setAnchorEl5(event.currentTarget);
    console.log(event.currentTarget)
    // var representative_docs = httpGet(url);
    // representative_docs = JSON.parse(representative_docs)
    //
    // var id = 'document'+i+j
    // var full_id = 'full'+i+j
    // var summary = representative_docs["hlight_sentence"][doc_list[j]]
    // var content = representative_docs["Text"]
    // var doc = summary[doc_list[i]]
    // // doc = highlighting(doc, [keyword])
    // doc =  highlighting(doc, [keyword])
    // var full_doc = highlighting(content[doc_list[i]], [keyword])

    //'+ content[doc_list[i]] +' '<Tooltip title="title" placement="right">'+ doc+'</Tooltip>>'
    //<Card className="p-2">
    //           <FontAwesomeIcon
    //             icon={['far', 'question-circle']}
    //             className="font-size-xxl"
    //           />Topic 10
    //         </Card>

    // document.getElementById(id).innerHTML = '<Tooltip title="title" placement="right"><Card className="p-2">' + doc+'</Card></Tooltip>'
    // document.getElementById(id).innerHTML =  '<div>' + doc + '</div>'
    // console.log(event)
    // document.getElementById('document'+i+j).innerHTML =  '<div>' + 'full_sentence' + '</div>'
  };
  const handleClosePopover5 = () => {
    setAnchorEl5(null);
  };

  const open5 = Boolean(anchorEl5);



		function angle_down(e, topic){
		  document.getElementById("title"+topic).innerText = '<Related Documents>';
      var keyword = e.currentTarget.value;
      var url = "http://3.34.114.152:5002/representative_docs_by_topic?topic="+topic+"&top_doc_n=15&topic_keyword="+keyword;
      console.log(url);
      var representative_docs = httpGet(url);
      representative_docs = JSON.parse(representative_docs)
      console.log(representative_docs)
      console.log(representative_docs["Doc_Id"])
      if (representative_docs["Doc_Id"].length == 0){
        var id = 'document'+topic+(1).toString()
        console.log('No Docu')
        document.getElementById(id).innerHTML = '<Tooltip title="title" placement="right">No Document</Tooltip>'
      }
      else{
        console.log('Yes Docu')
        console.log(representative_docs["Doc_Id"])
        var doc_list = Object.keys(representative_docs["Doc_Id"])
        var num_doc = Math.min(doc_list.length,5);
        var summary = representative_docs["hlight_sentence"]
        var content = representative_docs["Text"]

        for (var i =0; i<num_doc; i++){
          var id = 'document'+topic+(i+1).toString()
          var full_id = 'full'+topic+(i+1).toString()
          var doc = summary[doc_list[i]]
          // doc = highlighting(doc, [keyword])
          doc =  highlighting(doc, [keyword])
          var full_doc = highlighting(content[doc_list[i]], [keyword])

          //'+ content[doc_list[i]] +' '<Tooltip title="title" placement="right">'+ doc+'</Tooltip>>'
          //<Card className="p-2">
          //           <FontAwesomeIcon
          //             icon={['far', 'question-circle']}
          //             className="font-size-xxl"
          //           />Topic 10
          //         </Card>

          // document.getElementById(id).innerHTML = '<Tooltip title="title" placement="right"><Card className="p-2">' + doc+'</Card></Tooltip>'
          document.getElementById(id).innerHTML =  '<div>' + doc + '</div>'
          console.log(full_id)
          console.log(full_doc)
          console.log(document.getElementById('full11'))
          console.log(document.getElementById('full12'))
          // document.getElementById(full_id).innerHTML =  '<div>' + full_doc + '</div>'
        }
      }

    }
    function angle_up(e, topic){
		  document.getElementById("title"+topic).innerText = '';
		  for (var i =0; i<5; i++){
          var id = 'document'+topic+(i+1).toString();
          console.log('angle_up:',id)
          document.getElementById(id).innerText = '';
    }}

		function keyword_click(e){

		  console.log(e);//(document.getElementById('chart'))
      // document.getElementById("document1").innerText
		  // document.getElementById('chart').dataPoints.x=0;

      // console.log(document.getElementById("button" + (i + 1).toString()).innerHTML);
      console.log(e.currentTarget.value);
      console.log(e.currentTarget.id);
      // console.log(document.getElementById("button" + (i + 1).toString()).value);
      // console.log(document.getElementById("button" + (i + 1).toString()).id);
      var topic = e.currentTarget.id.replace('button','');


      if(document.getElementById("title"+topic).innerText === '<Related Documents>'){
        angle_up(e, topic)
      }
      else{
        angle_down(e, topic)
      }
      // options = options_update;
// reload_chart();



  // window.location.reload();


    }
  return(
<Fragment>
      <ListItem className="d-block">
        <div className="align-box-row">
          <div className="flex-grow-1">
            <progress id={freq} className="progress is-large is-info" max="50" value="0" ></progress>
          </div>
          <div className="line-height-sm text-center ml-4">
            <b className="font-size-lg text-success">
              <small className="pr-1 text-black-50">1.</small>

              <Button id = {button} variant="contained" color="secondary" onClick={keyword_click} value='키워드'>
              <b id = 'keyword1'>키워드 </b>
              {/*<span className="mr-3 badge badge-second">New</span>*/}
              <span>
                <FontAwesomeIcon icon={'angle-down'} />
              </span>
              </Button>
            </b>
          </div>
        </div>

          <h5 id={title1}></h5>

          {/*<span id = 'document11' className="m-1 badge badge-second" onMouseOver={handleClickPopover5}></span>*/}
          {/*<div id = 'document11'>*/}
          <Button className="p-4-4" id = {document1} variant="contained" color="secondary" onClick={handleClickPopover5('1','1')}>
            </Button>
          <Popover id = 'full11'  open={open5} anchorEl={anchorEl5} onClose={handleClosePopover5}
                anchorOrigin={{vertical: 'center',horizontal: 'left'}}
                transformOrigin={{ vertical: 'center', horizontal: 'right'}}>
          </Popover>

          <Button className="p-4-4" id = {document2} variant="contained" color="secondary" onClick={handleClickPopover5('1','2')}>
            </Button>
          <Popover open={open5} anchorEl={anchorEl5} onClose={handleClosePopover5}
                anchorOrigin={{vertical: 'center',horizontal: 'left'}}
                transformOrigin={{ vertical: 'center', horizontal: 'right'}}>
          <Box id = 'full12' className="p-4">
            본문
            </Box>
          </Popover>
          <Button className="p-4-4" id ={document3} variant="contained" color="secondary" onClick={handleClickPopover5('1','3')}>
            </Button>
          <Popover open={open5} anchorEl={anchorEl5} onClose={handleClosePopover5}
                anchorOrigin={{vertical: 'center',horizontal: 'left'}}
                transformOrigin={{ vertical: 'center', horizontal: 'right'}}>
          <Box id = 'full13' className="p-4">
            본문
            </Box>
          </Popover>
          <Button className="p-4-4" id = {document4} variant="contained" color="secondary" onClick={handleClickPopover5('1','4')}>
            </Button>
          <Popover open={open5} anchorEl={anchorEl5} onClose={handleClosePopover5}
                anchorOrigin={{vertical: 'center',horizontal: 'left'}}
                transformOrigin={{ vertical: 'center', horizontal: 'right'}}>
          <Box id = 'full14' className="p-4">
            본문
            </Box>
          </Popover>
          <Button className="p-4-4" id = {document5} variant="contained" color="secondary" onClick={handleClickPopover5('1','5')}>
            </Button>
          <Popover open={open5} anchorEl={anchorEl5} onClose={handleClosePopover5}
                anchorOrigin={{vertical: 'center',horizontal: 'left'}}
                transformOrigin={{ vertical: 'center', horizontal: 'right'}}>
          <Box id = 'full15' className="p-4">
            본문
            </Box>
          </Popover>
    </ListItem>

  </Fragment>
  );
    }
