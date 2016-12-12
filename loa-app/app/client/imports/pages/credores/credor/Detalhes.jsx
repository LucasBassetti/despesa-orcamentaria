import React, { Component, PropTypes } from 'react';

import { IonList, IonItem } from 'reactionic';

// Task component - represents a single todo item
export default class Detalhes extends Component {
  render() {
    return (
      <IonList>
          <IonItem customClasses="subtitle">
              {this.props.credor.nome}
          </IonItem>
          <IonItem>
              <span className="name">Número de Empenhos</span>
              <span className="badge">{this.props.credor.nEmpenhos}</span>
          </IonItem>
          <IonItem>
              <span className="name">Total Empenhado</span>
              <span className="badge">R$ {this.props.credor.valorEmpenhado}</span>
          </IonItem>
          <IonItem>
              <span className="name">Número de Pagamentos</span>
              <span className="badge">{this.props.credor.nPagamentos}</span>
          </IonItem>
          <IonItem>
              <span className="name">Total Pago</span>
              <span className="badge">R$ {this.props.credor.valorPago}</span>
          </IonItem>
      </IonList>
    );
  }
}

Detalhes.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  credor: PropTypes.object.isRequired,
};
