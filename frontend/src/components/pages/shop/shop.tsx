import Carousel from "./carousel/Carousel.tsx";
import Popular from "./popular/popular.tsx";
import Offers from "./offers/offers.tsx";
import NewCollections from "./new collections/new_collections.tsx";
import Newsletter from "./newsletter/newsletter.tsx";

function Shop() {
  return (
    <div className="dark:bg-gray-900">
      <Carousel />
      <Popular />
      <Offers />
      <NewCollections />
      <Newsletter />
    </div>
  );
}

export default Shop;
