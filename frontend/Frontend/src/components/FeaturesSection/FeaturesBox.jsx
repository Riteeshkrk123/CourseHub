import PropTypes from 'prop-types';

const FeaturesBox = ({ icon: Icon, title, des, bgColor, color }) => {
    return (
        <div className={`${bgColor ? bgColor : 'bg-yellow-100'} flex items-center justify-center gap-7 p-4 rounded-lg shadow`}>
            <div className={`${color ? color : ''}`}>{<Icon size={65} />}</div>
            <div>
                <h3 className="text-xl text-[#24292d] font-bold mt-2 font-heebo">{title}</h3>
                <p className="text-[#24292d] font-heebo">{des}</p>
            </div>
        </div>
    );
};

FeaturesBox.propTypes = {
    icon: PropTypes.func,
    title: PropTypes.string,
    des: PropTypes.string,
    bgColor: PropTypes.string,
    color: PropTypes.string
}

export default FeaturesBox;