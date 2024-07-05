/* eslint-disable react/prop-types */
import Layout from "../../components/Layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useParams } from "react-router-dom";
import { db } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { Button, Typography } from "@material-tailwind/react";
const EventDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const [events, setProduct] = useState("");
  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(db, "events", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addCart = (item) => {
    // console.log(item)
    dispatch(addToCart(item));
    toast.success("Add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins">
        {loading ? (
          <div className="flex flex-col lg:flex-row gap-8 max-w-xl lg:max-w-4xl px-4 mx-auto">
            <div className="w-full lg:w-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-60 w-full text-gray-500 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="h-6 bg-gray-300 animate-pulse w-3/4 rounded-full"></div>
              <div className="h-6 bg-gray-300 animate-pulse w-1/2 rounded-full"></div>
              <div className="h-6 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-3/4 rounded-full"></div>
              <div className="h-4 bg-gray-300 animate-pulse w-1/2 rounded-full"></div>
              <div className="h-10 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="h-10 bg-gray-300 animate-pulse rounded-full"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 max-w-xl lg:max-w-4xl px-4 mx-auto">
            <img
              className="w-full lg:w-1/2 aspect-video rounded-lg object-cover"
              src={events?.eventImageUrl}
              alt={events?.title}
            />
            <div className="w-full lg:w-1/2">
              <h2 className="text-xl lg:text-2xl font-semibold leading-loose tracking-wide text-gray-700 dark:text-gray-300">
                {events?.title}
              </h2>
              <p className="text-2xl font-semibold text-gray-700 dark:text-gray-400 mb-4">
                Rp {events?.price}
              </p>
              <div className="mb-6">
                <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                  Description:
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {events?.description}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button color="blue" className="w-full capitalize">
                  Buy Now
                </Button>
                {cartItems.some((p) => p.id === events.id) ? (
                  <Button
                    onClick={() => deleteCart(events)}
                    color="blue"
                    variant="outlined"
                    className="w-full capitalize"
                  >
                    Delete from Cart
                  </Button>
                ) : (
                  <Button
                    onClick={() => addCart(events)}
                    color="blue"
                    variant="outlined"
                    className="w-full capitalize"
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default EventDetail;
