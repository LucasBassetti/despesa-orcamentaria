import React from 'react';
import { IonContent, IonList, IonItem } from 'reactionic';

import Acao from './acao/Acao.jsx';

var Acoes = React.createClass({

    getInitialState() {
        return {
            acoes: null
        }
    },

    componentDidMount() {
        this.getAcoes();
    },

    getAcoes() {
        var self = this;

        this.setState({ acoes: null }, () => {
            Meteor.call('getAcoesNumEmpenhos', function(error, result) {
                self.setState({ acoes: result });
            });
        });
    },

    renderAcoes() {

        if (!this.state || !this.state.acoes) {
            return <IonItem>Loading...</IonItem>;
        }
        else {
            return this.state.acoes.map((acao) => (
                <Acao key={acao._id} acao={acao} />
            ));
        }
    },

    render() {
        return (
            <IonContent {...this.props}>
                <IonList> {this.renderAcoes()} </IonList>
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

export default Acoes;
