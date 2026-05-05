import Image from "next/image";

const partners = [
  { name: "FLUIMAC",    logo: "/api/media/file/FLUIMAC.jpg" },
  { name: "HOMA",       logo: "/api/media/file/HOMA.png" },
  { name: "SEKO",       logo: "/api/media/file/SEKO.png" },
  { name: "VICTORPUMP", logo: "/api/media/file/VICTOR.png" },
  { name: "TOKYO",      logo: "/api/media/file/TOKYO.png" },
  { name: "MAXSEAL",    logo: "/api/media/file/MAXSEAL.png" },
  { name: "FLOTITE",    logo: "/api/media/file/FLOTITE.png" },
  { name: "FAUDI",      logo: "/api/media/file/FAUDI.png" },
  { name: "AFH",        logo: "/api/media/file/AFH.png" },
  { name: "AIRCON",     logo: "/api/media/file/AIRCON.png" },
];

export default function PartnersGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="group relative flex h-24 items-center justify-center rounded-xl bg-white px-6 py-4
                     shadow-sm transition-all duration-300 ease-in-out
                     hover:scale-110 hover:shadow-2xl hover:z-10"
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