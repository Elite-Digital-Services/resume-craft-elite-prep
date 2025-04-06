
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Bot, Award, Download, Sparkles, Globe } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Craft Your Perfect</span>
                  <span className="block text-eliteblue dark:text-eliteblue-light">AI-Powered Resume</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Create professional, ATS-friendly resumes in minutes with our AI-powered resume builder. 
                  Stand out to employers and land your dream job.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/resume">
                      <Button className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                        Build My Resume
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/resume">
                      <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-base font-medium">
                        View Templates
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-eliteblue-light to-eliteblue rounded-bl-3xl"></div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-eliteblue dark:text-eliteblue-light font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need to build a standout resume
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
              Our AI-powered tools help you create professional resumes that get noticed by employers and pass through ATS systems.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eliteblue dark:bg-eliteblue-light text-white">
                    <Bot className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">AI-Powered Content</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Get intelligent suggestions for your professional summary and job descriptions, tailored to your field.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eliteblue dark:bg-eliteblue-light text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Professional Templates</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Choose from a variety of professionally designed templates that are proven to impress employers.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eliteblue dark:bg-eliteblue-light text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">ATS Optimization</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Built-in tools to ensure your resume passes through Applicant Tracking Systems and reaches human recruiters.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eliteblue dark:bg-eliteblue-light text-white">
                    <Download className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Easy Export</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Export your finished resume to PDF format, ready to send to employers or upload to job sites.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eliteblue dark:bg-eliteblue-light text-white">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Live Preview</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  See changes to your resume in real-time as you edit, giving you instant feedback on your design.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-eliteblue dark:bg-eliteblue-light text-white">
                    <Globe className="h-6 w-6" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Multilingual Support</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">
                  Create resumes in multiple languages, including English, French, and Arabic to target global opportunities.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-eliteblue dark:bg-eliteblue-light">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to boost your job search?</span>
            <span className="block text-elitegold">Create your professional resume today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/resume">
                <Button className="bg-white text-eliteblue hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
