import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

const Actions = (props) => {
    return (
        <Menu as = "div" className = "relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium text-white bg-gray-500 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                
                <DotsHorizontalIcon
                className="w-5 h-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
                />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                    <Menu.Item>
                        {({active}) => (
                            <Link to = {`/place/${props.place.id}`} className={`${
                                active ? 'bg-black text-white' : 'bg-gray-800 text-white'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                <button>Edit</button>
                            </Link>
                        )}  
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <button onClick = {props.openPromptHandler} className={`${
                                active ? 'bg-red-500 text-white' : 'bg-blueGray-800 text-white'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                                Delete
                            </button>
                        )}

                        
                    </Menu.Item>
                </div>                                            
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Actions;