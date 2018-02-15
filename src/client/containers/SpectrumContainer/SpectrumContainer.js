import { connect } from 'react-redux';
import Spectrum from '../../components/Spectrum/Spectrum';

const mapStateToProps = state => ({
  spectrum: state.spectrum,
});

const SpectrumContainer = connect(mapStateToProps)(Spectrum);

export default SpectrumContainer;
