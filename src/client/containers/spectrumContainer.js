import { connect } from 'react-redux';
import Spectrum from '../components/spectrum';

const mapStateToProps = state => ({
  spectrum: state.spectrum,
});

const SpectrumContainer = connect(mapStateToProps)(Spectrum);

export default SpectrumContainer;