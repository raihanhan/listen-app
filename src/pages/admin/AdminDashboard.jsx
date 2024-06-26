import { Tabs, TabPanel } from 'react-tabs';
import ProductDetail from '../../components/admin/ProductDetail';
import Layout  from '../../components/Layout/Layout';


const AdminDashboard = () => {
    const user=JSON.parse(localStorage.getItem('users'))
    return (
        <Layout>
        <div>
            {/* Top */}
            <div className="top mb-5 px-5 mt-5">
                <div className=" bg-pink-50 py-5 border border-pink-100 rounded-lg">
                    <h1 className=" text-center text-2xl font-bold text-pink-500">Admin Dashboard</h1>
                </div>
            </div>
            <div className="px-5">
                {/* Mid  */}
                <div className="mid mb-5">
                    {/* main  */}
                    <div className=" bg-pink-50 py-5 rounded-xl border border-pink-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            <h1 className=" text-center text-lg text-pink-500"><span className=" font-bold">Name :</span> {user?.name}</h1>
                            <h1 className=" text-center text-lg text-pink-500"><span className=" font-bold">Email :</span> {user?.email}</h1>
                        </div>
                    </div>
                </div>
                {/* Bottom */}
                <div className="">
                    <Tabs>
                        <TabPanel>
                            <ProductDetail/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default AdminDashboard;