import FeaturedRestCardsForRestPage from "./FeaturedRestCardsForRestPage";

function RestList({item}) {
    return (
        <div className="">
                        <h3 className="justify-center mb-4 font-bold text-gray-900 dark:text-white">Featured Restaurants</h3>
                            <div className="">
                                <div className="filterRest grid sm:w-full md:11/12 lg:w-10/12 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                                    {item.map((Val) => {
                                        return(
                                        <FeaturedRestCardsForRestPage
                                            restImg={Val.userProfileImageUrl}
                                            restName={Val.userName}
                                            restDish={Val.category.charAt(0).toUpperCase() + Val.category.slice(1)}
                                        />
                                );
                            })}
                            </div>
                            </div>
                        </div>
    );
}

export default RestList;
