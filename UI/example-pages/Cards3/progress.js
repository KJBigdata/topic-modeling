import React from 'react';
import { ExampleWrapperSimple } from '../../layout-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Row, Col
} from "reactstrap";

const apiURL = "http://3.34.114.152:5006";

class ModelingButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            model: null
        }
    }

    handleSubmit = () => {

        this.setState({ model: 'READY' });
        // console.log("Model : " + this.state.model)
        this._post();
    }

    _post = () => {
        return fetch(`${apiURL}/model`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        }).then(res => {
            if (res.status != 200) {
                this.setState({ model: 'error' })
                console.log(res)
                throw new Error(res.statusText);
            }
            return res;
        }).then(data => {
            this.setState({ model: true })
            console.log(data.result)
            window.location.href = 'http://localhost:3000/carolina-react-admin-dashboard-material-ui-free/Cards3';
        })
        console.log("Response Model : " + this.state.model);
    }

    render() {

        return (
            <div>
                <Button
                    onClick={this.handleSubmit}
                    size="large"
                    color="primary"
                    variant="contained"
                    className="m-2 py-3 px-5">
                    <span className="btn-wrapper--label">Analyze Topic</span>
                    <span className="btn-wrapper--icon">
                        <FontAwesomeIcon icon={['fas', 'arrow-right']} />
                    </span>
                </Button>

                {
                    ((this.state.model == 'READY') ?
                        <Row className="justify-content-center">
                            <div>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        </Row> : false)

                }

            </div>
        );
    }
}

export default ModelingButton;
