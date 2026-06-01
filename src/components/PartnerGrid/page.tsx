import Image from "next/image";

const partners = [
  { name: "PROTECTOSEAL",    logo: "/media/PROTECTOSEAL.png" },
  { name: "KLAUSUNION",       logo: "/media/KLAUS.png" },
  { name: "VICTOR",       logo: "/media/VICTOR.png" },
  { name: "DIXON", logo: "/media/DIXON.jpg" },
  { name: "SAER",      logo: "/media/SAER.png" },
  { name: "STUBBE",    logo: "/media/STUBBE.png" },
  { name: "FLOTITE",    logo: "/media/FLOTITE.png" },
  { name: "TB",      logo: "/media/TBB.png" },
  { name: "3PRINZ",        logo: "/media/3PRINZ.png" },
  { name: "CONTROLSEAL",     logo: "/media/CONTROLSEAL.png" },
  { name: "HOMA",     logo: "/media/HOMA.png" },  
  { name: "AIRCON",     logo: "/media/AIRCON.png" }, 
  { name: "FAURE",     logo: "/media/FAURE.png" }, 
];

export default function PartnersGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className={`group relative flex h-24 items-center justify-center rounded-xl bg-white px-6 py-4
                     shadow-sm transition-all duration-300 ease-in-out
                     hover:scale-110 hover:shadow-2xl hover:z-10
                     `}
        >
          <Image
            src={partner.logo}
            alt={partner.name}
            width={360}
            height={120}
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  );
}
