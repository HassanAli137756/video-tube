import React, { useEffect, useState } from 'react'
import {RegisterRightSide} from '../utils/RegisterRightSide'
import { RegisterForm } from '../forms/RegisterForm';
import { MobileLogo } from '../utils/MobileLogo';

function Register() 
{



  return (
    <div className="min-h-screen bg-linear-to-br from-white via-green-50 to-green-100 flex items-center justify-center px-4 py-10">


      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-green-200 bg-white shadow-[0_20px_60px_rgba(22,163,74,0.18)]">

        <div className="grid lg:grid-cols-2">


            <RegisterRightSide />

          <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-14">

            <div className="w-full max-w-xl">

              
              <MobileLogo />

              <div>

                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">

                  Create Account

                </h2>

                <p className="mt-3 text-gray-500">

                  Start uploading videos and connect with millions
                  of viewers around the world.

                </p>

              </div>

              <RegisterForm />
              
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export {Register}