import LogoutButton from "@/app/auth/Logout";

export default function Header() {
  const HeaderLinks = [
    { name: "Home", href: "/user/dashboard" },
    { name: "Orders", href: "/user/orders" },
    { name: "Profile", href: "/user/profile" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-6  text-white z-50">
      <div className="text-xl font-bold tracking-wide">
        <a href="/user/dashboard">🛍 Passion+Fashion</a>
      </div>

      <nav className="flex space-x-6 items-center">
        {HeaderLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="hover:text-gray-300 transition-colors"
          >
            {link.name}
          </a>
        ))}
        <LogoutButton />
      </nav>
    </header>
  );
}
