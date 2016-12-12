import React, { Component } from 'react';
import { IonContent, IonList, IonItem, IonNavBackButton } from 'reactionic';

import Detalhes from './acao/Detalhes.jsx';

var DetalhesAcao = React.createClass({

    getInitialState() {
        return {
            detalhesAcao: null
        }
    },

    componentDidMount() {
        this.getDetalhesAcao();
    },

    getDetalhesAcao() {
        var self = this;

        this.setState({ detalhesAcao: null }, () => {
            Meteor.call('getDetalhesAcao', this.props.params._id, function(error, result) {
                self.setState({ detalhesAcao: result });
            });
        });
    },

    renderDetalhesAcao() {

        if (!this.state || !this.state.detalhesAcao) {
            return <IonList><IonItem>Loading...</IonItem></IonList>;
        }
        else {
            return <Detalhes key={this.state.detalhesAcao._id} acao={this.state.detalhesAcao} />;
        }
    },

    render() {
        return (
            <IonContent {...this.props}>
                {this.renderDetalhesAcao()}
            </IonContent>
        );
    }
});

export default DetalhesAcao;
