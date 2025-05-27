import React from 'react'

export default function ChangPassword({ open, setOpen, language }) {
    const [loading, setLoading] = React.useState(false);

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        console.log(e.target);

        if (e.target.files && e.target.files[0]) {
            const image = window.URL.createObjectURL(e.target.files[0])
            setLoading(false);
        }
    }

    return (<div open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" onClick={() => setOpen(false)} />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <form method="post" onSubmit={handleUpdatePassword} className="bg-white mx-auto m-3 rounded-xl p-5 w-[45%]">
                    <h2 className="py-4 text-xl font-bold border-b border-b-gray-200 mt-4">{language && language["change_password"]}:</h2>
                    <label htmlFor="password">
                        <p id="password" className="my-3 font-bold">{language && language["password"]}</p>
                        <input type="text" id="password" name="password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
                    </label>
                    <label htmlFor="repeat-password">
                        <p id="repeat-password" className="my-3 font-bold">{language && language["repeat_password"]}</p>
                        <input type="text" id="repeat-password" name="repeat-password" placeholder={language && language["write_here"]} className="py-2 px-14  rounded shodow-sm bg-color w-full placeholder-gray-400" />
                    </label>

                    <div className="flex justify-between w-full">
                        <button type="button" onClick={() => setOpen(false)} className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">{language && language["cancel"]}</button>

                        <button className="flex rounded pointer m-2 py-1 px-5 bg-gradient-to-br from-[#fa9600] to-[#ffe696] text-sm hover:bg-gradient-to-br hover:from-amber-700 hover:to-amber-400 mx-auto mt-5">{loading && <img className="animate-spin w-4 h-4 m-1" src="/loading_white.png" />} <span>{language && language["update"]}</span></button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}
