import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { Card, CardBody, Button, Typography } from "@material-tailwind/react";

const HomePageEventCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProduct } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("add to cart");
  };
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      {/* Heading */}
      <Typography variant="h4" className="w-full text-center">
        Events
      </Typography>
      {/* Main */}
      <section className="flex flex-grow gap-4 mt-4 max-w-5xl">
        {getAllProduct.slice(0, 8).map((item, index) => {
          const { id, title, price, eventImageUrl } = item;
          return (
            <Card
              key={index}
              className="h-[340px] w-[200px] border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer"
            >
              <img
                className="h-48 md:h-64 lg:h-72 w-full object-cover"
                onClick={() => navigate(`/EventDetail/${id}`)}
                src={eventImageUrl}
                alt="Event"
              />
              <CardBody className="p-4">
                <Typography variant="h6" color="gray" className="">
                  {title.substring(0, 25)}
                </Typography>
                <Typography variant="h6" color="gray" className="mb-3">
                  Rp.{price}
                </Typography>
                <div className="flex justify-center">
                  {cartItems.some((p) => p.id === item.id) ? (
                    <Button
                      onClick={() => deleteCart(item)}
                      color="red"
                      className="w-full py-2 rounded-lg font-bold capitalize"
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addCart(item)}
                      color="blue"
                      className="w-full py-2 rounded-lg font-bold capitalize"
                    >
                      Add To Cart
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </section>
    </div>
  );
};

export default HomePageEventCard;
