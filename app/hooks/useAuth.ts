import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie'

export const useAuth = () => {

    const router = useRouter();

    useEffect(() => {
        Cookies.set('testCookie', 'test')
        const token = Cookies.get('token');
        console.log(token);
        if (!token) {
            router.push('/login')
        }
    }, [router]);

    return 1;
}