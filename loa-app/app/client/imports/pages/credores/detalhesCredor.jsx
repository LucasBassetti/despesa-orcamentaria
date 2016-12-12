import React, { Component } from 'react';
import { IonContent, IonList, IonItem, IonNavBackButton } from 'reactionic';

import Detalhes from './credor/Detalhes.jsx';

var DetalhesCredor = React.createClass({

    getInitialState() {
        return {
            detalhesCredor: null
        }
    },

    componentDidMount() {
        this.getDetalhesCredor();
    },

    getDetalhesCredor() {
        var self = this;

        this.setState({ detalhesCredor: null }, () => {
            Meteor.call('getDetalhesCredor', this.props.params._id, function(error, result) {
                self.setState({ detalhesCredor: result });
            });
        });
    },

    renderDetalhesCredor() {

        if (!this.state || !this.state.detalhesCredor) {
            return <IonList><IonItem>Loading...</IonItem></IonList>;
        }
        else {
            return <Detalhes key={this.state.detalhesCredor._id} credor={this.state.detalhesCredor} />;
        }
    },

    render() {
        return (
            <IonContent {...this.props}>
                {this.renderDetalhesCredor()}
            </IonContent>
        );
    }
});

export default DetalhesCredor;
