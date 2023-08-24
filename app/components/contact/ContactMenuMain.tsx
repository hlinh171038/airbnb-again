"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const article = [
    {
        title:"Yêu cầu hoàn tiền",
        content:"Việc hoàn tiền nên được thực hiện dễ dàng. Bạn có thể yêu cầu hoàn tiền trong Trung tâm..."
    },
    {
        title:"Các loại thuế cho khách",
        content:"Có thể bạn chỉ muốn được an tâm hơn trước khi đặt phòng, cũng có thể lúc này bạn đang..."
    },
    {
        title:"Qui trình hủy",
        content:"Đôi khi mọi thứ phát sinh và bạn phải hủy bỏ. Để mọi thứ diễn ra suôn sẻ, đây là cách bạn có thể hủy đặt chỗ, hãy tìm hiểu.."
    },
    {
        title:"Hoàn tiền tự động",
        content:"Các khoản hoàn trả đủ điều kiện sẽ được xử lý ngay sau khi bạn nhấp vào hủy bỏ. Chúng tôi tự động xử lý khoản tiền hoàn lại thông qua phương thức thanh toán bạn đã sử dụng..."
    },
    {
        title:"Kiểm tra trạng thái đặt phòng/đặt chỗ của bạn với tư cách là khách",
        content:"Trạng thái đặt trước của bạn giúp bạn cập nhật mọi thứ, chẳng hạn như liệu bạn đã được xác nhận hay cần thực hiện điều gì đó như ..."
    },
    {
        title:"Tìm chính sách hủy cho đặt phòng của bạn",
        content:"Có thể bạn chỉ muốn được an tâm hơn trước khi đặt phòng, cũng có thể lúc này bạn đang ..."
    }
]

    export const caroselArr = [
    {
        id:'1',
        title:"bắt đầu trên Airbnb",
        subtitle:"Quy trình xác minh danh tính giúp chúng tôi xác nhận rằng đó đúng là bạn. Đây là một trong những cách giúp chúng tôi đảm bảo an toàn trên Airbnb",
        img:"/carosel-01.jpeg",
        content:"Miễn là bạn nhập điểm đến, ngày đi và số lượng khách khi tìm kiếm trên Airbnb, tất cả danh sách hiển thị sẽ có sẵn. Để đảm bảo không gian vừa phải, hãy sử dụng các bộ lọc tìm kiếm để tìm một địa điểm hoàn toàn dành cho chính bạn hoặc các tùy chọn khác nếu bạn muốn một số không gian chung. Một khi bạn tìm thấy một nơi bạn thích, bạn có thể vẫn còn thắc mắc về nó. Mặc dù không thể đến thăm chỗ nghỉ trước khi đặt phòng, nhưng bạn có thể liên hệ với Chủ nhà để tìm hiểu thêm. Ngoài ra, hãy hỏi họ về các tiện nghi cụ thể, vùng lân cận hoặc địa điểm vì họ là nguồn tốt nhất cho tất cả các chi tiết. Họ thậm chí có thể gửi cho bạn chấp thuận trước hoặc ưu đãi đặc biệt để lôi kéo bạn đặt chỗ của họ.",
        category:"guest"
    },
    {
        id:'2',
        title:"Tìm chổ phù hợp với bạn",
        subtitle:"bạn đã sẵn sàng để đặt, nhưng cần phải trả tiền. Tin vui là chúng tôi hỗ trợ các phương thức thanh toán khác nhau—điều này chỉ phụ thuộc vào quốc gia đặt tài khoản thanh toán của bạn. Nếu cần chia nhỏ khoản thanh toán của mình, bạn có thể chia nhỏ miễn là thời gian lưu trú của bạn đủ điều kiện và có tùy chọn gói thanh toán khi thanh toán. Hãy nhớ rằng, bất kể bạn sử dụng phương thức thanh toán nào hoặc thanh toán vào thời điểm nào, hãy luôn lưu giữ các giao dịch trên Airbnb.",
        content:"bạn đã sẵn sàng để đặt, nhưng cần phải trả tiền. Tin vui là chúng tôi hỗ trợ các phương thức thanh toán khác nhau—điều này chỉ phụ thuộc vào quốc gia đặt tài khoản thanh toán của bạn. Nếu cần chia nhỏ khoản thanh toán của mình, bạn có thể chia nhỏ miễn là thời gian lưu trú của bạn đủ điều kiện và có tùy chọn gói thanh toán khi thanh toán. Hãy nhớ rằng, bất kể bạn sử dụng phương thức thanh toán nào hoặc thanh toán vào thời điểm nào, hãy luôn lưu giữ các giao dịch trên Airbnb.",
        img:"/carosel-02.jpeg",
        category:"guest"
    },
    {
        id:'3',
        title:"Thanh toán cho chuyến đi ",
        subtitle:"Quy trình xác minh danh tính giúp chúng tôi xác nhận rằng đó đúng là bạn. Đây là một trong những cách giúp chúng tôi đảm bảo an toàn trên Airbnb",
        img:"/carosel-03.jpeg",
        content:"Miễn là bạn nhập điểm đến, ngày đi và số lượng khách khi tìm kiếm trên Airbnb, tất cả danh sách hiển thị sẽ có sẵn. Để đảm bảo không gian vừa phải, hãy sử dụng các bộ lọc tìm kiếm để tìm một địa điểm hoàn toàn dành cho chính bạn hoặc các tùy chọn khác nếu bạn muốn một số không gian chung. Một khi bạn tìm thấy một nơi bạn thích, bạn có thể vẫn còn thắc mắc về nó. Mặc dù không thể đến thăm chỗ nghỉ trước khi đặt phòng, nhưng bạn có thể liên hệ với Chủ nhà để tìm hiểu thêm. Ngoài ra, hãy hỏi họ về các tiện nghi cụ thể, vùng lân cận hoặc địa điểm vì họ là nguồn tốt nhất cho tất cả các chi tiết. Họ thậm chí có thể gửi cho bạn chấp thuận trước hoặc ưu đãi đặc biệt để lôi kéo bạn đặt chỗ của họ.",
        category:"guest"
    },
    {
        id:'4',
        title:"Airbnb cho khách",
        subtitle:"Quy trình xác minh danh tính giúp chúng tôi xác nhận rằng đó đúng là bạn. Đây là một trong những cách giúp chúng tôi đảm bảo an toàn trên Airbnb",
        img:"/carosel-05.jpeg",
        content:"Mọi đặt phòng đều đi kèm với AirCover cho khách. Nếu có vấn đề nghiêm trọng với Airbnb của bạn mà Chủ nhà không thể giải quyết, chúng tôi sẽ giúp bạn tìm một địa điểm tương tự, tùy thuộc vào tình trạng sẵn có với mức giá tương đương. Nếu một địa điểm tương tự không có sẵn hoặc bạn không muốn đặt lại, chúng tôi sẽ hoàn lại toàn bộ hoặc một phần cho bạn.Nếu có bất cứ điều gì xảy ra, Máy chủ của bạn là điểm liên hệ tốt nhất của bạn; có khả năng họ sẽ có thể sửa nó. Bạn có thể nhắn tin trực tiếp cho Chủ nhà từ hộp thư đến của mình để cho họ biết chuyện gì đang xảy ra..",
        category:"guest"
    },
    {
        id:'5',
        title:"Tối ưu hóa mục cho thuê",
        img:"/carosel-06.jpeg",
        content:"Bạn muốn quản lý giá hàng đêm, giảm giá, v.v. Hãy truy cập Danh sách. Chỉ cần biết rằng giá tùy chỉnh sẽ thay thế giá thông thường hàng đêm, hàng tuần và hàng tháng của danh sách của bạn hoặc bất kỳ giá hàng đêm nào bạn đã lưu trên lịch của mình. Nếu bạn muốn thêm các loại phí khác—chẳng hạn như phí dọn dẹp để giúp bạn giữ cho chỗ ở của mình ở tình trạng tốt—bạn cũng có thể thiết lập loại phí này trong Danh sách. ..",
        category:"host"
    },
    {
        id:'6',
        title:"Nhận chi trả",
        img:"/carosel-07.jpeg",
        content:"Khi bạn lần đầu tiên trở thành Chủ nhà, bạn sẽ cần đảm bảo rằng bạn đã thiết lập một phương thức thanh toán cho tài khoản của mình. Có thể mất một chút thời gian để thiết lập đầy đủ, vì vậy chúng tôi khuyên bạn nên thực hiện càng sớm càng tốt. Nhưng làm cách nào để bạn chọn loại tiền xuất chi? Nó dựa trên quốc gia và phương thức bạn đã chọn khi thêm phương thức chi trả lần đầu tiên. Xin lưu ý rằng bạn không thể thay đổi đơn vị tiền tệ của phương thức thanh toán sau khi đã thêm phương thức thanh toán đó, nhưng bạn có thể thiết lập phương thức thanh toán mới bằng đơn vị tiền tệ khác bất kỳ lúc nào.",
        category:"host"
    },
    {
        id:'7',
        title:"Đạt mục tiêu đón khách",
        img:"/carosel-08.jpeg",
        content:"Làm thế nào để bạn làm cho danh sách của bạn hấp dẫn khách? Đối với những người mới bắt đầu, việc mô tả rõ ràng, chính xác về những gì khách sẽ nhận được sẽ rất hữu ích—điều này đặt ra những kỳ vọng phù hợp. Luôn cập nhật thông tin chi tiết, cho khách biết điều gì làm cho địa điểm của bạn trở nên độc đáo và chụp nhiều ảnh chất lượng cao (hãy coi ảnh là ấn tượng đầu tiên về không gian của bạn). Đây là mẹo chụp ảnh: Hãy dành chút thời gian để sắp xếp mọi thứ như thể bạn đang chuẩn bị chào đón vị khách đầu tiên của mình.",
        category:"host"
    },
    {
        id:'8',
        title:"Thay đổi, hủy và hoàn tiền",
        img:"/carosel-09.jpeg",
        content:"Nếu khách của bạn hủy, chúng tôi sẽ thông báo cho bạn và tự động bỏ chặn các ngày trên lịch của bạn để bạn có thể đón tiếp những khách khác. Nhưng những gì về khoản thanh toán của bạn? Nếu bạn đã lưu trữ trước đó, nó sẽ được phát hành cho bạn 24 giờ sau thời gian nhận phòng theo lịch trình của khách. Nếu đây là lần đầu tiên bạn đăng cai, chúng tôi có thể giữ nó cho đến 30 ngày sau khi đặt chỗ được xác nhận.",
        category:"host"
    },
    {
        id:'9',
        title:"Nhận chi trả",
        img:"/carosel-10.jpeg",
        content:"Khi bạn lần đầu tiên trở thành Chủ nhà, bạn sẽ cần đảm bảo rằng bạn đã thiết lập một phương thức thanh toán cho tài khoản của mình. Có thể mất một chút thời gian để thiết lập đầy đủ, vì vậy chúng tôi khuyên bạn nên thực hiện càng sớm càng tốt. Nhưng làm cách nào để bạn chọn loại tiền xuất chi? Nó dựa trên quốc gia và phương thức bạn đã chọn khi thêm phương thức chi trả lần đầu tiên. Xin lưu ý rằng bạn không thể thay đổi đơn vị tiền tệ của phương thức thanh toán sau khi đã thêm phương thức thanh toán đó, nhưng bạn có thể thiết lập phương thức thanh toán mới bằng đơn vị tiền tệ khác bất kỳ lúc nào.",
        category:"oganize"
    },
    {
        id:'10',
        title:"Quản lý Trải nghiệm ",
        img:"/carosel-11.webp",
        content:"Một trong những cách tốt nhất để thu hút khách đến trang Trải nghiệm của bạn là chụp ảnh đẹp, chất lượng cao (cố gắng có ít nhất 6 ảnh). Sau khi khách đặt phòng, bạn sẽ nhận được thông báo qua email có hồ sơ và thông tin liên hệ của khách, đồng thời khách sẽ được gửi xác nhận với tất cả thông tin chi tiết về địa điểm và thời gian gặp mặt cũng như những thứ cần mang theo.",
        category:"oganize"
    },
    {
        id:'11',
        title:"Thay đổi, hủy và hoàn tiền",
        img:"/carosel-12.webp",
        content:"Nếu khách của bạn hủy, chúng tôi sẽ thông báo cho bạn và tự động bỏ chặn các ngày trên lịch của bạn để bạn có thể đón tiếp những khách khác. Nhưng những gì về khoản thanh toán của bạn? Nếu bạn đã lưu trữ trước đó, nó sẽ được phát hành cho bạn 24 giờ sau thời gian nhận phòng theo lịch trình của khách. Nếu đây là lần đầu tiên bạn đăng cai, chúng tôi có thể giữ nó cho đến 30 ngày sau khi đặt chỗ được xác nhận.",
        category:"oganize"
    },
    {
        id:'12',
        title:"Người đồng tổ chức",
        img:"/carosel-13.webp",
        content:"Một trong những cách tốt nhất để thu hút khách đến trang Trải nghiệm của bạn là chụp ảnh đẹp, chất lượng cao (cố gắng có ít nhất 6 ảnh). Sau khi khách đặt phòng, bạn sẽ nhận được thông báo qua email có hồ sơ và thông tin liên hệ của khách, đồng thời khách sẽ được gửi xác nhận với tất cả thông tin chi tiết về địa điểm và thời gian gặp mặt cũng như những thứ cần mang theo.",
        category:"oganize"
    },
    {
        id:'13',
        title:"Airbnb for Work",
        img:"/carosel-03.jpeg",
        content:"Airbnb for Work giúp bạn dễ dàng di chuyển và cộng tác với đồng nghiệp. Khi đăng ký, bạn sẽ nhận được các lợi ích giúp việc đi lại của công ty bớt đau đầu hơn—chẳng hạn như bảng điều khiển miễn phí giúp bạn dễ dàng đặt và quản lý các chuyến đi của nhân viên trên Airbnb. Sẵn sàng để đăng ký? Bắt đầu bằng cách điền vào mẫu liên hệ để cho chúng tôi biết thêm về công ty của bạn. Nếu công ty của bạn chưa đăng ký, bạn vẫn có thể thiết lập riêng tài khoản Airbnb để đi công tác.",
        category:"admin"
    },
    {
        id:'14',
        title:"Sử dụng bảng điều khiển",
        img:"/carosel-15.webp",
        content:"Là quản trị viên Airbnb For Work, bảng điều khiển của bạn cho phép bạn quản lý thông tin nhân viên ở một nơi—bao gồm các chuyến đi của nhân viên, báo cáo và hóa đơn cho công ty của bạn. Bạn cũng sẽ tìm thấy những thông tin như tổng quan về các chuyến đi đang hoạt động, đã xác nhận và đã hoàn thành của nhân viên, thông tin về số đêm đã đặt và nhiều thông tin chi tiết hữu ích khác.",
        category:"admin"
    },
    {
        id:'15',
        title:"Quy trình đặt phòng",
        img:"/carosel-16.webp",
        content:"Nếu công ty của bạn là một phần của Airbnb for Work, thì Airbnb cho phép người lập kế hoạch chuyến đi thay mặt nhân viên khác yêu cầu đặt chỗ. Nếu họ đặt trước, khách đi công tác sẽ nhận được thông báo về yêu cầu đặt trước và có thể chấp nhận hoặc từ chối yêu cầu.",
        category:"admin"
    },
    {
        id:'16',
        title:"Trợ giúp về thanh toán",
        img:"/carosel-17.webp",
        content:"Cho dù đó có phải là mùa kiểm toán hay không, bạn cần một cách dễ dàng để theo dõi các khoản thu của nhân viên. Để truy cập bất kỳ biên lai nào, hãy truy cập trang tổng quan Airbnb for Work của bạn. Từ đó, bạn có thể in chúng hoặc lưu chúng dưới dạng PDF. Chỉ cần lưu ý rằng bạn không thể thực hiện bất kỳ bổ sung hoặc chỉnh sửa nào (chẳng hạn như thêm tên của khách) sau khi biên lai đã được phát hành. Cần tạo một báo cáo hiển thị những thứ như tổng số tiền đã chi tiêu? Kiểm tra tab Báo cáo từ bảng điều khiển Airbnb for Work của bạn để tìm tất cả các báo cáo có sẵn.",
        category:"admin"
    },
]
const ContactMenuMain =() =>{
    const router = useRouter()
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <div className='my-10'>
            {/* carosel */}
            <div className='my-4'>
                <Carousel responsive={responsive} >
                {caroselArr.map((item)=>{
                    return <div className='px-2 shadow-md' key={item?.title.substring(0,10)}>
                                <Image
                                    src={item.img}
                                    alt="carosel"
                                    width={400}
                                    height={400}
                                    className='
                                        object-cover
                                        w-full
                                        h-[250px]
                                        
                                    '
                                />  
                                <div className='px-2 py-2'>
                                    <div className='font-bold text-xl'>{item.title}</div>
                                    <div className='text-sm font-light'>{item.content.substring(0,90)}...</div>
                                    <div className='flex justify-end items-center'>
                                        <div 
                                            className='text-blue-700 italic underline text-[0.8rem] cursor-pointer'
                                            onClick={()=>router.push(`/contact/${item.id}`)}
                                        >
                                            Đến bài viết
                                        </div>
                                    </div>
                                </div>
                            </div>
                })}
                </Carousel>
            </div>
           <div className="font-bold text-2xl py-4">Bài viết hàng đầu </div>
           <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                gap-6
                px-2
            "
           >
                {article.map((item)=>{
                    return (
                        <div key={item.title} >
                            <div className="font-bold text-sm">{item.title}</div>
                            <div className="font-light text-sm">{item.content}</div>
                            
                        </div>
                    )
                })}
           </div>
        </div>
    )
}

export default ContactMenuMain