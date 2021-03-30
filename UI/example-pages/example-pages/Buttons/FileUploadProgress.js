'use strict';

import { EventEmitter } from 'events';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import objectAssign from 'object-assign';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from "reactstrap";
import Visualzie from './visualize'

const styles = {
    progressWrapper: {
        height: '25px',
        marginTop: '10px',
        width: '400px',
        float: 'left',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        WebkitBoxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
    },
    progressBar: {
        float: 'left',
        width: '0',
        height: '100%',
        fontSize: '12px',
        lineHeight: '20px',
        color: '#fff',
        textAlign: 'center',
        // backgroundColor: '#337ab7',
        backgroundColor: '#5cb85c',
        WebkitBoxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.15)',
        WebkitTransition: 'width .6s ease',
        Otransition: 'width .6s ease',
        transition: 'width .6s ease',
    },
    cancelButton: {
        marginTop: '5px',
        WebkitAppearance: 'none',
        padding: 0,
        cursor: 'pointer',
        background: '0 0',
        border: 0,
        float: 'left',
        fontSize: '21px',
        fontWeight: 700,
        lineHeight: 1,
        color: '#000',
        textShadow: '0 1px 0 #fff',
        filter: 'alpha(opacity=20)',
        opacity: '.2',
    },
};

class FileUploadProgress extends React.Component {
    constructor(props) {
        super(props);
        this.proxy = new EventEmitter();
        this.state = {
            progress: -1,
            hasError: false,
            result: null
        };
    }


    cancelUpload() {
        this.proxy.emit('abort');
        this.setState({
            progress: -1,
            hasError: false,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            progress: 0,
            hasError: false,
            result: 'READY'
        }, this._doUpload);
    }

    render() {
        const formElement = this.props.formRenderer(this.onSubmit.bind(this));
        const progessElement = this.props.progressRenderer(
            this.state.progress, this.state.hasError, this.cancelUpload.bind(this), this.state.result);

        return (
            <div>
                {formElement}
                {progessElement}
            </div>
        );
    }

    _getFormData() {
        if (this.props.formGetter) {
            return this.props.formGetter();
        }
        return new FormData(ReactDom.findDOMNode(this.refs.form));
    }

    _doUpload() {
        const form = this._getFormData();
        const req = new XMLHttpRequest();

        req.open(this.props.method, this.props.url);
        req.addEventListener('load', (e) => {
            this.proxy.removeAllListeners(['abort']);
            const newState = { progress: 100 };
            if (req.status >= 200 && req.status <= 299) {
                this.setState(newState, () => {
                    this.props.onLoad(e, req);
                });
            } else {
                newState.hasError = true;
                this.setState(newState, () => {
                    this.props.onError(e, req);
                });
            }
        }, false);

        req.addEventListener('error', (e) => {
            this.setState({
                hasError: true,
            }, () => {
                this.props.onError(e, req);
            });
        }, false);


        req.addEventListener("readystatechange", () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    // request succesful
                    var response = req.responseText,
                        json = JSON.parse(response);

                    this.setState({
                        // isLoaded: true,
                        result: json.result
                    });
                } else {
                    // error
                    this.setState({
                        result: null,
                        error: req.responseText
                    });
                }
            }
        });

        req.upload.addEventListener('progress', (e) => {
            let progress = 0;
            if (e.total !== 0) {
                progress = parseInt((e.loaded / e.total) * 100, 10);
            }
            this.setState({
                progress,
            }, () => {
                this.props.onProgress(e, req, progress);
            });
        }, false);

        req.addEventListener('abort', (e) => {
            this.setState({
                progress: -1,
            }, () => {
                this.props.onAbort(e, req);
            });
        }, false);

        this.proxy.once('abort', () => {
            req.abort();
        });

        this.props.beforeSend(req)
            .send(this.props.formCustomizer(form));
    }
}

FileUploadProgress.propTypes = {
    url: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    formGetter: PropTypes.func,
    formRenderer: PropTypes.func,
    progressRenderer: PropTypes.func,
    formCustomizer: PropTypes.func,
    beforeSend: PropTypes.func,
    onProgress: PropTypes.func,
    onLoad: PropTypes.func,
    onError: PropTypes.func,
    onAbort: PropTypes.func,
};

FileUploadProgress.defaultProps = {
    formRenderer: (onSubmit) => (
        <form className="_react_fileupload_form_content" ref="form" method="post" onSubmit={onSubmit}>
            <div>
                <input type="file" name="file" />
            </div>
            <input type="submit" />
        </form>
    ),

    progressRenderer: (progress, hasError, cancelHandler, result) => {
        if (hasError || progress > -1) {
            const barStyle = objectAssign({}, styles.progressBar);
            barStyle.width = `${progress}%`;

            let message = (<span>Uploading ...</span>);
            if (hasError) {
                barStyle.backgroundColor = '#d9534f';
                message = (<span style={{ color: '#a94442' }}>Failed to upload ...</span>);
            } else if (progress === 100) {
                message = (<span >Successfully uploaded, and then Tokenizing Contents.....</span>);
            }

            return (
                <div className="_react_fileupload_progress_content">
                    <div style={styles.progressWrapper}>
                        <div className="_react_fileupload_progress_bar" style={barStyle} />
                    </div>

                    <button
                        className="_react_fileupload_progress_cancel"
                        style={styles.cancelButton}
                        onClick={cancelHandler}>
                        <span>&times;</span>
                    </button>
                    <Col>
                        <div style={{ clear: 'left' }}>
                            <br />
                            <br />
                            <Row className="justify-content-center">
                                {message}
                            </Row>
                            {
                                (result) ?
                                    ((result == 'READY') ?
                                        <Row className="justify-content-center">
                                            <div>
                                                <br />
                                                <Spinner animation="border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner>
                                            </div>
                                        </Row>
                                        :
                                        // '워드 클라우드 이미지를 불러오고 있습니다.' :
                                        ((result == 'success') ?
                                            <Row className="justify-content-center">
                                                <br />
                                            해당 텍스트에 대한 워드 클라우드를 만들어 주세요.
                                        </Row>

                                            :
                                            '')) :
                                    ''
                            }
                        </div>
                    </Col>

                </div>
            );
        }
        return '';
    },

    formCustomizer: (form) => form,
    beforeSend: (request) => request,
    onProgress: (e, request, progress) => { },
    onLoad: (e, request) => { },
    onError: (e, request) => { },
    onAbort: (e, request) => { }
};

export default FileUploadProgress;