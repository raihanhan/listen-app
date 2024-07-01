/* eslint-disable react/prop-types */
import Layout from "../../components/Layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useParams } from "react-router-dom";
import { db } from "../../FirebaseConfig";
import {doc, getDoc} from "firebase/firestore"
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
const EventDetail = () => {
    const context = useContext(myContext)
    const {loading, setLoading} = context
    const [events, setProduct] = useState('')
    const {id} = useParams()

    const getProductData = async () => {
        setLoading(true)
        try{
            const productTemp = await getDoc(doc(db, "events", id))
            setProduct ({...productTemp.data(),id : productTemp.id})
            setLoading(false)
        }catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    useEffect(() => {
        getProductData()
    }, []
)
    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ?
                <>
                <div className="flex justify-center items-center">
                    <Loader/>
                </div>
                </>
                :
                <>
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <div className="">
                                <div className="">
                                    <img
                                        className=" w-full lg:h-[39em] rounded-lg"
                                        src={events?.eventImageUrl}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6 ">
                                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                        {events?.title}
                                    </h2>
                                    
                                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                        <span>Rp {events?.price}</span>
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                        Description :
                                    </h2>
                                    <p>{events?.description}</p>
                                </div>
                                <div className="mb-6 " />
                                <div className="flex flex-wrap items-center mb-6">
                                {cartItems.some((p) => p.id === events.id)
                                                ?
                                                <button
                                                    onClick={() => deleteCart(events)}
                                                    className="w-full px-4 py-3 text-center text-white bg-gray-800 border border-gray-600  hover:bg-gray-600 hover:text-gray-100  rounded-xl"
                                                > Delete to cart
                                                </button>
                                                :
                                                <button
                                                    onClick={() => addCart(events)}
                                                    className="w-full px-4 py-3 text-center text-white bg-gray-500 border border-gray-600  hover:bg-gray-600 hover:text-gray-100  rounded-xl"
                                                >Add to cart
                                                </button>
                                            }
                                </div>
                                <div className="flex gap-4 mb-6">
                                            <button
                                                className="w-full px-4 py-3 text-center text-white bg-gray-600 border border-transparent dark:border-gray-700 hover:border-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl"
                                            > Buy Now
                                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </>}
            </section>
        </Layout>
    );
}

export default EventDetail;