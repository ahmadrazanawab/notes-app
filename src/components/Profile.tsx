import React,{ useState } from 'react'
import Model from '../Pages/Model'

const Profile: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
     const showModalBtn = () => {
            setShowModal(true)
        }
    
        const onClosed = (e:React.SyntheticEvent) => {
            e.preventDefault();
            setShowModal(false);
        }
    return (
        <div>
            <Model isVisible={showModal} onClose={() => setShowModal(false)} >
                <div className="mb-4 px-6 text-left">
                    <h3 className="mb-4 text-xl font-medium text-gray-900">Edit Note</h3>
                    <form action="" className="space-y-6">
                        <div onClick={onClosed}>
                            <button className="mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95">Cancel Todo</button>
                            <button type="submit"  className="mx-1 bg-cyan-600 text-slate-50 font-bold px-2 py-1 rounded-md shadow-md hover:scale-95">Save Todo</button>
                        </div>
                    </form>
                </div>
            </Model>
            <div className='inline-block w-8 h-8 cursor-pointer hover:scale-95  justify-center items-center rounded-[100%]  bg-orange-400'>
                <button onClick={showModalBtn} className='text-white  text-center text-xl'>A</button>
            </div>
        </div>
    )
}

export default Profile
