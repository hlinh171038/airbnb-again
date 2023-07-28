import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
    listingId?: string
}

const Listingpage = async({params}:{params: IParams}) =>{
    // why i dont use useParams --> this is server component 
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    if (!listing) {
        return (
          <ClientOnly>
            <EmptyState />
          </ClientOnly>
        );
      }

      return (
        <ClientOnly>
          <ListingClient
            listing={listing}
            currentUser={currentUser}
          />
        </ClientOnly>
      );
      }
export default Listingpage;