import { getComment } from "@/app/actions/getComment"
import ClientOnly from "@/app/components/ClientOnly";
import { useParams } from "next/navigation";
import UpdateIdComment from "./UpdateIdComment";

const DetailUpdateComment = async () =>{

    const comment = await getComment();

    return (
       <ClientOnly>
            <UpdateIdComment 
                comment = {comment}
            />
       </ClientOnly>
    )
}

export default DetailUpdateComment