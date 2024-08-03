import Logo from "../../assets/JA white.png";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-neutral-600 grid gap-2 md:grid-rows-1 items-center md:grid-cols-3 justify-center pb-4 md:pb-0">
      <div className="flex justify-center items-center">
        <img src={Logo} alt="MyLogo" />
      </div>
      <div className="">
        <p className="text-sm">
          © {new Date().getFullYear()} MovieFinder. All rights reserved.
        </p>
      </div>
      <div className="flex flex-col justify-center items-centerd">
        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
        <div className="flex space-x-4">
          <a
            href="https://web.facebook.com/joevin.ansoc870/"
            className="hover:text-gray-400"
          >
            <FaFacebook size={24} />
          </a>
          <a href="https://github.com/Juben00" className="hover:text-gray-400">
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.instagram.com/hoyjoevin/"
            className="hover:text-gray-400"
          >
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="text-sm mt-3">
          Email:{" "}
          <a
            href="mailto:joevinansoc870@gmail.com"
            className="hover:text-gray-400"
          >
            joevinansoc870@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
