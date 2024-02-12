import {
  Footer,
  FooterBrand,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function FooterCompo() {
  return (
    <Footer
      container
      className="border border-t-8 border-teal-500 flex flex-col gap-2 lg:flex-row w-full justify-around"
    >
      <Link
        to="/"
        className="self-center mt-8 w-full lg:w-2/5 whitespace-nowrap text-md sm:text-2xl font-semibold dark:text-white"
      >
        <span className="px-3 py-1 main-bg-gradient rounded-lg text-white">
          Jaya's
        </span>
        Blog
      </Link>
      <div className="grid grid-cols-2 mt-8 gap-8 w-full lg:w-3/5  sm:grid-cols-3 ">
        <div>
          <FooterTitle title="ABOUT" />
            <FooterLinkGroup col>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                some link
              </FooterLink>
              <FooterLink href="/about">Jaya's Blog</FooterLink>
            </FooterLinkGroup>
        </div>
        <div>
          <FooterTitle title="ABOUT" />
            <FooterLinkGroup col>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">
                some link
              </FooterLink>
              <FooterLink href="/about">Jaya's Blog</FooterLink>
            </FooterLinkGroup>
        </div>
        <div>
          <Footer.Title title="ABOUT" />
            <Footer.LinkGroup col>
              <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                some link
              </Footer.Link>
              <Footer.Link href="/about">Jaya's Blog</Footer.Link>
            </Footer.LinkGroup>
        </div>
      </div>
    </Footer>
  );
}
