import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getReservations";
import ClientOnly from "../components/ClientOnly";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

const Trips = async()=>{
    const currentUser = await getCurrentUser();
    const reservations = await getReservation({userId:currentUser?.id})

    if(!currentUser)
    {
        return (
            <ClientOnly>
                <EmptyState 
                    title="Tài khoản chưa được xác thực"
                    subtitle="Vui lòng đăng nhập lại !!"
                />
            </ClientOnly>
        )
    }
    if(reservations.length === 0)
    {
        return (
            <ClientOnly>
                <Container >
                    <div className="font-bold text-2xl py-4">Chuyến đi</div>
                    
                    <div className="py-4">
                        <div className="text-lg font-bold ">Chưa có chuyến đi nào được đặt ... vẫn chưa!</div>
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
        )
    }
    return (
        <ClientOnly>
            <TripsClient 
                currentUser={currentUser}
                reservations = {reservations}
            />
        </ClientOnly>
    )
}

export default Trips