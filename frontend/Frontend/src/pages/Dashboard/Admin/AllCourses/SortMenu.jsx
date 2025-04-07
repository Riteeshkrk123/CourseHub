import { Field, Select } from '@headlessui/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';


const SortMenu = ({ setGetSort }) => {


    return (
        <div className=" w-full md:w-[20%]">
            <Field>
                <div className="relative font-roboto text-[#404448]">
                    <Select
                        onChange={(e) => setGetSort(e.target.value)}
                        className={clsx(
                            'block w-full appearance-none rounded-lg bg-white/5 py-2 px-4 text-sm/6 border text-[#404448]',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            // Make the text of each option black on Windows
                            '*:text-[#404448]'
                        )}
                    >
                        <option value="">Sort by</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>

                    </Select>

                </div>
            </Field>
        </div>
    )
}

SortMenu.propTypes = {
    setGetSort: PropTypes.func,
}

export default SortMenu;
