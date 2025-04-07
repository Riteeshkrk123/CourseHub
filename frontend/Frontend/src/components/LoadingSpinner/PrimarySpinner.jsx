import PropTypes from 'prop-types'
import { ScaleLoader } from 'react-spinners'

const PrimarySpinner = ({ smallHeight }) => {
    return (
        <div
            className={` ${smallHeight ? 'h-[250px]' : 'h-[100vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
        >
            <ScaleLoader size={100} color='red' />
        </div>
    )
}

PrimarySpinner.propTypes = {
    smallHeight: PropTypes.bool,
}

export default PrimarySpinner