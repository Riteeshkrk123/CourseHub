import PropTypes from "prop-types";

const StatisticsBox = ({ bgColor, icon: Icon, sizePx, iconColor, title, des }) => {
    return (
        <div className={`bg-[${bgColor}] px-6 py-5 rounded-lg shadow-md flex items-center`}>
            <div>
                <Icon size={sizePx} color={`${iconColor}`} />
            </div>
            <div className="ml-4">
                <p className="text-[21px] font-heebo font-bold text-[#24292d]">{title}</p>
                <h2 className="text-[15px] font-heebo font-normal text-[#24292d]">{des}</h2>
            </div>
        </div>
    );
};

StatisticsBox.propTypes = {
    bgColor: PropTypes.string,
    icon: PropTypes.func,
    iconColor: PropTypes.string,
    title: PropTypes.number,
    des: PropTypes.string,
    sizePx: PropTypes.number
}

export default StatisticsBox;