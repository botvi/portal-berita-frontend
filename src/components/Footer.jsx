import React from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaDiscord, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white light:bg-gray-900">
      <div className="mx-auto w-full p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="" className="flex items-center">
              <img
                src="https://www.pngitem.com/pimgs/m/192-1927144_news-icon-top-breaking-news-hd-png-download.png"
                className="h-8 me-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-dark">
                News Indonesia
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-dark">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href=""
                    className="hover:text-black "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    className="hover:text-black"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-gray-900">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="/" className="hover:text-black">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-black">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline">
              News Indonesia™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-black"
            >
              <FaFacebookF className="w-4 h-4" />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-black ms-5"
            >
              <FaTwitter className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-black ms-5"
            >
              <FaGithub className="w-4 h-4" />
              <span className="sr-only">GitHub account</span>
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-black ms-5"
            >
              <FaDiscord className="w-4 h-4" />
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-black ms-5"
            >
              <FaLinkedinIn className="w-4 h-4" />
              <span className="sr-only">LinkedIn page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
