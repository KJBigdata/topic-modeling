import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import UpdateIcon from '@material-ui/icons/Update';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ExampleWrapperSimple } from '../../layout-components';
import Button from '@material-ui/core/Button';
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Row, Col
} from "reactstrap";

const apiURL = "http://3.34.114.152:5005";

const styles = theme => ({
    fab: {
        // position: 'fixed',
        // bottom: '20px',
        // right: '20px'
    },
});


class Visualzie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialog: false,
            imageUrl: null
        }
    }

    componentDidMount() {
        this._getImage();
    }

    _getImage() {
        fetch(`${apiURL}/validate?filename=${this.props.filename}`).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(data => {
            if (data['result'] == true) {
                this.setState({ imageUrl: apiURL + "/data/vis?filename=" + this.props.filename })
                console.log(("validation is True : " + this.state.imageUrl))
            } else {
                this.setState({ imageUrl: 'NONE' });
                console.log(("validation is False : " + this.state.imageUrl))
            }
        });
    }

    handleDialogToggle = () => this.setState({
        dialog: !this.state.dialog
    })

    handleSubmit = () => {

        this.setState({ imageUrl: 'READY' });
        console.log(this.state.imageUrl)
        console.log(this.state.dialog)
        const wordCloud = {
            filename: this.props.filename
        }
        this.handleDialogToggle();
        if (!wordCloud.filename) {
            return;
        }
        console.log("const filename " + wordCloud.filename)
        this._get();
    }

    _get = () => {
        return fetch(`${apiURL}/validate?filename=${this.props.filename}`,
         {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify(wordCloud)
        }).then(res => {
            if (res.status != 200) {
                throw new Error(res.statusText);
            }
            return res;
        }).then(data => {
            this.setState({ imageUrl: apiURL + "/data/vis?filename=" + this.props.filename })
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                {
                    (this.state.imageUrl) ?
                        ((this.state.imageUrl == 'READY') ?
                            <Row className="justify-content-center">
                                <div>
                                    <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </div>
                            </Row> :
                            // '워드 클라우드 이미지를 불러오고 있습니다.' :
                            ((this.state.imageUrl == 'NONE') ?
                                '해당 인풋 데이터에 대한 워드 클라우드를 만들어 주세요.' :
                                <img key={Math.random()} src={this.state.imageUrl} style={{ width: '100%' }} />)) :
                        ''
                }
                <br/>
                <br/>
                <Fab color="primary" className={classes.fab} onClick={this.handleDialogToggle}>
                    <UpdateIcon />
                </Fab>
                <Dialog open={this.state.dialog} onClose={this.handleDialogToggle}>
                    <DialogTitle>워드 클라우드 생성</DialogTitle>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            {(this.state.imageUrl == 'NONE') ? '만들기' : '다시 만들기'}
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleDialogToggle}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Visualzie);
