import Dropzone from 'react-dropzone'
import React, { Component } from 'react';
import {DropzoneArea} from 'material-ui-dropzone'


class ImageAudioVideo extends Component{
  getUploadParams({ meta }){
    const url = 'https://httpbin.org/post'
    return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
  }

  handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta);
  }
  handleSubmit(files, allFiles){
    // console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }
 render(){
  return (
    <Dropzone
      getUploadParams={this.getUploadParams}
      onChangeStatus={this.handleChangeStatus}
      onSubmit={this.handleSubmit}
      accept="tsv/*"
      inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : 'Drag Files')}
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}

    />
  )
}
  }

// <ImageAudioVideo />

export default ImageAudioVideo;

