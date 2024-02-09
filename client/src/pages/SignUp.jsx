import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row place-items-center justify-center gap-12 md:gap-32">
        {/* left-part */}
        <div className="flex flex-col gap-5 md:gap-10">
          <Link
            to="/about"
            className="self-center whitespace-nowrap text-5xl font-bold dark:text-white"
          >
            <span className="px-3 py-1 main-bg-gradient rounded-lg text-white">
              Jaya's
            </span>
            Blog
          </Link>
          <div className="text-md font-semibold">
            Welcome to Jaya's Blog page!
          </div>
        </div>

        {/* right-part */}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label>Your Username</Label>
              <TextInput
                className="w-72"
                type="text"
                placeholder="name"
              ></TextInput>
            </div>
            <div>
              <Label>Your Email</Label>
              <TextInput
                className="w-72"
                type="email"
                placeholder="email@gmail.com"
              ></TextInput>
            </div>
            <div>
              <Label>Your Password</Label>
              <TextInput
                className="w-72"
                type="text"
                placeholder="password"
              ></TextInput>
            </div>

            {/* <Button
              className="w-72 mt-5 main-bg-gradient hover:reverse-bg-color-gradient rounded-lg text-white"
              color=""
            >
              Sign Up
            </Button> */}
            <Button
              gradientDuoTone='purpleToPink'
              className="w-72 mt-5 from text-white"
              color=""
            >
              Sign Up
            </Button>
          </form>
          <div className="info mt-5 dark:text-white">
            Already have an account? <Link to="/sign-in" className="text-teal-500 font-semibold">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
