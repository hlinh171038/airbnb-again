"use client"

import RentContent from "./RentContent"
import {TiTick} from 'react-icons/ti'
import {ImCross} from 'react-icons/im'
import Button from "../Button"

const RentHeader2 = () =>{

    const handleOpenRule =()=>{

    }
    return (
        <div className="py-8">
            <div className=" text-center">
                <span className="text-4xl font-semibold"><span className="text-rose-600 ">Air</span>cover</span>
                <div className="font-semibold">cho chủ nhà </div>
            </div>
            <div className="mt-4 text-start md:text-center">
                <span className="text-xl md:text-4xl font-semibold text-center">Cho thuê trên Airbnb với chương trình bảo vệ toàn diện</span>
                <table className="w-full mt-6">
                    <tr >
                        <td></td>
                        <td className="text-sm md:text-md text-center">Airbnb</td>
                        <td className="text-sm md:text-md text-center">Đơn vị cạnh tranh</td>
                    </tr>
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title="Xác minh danh tính của khách"
                                    content="Hệ thống xác minh toàn diện của chúng tôi kiểm tra các thông tin như tên, địa chỉ, giấy tờ tùy thân do chính phủ cấp và nhiều thông tin khác để xác nhận danh tính của khách đặt phòng/đặt chỗ trên Airbnb."
                                    bold
                                    hidden
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    <tr className=" md:hidden border-b-[1px]">
                        <td colSpan={3} className="pb-5">
                            <RentContent
                                padding
                                content="Hệ thống xác minh toàn diện của chúng tôi kiểm tra các thông tin như tên, địa chỉ, giấy tờ tùy thân do chính phủ cấp và nhiều thông tin khác để xác nhận danh tính của khách đặt phòng/đặt chỗ trên Airbnb."
                                bold
                            />
                        </td>
                    </tr>
                    {/* item 2  */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title="Sàng lọc yêu cầu đặt phòng"
                                    content="Công nghệ độc quyền của chúng tôi phân tích hàng trăm yếu tố trong mỗi yêu cầu đặt phòng để chặn những lượt đặt cho thấy nguy cơ cao về việc tổ chức tiệc tùng gây phiền toái và thiệt hại tài sản."
                                    bold
                                    hidden
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    <tr className=" md:hidden border-b-[1px]">
                        <td colSpan={3} className="pb-5">
                            <RentContent
                                padding
                                content="Công nghệ độc quyền của chúng tôi phân tích hàng trăm yếu tố trong mỗi yêu cầu đặt phòng để chặn những lượt đặt cho thấy nguy cơ cao về việc tổ chức tiệc tùng gây phiền toái và thiệt hại tài sản."
                                bold
                            />
                        </td>
                    </tr>
                    {/* item 3  */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title="Bảo vệ thiệt hại trị giá 3 triệu USD"
                                    content="Airbnb sẽ bồi hoàn cho bạn về thiệt hại do khách gây ra đối với nhà và đồ đạc của bạn, đồng thời bao gồm các hình thức bảo vệ đặc biệt sau:"
                                    hidden
                                    bold
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    <tr className=" md:hidden border-b-[1px]">
                        <td colSpan={3} className="pb-5">
                            <RentContent
                                padding
                                content="Airbnb sẽ bồi hoàn cho bạn về thiệt hại do khách gây ra đối với nhà và đồ đạc của bạn, đồng thời bao gồm các hình thức bảo vệ đặc biệt sau:"
                                bold
                            />
                        </td>
                    </tr>
                    {/* item 4  */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title=""
                                    content="Tác phẩm nghệ thuật và tài sản có giá trị"
                                    bold
                                    
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                   {/* ITEM 5 */}
                   <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title=""
                                    content="Ô tô và thuyền"
                                    bold
                                    
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    {/*  item 6 */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title=""
                                    content="Thiệt hại do thú cưng"
                                    bold
                                    
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    {/* item 7  */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title=""
                                    content="Tổn thất thu nhập"
                                    bold
                                    
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    {/* item 8 */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title=""
                                    content="Vệ sinh chuyên sâu"
                                    bold
                                    
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    {/* item 9 */}
                    <tr className="md:border-b-[1px]">
                        <td className="md:max-w-sm ">
                            <div className="w-full lg:w-1/2 py-5">
                                <RentContent
                                    title="Đường dây an toàn 24/24"
                                    content="Nếu bạn cảm thấy không an toàn, ứng dụng của chúng tôi cho phép bạn liên hệ bất kể ngày đêm với nhân viên hỗ trợ an toàn, được đào tạo đặc biệt của chúng tôi – chỉ bằng một thao tác chạm."
                                    bold
                                    hidden
                                />
                            </div>
                        </td>

                        <td >
                            <div className="flex justify-center">
                                <TiTick className="text-green-600" size={30}/>
                            </div>
                        </td>
                        <td>
                        <div className="flex justify-center">
                                <ImCross className="text-rose-700" size={20}/>
                            </div>
                        </td>
                    </tr>
                    <tr className=" md:hidden border-b-[1px]">
                        <td colSpan={3} className="pb-5">
                            <RentContent
                                padding
                                content="Nếu bạn cảm thấy không an toàn, ứng dụng của chúng tôi cho phép bạn liên hệ bất kể ngày đêm với nhân viên hỗ trợ an toàn, được đào tạo đặc biệt của chúng tôi – chỉ bằng một thao tác chạm."
                                bold
                            />
                        </td>
                    </tr>
                </table>
                <RentContent 
                    title=""
                    content="Kết quả so sánh dựa trên thông tin công khai và quyền lợi được cung cấp miễn phí của các đơn vị cạnh tranh tính đến ngày 22/10. Tìm hiểu thông tin chi tiết và các trường hợp ngoại lệ tại đây."
                />
                <div className="w-[70%] sm:w-[40%] md:w-1/3 mt-4">
                <Button 
                    label="Tìm hiểu thêm"
                    outline
                    onClick={handleOpenRule}
                    
                />
                </div>
            </div>
        </div>
    )
}

export default RentHeader2