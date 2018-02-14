import { connect } from 'react-redux';
import ButtonTetris from '../../components/button/Button';
import actions from '../../actions';

import './AddRowButton.scss';

const mapDispatchToProps = dispatch => ({
  handleClick: () => {
    dispatch(actions.addRow());
  }
});

const addRowButton = connect(null, mapDispatchToProps)(ButtonTetris);

export default addRowButton;
