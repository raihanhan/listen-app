import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
// import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import { useContext } from "react";
const Ticket = () => {
const user = JSON.parse(localStorage.getItem('users'));
 const context = useContext(myContext);
 const {getAllOrder } = context
 const navigate = useNavigate()
    return (
        <Layout>
            <div className="mt-10">
            {/* Heading  */}
            <div className="">
                <h1 className=" text-center mb-5 text-2xl font-semibold border-2 bg-gray-800 text-white">Events</h1>
            </div>
            {/* main  */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, orderIndex) => {

                            return (
                                <div key={orderIndex} className="p-4 w-full md:w-1/4"> 
                                {order.cartItems.map((item, itemIndex)=>{
                                        const { id, title, price, eventImageUrl} = item
                                        return(
                                            <div key ={`${orderIndex}-${itemIndex}`} className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md">
                                            <img
                                                className="lg:h-80  h-96 w-full"
                                                src={eventImageUrl}
                                                alt="blog"
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {title.substring(0, 25)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    Rp.{price}
                                                </h1>
                                            </div>
                                            <button
                                                onClick={()=> navigate(`/LivePage/${id}`)}
                                                className=" bg-gray-700 hover:bg-gray-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                >
                                                    Watch
                                                </button>
                                        </div>
                                        )
                                    })}
                                   
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
        </Layout>
    );
}

export default Ticket;
