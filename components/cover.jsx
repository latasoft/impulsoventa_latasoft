
'use client';
import impulsoVentasLogo from 'public/images/logo-dba.ico';
import caretDown from 'public/images/caret-down.svg';

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



const Cover = () => {

    return (
        <section id="inicio" data-aos-once="true" data-aos="fade" className="relative min-h-[calc(100vh)] bg-[#0B0B5C] ">
            <div className="absolute top-0 lef-0 bg-black bg-opacity-40 h-full w-full bg-[url('/images/img-principal2.jpg')] bg-cover bg-no-repeat" style={{ backgroundPositionX: `75%` }}/>
            <div className="absolute top-0 lef-0 bg-black bg-opacity-40 h-full w-full" />
            <div className=" relative max-w-screen-lg mx-auto min-h-[calc(100vh)] h-full w-full flex flex-col justify-center items-left ">
                <div>
                    <h3 className=" inline-block m-8 text-[#0B0B5C] uppercase font-extrabold text-xl">Bases de datos</h3>
                </div>
                <div className={` mx-8 mb-8 `}>
                    <img className=" inline-block w-10 sm:w-12 md:w-16 h-auto align-bottom" src={impulsoVentasLogo.src} alt="Impulso Ventas Logo" />
                    <span className="inline-block text-3xl sm:text-4xl md:text-6xl font-normal md:font-extralight tracking-tight no-underline ml-2 text-white text-opacity-60 md:text-opacity-100 capitalize font-Roboto">I<em>mpulso</em> V<em>entas</em></span>
                </div>
                <h2 className=" mx-8 mb-6 uppercase text-white text-opacity-80 text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed font-Roboto ">La empresa que <span className={` whitespace-nowrap `}>impulsa tus ventas</span></h2>
                <p className=" mx-8 text-white text-opacity-80 text-lg md:text-xl font-medium leading-relaxed font-Roboto ">Potencia tu negocio con bases de datos precisas y actualizadas de Impulso de Ventas. Accede a información confiable y relevante para alcanzar tus objetivos comerciales. Amplía tu red de clientes y segmenta tus campañas de marketing con precisión y eficacia.</p>
                <p className=" my-8 ml-8 ">
                    <span onClick={() => { handleScroll('productos'); }} className=" mt-3 cursor-pointer text-md text-[#4ae7ff] font-bold opacity-80 inline-block transition-all duration-300 ease-in-out uppercase hover:-translate-y-1 hover:opacity-100">
                        <img src={caretDown.src} alt='' className={` align-bottom inline-block mr-3 h-auto w-4 `} />
                        Conoce nuestros planes</span>
                    <span onClick={() => { handleScroll('contactanos'); }} className=" sm:ml-16 mt-3 sm:mt-0 cursor-pointer text-md text-[#4ae7ff] font-bold opacity-80 block sm:inline-block transition-all duration-300 ease-in-out uppercase hover:-translate-y-1 hover:opacity-100">
                        <img src={caretDown.src} alt='' className={` align-bottom inline-block mr-3 h-auto w-4 `} />
                        Contáctanos</span>
                </p>
            </div>

            <div className={` absolute top-full left-0 -translate-y-full w-full h-12 bg-gradient-to-b to-[rgba(0,0,0,0.08)] from-transparent `} />
            <div className={` absolute top-full left-0 -translate-y-full w-full h-5 bg-gradient-to-b to-[rgba(0,0,0,0.2)] from-transparent `} />

        </section>
    );
}
export default Cover;
