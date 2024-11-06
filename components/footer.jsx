import Link from 'next/link';

const linksCols = [
    {
      colTitle: 'A propos',
      linksList: [
        { linkTitle: 'About Us', linkHref: '#' },
        { linkTitle: 'Blog', linkHref: '#' },
        { linkTitle: 'Our ingredients', linkHref: '#' },
        { linkTitle: 'Our resellers', linkHref: '#' }
      ]
    },
    {
      colTitle: 'About',
      linksList: [
        { linkTitle: 'Customer Service', linkHref: '#' },
        { linkTitle: 'Privacy Policy', linkHref: '#' },
        { linkTitle: 'Cookie Policy', linkHref: '#' },
        { linkTitle: 'Terms & Conditions', linkHref: '#' },
        { linkTitle: 'Terms of Use', linkHref: '#' }
      ]
    },
    {
      colTitle: 'Need Help?',
      linksList: [
        { linkTitle: 'Contact Us', linkHref: '#' },
        { linkTitle: 'FAQs', linkHref: '#' },
        { linkTitle: 'Offers & Kits', linkHref: '#' },
        { linkTitle: 'Get the app', linkHref: '#' },
        { linkTitle: 'Store locator', linkHref: '#' }
      ]
    },
    {
      colTitle: 'Need Help?',
      linksList: [
        { linkTitle: 'Contact Us', linkHref: '#' },
        { linkTitle: 'FAQs', linkHref: '#' },
        { linkTitle: 'Offers & Kits', linkHref: '#' },
        { linkTitle: 'Get the app', linkHref: '#' },
        { linkTitle: 'Store locator', linkHref: '#' }
      ]
    }
  ];

export function Footer() {
    return (
        <footer className=" bg-[#0B0B5C]">
          {/*
            <section className=" max-w-screen-lg mx-auto">
              <div className="w-full pl-[25%] sm:pl-[20%] md:pl-[20%] lg:pl-[11%] pr-0 pt-10 pb-0">
                {linksCols.map((linkCol, index) => (
                <div data-aos-once="true" data-aos="fade-right" key={index} className="w-full mx-auto sm:w-6/12 md:w-6/12 lg:w-3/12 pb-10 inline-flex flex-col items-start">
                    <h5 className="font-bold text-xl text-white pb-2 ">{linkCol.colTitle}</h5>
                    <ul>
                        {linkCol.linksList.map((link, linkIndex) => (
                        <li key={linkIndex}><Link className=" font-md text-white text-opacity-70 hover:text-opacity-100 no-underline hover:underline text-md" href={link.linkHref}>{link.linkTitle}</Link></li>
                        ))}
                    </ul>
                </div>
                ))}
              </div>
            </section>
            */}
            <section className=" p-3">
            <p data-aos="fade-left" data-aos-once="true" className=" max-w-screen-lg mx-auto text-left font-bold text-white text-opacity-40 text-md">© Impulso Ventas</p>
            </section>
        </footer>
    );
};
