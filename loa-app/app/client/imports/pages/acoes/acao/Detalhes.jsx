import React, { Component, PropTypes } from 'react';

import { IonList, IonItem } from 'reactionic';

// Task component - represents a single todo item
export default class Detalhes extends Component {
  render() {
    return (
      <IonList>
          <IonItem customClasses="subtitle">
              {this.props.acao.nome}
          </IonItem>
          <IonItem>
              <span className="name">Número de Empenhos</span>
              <span className="badge">{this.props.acao.nEmpenhos}</span>
          </IonItem>
          <IonItem>
              <span className="name">Total Empenhado</span>
              <span className="badge">R$ {this.props.acao.valorEmpenhado}</span>
          </IonItem>
          <IonItem>
              <span className="name">Número de Pagamentos</span>
              <span className="badge">{this.props.acao.nPagamentos}</span>
          </IonItem>
          <IonItem>
              <span className="name">Total Pago</span>
              <span className="badge">R$ {this.props.acao.valorPago}</span>
          </IonItem>
      </IonList>
    );
  }
}

Detalhes.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  acao: PropTypes.object.isRequired,
};
