import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
  };

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <section className="h-screen">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
            </div>

            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">Register Your Self</p>
                
                </div>

                

                <div className="mb-4">
                  <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-1">Name</label>
                  <input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} />
                  {fieldError("name")}
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-1">Email</label>
                  <input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} />
                  {fieldError("email")}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-1">Password</label>
                  <input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
                  {fieldError("password")}
                </div>

                <button className='bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Submit</button>

                <div className='pt-4'>
                  <Link to="/login" className='text-blue-400'>Already have an account? Login here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignupForm;
