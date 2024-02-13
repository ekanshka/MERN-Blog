import { Footer, FooterCopyright } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import {BsDiscord, BsDribbble, BsFacebook, BsInstagram, BsTwitter, } from 'react-icons/bs'

export default function FooterCompo() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full">
        <div className="flex flex-col gap-2 lg:flex-row w-full justify-around">
          <Link
            to="/"
            className="self-center mt-4 w-full lg:w-2/5 whitespace-nowrap text-md sm:text-2xl font-semibold dark:text-white"
          >
            <span className="px-3 py-1 main-bg-gradient rounded-lg text-white">
              Jaya's
            </span>
            Blog
          </Link>
          <div className="grid grid-cols-2 mt-8 gap-8 w-full lg:w-3/5  sm:grid-cols-3 ">
            <div>
              <Footer.Title title="ABOUT" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Some Link
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jaya's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="FOLLOW US" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/EKanshK2001"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex flex-col sm:flex-row sm:justify-between">
          <FooterCopyright by="Jaya's Blog" year={new Date().getFullYear()}/>
          <div className="flex gap-6 mt-6 sm:mt-0">
            <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
            <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
            <Footer.Icon href="#" icon={BsTwitter}></Footer.Icon>
            <Footer.Icon href="#" icon={BsDiscord}></Footer.Icon>
            <Footer.Icon href="#" icon={BsDribbble}></Footer.Icon>
          </div>
        </div>
      </div>
    </Footer>
  );
}
