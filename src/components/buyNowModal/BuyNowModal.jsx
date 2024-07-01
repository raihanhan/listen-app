/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogBody,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const [cardNumber, name, expiryDate, cvv] = useState('');

    const handleOpen = () => setOpen(!open);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Mengirim informasi pembayaran:', { name, cardNumber, expiryDate, cvv });
        alert('Pembayaran berhasil!');
        setOpen(false); // Optionally close the modal after submission
    };
    function formatExpires(value) {
        return value
          .replace(/[^0-9]/g, "")
          .replace(/^([2-9])$/g, "0$1")
          .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
          .replace(/^0{1,}/g, "0")
          .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
      }

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy Now
            </Button>
            <Dialog open={open} handler={handleOpen} className="bg-pink-50">
                <DialogBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-3">
                            <input
                                type="text"
                                name="name"
                                value={addressInfo.name}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        name: e.target.value
                                    })
                                }}
                                placeholder='Enter your name'
                                className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                            />
                        </div>
                        <div className="mb-3">
                        <input
                            type="text"
                            name="cardNumber"
                            value={addressInfo.cardNumber}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    cardNumber: e.target.value
                                })
                            }}
                            placeholder='Enter your Card Number'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                        />
                        </div>
                        <div className="mb-3 flex gap-3">
                        <input
                            type="text"
                            name="cvv"
                            value={addressInfo.cvv}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    cvv: e.target.value
                                })
                            }}
                            placeholder='Enter your CVV'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            value={formatExpires(addressInfo.expiryDate)}
                            onChange={(e) => {
                                setAddressInfo({
                                    ...addressInfo,
                                    expiryDate: e.target.value
                                })
                            }}
                            placeholder='Enter your Card Expiry Date'
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300'
                        />
                        </div>
                        <div className="">
                        <Button

                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
                        >
                            Buy now
                        </Button>
                    </div>
                    </form>
                </DialogBody>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
