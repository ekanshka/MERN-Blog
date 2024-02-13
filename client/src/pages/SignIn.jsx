import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value.trim(),
    }));
  };

  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    //simpler check for empty fields... wont require/send backend request
    // if (!formData.username || !formData.email || !formData.password) {
    //   return setErrorMessage('Please fill out all fields.');
    // }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      //very important to set loading back to false so the user can retry...!!
      setLoading(false);
      
      //when the backend says the inputs checks were wrong and not the data itself
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      //navigate to homepage if everything is correct
      if (res.ok) {
        navigate("/");
      }

    } catch (error) {
      //when there's client side error(no internet)/api error/fetch error/backend error
      setLoading(false);
      setErrorMessage(error.message); //notice no return here.
    }
  };

  return (
    <div className="min-h-svh mt-48">
      <div className="flex flex-col md:flex-row place-items-center justify-center gap-12 md:gap-32">
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
              <Label value="Your email" />
              <TextInput
                className="w-80"
                type="email"
                placeholder="email@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                className="w-80"
                type="text"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>

            {/* <Button
              className="w-72 mt-5 main-bg-gradient hover:reverse-bg-color-gradient rounded-lg text-white"
              color=""
            >
              Sign Up
            </Button> */}
            <Button
              gradientDuoTone="purpleToPink"
              className="w-80 mt-5"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="info mt-5 dark:text-white">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5 w-80" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
