import React from 'react'
import ThemeContainer from './parts/ThemeContainer'

export default function Profile() {
    return (<ThemeContainer>

        <form method="post" className="bg-white mx-auto m-3 rounded-xl p-5 w-[75%]">
            <h2 className="text-2xl my-4 font-bold">Update User Profile</h2>
            <label htmlFor="name">
                <p id="name" className="my-3 font-bold">Name</p>
                <input type="text" id="name" name="name" placeholder="Write here" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>
            <label htmlFor="name">
                <p id="name" className="my-3 font-bold">E-mail</p>
                <input type="text" id="name" name="name" placeholder="Write here" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>

            <h2 className="py-4 text-xl font-bold border-t border-t-gray-200 mt-4">Change Password</h2>
            <label htmlFor="password">
                <p id="password" className="my-3 font-bold">Password</p>
                <input type="text" id="password" name="password" placeholder="Write here" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>
            <label htmlFor="repeat-password">
                <p id="repeat-password" className="my-3 font-bold">Repeat Password</p>
                <input type="text" id="repeat-password" name="repeat-password" placeholder="Write here" className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
            </label>


            <button className="block rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">Update</button>
        </form>
    </ThemeContainer>)
}
