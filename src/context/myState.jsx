/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import MyContext from './myContext';
import { db } from '../FirebaseConfig';
import {collection,onSnapshot,orderBy, query, deleteDoc, doc} from 'firebase/firestore'
import toast from 'react-hot-toast';

function MyState({children}) {
    const [loading, setLoading] = useState(false)
    const[getAllProduct,setGetAllProduct] = useState([]);

    const getAllProductFunction = async () => {
      setLoading(true);
      try {
          const q = query(
              collection(db, "events"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let productArray = [];
              QuerySnapshot.forEach((doc) => {
                  productArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllProduct(productArray);
              setLoading(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoading(false);
      }
  }
  const deleteEvent = async (id) => {
    setLoading(true)
    try {
        await deleteDoc(doc(db, 'order', id))
        toast.success('Order Deleted successfully')
        getAllOrderFunction();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}
const [getAllOrder, setGetAllOrder] = useState([]);
const getAllOrderFunction = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(db, "order"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let orderArray = [];
                QuerySnapshot.forEach((doc) => {
                    orderArray.push({ ...doc.data(), id: doc.id });
                });
                setGetAllOrder(orderArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
  useEffect(() => {
      getAllProductFunction();
      getAllOrderFunction();
  }, []);
  return (
    <MyContext.Provider value={{ 
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        deleteEvent
     }}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState