import { getComment } from "../actions/getComment";
import getCurrentUser from "../actions/getCurrentUser"
import getFavorite from "../actions/getFavorite";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import useLoginModal from "../hooks/useLoginModal";
import FavoriteClient from "./FavoriteClient";

const FavoritePage =async() =>{
    const currentUser = await getCurrentUser();
    const favoriteListing = await getFavorite();
    const comment = await getComment()
    
    if(favoriteListing.length === 0) 
    {
        <ClientOnly>
                <Container >
                    <div className="font-bold text-2xl py-4">Yêu thích</div>
                    
                    <div className="py-4">
                        <div className="text-lg font-bold ">Tạo danh sách yêu thích đầu tiên</div>
                        <div className="text-[0.8rem] font-light pb-4">Đă đến lúc phải bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu tiếp theo cảu bạn rồi.</div>
                        <hr/>
                        <div
                            className=" py-4  "
                        >
                            <button className="border-[1px] rounded-lg px-4 py-4 hover:bg-neutral-200 transition">Bắt đầu tìm kiếm</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="text-[0.8rem] py-4">Bạn không tìm thấy đặt phòng/ đặt chổ của mình ở đây? <span className="underline cursor-pointer">Truy cập Trung tâm trợ giúp</span></div>
                </Container>

            </ClientOnly>
    }
    return (
        <ClientOnly>
            <FavoriteClient
                currentUser ={currentUser}
                favoriteListing = {favoriteListing}
                comment ={comment}
            />
        </ClientOnly>
    )
}

export default FavoritePage