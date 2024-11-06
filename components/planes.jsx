
'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useCartContext } from '../app/context/CartContext';

import fondoVentas from 'public/images/fondo-ventas1.png';
import webpayplus from 'public/images/logo_webpay.svg';
import planesJson from 'data/planes.json';

const smoothScrollTo = (element, duration) => {
    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = linearEase(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const linearEase = (t, b, c, d) => {
        return c * t / d + b;
    };

    requestAnimationFrame(animation);
};

const handleScroll = (elementId) => {
    const targetElement = document.getElementById(elementId);
    if (targetElement) smoothScrollTo(targetElement, 618); 
};



const Planes = () => {
    const { items, addItem, removeItem, clearCart, isEmpty, cartTotal, hydrated } = useCartContext();
    const [formData, setFormData] = useState({ name: '', email: '', confirmEmail: '' });
    const [errors, setErrors] = useState({});

    const compraBlockContainer = useRef(null);
    const compraBlock = useRef(null);

    const [compraBlockHeight, setCompraBlockHeight] = useState(0);


    // Wrapping the updateBlockHeight function with useCallback
    const updateBlockHeight = useCallback(() => {
        if (compraBlock.current && compraBlockContainer.current) {
            const blockHeight = compraBlock.current.scrollHeight;
            setCompraBlockHeight(blockHeight);
            const comprasBlock = compraBlockContainer.current;
            comprasBlock.style.height = !isEmpty ? `${blockHeight + 80}px` : `0px`;
        }
    }, [isEmpty]);


    useEffect(() => {
        updateBlockHeight();
        const handleResize = () => updateBlockHeight();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateBlockHeight]);

    const blockOpenning = () => {
        const blockHeight = compraBlock.current.scrollHeight;
        const comprasBlock = compraBlockContainer.current;
        requestAnimationFrame(() => {
            comprasBlock.style.transition = 'height 594ms ease-in-out';
            comprasBlock.style.height = `${blockHeight + 80}px`;
        });
    };

    const blockClosing = () => {
        const blockHeight = compraBlock.current.scrollHeight;
        const comprasBlock = compraBlockContainer.current;
        comprasBlock.style.height = `${blockHeight + 80}px`;
        requestAnimationFrame(() => {
            comprasBlock.style.transition = 'height 594ms ease-in-out';
            comprasBlock.style.height = `0`;
        });
    };

    if (!hydrated) { return null; }

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Debe ingresar su nombre';
        if (!formData.email) newErrors.email = 'Debe ingresar su correo';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Los correos electrónicos no coinciden';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const clearForm = () => {
        setFormData({ name: '', email: '', confirmEmail: '' });
        setErrors({}); // Optionally clear errors if needed
    };
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        if (!validateForm()) return;
    };

    return (
        <>
            {!!planesJson?.length && (
                <div className=" max-w-screen-lg mx-auto pt-6 px-4 grid grid-cols-1 grid-rows-3 sm:grid-cols-1 sm:grid-rows-3 md:grid-cols-3 md:grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 gap-5">
                    {planesJson.map((item, index) => (
                        <div key={index} data-aos-once="true" data-aos="fade-down" className=" flex flex-col h-full">
                            <div className=" flex-grow bg-white border-solid border-t-2 border-l-2 border-r-2 rounded-t-xl border-black border-opacity-10 p-6 text-center">
                                <h4 className=" text-xl md:text-2xl text-black font-bold mb-4">{item.planNombr}</h4>
                                <p><img className=" m-auto" src={fondoVentas.src} alt="ventas" /></p>
                                <p className=" text-lg text-black font-medium text-left hyphens-auto indent-5 opacity-80">{item.planDescr}</p>
                            </div>
                            <div className="bg-[#F7F7F7] border-solid border-2 border-black border-opacity-10 rounded-b-xl p-6 text-center">
                                <p className="  text-xl md:text-2xl text-black font-bold ">CLP $ {new Intl.NumberFormat('es-CL').format(item.planPrec)}</p>
                                <p className=" mt-6">
                                {!isEmpty ? (
                                    <span
                                        
                                        className={` text-lg text-black text-opacity-30 font-medium py-2 px-4 rounded-md border-2 border-solid border-black border-opacity-10 bg-white cursor-default inline-block no-underline transition-all duration-300 ease-out `} >
                                        Comprar plan {index + 1}</span>

                                ) : (
                                    <span
                                        onClick={() => { addItem(item); handleScroll('compra'); blockOpenning(); }}
                                        className={` text-lg text-white font-medium py-2 px-4 rounded-md bg-[#094fb8] hover:bg-[#0d6efd] shadow-none hover:shadow-md hover:shadow-black cursor-pointer inline-block no-underline transition-all duration-300 ease-out `} >
                                        Comprar plan {index + 1}</span>
                                    
                                )}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div id="compra" className={` block h-20 `} />

            <div ref={compraBlockContainer} className={` max-w-screen-lg mx-auto px-4 transition-all ease-in-out duration-700 overflow-hidden block `} style={{ height: `0` }} >
                <div ref={compraBlock} >

                    <div className={` shadow-lg shadow-[rgba(0,0,0,0.4)] relative bg-[#F7F7F7] border-2 border-solid border-black border-opacity-10 rounded-xl transition-all ease-in-out duration-700 grid grid-cols-1 md:grid-cols-2 `}>
                        <div className={` min-h-[14rem] w-full relative mx-auto flex items-center justify-center `}>
                            <div className={` bg-[url('/images/fondo-ventas2.png')] bg-bottom bg-contain bg-no-repeat absolute inset-0 w-full h-auto mt-8 cover opacity-20`} />

                            { !isEmpty && (<div className={` relative px-4 md:px-8 pt-8 font-medium text-black text-lg lg:text-xl text-center flex flex-col `} >
                            
                                <p className={` block text-lg uppercase mb-2`}>Usted está comprando el plan</p>
                                <p className={` block text-3xl font-black mb-2 `}>{items[0]?.planNombr}</p>
                                <p className={` block italic font-light text-3xl mb-6 `}>CLP $ {new Intl.NumberFormat('es-CL').format(cartTotal)}</p>
                                <p className={` block `}><span className={`inline-block w-auto text-sm text-white font-medium py-2 px-4 rounded-md bg-[#70232b] hover:bg-[#b02a37] shadow-none hover:shadow-md hover:shadow-black no-underline transition-all duration-300 ease-out cursor-pointer `} onClick={(e) => { e.preventDefault(); clearCart(); blockClosing(); clearForm(); }} >Anular</span></p>
                                
                            </div>) }
                        </div>

                        <form className={` min-h-[28rem] mr-3 sm:mr-4 md:mr-5 lg:mr-6 ml-3 sm:ml-4 md:ml-0 lg:ml-0 flex flex-col items-center justify-center py-4`} >
                            <p>
                                <img src={webpayplus.src} alt='' width='178' className={` mb-6 `} /></p>
                            <p className={` block w-full relative font-normal font-condensed bg-white border-solid border-2 border-black border-opacity-10 rounded-xl `}>
                                <input className={` block w-full p-2 bg-transparent text-2xl text-left `} type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Nombre' /></p>
                            {errors.name && (<p data-aos-once="true" data-aos="fade" className={` block w-full px-2 mt-1 ml-0 md:ml-6 text-red-500 text-md lg:text-lg text-left `}>{errors.name}</p>)}
                            <p className={` block w-full mt-6 overflow-hidden align-middle relative font-normal font-condensed bg-white border-solid border-2 border-black border-opacity-10 rounded-xl `}>
                                <input className={` block w-full p-2 bg-transparent text-2xl text-left `} type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Correo electrónico' /></p>
                            {errors.email && (<p data-aos-once="true" data-aos="fade" className={` block w-full px-2 mt-1 ml-0 md:ml-6 text-red-500 text-md lg:text-lg text-left `}>{errors.email}</p>)}
                            <p className={` block w-full mt-6 overflow-hidden align-middle relative font-normal font-condensed bg-white border-solid border-2 border-black border-opacity-10 rounded-xl  `}>
                                <input className={` block w-full p-2 bg-transparent text-2xl text-left `} type='email' name='confirmEmail' value={formData.confirmEmail} onChange={handleInputChange} placeholder='Confirme correo electrónico' /></p>
                            {errors.confirmEmail && (<p data-aos-once="true" data-aos="fade" className={` block w-full px-2 mt-1 ml-0 md:ml-6 text-red-500 text-md lg:text-lg text-left `}>{errors.confirmEmail}</p>)}
                            <p className={` block mt-6 `} >
                                <input className={`block w-full text-xl text-white font-bold py-2 px-16 rounded-md bg-[#094fb8] hover:bg-[#0d6efd] shadow-none hover:shadow-md hover:shadow-black no-underline transition-all duration-300 ease-out cursor-pointer `} type='button' Value='Ir a pagar' onClick={handlePayment} />
                            </p>
                        </form>

                    </div>
                </div>

            </div>



        </>
    );
}
export default Planes;