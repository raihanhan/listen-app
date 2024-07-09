import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import myContext from "../../context/myContext";
import { useContext } from "react";
import { Card, Typography, CardBody, Button } from "@material-tailwind/react";

const Ticket = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { getAllOrder } = context;
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center mt-10">
                <Typography variant="h4" className="w-full text-center mt-4">
                    Your Tickets
                </Typography>
                {/* Heading */}
                {/* main */}
                <section className="flex flex-wrap gap-4 mt-4 max-w-5xl">
                    {getAllOrder
                        .filter((obj) => obj.userid === user?.uid && obj.status !== "pending approval")
                        .map((order, orderIndex) => (
                            order.cartItems.map((item, itemIndex) => {
                                const { id, title, price, eventImageUrl } = item;
                                return (
                                    <Card
                                        key={`${orderIndex}-${itemIndex}`}
                                        className="h-[340px] w-[200px] border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer"
                                    >
                                        <img
                                            className="h-48 md:h-64 lg:h-72 w-full object-cover"
                                            src={eventImageUrl}
                                            alt="Event"
                                        />
                                        <CardBody className="p-4">
                                            <Typography variant="h6" color="gray">
                                                {title.substring(0, 25)}
                                            </Typography>
                                            <Typography variant="h6" color="gray" className="mb-3">
                                                Rp.{price}
                                            </Typography>
                                            <div className="flex justify-center">
                                                <Button
                                                    onClick={() => navigate(`/LivePage/${id}`)}
                                                    color="red"
                                                    className="w-full py-2 rounded-lg font-bold capitalize"
                                                >
                                                    Watch
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                );
                            })
                        ))}
                </section>
                
            </div>
        </Layout>
    );
};

export default Ticket;
