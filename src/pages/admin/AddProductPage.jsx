import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import { SlActionUndo } from "react-icons/sl";

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // event state
    const [event, setevent] = useState({
        title: "",
        price: "",
        eventImageUrl: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });


    // Add event Function
    const AddProductFunction = async () => {
        if (event.title == "" || event.price == "" || event.eventImageUrl == "" || event.description == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            const eventRef = collection(db, 'events');
            await addDoc(eventRef, event)
            toast.success("Add event successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add event failed");
        }

    }
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Add event
                        </h2>
                        <div onClick={()=> navigate("/admin-dashboard")}>
                        <SlActionUndo />
                        </div>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={event.title}
                            onChange={(e) => {
                                setevent({
                                    ...event,
                                    title: e.target.value
                                })
                            }}
                            placeholder='Event Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="price"
                            value={event.price}
                            onChange={(e) => {
                                setevent({
                                    ...event,
                                    price: e.target.value
                                })
                            }}
                            placeholder='Event Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="eventImageUrl"
                            value={event.eventImageUrl}
                            onChange={(e) => {
                                setevent({
                                    ...event,
                                    eventImageUrl: e.target.value
                                })
                            }}
                            placeholder='Event Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={event.description}
                            onChange={(e) => {
                                setevent({
                                    ...event,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="Event Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                        </textarea>
                    </div>

                    {/* Add event Button  */}
                    <div className="mb-3">
                        <button
                            onClick={AddProductFunction}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add event
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;