import React, { Component, PropTypes } from 'react';
import { IonItem, IonIcon, IonButton } from 'reactionic';

// Task component - represents a single todo item
export default class Credor extends Component {
  render() {
    return (
      <IonItem link={ '/credor/' + this.props.credor._id } iconRight>
          <span className="name">{this.props.credor.nome}</span>
          <span className="badge badge-corner">{this.props.credor.nEmpenhos}</span>
          <IonIcon icon="ios-arrow-right" />
      </IonItem>
    );
  }
}

//   <a href={ "credor/" + this.props.credor._id }>
//       <span className="name">{this.props.credor.nome}</span>
//       <span className="badge">{this.props.credor.nEmpenhos}</span>
//   </a>
//  <IonButton  icon="ion-chevron-right"
//           iconPosition="right"
//           link={ "/credor/" + this.props.credor._id }
//           color="dark"
//           type="outline">
// </IonButton>

Credor.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  credor: PropTypes.object.isRequired,
};
