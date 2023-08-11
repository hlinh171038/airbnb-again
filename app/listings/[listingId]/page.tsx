import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { getComment } from "@/app/actions/getComment";
import { getAllUser } from "@/app/actions/getAllUser";


interface IParams {
    listingId?: string
}

const Listingpage = async({params}:{params: IParams}) =>{
    // why i dont use useParams --> this is server component 
    const listing = await getListingById(params)
    const currentUser = await getCurrentUser()
    const allUser = await getAllUser()
    const comments = await getComment();
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
            comments ={comments}
            allUser ={allUser}
          />
        </ClientOnly>
      );
      }
export default Listingpage;