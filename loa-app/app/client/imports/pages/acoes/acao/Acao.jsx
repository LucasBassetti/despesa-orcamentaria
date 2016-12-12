import React, { Component, PropTypes } from 'react';
import { IonItem, IonIcon, IonButton } from 'reactionic';

// Task component - represents a single todo item
export default class Acao extends Component {
  render() {
    return (
      <IonItem link={ '/acao/' + this.props.acao._id } iconRight>
          <span className="name">{this.props.acao.nome}</span>
          <span className="badge badge-corner">{this.props.acao.nEmpenhos}</span>
          <IonIcon icon="ios-arrow-right" />
      </IonItem>
    );
  }
}

Acao.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  acao: PropTypes.object.isRequired,
};
