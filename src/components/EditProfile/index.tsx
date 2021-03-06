import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Redirect } from 'react-router';
import { routesConfig } from '../../config/routesConfig';
import { useLogout } from '../../utils/hooks/useLogout';
import { useStore } from '../../utils/hooks/useStore';
import { Button } from '../Button';
import { Input } from '../Input';

export const EditProfile = () => {
    const { state, toggleEditProfile } = useStore();
    const { logout, loading, error } = useLogout();

    const {
        EditProfile: { visible },
    } = state;

    const [image, setImage] = useState('');
    const handleOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];
        if (file) {
            const filePrivew = URL.createObjectURL(file);
            setImage(filePrivew);
        }
    };

    const handleOnCloseClick = () => {
        toggleEditProfile();
    };

    const handleOnLogOutClick = () => {
        logout();
    };

    if (error) {
        return <Redirect to={routesConfig.login.path} />;
    }
    return (
        <div
            className={`${
                visible ? 'flex' : 'hidden'
            } min-h-screen min-w-full fixed bg-transparent items-center justify-center z-50 backdrop-filter  backdrop-blur-lg overflow-x-auto`}
        >
            <div className="flex items-center justify-center text-white bg-black bg-opacity-50 w-5/6 h-screen relative">
                <button
                    className="absolute right-3 top-2"
                    onClick={handleOnCloseClick}
                >
                    <AiOutlineCloseCircle size={30} />
                </button>
                <button
                    className="absolute left-3 top-2 disabled:opacity-50"
                    onClick={handleOnLogOutClick}
                    disabled={loading}
                >
                    <RiLogoutBoxLine size={30} />
                </button>
                <div className="w-full h-full flex flex-col items-center justify-evenly  p-2">
                    <div className="text-4xl mb-2">User Profile</div>
                    <form
                        className="sm:w-full lg:w-2/6 flex flex-col justify-center items-center text-black"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <label className="cursor-pointer mb-3 ring-2 ring-red-500 w-36 h-36 rounded-full  flex items-center justify-center">
                            <img
                                className={`object-cover rounded-full  ${
                                    image ? 'w-full h-full' : ''
                                }`}
                                src={image}
                                alt=""
                            />
                            <Input
                                type="file"
                                className="hidden z-20"
                                onChange={handleOnImageChange}
                                accept="image/png, image/jpeg"
                            />
                        </label>
                        <Input type="text" placeholder="Name" />
                        <Input type="text" placeholder="Username" />
                        <Input type="text" placeholder="E-mail" />
                        <Input type="password" placeholder="Password" />
                        <Input type="password" placeholder="Confirm Password" />
                        <Button type="submit">Save Profile</Button>
                    </form>
                    <form className="sm:w-full lg:w-2/6 flex flex-col justify-center items-center">
                        <label className="w-full">
                            <input type="checkbox" />
                            Keep Navbar Open
                        </label>
                        <label className="w-full">
                            <input type="checkbox" />
                            Keep Bottom Activity bar Open
                        </label>
                        <Button>Save UI Changes</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
