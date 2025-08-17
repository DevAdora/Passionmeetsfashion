import RegisterForm from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
