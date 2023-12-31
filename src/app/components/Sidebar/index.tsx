'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NotificationDropdown from '../Dropdowns/NotificationDropdown';
import UserDropdown from '../Dropdowns/UserDropdown';
import Logo from '../../assets/images/logo.svg';
import Image from 'next/image';

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState('hidden');
  const currentPath = usePathname();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="https://maltitiaenterprise.com">
            <div className="mx-auto flex justify-center text-center md:pb-2 text-blueGray-600 mr-0 whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
              <Image src={Logo} height={50} width={50} alt={'Company Logo'} />
            </div>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <span className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                      Notus NextJS
                    </span>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link href="/dashboard">
                  <div
                    className={
                      'text-xs uppercase py-3 font-bold block hover:text-green ' +
                      (currentPath === '/dashboard' && 'text-green')
                    }
                  >
                    <i
                      className={
                        'fas fa-tv mr-2 text-sm' +
                        (currentPath === '/dashboard'
                          ? 'text-green'
                          : 'opacity-75')
                      }
                    ></i>{' '}
                    Dashboard
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/dashboard/coorporate-members">
                  <div
                    className={
                      'text-xs uppercase py-3 font-bold block hover:text-green ' +
                      (currentPath === '/dashboard/coorporate-members' &&
                        'text-green')
                    }
                  >
                    <i
                      className={
                        'fas fa-tv mr-2 text-sm ' +
                        (currentPath.indexOf('/dashboard') !== -1
                          ? 'opacity-75'
                          : 'text-green')
                      }
                    ></i>{' '}
                    Cooperate Members
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/dashboard/coorperatives">
                  <div
                    className={
                      'text-xs uppercase py-3 font-bold block hover:text-green ' +
                      (currentPath === '/dashboard/coorperatives' &&
                        'text-green')
                    }
                  >
                    <i
                      className={
                        'fas fa-tv mr-2 text-sm ' +
                        (currentPath.indexOf('/dashboard') !== -1
                          ? 'opacity-75'
                          : 'text-green')
                      }
                    ></i>{' '}
                    Cooperatives
                  </div>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/dashboard/Product">
                  <div
                    className={
                      'text-xs uppercase py-3 font-bold block hover:text-green ' +
                      (currentPath === '/dashboard/coorperatives' &&
                        'text-green')
                    }
                  >
                    <i className="fas fa-plus"></i>
                    {` `} {` `}
                    ADD PRODUCT
                  </div>
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
          </div>
        </div>
      </nav>
    </>
  );
}
