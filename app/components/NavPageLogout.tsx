'use client';

import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { logout } from "@/app/actions/auth";

export default function NavPageLogout() {

    const logoutAction = () => {
        logout();
        window.location.reload();
    }

    return (
        <>
            <div>
                <button className="text-sm text-white" onClick={logoutAction}>
                    <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
                </button>
            </div>
        </>
    );
}
