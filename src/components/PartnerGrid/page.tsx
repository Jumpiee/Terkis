import Image from "next/image";

const partners = [
  { name: "PROTECTOSEAL",    logo: "/api/media/file/PROTECTOSEAL.png" },
  { name: "KLAUSUNION",       logo: "/api/media/file/KLAUS.png" },
  { name: "VICTOR",       logo: "/api/media/file/VICTOR.png" },
  { name: "DIXON", logo: "/api/media/file/DIXON.jpg" },
  { name: "SAER",      logo: "/api/media/file/SAER.png" },
  { name: "STUBBE",    logo: "/api/media/file/STUBBE.png" },
  { name: "FLOTITE",    logo: "/api/media/file/FLOTITE.png" },
  { name: "TB",      logo: "/api/media/file/TBB.png" },
  { name: "3PRINZ",        logo: "/api/media/file/3PRINZ.png" },
  { name: "CONTROLSEAL",     logo: "/api/media/file/CONTROLSEAL.png" },
  { name: "HOMA",     logo: "/api/media/file/HOMA.png" },  
];

export default function PartnersGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
      {partners.map((partner, index) => (
        <div
          key={partner.name}
          className={`group relative flex h-24 items-center justify-center rounded-xl bg-white px-6 py-4
                     shadow-sm transition-all duration-300 ease-in-out
                     hover:scale-110 hover:shadow-2xl hover:z-10
                     ${index === 10 ? 'lg:col-start-3 md:col-start-2' : ''}`}
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
