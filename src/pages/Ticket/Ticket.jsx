import Layout from "../../components/Layout/Layout";
import HomePageArchiveCard from "../../components/HomePageArchiveCard/Archives";
import TicketEventsCard from "../../components/TicketCard/TicketEventsCard";
const Ticket = () => {
    return (
        <Layout>
            <TicketEventsCard/>
            <HomePageArchiveCard/>
        </Layout>
    );
}

export default Ticket;