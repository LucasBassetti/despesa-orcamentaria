import React from 'react';
import { IonContent, IonList, IonItem } from 'reactionic';

import Credor from './credor/Credor.jsx';

var Credores = React.createClass({

    getInitialState() {
        return {
            credores: null
        }
    },

    componentDidMount() {
        this.getCredores();
    },

    getCredores() {
        var self = this;

        this.setState({ credores: null }, () => {
            Meteor.call('getCredorNumEmpenhos', function(error, result) {
                self.setState({ credores: result });
            });
        });
    },

    renderCredores() {

        if (!this.state || !this.state.credores) {
            return <IonItem>Loading...</IonItem>;
        }
        else {
            return this.state.credores.map((credor) => (
                <Credor key={credor._id} credor={credor} />
            ));
        }
    },

    render() {
        return (
            <IonContent {...this.props}>
                <IonList> {this.renderCredores()} </IonList>
            </IonContent>
        );
    }

  // render() {
  //   return (
  //     <IonContent customClasses="padding"
  //                 {...this.props}>
  //       <h2>About React-Ionic</h2>
  //       <p>React-Ionic is an open source library for implementing hybrid mobile apps (iOS and Android).</p>
  //       <p>For more information go to <a href="http://reactionic.github.io/">reactionic.github.io</a></p>
  //     </IonContent>
  //   );
  // }
});

export default Credores;
