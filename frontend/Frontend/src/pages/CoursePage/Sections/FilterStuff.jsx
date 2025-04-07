import DropdownMenu from "../../../components/DropDownMenu/DropdownMenu";
import SearchField from "../../../components/SearchField/SearchField";
import PropTypes from "prop-types";


const FilterStuff = ({ handleChange, handleSearch }) => {
    return (
        <div className="flex items-center md:flex-row flex-col gap-5 justify-center bg-[#F5F7F9] px-5 py-6 rounded-lg border">
            <DropdownMenu handleChange={handleChange} />
            <SearchField handleSearch={handleSearch} />
        </div>
    );
};

FilterStuff.propTypes = {
    handleChange: PropTypes.func,
    handleSearch: PropTypes.func
}

export default FilterStuff;