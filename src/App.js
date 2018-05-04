import React, { Component } from 'react';
import './App.css';
import { RootViewController } from "./containters/RootViewController";

class App extends Component {
    render() {
        return (
            <div className="App">
                <RootViewController/>
                {/*<video autoPlay loop id="video-background" muted playsInline>*/}
                    {/*<source*/}
                        {/*src="https://player.vimeo.com/external/158148793.hd.mp4?s=8e8741dbee251d5c35a759718d4b0976fbf38b6f&profile_id=119&oauth2_token_id=57447761"*/}
                        {/*type="video/mp4"/>*/}
                {/*</video>*/}
            </div>
        );
    }
}

export default App;
