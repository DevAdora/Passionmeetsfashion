import RegisterForm from "@/components/forms/register-form";

export default function RegisterPage() {
  const backgrounds = [
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
    "/assets/passion-meets-fashion2.png",
    "/assets/passion-meets-fashion1.png",
    "/assets/passion-meets-fashion.png",
  ];

  return (
     <div className="relative min-h-screen w-full flex items-center justify-center  overflow-hidden">
         {/* Background tilted rectangles */}
         <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-6 opacity-70">
           {backgrounds.map((src, idx) => (
             <div
               key={idx}
               className={`w-50 h-50 md:w-75 md:h-75 rounded-lg shadow-lg bg-cover bg-center `}
               style={{
                 backgroundImage: `url(${src})`,
                 transform: `rotate(${idx % 2 === 0 ? 8 : -8}deg)`,
               }}
             />
           ))}
         </div>
   
         {/* Overlay for subtle blur */}
         <div className="absolute inset-0"></div>
   
         {/* Login box */}
         <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
           <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
           <RegisterForm />
         </div>
       </div>
  );
}
