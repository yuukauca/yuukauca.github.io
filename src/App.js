import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';

import { AFrameRenderer, Marker } from 'react-web-ar'

const { detect } = require('detect-browser');
const browser = detect();

class App extends Component {

    handleResize = (e) => {
        console.log('Loaded')
        this.setState({loading: false});
    }

    constructor(props){
        super(props);
        //this.handleResize = handleResize.bind(this);
        this.state={
            loading: true
        }
    }

    componentDidMount() {
        window.addEventListener('model-loaded', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('model-loaded', this.handleResize);
    }

    render() {
      return (
      <AFrameRenderer arToolKit={{ sourceType: 'webcam', debugUIEnabled: false }}>
      {this.state.loading ?<a-text scale="0.75 0.75 0.75" position="-0.40 0 -3" value="Cargando..." color="#232F43"></a-text>: null}
      {this.state.loading ?<a-entity position="0 0 -4">
          <a-box rotation="0 45 0" color="#89B526" scale="1.25 1.25 1.25"></a-box>
          <a-animation attribute="rotation"
               dur="10000"
               fill="both"
               easing="linear"
               to="0 360 0"
               repeat="indefinite"></a-animation>
        </a-entity>: null}

          <Marker parameters={{ type: 'pattern', url: './marker.patt'}}>
              <a-entity gltf-model="models/fantasma.glb" animation-mixer scale="0.25 0.25 0.25" rotation="0 180 0" opacity="1"></a-entity>
          </Marker>
      </AFrameRenderer>
      );
    }
}

export default App;
