import Circle from '../../../assets/instructor/circle.png';

const InstructorSection = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-3 md:px-2">
                <div className="md:px-12 relative">
                    <span className='absolute z-0'>
                        <img src={Circle} className='ml-10 mt-5 md:mt-12' alt="" />
                    </span>
                    <div className="bg-[#17a2b8] text-white md:px-20 md:py-14 rounded-lg flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col md:flex-row items-center justify-between py-4 px-8 md:px-0 md:py-0">

                            <div className="w-full md:w-3/5 mb-6 md:mb-0 z-10">

                                <h2 className="text-2xl font-bold mb-2 font-heebo md:text-4xl">Become an Instructor!</h2>
                                <p className="text-sm md:text-base font-roboto">
                                    Become an instructor and share your knowledge with learners across the globe. Inspire others to achieve their goals through your teaching. Start your rewarding journey today!
                                </p>
                            </div>
                            <div className="w-full md:w-2/5 flex justify-start md:justify-end">
                                <button className="border-2 border-yellow-400 text-yellow-400 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 hover:text-[#24292d] ease-linear transition">
                                    Start Teaching Today
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default InstructorSection;