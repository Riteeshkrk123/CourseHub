
const SubscribeSection = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto px-3 md:px-2">
                <div className="md:px-12 relative">
                    <span className='absolute z-0 ml-10 mt-3 md:mt-7'>
                        <svg width="141px" fill='#3669A8' height="141px"><path className="z-0" d="M140.520,70.258 C140.520,109.064 109.062,140.519 70.258,140.519 C31.454,140.519 -0.004,109.064 -0.004,70.258 C-0.004,31.455 31.454,-0.003 70.258,-0.003 C109.062,-0.003 140.520,31.455 140.520,70.258 Z"></path></svg>
                    </span>
                    <div className=" bg-gradient-to-r z-10 from-[#066ac9] to-[#064f8a] text-white md:px-20 md:py-14 rounded-lg flex flex-col md:flex-row items-center justify-between">
                        <div className="flex flex-col z-10 md:flex-row items-center justify-between py-4 px-8 md:px-0 md:py-0">

                            <div className="w-full md:w-1/2 mb-6 md:mb-0 z-10">

                                <h2 className="text-2xl font-bold mb-2 font-heebo md:text-4xl">Are you ready for a more great Conversation?
                                </h2>
                            </div>
                            <div className="w-full md:w-[45%] flex justify-start ml-5 md:justify-end px-4 bg-white rounded-lg overflow-hidden shadow-md">
                                <div className="flex w-full items-center">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-grow font-roboto px-2 py-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                                    />
                                    <button
                                        className="bg-[#24292d] z-20 text-white rounded-md px-4 py-2 hover:bg-gray-800"
                                    >
                                        Subscribe
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SubscribeSection;